import { ItiBaseDto } from '@iti/vue-core';

export class CambiarContrasenya extends ItiBaseDto {
    public PwdActual!: string;
    public PwdNuevo!: string;
}
