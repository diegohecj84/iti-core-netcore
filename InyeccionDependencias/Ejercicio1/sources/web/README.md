# Vue ITI Seed Project

## Instalar dependencias
```
Por línea de comandos, ubicado en la carpeta donde reside el archivo 'package.json', ejecutar:

   npm install
```

### Compilar y servir el proyecto para desarrollo con live-reload
```
Por línea de comandos, ubicado en la carpeta donde reside el archivo 'package.json', ejecutar:

   npm start
```

### Compilar y minificar para servir en producción
```
Por línea de comandos, ubicado en la carpeta donde reside el archivo 'package.json', ejecutar:

   npm run build
```

### Ejecutar tests con jest
```
Por línea de comandos, ubicado en la carpeta donde reside el archivo 'package.json', ejecutar:

   npm run test
```

### Menú lateral izquierdo

#### Editar las opciones de menú

```
Las opciones de menú se definen en:
   src\shared\layout\menu\MenuOptions.ts
```

#### Opciones de menú según permisos

En el MenuOptions.ts, en cada opción del menú se le puede indicar la propiedad 'permission':
 - Si permission es 'String.Empty', la opción se muestra siempre
 - Si permission es un string con el nombre de un permiso, se valida sobre el método 'permissionService.hasPermission(...)' si el usuario tiene permisos.

En la plantilla, a modo de ejemplo, se ha rellenado un array fijo de permisos en el 'permissionService'.
En una aplicación real se deberá rellenar este array antes de generar el menú lateral.

### Editar las rutas
```
Las rutas se definen en:
    src\router.ts
```
### Carpetas del proyecto

 * **.vscode**: contiene archivos propios de Visual Studio Code, por ejemplo la configuración para hacer Debug.

 * **node_modules**: contiene las dependencias descargadas al hacer "npm install"

 * **public**: contiene los archivos estáticos (imágenes, iconos, etc...)

 * **src/__tests__**: contiene archivos con los test de jest. Se admite tanto archivos ".test.ts" como ".spec.ts"

 * **src/plugins**: contiene archivos para configurar los plugins (p.e. Vuetify)

 * **src/shared**: contiene servicios, componentes, clases y recursos que pueden compartise en distintos puntos de la aplicación. De este modo es transversal al resto de elementos.

 * **src/views**: contiene los componentes que se resuelven en las vistas, típicamente los componentes que se resuelven en las rutas, y estructurando en subcarpetas se ubicarían los subcomponentes que necesite cada vista.

### Archivos del proyecto

* **src/main.ts**: punto de entrada de la aplicación

* **src/shims-tsx.d.ts**: configuración necesaria para el ts-loader que se ejecuta durante la compilación

 * **src/shims-vue.d.ts**: configuración necesaria para el vue-loader que se ejecuta durante la compilación

 * **src/.env**: variables al compilar en desarrollo

 * **src/.env.prod**: variables al compilar el producción (npm run build)

 * **.npmrc**: credenciales para poder descargar el paquete @iti/vue-core del repositorio npm que tenemos en el iti

 * **package-lock.json**: este archivo se crea automáticamente al hacer "npm install" y contiene el árbol de jerarquia entre las dependencias de los paquetes npm indicados en el package.json

 * **package.json**: configuración del empaquetado,  y dependencias

 * **tsconfig.json**: configuración de typescript

 * **tslint.json**: definición de las reglas lint a aplicar
