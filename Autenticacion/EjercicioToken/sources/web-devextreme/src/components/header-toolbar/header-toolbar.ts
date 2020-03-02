import DxButton from 'devextreme-vue/button';
import DxToolbar, { DxItem } from 'devextreme-vue/toolbar';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import UserPanel from '../user-panel/user-panel.vue';
import auth from '../../shared/services/authorization-service';

@Component({
  components: {
    DxButton,
    DxToolbar,
    DxItem,
    UserPanel,
  },
})
export default class Header extends Vue {
  @Prop() public menuToggleEnabled!: boolean;
  @Prop() public title!: string;
  @Prop() public toggleMenuFunc!: () => void;
  // @Prop() public logOutFunc!: Function;

  public get userMenuItems() {
    return [
      {
        text: 'Profile',
        icon: 'user',
      },
      {
        text: 'Logout',
        icon: 'runner',
        onClick: this.onLogoutClick,
      },
    ];
  }

  public get imgSrcLogo() {
    return process.env.VUE_APP_PUBLIC_PATH + 'assets/ITI-logo-white.svg';
  }

  public onLogoutClick() {
    // auth.logout();
    this.$router.push({
      path: '/login-form',
      query: { redirect: this.$route.path },
    });
  }
}
