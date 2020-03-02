import { ItiScheduledTasksList, ItiRouterView } from '@iti/vue-core';

export default {
    path: 'tareas-programadas',
    component: ItiRouterView,
    children: [
        {
            path: 'lista',
            name: 'TareasProgramadasLista',
            component: ItiScheduledTasksList,
        },
    ],
};
