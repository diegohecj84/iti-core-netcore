import { ItiString } from '../utils/iti-string';

export class ItiTokenService {

    private tokenName = 'token';

    public hasToken() {
        return !ItiString.IsNullOrWhiteSpace(this.getToken());
    }

    public setToken(token: string) {
        window.localStorage.setItem(this.tokenName, token);
    }

    public getToken() {
        return window.localStorage.getItem(this.tokenName);
    }

    public clearToken() {
        window.localStorage.removeItem(this.tokenName);
    }

}

export const itiTokenService = new ItiTokenService();
