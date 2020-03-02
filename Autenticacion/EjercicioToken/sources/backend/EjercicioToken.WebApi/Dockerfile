FROM  mcr.microsoft.com/dotnet/core/runtime:2.2 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["EjercicioToken.WebApi/EjercicioToken.WebApi.csproj", "EjercicioToken.WebApi/"]
RUN dotnet restore "EjercicioToken.WebApi/EjercicioToken.WebApi.csproj"
COPY . .
WORKDIR "/src/EjercicioToken.WebApi"
RUN dotnet build "EjercicioToken.WebApi.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "EjercicioToken.WebApi.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "EjercicioToken.WebApi.dll"]