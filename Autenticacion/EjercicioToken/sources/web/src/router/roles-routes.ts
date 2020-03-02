import { ItiRouterView } from '@iti/vue-core';

export default {
    path: 'roles',
    component: ItiRouterView,
    children: [
        {
            path: 'lista',
            name: 'RolesLista',
            component: () => import('@/views/maestros/roles/lista/roles-lista'),
        },
    ],
};
