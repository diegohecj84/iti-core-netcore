import { ItiBaseDto } from './iti-base-dto';
export declare class ItiScheduledTask extends ItiBaseDto {
    Name: string;
    Identifier: string;
    Cron: string;
    IsActive: boolean;
    Timeout: number;
    IsRunning: boolean;
}
