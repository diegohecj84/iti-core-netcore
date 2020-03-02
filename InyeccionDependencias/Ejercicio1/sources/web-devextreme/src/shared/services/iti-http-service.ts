import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ItiString } from '../utils/iti-string';
import { itiLoadingService } from './iti-loading-service';
import { itiMessageService } from './iti-message-service';
import { itiTokenService } from './iti-token-service';

export class ItiHttpService {

    private showErrorMessage: boolean = false;
    private axiosInstance: AxiosInstance = this.initAxiosInstance();

    public enableShowErrorMessage(showErrorMessage: boolean) {
        this.showErrorMessage = showErrorMessage;
    }

    public initAxiosInstance(): AxiosInstance {
        // Creamos la instancia de axios
        return axios.create({
            headers: this.composeHeaders(),
        });
    }

    public composeHeaders() {
        if (itiTokenService.hasToken()) {
            return { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + itiTokenService.getToken() };
        } else {
            return { 'Content-Type': 'application/json' };
        }
    }

    public updateTokenHeader() {
        this.axiosInstance.defaults.headers = this.composeHeaders();
    }

    // Método para hacer una petición 'GET' al API
    //   - url: la url completa
    //   - params: parámetros
    //   - fullResponse: por defecto se devuelve solo el 'data' resultado de la petición,
    //                   pero se puede indicar false para obtener la Response entera
    //   - showMessageError: muestra un toast con el error
    public get(
        url: string, params?: any, showLoading: boolean = true, fullResponse: boolean = false,
        showErrorMessage: boolean = this.showErrorMessage) {
        this.enableLoading(showLoading);

        return this.axiosInstance.get(url, params)
            .then((res) => this.processResponse(res, showLoading, fullResponse))
            .catch((res) => this.processError(res, showLoading, showErrorMessage));
    }

    // Método para hacer una petición 'POST' al API
    // (ver la explicación de los parámetros en el método 'get')
    public post(
        url: string, params: any, showLoading: boolean = true, fullResponse: boolean = false,
        showErrorMessage: boolean = this.showErrorMessage) {
        this.enableLoading(showLoading);

        return this.axiosInstance.post(url, params)
            .then((res) => this.processResponse(res, showLoading, fullResponse))
            .catch((res) => this.processError(res, showLoading, showErrorMessage));
    }

    // Método para hacer una petición 'PUT' al API
    // (ver la explicación de los parámetros en el método 'get')
    public put(
        url: string, params: any, showLoading: boolean = true, fullResponse: boolean = false,
        showErrorMessage: boolean = this.showErrorMessage) {
        this.enableLoading(showLoading);

        return this.axiosInstance.put(url, params)
            .then((res) => this.processResponse(res, showLoading, fullResponse))
            .catch((res) => this.processError(res, showLoading, showErrorMessage));
    }

    // Método para hacer una petición 'DELETE' al API
    // (ver la explicación de los parámetros en el método 'get')
    public delete(
        url: string, params: any, showLoading: boolean = true, fullResponse: boolean = false,
        showErrorMessage: boolean = this.showErrorMessage) {
        this.enableLoading(showLoading);

        return this.axiosInstance.delete(url, params)
            .then((res) => this.processResponse(res, showLoading, fullResponse))
            .catch((res) => this.processError(res, showLoading, showErrorMessage));
    }

    // Método para hacer una petición 'PATCH' al API
    // (ver la explicación de los parámetros en el método 'get')
    public patch(
        url: string, params: any, showLoading: boolean = true, fullResponse: boolean = false,
        showErrorMessage: boolean = this.showErrorMessage) {
        this.enableLoading(showLoading);

        return this.axiosInstance.patch(url, params)
            .then((res) => this.processResponse(res, showLoading, fullResponse))
            .catch((res) => this.processError(res, showLoading, showErrorMessage));
    }

    // Método para recuperar la instancia de axios
    // usado por jest en testing
    public getAxiosInstance(): AxiosInstance {
        return this.axiosInstance;
    }

    public getErrorMessageFromResponse(error: any): string {
        return error.response.data.Message ||
            error.message ||
            error.Message ||
            error.response.statusText ||
            this.getStatusTextFromCode(error.response.statusCode);
    }

    public getStatusTextFromCode(code: number) {
        switch (code) {
            case 400: return 'Bad request: The server did not understand the request';
            case 401: return 'Unauthorized: The request needs a username and a password or your session has expired';
            case 402: return 'Payment Required: You can not use thos code yet';
            case 403: return 'Forbidden: Access is forbidden to the requested page';
            case 404: return 'Not Found: The server can not find de requested page';
            case 405: return 'Method Not Allowed: The method specified in the request is not allowed';
            case 406: return 'Not Acceptable: the server can only generate a response that is not accepted by the client';
            case 407: return 'Proxy Authentication Required: You must authenticate with a proxy server before this request can be served.';
            case 408: return 'Request Timeout: The reuqest took longer than the server was prepared to wait';
            case 409: return 'Conflict: The request could not be completed because of a conflict';
            case 410: return 'Gone: The requested page is no longer available';
            case 411: return 'Length Required: The "Content-Length" is not defined. The server will not accept the request without it';
            case 412: return 'Precondition Failed: The pre condition given in the request evaluated to false by the server';
            case 413: return 'Request Entity Too Large: The server will not accept the request, because the request entity is too large';
            case 414: return 'Request-url Too Long: The server will not accept the request, because the url is too long. Occurs when you convert a "post" request to a "get" request with a long query information';
            case 415: return 'Unsupported Media Type: The server will not accept the request, because the mediatype is not supported';
            case 416: return 'Requested Range Not Satisfiable: The requested byte range is not available and is out of bounds';
            case 417: return 'Expectation Failed: The expectation given in an Expect request-header field could not be met by this server';
            case 500: return 'Internal Server Error: The request was not completed. The server met an unexpected condition';
            case 501: return 'Not Implemented: The request was not completed. The server did not support the functionality required';
            case 502: return 'Bad Gateway: The request was not completed. The server received an invalid response from the upstream server';
            case 503: return 'Service Unavailable: The request was not completed. The server is temporarily overloading or down';
            case 504: return 'Gateway Timeout: The gateway has timed out';
            case 505: return 'HTTP Version Not Supported: The server does not support the "http protocol" version';
            default: return 'Unavailable Code';
        }
    }

    private processResponse(response: AxiosResponse, showLoading: boolean, fullResponse: boolean = false) {
        if (showLoading) {
            itiLoadingService.disableLoading();
        }
        return fullResponse ? response : response.data;
    }

    private processError(error: any, showLoading: boolean, showMessageError: boolean) {
        if (showLoading) {
            itiLoadingService.disableLoading();
        }

        if (showMessageError) {
            const message = this.getErrorMessageFromResponse(error);

            if (!ItiString.IsNullOrWhiteSpace(message)) {
                itiMessageService.toast(message, itiMessageService.TypeError);
            }
        }

        throw error;
    }

    private enableLoading(showLoading: boolean) {
        if (showLoading) {
            itiLoadingService.enableLoading();
        }
    }

}

export const itiHttpService = new ItiHttpService();
