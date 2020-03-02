import { Rol } from '@/shared/dtos/rol';
import { Component, Prop } from 'vue-property-decorator';
import { ItiString, ItiBaseModal, ItiToolbarOkCancel } from '@iti/vue-core';

@Component({
    components: {
        ItiToolbarOkCancel,
    },
})
export default class RolesFormulario extends ItiBaseModal {
    @Prop() public rol!: Rol;

    private confirmation: string = ItiString.Empty;

    public created() {
        this.$validator.reset();
    }

    public submit() {
        this.validateAndClose(this.rol);
    }
}
