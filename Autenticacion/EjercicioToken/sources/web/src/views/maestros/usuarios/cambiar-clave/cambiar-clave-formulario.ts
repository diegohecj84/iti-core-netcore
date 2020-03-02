import { Component, Prop } from 'vue-property-decorator';
import { Usuario } from '../../../../shared/dtos/usuario';
import { ItiString, ItiBaseModal } from '@iti/vue-core';
import { CambiarContrasenya } from '@/shared/dtos/cambiar-contrasenya';


@Component({})
export default class CambiarClaveFormulario extends ItiBaseModal {

    @Prop() public usuario!: Usuario;

    public cambiarContrasenya: CambiarContrasenya = new CambiarContrasenya();

    private confirmation: string = ItiString.Empty;

    public submit() {
        this.validateAndClose(this.usuario);
    }
}
