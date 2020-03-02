
import { ItiCoreAPI, itiSignalRService, i18n, itiPublicPathModule, itiHttpService } from '@iti/vue-core';
import enLocale from './../locales/en';
import esLocale from './../locales/es';


// Le indicamos al paquete la ruta base para acceder al API
ItiCoreAPI.setWebApiBase(process.env.VUE_APP_ROOT_API as string);

// Le indicamos la ruta para acceder a los assets
itiPublicPathModule.setPublicPath(process.env.VUE_APP_PUBLIC_PATH as string);

// Le añadimos al i18n las traducciones del proyecto, mergeándolas con las que lleva el paquete
i18n.mergeLocaleMessage('es', esLocale);
i18n.mergeLocaleMessage('en', enLocale);

// Nota: descomentar esta línea si se va a usar SignalR para recibir eventos del servidor
// Le indicamos la ruta base de acceso al ChannelHub para suscribirse a los eventos del servidor
// itiSignalRService.setWebChannelHubBase(process.env.VUE_APP_ROOT_CHANNELHUB as string);

// Habilitamos que las llamadas al API muestren automáticamente los errores recibidos del servidor
// para no tener que hacer gestión en nuestro proyecto para mostrarlos
itiHttpService.enableShowErrorMessage(true);
