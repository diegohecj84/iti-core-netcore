import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ItiLanguageSelector, itiLayoutMenuModule } from '@iti/vue-core';
import { authorizationService } from '@/shared/services/authorization-service';

@Component({
    components: {
        ItiLanguageSelector,
    },
})
export default class Header extends Vue {
    @Prop() public title!: string;

    public get userName() {
        return authorizationService.userName;
    }

    public get imgSrcLogo() {
        return process.env.VUE_APP_PUBLIC_PATH + 'assets/logo.png';
    }

    public get imgSrcPerson() {
        return process.env.VUE_APP_PUBLIC_PATH + 'assets/person_32x32.png';
    }

    public get items(): string[] {
        return [
            this.$tc('menuavatar.salir'),
        ];
    }

    public logout() {
        authorizationService.logout();
        this.$router.push('/login');
    }

    public opcion(item: string) {
        if (item === this.$tc('menuavatar.salir')) {
            this.logout();
        }
    }

    public toggleMenu() {
        itiLayoutMenuModule.toggleVisible();
    }
}
