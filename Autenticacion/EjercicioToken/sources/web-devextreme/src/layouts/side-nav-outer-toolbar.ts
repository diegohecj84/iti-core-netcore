import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import DxDrawer from 'devextreme-vue/drawer';
import DxScrollView from 'devextreme-vue/scroll-view';
import { MenuOptions } from '../shared/menu-options';
import HeaderToolbar from '../components/header-toolbar/header-toolbar.vue';
import SideNavMenu from '../components/side-nav-menu/side-nav-menu.vue';

@Component({
    components: {
        DxDrawer,
        DxScrollView,
        HeaderToolbar,
        SideNavMenu,
    },
})
export default class SideNavToolbar extends Vue {
    @Prop() public title!: string;
    @Prop() public isXSmall!: boolean;
    @Prop() public isLarge!: boolean;

    public menuOpened: boolean = this.isLarge;
    public menuTemporaryOpened: boolean = false;
    public menuItems = MenuOptions;

    public toggleMenu(e: any) {
        const pointerEvent = e.event;
        pointerEvent.stopPropagation();
        if (this.menuOpened) {
            this.menuTemporaryOpened = false;
        }
        this.menuOpened = !this.menuOpened;
    }

    public handleSideBarClick() {
        if (this.menuOpened === false) {
            this.menuTemporaryOpened = true;
        }
        this.menuOpened = true;
    }

    public get drawerOptions() {
        const shaderEnabled = !this.isLarge;
        return {
            menuMode: this.isLarge ? 'shrink' : 'overlap',
            menuRevealMode: this.isXSmall ? 'slide' : 'expand',
            minMenuSize: this.isXSmall ? 0 : 60,
            menuOpened: this.isLarge,
            closeOnOutsideClick: shaderEnabled,
            shaderEnabled,
        };
    }

    public get headerMenuTogglerEnabled() {
        return this.isXSmall;
    }

    @Watch('isLarge')
    public onIsLargeChanged(val: boolean, oldVal: boolean) {
        if (!this.menuTemporaryOpened) {
            this.menuOpened = this.isLarge;
        }
    }

    @Watch('$route')
    public onRouteChanged() {
        if (this.menuTemporaryOpened || !this.isLarge) {
            this.menuOpened = false;
            this.menuTemporaryOpened = false;
        }
    }
}
