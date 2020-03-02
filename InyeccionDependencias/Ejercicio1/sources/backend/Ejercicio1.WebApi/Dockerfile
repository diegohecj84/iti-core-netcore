FROM  mcr.microsoft.com/dotnet/core/runtime:2.2 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["Ejercicio1.WebApi/Ejercicio1.WebApi.csproj", "Ejercicio1.WebApi/"]
RUN dotnet restore "Ejercicio1.WebApi/Ejercicio1.WebApi.csproj"
COPY . .
WORKDIR "/src/Ejercicio1.WebApi"
RUN dotnet build "Ejercicio1.WebApi.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Ejercicio1.WebApi.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Ejercicio1.WebApi.dll"]