// Aqui se centralizan los strings de las rutas al API
export class API {
    public static webApiBase = process.env.VUE_APP_ROOT_API;

    public static login = API.webApiBase + 'Login';

    public static usuarios = API.webApiBase + 'Usuarios';

    public static roles = API.webApiBase + 'Roles';

}
