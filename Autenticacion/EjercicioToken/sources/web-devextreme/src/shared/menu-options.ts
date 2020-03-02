import { ItiMenuItem } from './components/menu/iti-menu-item';
import { ItiString } from './utils/iti-string';

import { Permission } from '@/shared/permissions';

// Cada opción tendrá indicado:
// - el "i18n" con la key para obtener el texto traducido a mostrar
// - ó el "text" con el texto a mostrar (si no se quiere usar multiidioma)
export const MenuOptions: ItiMenuItem[] = [
    {
        icon: 'home',
        text: 'Home',
        i18n: '',
        path: '/home',
        permission: ItiString.Empty,
        items: [],
    },
    {
        icon: 'folder',
        text: 'Examples',
        i18n: '',
        path: '',
        permission: ItiString.Empty,
        items: [
            {
                icon: '',
                text: 'Display Data',
                i18n: '',
                path: '/display-data',
                permission: ItiString.Empty,
                items: [],
            },
        ],
    },

    //         {
    //             icon: 'fas fa-plus-square',
    //             text: ItiString.Empty,
    //             i18n: 'menu.crearPedido',
    //             link: '/main/gestionPedidos/crearPedido',
    //             permission: ItiString.Empty,
    //             children: [],
    //         },
    //         {
    //             icon: 'fas fa-calculator',
    //             text: ItiString.Empty,
    //             i18n: 'menu.crearPedidoPred',
    //             link: '/main/gestionPedidos/crearPedidoPred',
    //             permission: ItiString.Empty,
    //             children: [],
    //         },

    //     ],
    // },
    // {
    //     icon: 'fas fa-expand-arrows-alt',
    //     text: ItiString.Empty,
    //     i18n: 'menu.gestionExpediciones',
    //     link: '',
    //     permission: ItiString.Empty,
    //     children: [
    //         {
    //             icon: 'fas fa-list-alt',
    //             text: ItiString.Empty,
    //             i18n: 'menu.listado',
    //             link: '/main/gestionExpediciones/listadoExpedicion',
    //             permission: ItiString.Empty,
    //             children: [],
    //         },
    //         {
    //             icon: 'fas fa-truck',
    //             text: ItiString.Empty,
    //             i18n: 'menu.recogidaExpedicion',
    //             link: '/main/gestionExpediciones/recogidaExpedicion',
    //             permission: ItiString.Empty,
    //             children: [],
    //         },

    //     ],
    // },
    // {
    //     icon: 'build',
    //     text: ItiString.Empty,
    //     i18n: 'menu.administracion',
    //     link: '',
    //     permission: ItiString.Empty,
    //     children: [
    //         {
    //             icon: 'person',
    //             text: ItiString.Empty,
    //             i18n: 'menu.usuarios',
    //             link: '/main/usuarios/lista',
    //             permission: Permission.readUsuarios,
    //             children: [],
    //         },
    //     ],
    // },

];
