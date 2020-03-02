import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {
    },
})
export default class Home extends Vue {
    public get links() {
        return [
            {
                icon: 'fa-link',
                text: this.$tc('home.front'),
                href: 'https://gitlab.iti.upv.es/adis/iti-core/iti-core-vue/wikis/home',
            },
            {
                icon: 'fa-link',
                text: this.$tc('home.back'),
                href: 'https://gitlab.iti.upv.es/adis/iti-core/iti-core-netcore/wikis/home',
            },
        ];
    }

    public get imgSrcLogoIti2() {
        return process.env.VUE_APP_PUBLIC_PATH + 'assets/logo-iti2.png';
    }

    public get imgSrcLogoIti() {
        return process.env.VUE_APP_PUBLIC_PATH + 'assets/logo-iti.svg';
    }

    public goTo(item: any) {
        window.open(item.href, '_blank');
    }
}
