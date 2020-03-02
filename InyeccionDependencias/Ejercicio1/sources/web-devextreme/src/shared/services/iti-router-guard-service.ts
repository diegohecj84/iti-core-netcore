import { itiTokenService } from './iti-token-service';


export class ItiRouterGuardService {

    public pathLogin: string = '/login';

    public beforeEnter(to: any, from: any, next: any) {
        if (itiTokenService.hasToken()) {
            next();
        } else {
            next(itiRouterGuardService.pathLogin);
        }
    }

    public setPathLogin(pathLogin: string) {
        itiRouterGuardService.pathLogin = pathLogin;
    }

}

export const itiRouterGuardService = new ItiRouterGuardService();
