import { itiMessageService } from './iti-message-service';


export class ItiLoadingService {

    private loadingCount: number;

    constructor() {
        this.loadingCount = 0;
    }

    public enableLoading() {
        if (!this.isLoading()) {
            itiMessageService.showLoading();
        }
        this.loadingCount++;
    }

    public disableLoading() {
        this.loadingCount--;
        if (!this.isLoading()) {
            itiMessageService.hideLoading();
        }
    }

    public isLoading(): boolean {
        return this.loadingCount > 0;
    }

}

export const itiLoadingService = new ItiLoadingService();
