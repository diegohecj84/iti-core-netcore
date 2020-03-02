import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import TheFooter from './components/the-footer/the-footer.vue';

@Component({
    components: {
        TheFooter,
    },
})
export default class App extends Vue {

    @Prop() public screen: any = undefined;

    public handlers: any[] = [];

    public Breakpoints = {
        XSmall: '(max-width: 599.99px)',
        Small: '(min-width: 600px) and (max-width: 959.99px)',
        Medium: '(min-width: 960px) and (max-width: 1279.99px)',
        Large: '(min-width: 1280px)',
    };

    public xSmallMedia = window.matchMedia(this.Breakpoints.XSmall);
    public smallMedia = window.matchMedia(this.Breakpoints.Small);
    public mediumMedia = window.matchMedia(this.Breakpoints.Medium);
    public largeMedia = window.matchMedia(this.Breakpoints.Large);

    public sizes: any = () => {
        return {
            'screen-x-small': this.xSmallMedia.matches,
            'screen-small': this.smallMedia.matches,
            'screen-medium': this.mediumMedia.matches,
            'screen-large': this.largeMedia.matches,
        };
    }

    public subscribe = (handler: any) => this.handlers.push(handler);

    public unsubscribe = (handler: any) => {
        this.handlers = this.handlers.filter((item) => item !== handler);
    }

    public get title() {
        return process.env.VUE_APP_TITLE;
    }

    public getScreenSizeInfo() {
        const screenSizes = this.sizes();

        return {
            isXSmall: screenSizes['screen-x-small'],
            isLarge: screenSizes['screen-large'],
            cssClasses: Object.keys(screenSizes).filter((cl) => screenSizes[cl]),
        };
    }

    public get cssClasses() {
        return ['app'].concat(this.screen.cssClasses);
    }

    public screenSizeChanged() {
        this.screen = this.getScreenSizeInfo();
        this.$emit('input', this.screen);
    }

    public created() {
        this.screen = this.getScreenSizeInfo();
    }

    public mounted() {
        window.addEventListener('resize', this.screenSizeChanged);
    }

    public beforeDestroy() {
        window.removeEventListener('resize', this.screenSizeChanged);
    }
}
