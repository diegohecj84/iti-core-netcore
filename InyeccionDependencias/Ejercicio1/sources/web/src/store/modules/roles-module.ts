import { getModule, Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { store } from '@iti/vue-core';
import { Rol } from '@/shared/dtos/rol';


@Module({
    namespaced: true,
    name: 'RolesModule',
    store,
    dynamic: true,
})
class RolesModule extends VuexModule {
    public roles: Rol[] = [
        new Rol({ Id: 1, Name: 'Administrador', Description: 'Administrador del sistema' }),
        new Rol({ Id: 2, Name: 'Coordinador', Description: 'Coordinador de miembros' }),
        new Rol({ Id: 3, Name: 'Usuario', Description: 'Usuario miembro' }),
    ];

    @Mutation
    public modificarRol(item: Rol) {
        if (item == null) { return; }
        const index = this.roles.findIndex((x) => x.Id === item.Id);
        if (index === -1) {
          if (item.Id == null) {
            // En las altas de nuevos roles, simulamos un valor de Id. En entorno real el Id lo devuelve el API.
            if (this.roles.length === 0) {
                item.Id =  1;
            } else {
                const maxRol = this.roles.reduce((prev, current) => {
                    return prev.Id > current.Id ? prev : current;
                });
                item.Id = maxRol.Id;
            }
          }
          this.roles.push(item);
        } else {
          this.roles[index] = item;
        }
    }

    @Mutation
    public eliminarRol(item: Rol) {
        if (item == null) { return; }
        const index = this.roles.findIndex((x) => x.Id === item.Id);
        if (index !== -1) {
          this.roles.splice(index, 1);
        }
    }

}
export default getModule(RolesModule);
