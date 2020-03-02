import { authorizationService } from '@/shared/services/authorization-service';
import { ItiLogin, itiMessageService } from '@iti/vue-core';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
    $_veeValidate: { validator: 'new' },
})
export default class LoginFormulario extends Vue {

    public appTitle = process.env.VUE_APP_TITLE;

    public login!: ItiLogin;
    public hide: boolean = true;

    public get styleBackground() {
        return `background: url('${process.env.VUE_APP_PUBLIC_PATH}assets/login.jpg')`;
    }

    public mounted() {
        this.login = new ItiLogin();
        setTimeout(() => this.hide = false, 1);
    }

    public async submit() {
        const allOk = await this.$validator.validateAll();
        if (allOk) {
            this.tryLogin();
        }
    }

    public async tryLogin() {
        const loginOk = await authorizationService.login(this.login);
        this.loginResult(loginOk);
    }

    private loginResult(loginOk: boolean) {
        if (loginOk) {
            this.hide = true;
            setTimeout(() => this.routeToMain(), 250);
        } else {
            itiMessageService.toast('Usuario o Clave incorrectos', itiMessageService.TypeError);
        }
    }

    private routeToMain() {
        this.$router.push('/');
    }

}
