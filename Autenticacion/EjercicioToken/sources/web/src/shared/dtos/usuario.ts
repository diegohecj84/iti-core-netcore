import { ItiBaseDto } from '@iti/vue-core';

export class Usuario extends ItiBaseDto {
    public UserName!: string;
    public Name!: string;
    public PhoneNumber!: string;
    public Email!: string;
    public Password!: string;
    public IsActive!: boolean;
    public IsAdmin!: boolean;

    public get activoIconName() {
        return this.IsActive ? 'done' : 'clear';
    }

    constructor(src?: any) {
        super(src);
        this.IsActive = this.Id === null ? true : this.IsActive;
    }
}
