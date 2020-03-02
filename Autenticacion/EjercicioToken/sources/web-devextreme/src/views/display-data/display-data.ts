import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import 'devextreme/data/odata/store';
import DxDataGrid, {
    DxColumn,
    DxFilterRow,
    DxLookup,
    DxPager,
    DxPaging,
} from 'devextreme-vue/data-grid';

@Component({
    components: {
        DxDataGrid,
        DxColumn,
        DxFilterRow,
        DxLookup,
        DxPager,
        DxPaging,
    },
})


export default class Displaydata extends Vue {

    public dataSourceConfig: any;

    private prioritiesConst: any = [
        { name: 'High', value: 4 },
        { name: 'Urgent', value: 3 },
        { name: 'Normal', value: 2 },
        { name: 'Low', value: 1 },
    ];


    public get priorities() {
        return this.prioritiesConst;
    }

    public created() {
        this.dataSourceConfig = {
            store: {
                type: 'odata',
                key: 'Task_ID',
                url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks',
            },
            expand: 'ResponsibleEmployee',
            select: [
                'Task_ID',
                'Task_Subject',
                'Task_Start_Date',
                'Task_Due_Date',
                'Task_Status',
                'Task_Priority',
                'Task_Completion',
                'ResponsibleEmployee/Employee_Full_Name',
            ],
        };
    }
}
