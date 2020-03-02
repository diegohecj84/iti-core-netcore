import { Usuario } from '@/shared/dtos/usuario';
import { ItiModalDialog, itiMessageService, ItiGridPagesMixin, ItiVHeader } from '@iti/vue-core';
import { Component } from 'vue-property-decorator';
import CambiarClaveFormulario from '../cambiar-clave/cambiar-clave-formulario';
import UsuariosFormulario from '../formulario/usuarios-formulario';
import { mixins } from 'vue-class-component';
import usuariosModule from '@/store/modules/usuarios-module';

@Component({
  components: {
    UsuariosFormulario,
    CambiarClaveFormulario,
    ItiModalDialog,
  },
})
export default class UsuariosLista extends mixins(ItiGridPagesMixin) {
  public showUsuarioFormulario: boolean = false;
  public showCambiarClave: boolean = false;

  public usuarioSeleccionado: Usuario = new Usuario();
  public get usuarios() {
    return usuariosModule.usuarios;
  }

  public addHidden = true;
  public loading = false;
  public search = '';
  public showDialog = false;

  // Definimos las columnas del grid
  public get headers() {
    return [
      new ItiVHeader('UserName', 'maestro-usuarios.usuario').withWidth(150),
      new ItiVHeader('Name', 'nombre'),
      new ItiVHeader('PhoneNumber', 'telefono').withWidth(150),
      new ItiVHeader('Email', 'maestro-usuarios.email'),
      new ItiVHeader('activoIconName', 'maestros.activo').withWidth(100),
      new ItiVHeader('Id', '').withSortable(false).withWidth(250),
    ];
  }

  private get modalUsuario(): ItiModalDialog {
    return this.$refs.modalUsuario as ItiModalDialog;
  }

  private get modalCambiarClave(): ItiModalDialog {
    return this.$refs.modalCambiarClave as ItiModalDialog;
  }

  private get usuarioFormulario(): UsuariosFormulario {
    return this.$refs.usuarioFormulario as UsuariosFormulario;
  }

  private get cambiarClaveFormulario(): CambiarClaveFormulario {
    return this.$refs.cambiarClaveFormulario as CambiarClaveFormulario;
  }

  public mounted() {
    // En 0,5 segundos mostramos el botón de añadir para que haga una animáción visible
    setTimeout(() => {
      this.addHidden = false;
    }, 500);
  }

  public newItem() {
    this.openUsuarioFormulario(new Usuario());
  }

  public editItem(item: Usuario) {
    this.openUsuarioFormulario(item);
  }

  public deleteItem(item: Usuario) {
    itiMessageService.confirm(
      this.$tc('mensajes.pregunta-borrar') + item.UserName + '" ?', this.$tc('mensajes.confirmar'),
      (res) => {
        if (res) {
          usuariosModule.eliminarUsuario(item);
        }
      },
    );
  }

  public cambiarClave(usuario: Usuario) {
    // Reseteamos las validaciones del formulario
    this.cambiarClaveFormulario.reset();

    // Le pasamos los datos a mostrar
    this.usuarioSeleccionado = usuario;

    // Abrimos el modal
    this.modalCambiarClave.show();
  }

  public closeUsuarioFormulario(item: Usuario) {
    this.modalUsuario.hide();
    usuariosModule.modificarUsuario(item);
  }

  public closeCambiarClaveFormulario(item: Usuario) {
    this.modalCambiarClave.hide();
  }

  private openUsuarioFormulario(usuario: Usuario) {
    // Reseteamos las validaciones del formulario
    this.usuarioFormulario.reset();

    // Le pasamos los datos a mostrar
    this.usuarioSeleccionado = usuario;

    // Abrimos el modal
    this.modalUsuario.show();
  }
}
