import { ItiBaseDto } from './iti-base-dto';
export declare class ItiMessageListenFor extends ItiBaseDto {
    EventName: string;
    EventMethod: (...args: any[]) => void;
}
