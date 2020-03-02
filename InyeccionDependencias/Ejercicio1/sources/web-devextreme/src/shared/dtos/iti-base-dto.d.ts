export declare class ItiBaseDto {
    Id: any;
    Version: any;
    private originalJson;
    constructor(src?: any, enableTrackChanges?: boolean);
    copy(src?: any): void;
    isNewItem(): boolean;
    isChanged(): boolean;
    fromJson(data: string): void;
    toJson(omitProperties?: string[], resetTrackChanges?: boolean): string;
    protected resetTrackChanges(): void;
    private omitKeys;
}
