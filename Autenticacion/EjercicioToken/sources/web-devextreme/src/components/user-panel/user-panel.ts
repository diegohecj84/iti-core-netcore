import DxContextMenu from 'devextreme-vue/context-menu';
import DxList from 'devextreme-vue/list';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
    components: {
        DxContextMenu,
        DxList,
    },
})

export default class UserPanel extends Vue {
    @Prop() public menuMode!: string;
    @Prop() public menuItems!: any[];

    public get menuPositionConfig() {
        return {
            menuPositionConfig: {
                my: 'top center',
                at: 'bottom center',
            },
        };
    }
}
