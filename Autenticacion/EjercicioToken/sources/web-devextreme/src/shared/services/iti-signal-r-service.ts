import { itiMessageService } from './iti-message-service';
import { itiTokenService } from './iti-token-service';
import * as signalR from '@aspnet/signalr';
import { ItiString } from '../utils/iti-string';
import { ItiMessageListenFor } from '../dtos/iti-message-listen-for';

export class ItiSignalRService {
    public connection!: signalR.HubConnection;
    public messages: ItiMessageListenFor[] = [];
    public connecting: boolean = false;
    public connected: boolean = false;
    public invoking: boolean = false;
    public joinedChannel: boolean = false;
    private webChannelHubBase: string = 'falta llamar a ItiSignalRService.setWebChannelHubBase()';

    public setWebChannelHubBase(webChannelHubBase: string) {
        this.webChannelHubBase = webChannelHubBase;
        this.connect();
    }

    public listenFor(messageListenFor: string, messageEventMethod: (...args: any[]) => void) {
        const message = new ItiMessageListenFor({ EventName: ItiMessageListenFor, EventMethod: messageEventMethod });
        if (this.connected && this.joinedChannel) {
            this.addListenFor(messageListenFor, messageEventMethod);
        } else {
            this.saveMessage(message);
        }
    }

    public unListenFor(messageListenFor: string, eventMethod: (...args: any[]) => void) {
        this.connection.off(messageListenFor, eventMethod);
    }

    public connect(): Promise<any> {
        if (this.connected) {
            return Promise.resolve(true);
        }
        if (!this.connecting) {
            this.connecting = true;
            this.connection = new signalR.HubConnectionBuilder()
                .withUrl(this.webChannelHubBase,
                    { skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets,
                    accessTokenFactory: () => itiTokenService.getToken()! })
                .build();
            this.connection.onclose(this.onConnectionError.bind(this));
            return this.connection.start()
                .then(this.onConnectionStart.bind(this))
                .catch(this.onConnectionError.bind(this));
        } else {
            return Promise.resolve(false);
        }
    }

    public joinChannel(): Promise<any> {
        if (this.joinedChannel) {
            return Promise.resolve(true);
        }
        if (!this.invoking && itiTokenService.hasToken()) {
            this.invoking = true;
            return this.connection.invoke('JoinToMyChannel')
                .then(this.onJoinChannel.bind(this))
                .catch(this.onChannelError.bind(this));
        } else {
            return Promise.resolve(false);
        }
    }

    public leaveChannel(): Promise<any> {
        if (!this.joinedChannel) {
            return Promise.resolve(true);
        }
        if (!this.invoking && itiTokenService.hasToken()) {
            this.invoking = true;
            return this.connection.invoke('LeaveMyChannel')
                .then(this.onLeaveChannel.bind(this))
                .catch(this.onChannelError.bind(this));
        } else {
            return Promise.resolve(false);
        }
    }

    private addListenFor(messageListenFor: string, eventMethod: (...args: any[]) => void) {
        this.connection.on(messageListenFor, eventMethod);
    }

    private listenForMessages() {
        this.messages.forEach((message: ItiMessageListenFor) => {
            this.addListenFor(message.EventName, message.EventMethod);
            this.removeMessage(message);
        });
    }

    private saveMessage(message: ItiMessageListenFor) {
        this.messages.push(message);
        setTimeout(() => {
            this.connect();
        }, 500);
    }

    private removeMessage(message: ItiMessageListenFor) {
        const index = this.messages.indexOf(message);
        if (index !== -1) {
            this.messages.splice(index, 1);
        }
    }

    private onJoinChannel(res: any) {
        this.joinedChannel = true;
        this.invoking = false;
        this.listenForMessages();
        return res;
    }

    private onLeaveChannel(res: any) {
        this.joinedChannel = false;
        this.invoking = false;
        return res;
    }

    private onChannelError(error: any) {
        this.invoking = false;
        this.joinedChannel = false;
        this.processError(error);
    }

    private onConnectionStart(res: any) {
        this.connected = true;
        this.connecting = false;
        this.joinChannel();
        return res;
    }

    private onConnectionError(error: any) {
        this.connecting = false;
        this.connected = false;
        this.processError(error);
    }

    private processError(error: any, showMessageError: boolean = true) {
        const message = error.message || error.response.statusText;

        if (!ItiString.IsNullOrWhiteSpace(message) && showMessageError) {
            itiMessageService.toast(message, itiMessageService.TypeError);
        }

        throw error;
    }
}
export const itiSignalRService = new ItiSignalRService();
