import { API } from '../api';
import { itiTokenService, ItiString, ItiLogin, itiSignalRService, itiHttpService } from '@iti/vue-core';

export default class AuthorizationService {
    public userName: string = ItiString.Empty;

    public async login(login: ItiLogin): Promise<boolean> {
        // Descomentar esta línea si se quiere entrar a la aplicación sin login
        // return Promise.resolve(this.onLogin({Success: true, Name: login.UserName, Token: 'myTokenHashed'}));

        try {
            const res = await itiHttpService.post(API.login, login.toJson());
            return this.onLogin(res);
        } catch (err) {
            this.loginFail(err);
            return Promise.reject(false);
        }
    }

    public logout() {
        this.userName = ItiString.Empty;
        itiTokenService.clearToken();
        itiHttpService.updateTokenHeader();
        // Nota: descomentar esta línea si se va a usar SignalR para recibir eventos del servidor
        // itiSignalRService.leaveChannel();
    }

    private onLogin(res: any): boolean {
        if (res.Success) {
            this.userName = res.Name;
            itiTokenService.setToken(res.Token);
            itiHttpService.updateTokenHeader();
            // Nota: descomentar esta línea si se va a usar SignalR para recibir eventos del servidor
            // itiSignalRService.joinChannel();
            return true;
        } else {
            return false;
        }
    }

    private loginFail(res: any) {
        return false;
    }
}

export const authorizationService = new AuthorizationService();
