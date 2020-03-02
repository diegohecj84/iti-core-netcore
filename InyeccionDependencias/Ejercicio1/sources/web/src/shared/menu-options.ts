import { ItiString, ItiMenuItem } from '@iti/vue-core';
import { Permission } from '@/shared/permissions';

// Cada opción tendrá indicado:
// - el "i18n" con la key para obtener el texto traducido a mostrar
// - ó el "text" con el texto a mostrar (si no se quiere usar multiidioma)
export const MenuOptions: ItiMenuItem[] = [
    {
        icon: 'home',
        text: 'Home',
        i18n: ItiString.Empty,
        link: '/main/home',
        permission: ItiString.Empty,
        children: [],
    },
    {
        icon: 'group_work',
        text: ItiString.Empty,
        i18n: 'menu.roles',
        link: '/main/roles/lista',
        permission: Permission.readRoles,
        children: [],
    },
    {
        icon: 'build',
        text: ItiString.Empty,
        i18n: 'menu.administracion',
        link: '',
        permission: ItiString.Empty,
        children: [
            {
                icon: 'person',
                text: ItiString.Empty,
                i18n: 'menu.usuarios',
                link: '/main/usuarios/lista',
                permission: Permission.readUsuarios,
                children: [],
            },
            {
                icon: 'fa-tasks',
                text: ItiString.Empty,
                i18n: 'menu.tareas-programadas',
                link: '/main/tareas-programadas/lista',
                permission: ItiString.Empty,
                children: [],
            },
        ],
    },

];
