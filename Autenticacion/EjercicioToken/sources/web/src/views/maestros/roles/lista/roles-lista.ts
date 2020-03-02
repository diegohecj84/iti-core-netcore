import { Rol } from '@/shared/dtos/rol';
import rolesModule from '@/store/modules/roles-module';
import { itiButtonsMaestro, ItiGridPagesMixin, ItiDataTable, itiMessageService, ItiModalDialog, ItiVHeader } from '@iti/vue-core';
import { mixins } from 'vue-class-component';
import { Component } from 'vue-property-decorator';
import RolesFormulario from '../formulario/roles-formulario';

@Component({
  components: {
    ItiDataTable,
    RolesFormulario,
    ItiModalDialog,
  },
})
export default class RolesLista extends mixins(ItiGridPagesMixin) {
  public rolSeleccionado: Rol = new Rol();

  public get roles() {
    return rolesModule.roles;
  }

  public get headers() {
    return [
      new ItiVHeader('Name', 'nombre'),
      new ItiVHeader('Description', 'descripcion'),
      new ItiVHeader('Id', '').withSortable(false).withWidth(250),
    ];
  }

  public get buttons() {
    return itiButtonsMaestro.buttons();
  }

  public loading = false;
  public search = '';

  private get modalDialog(): ItiModalDialog {
    return this.$refs.modalDialog as ItiModalDialog;
  }

  private get formulario(): RolesFormulario {
    return this.$refs.formulario as RolesFormulario;
  }

  public newItem() {
    this.openFormulario(new Rol());
  }

  public editItem(item: Rol) {
    this.openFormulario(item);
  }

  public deleteItem(item: Rol) {
    itiMessageService.confirm(
      this.$tc('mensajes.pregunta-borrar') + item.Name + '" ?', this.$tc('mensajes.confirmar'),
      (res) => {
        if (res) {
          rolesModule.eliminarRol(item);
        }
      },
    );
  }

  public closeFormulario(item: Rol) {
    this.modalDialog.hide();
    rolesModule.modificarRol(item);
  }

  private openFormulario(item: Rol) {
    // Reseteamos las validaciones del formulario
    this.formulario.reset();

    // Le pasamos los datos a mostrar
    this.rolSeleccionado = item;

    // Abrimos el modal
    this.modalDialog.show();
  }

}
