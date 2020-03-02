import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ItiMenuRoot, itiPermissionService } from '@iti/vue-core';
import { MenuOptions } from '@/shared/menu-options';
import { Permission } from '@/shared/permissions';
import Header from '@/components/header/header';

@Component({
  components: {
    ItiMenuRoot,
    Header,
  },
})
export default class MainLayout extends Vue {
  public appTitle = process.env.VUE_APP_TITLE;

  public fullMenuOptions = MenuOptions;

  public created() {
    this.fakePermisssions();
  }

  private fakePermisssions() {
    // Asignamos unos permisos iniciales para pruebas,
    // en un entorno real sería el back quien indicase los permisos del usuario
    const permissions: string[] = [
      Permission.readUsuarios,
      Permission.readRoles,
    ];
    itiPermissionService.setPermissions(permissions);
  }


}
