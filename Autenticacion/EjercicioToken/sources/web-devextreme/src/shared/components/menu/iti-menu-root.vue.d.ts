import Vue from 'vue';
import { ItiMenuItem } from './iti-menu-item';
export default class ItiMenuRoot extends Vue {
    fullMenuOptions: ItiMenuItem[];
    width: number | string;
    private menu;
    drawer: boolean;
    created(): void;
    private createUserMenu;
    private createUserMenuOpcion;
    private AddUserMenuOpcion;
    private hasPermiso;
    private hasSubmenuOptions;
    private newMenuItem;
}
