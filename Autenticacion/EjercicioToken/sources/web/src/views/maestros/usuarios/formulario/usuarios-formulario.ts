import { Component, Prop } from 'vue-property-decorator';
import { Usuario } from '../../../../shared/dtos/usuario';
import { ItiBaseModal, ItiToolbarOkCancel, ItiString } from '@iti/vue-core';

@Component({
    components: {
        ItiToolbarOkCancel,
    },
})
export default class UsuariosFormulario extends ItiBaseModal {

    @Prop() public usuario!: Usuario;

    public rolesDisponibles = ['Solo lectura', 'Usuario básico', 'Configurador', 'Usuario avanzado', 'Técnico', 'Administrador'];

    private confirmation: string = ItiString.Empty;

    public created() {
        this.$validator.reset();
    }

    public submit() {
        this.validateAndClose(this.usuario);
    }
}
