using System;
using System.IO;
using System.Text;
using ITI.Core.AspNetCore;
using ITI.Core.AspNetCore.Persistence.UnitOfWork;
using ITI.Core.AspNetCore.WebApi;
using ITI.Core.AspNetCore.WebApi.Filters;
using ITI.Core.ObjectMapper.AutoMapper;
using ITI.Core.Persistence.EntityFrameworkCore;
using EjercicioToken.Persistence.EntityFramework;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.PlatformAbstractions;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;
using ITI.Core;
using ITI.Core.Scheduling.Quartz;
using ITI.Core.Features.Application;
using EjercicioToken.Application.Features.ScheduledTasks;
using Newtonsoft.Json.Serialization;
using ITI.Core.RealTime.SignalR;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using System.Collections.Generic;
using System.Linq;

namespace EjercicioToken.WebApi
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        private string projectName;
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="configuration"></param>
        public Startup(IConfiguration configuration)
        {
            projectName = this.GetType().Assembly.GetName().Name;
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            //Añadimos Swagger

            var basePath = PlatformServices.Default.Application.ApplicationBasePath;



            var xmlPath = Path.Combine(basePath, string.Format("{0}.xml", projectName));


            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = Configuration["Swagger:Title"],
                    Contact = new Contact()
                    {
                        Name = "INSTITUTO TECNOLÓGICO DE INFORMÁTICA (ITI)",
                        Email = "info@iti.es",
                        Url = "https://www.iti.es/"
                    }
                });

                c.AddSecurityDefinition("Bearer", new ApiKeyScheme { In = "header", Description = "Please enter JWT with Bearer into field", Name = "Authorization", Type = "apiKey" });
                c.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>> {
                {
                    "Bearer", Enumerable.Empty<string>() },
                });

                c.IncludeXmlComments(xmlPath);
            });

            //Añadimos CORS

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder =>
                    {
                        builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                    });
            });

            //Configuramos Autenticación por TOKEN JWT.

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                 .AddJwtBearer(options =>
                 {
                     options.TokenValidationParameters = new TokenValidationParameters
                     {
                         ValidateIssuer = true,
                         ValidateAudience = true,
                         ValidateLifetime = true,
                         ValidateIssuerSigningKey = true,
                         ValidIssuer = Configuration["Jwt:Issuer"],
                         ValidAudience = Configuration["Jwt:Issuer"],
                         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                     };

                     options.Events = new JwtBearerEvents
                     {
                         OnMessageReceived = context =>
                         {
                             var accessToken = context.Request.Query["access_token"];

                             // If the request is for our hub...
                             var path = context.HttpContext.Request.Path;
                             if (!string.IsNullOrEmpty(accessToken) &&
                                 (path.StartsWithSegments("/userChannelHub")))
                             {
                                 // Read the token out of the query string
                                 context.Token = accessToken;
                             }
                             return Task.CompletedTask;
                         }
                     };
                 });

            //Configuramos EntityFramework

            services.AddDbContext<ITICoreTemplateDbContext>(options =>
                                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddLocalization();

            services.AddMvc(options =>
            {
                options.Filters.Add(typeof(ValidateModelStateAttribute));

                var policy = new AuthorizationPolicyBuilder()
                  .RequireAuthenticatedUser()
                  .Build();

                options.Filters.Add(new AuthorizeFilter(policy));
            });

            services.AddMvc().AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

            //Añadimos SignalR

            services.AddSignalR().AddJsonProtocol(options => { options.PayloadSerializerSettings.ContractResolver = new DefaultContractResolver(); });

            //Añadimos los componentes de ITI.Core

            BootStrapper bootStrapper = new BootStrapper(services)
                            .UseEntityFrameworkCore<ITICoreTemplateDbContext>()
                            .UseAutoMapper()
                            .UseQuartz()
                            .UseSignalR()
                            .UseTempFilesApi(Configuration["FolderStoreKeeper:BaseDir"])
                            .UseScheduledTasks<TareasProgramadasStore>();

            return services.AddITICore(bootStrapper);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            //Configuramos ITI.Core

            app.UseITICore(loggerFactory).UseWebApiExceptionHandler();

            if (env.IsDevelopment())
            {

            }
            app.UseHttpsRedirection();

            app.UseCors("AllowAll");

            app.UseAuthentication();

            app.UseMvc();

            app.ConfigureUserChannelWithSignalR();

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", string.Format("{0} V1", projectName));
            });
        }
    }
}
