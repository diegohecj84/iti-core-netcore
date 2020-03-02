import { ItiRouterView } from '@iti/vue-core';

export default {
    path: 'usuarios',
    component: ItiRouterView,
    children: [
        {
            path: 'lista',
            name: 'UsuariosLista',
            component: () =>
            import('@/views/maestros/usuarios/lista/usuarios-lista'),
        },
        {
            path: 'form',
            name: 'UsuarioFormulario',
            component: () =>
            import('@/views/maestros/usuarios/formulario/usuarios-formulario'),
        },
    ],
};
