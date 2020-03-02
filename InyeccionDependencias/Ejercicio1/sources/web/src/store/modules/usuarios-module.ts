import { getModule, Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { store } from '@iti/vue-core';
import { Usuario } from '@/shared/dtos/usuario';


@Module({
    namespaced: true,
    name: 'UsuariosModule',
    store,
    dynamic: true,
})
class UsuariosModule extends VuexModule {
    public usuarios: Usuario[] = [
        new Usuario({
            Id: 1,
            UserName: 'pepe',
            Name: 'Pepe Garcia Gonzalez',
            Email: 'pegargon@mail.es',
            IsActive: true,
            IsAdmin: true,
        }),
        new Usuario({
            Id: 2,
            UserName: 'jose',
            Name: 'Jose Sanchez Rodriguez',
            Email: 'josanro@mail.es',
            IsActive: true,
            IsAdmin: false,
        }),
        new Usuario({
            Id: 3,
            UserName: 'juan',
            Name: 'Juan Hernandez Heredia',
            Email: 'juhehe@mail.es',
            IsActive: true,
            IsAdmin: false,
        }),
    ];

    @Mutation
    public modificarUsuario(item: Usuario) {
        if (item == null) { return; }
        const index = this.usuarios.findIndex((x) => x.Id === item.Id);
        if (index === -1) {
          if (item.Id == null) {
            // En las altas de nuevos items, simulamos un valor de Id. En entorno real el Id lo devuelve el API.
            if (this.usuarios.length === 0) {
                item.Id = 1;
            } else {
                const maxRol = this.usuarios.reduce((prev, current) => {
                    return prev.Id > current.Id ? prev : current;
                });
                item.Id = maxRol.Id;
            }
          }
          this.usuarios.push(item);
        } else {
          this.usuarios[index] = item;
        }
    }

    @Mutation
    public eliminarUsuario(item: Usuario) {
        if (item == null) { return; }
        const index = this.usuarios.findIndex((x) => x.Id === item.Id);
        if (index !== -1) {
          this.usuarios.splice(index, 1);
        }
    }

    private nextId() {
        if (this.usuarios.length === 0) {
            return 1;
        } else {
            const maxRol = this.usuarios.reduce((prev, current) => {
                return prev.Id > current.Id ? prev : current;
            });
            return maxRol.Id;
        }
    }

}
export default getModule(UsuariosModule);
