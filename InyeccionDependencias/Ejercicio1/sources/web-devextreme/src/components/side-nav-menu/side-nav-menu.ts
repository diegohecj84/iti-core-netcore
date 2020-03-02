import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import DxTreeView from 'devextreme-vue/tree-view';

@Component({
  components: {
    DxTreeView,
  },
})
export default class NavMenu extends Vue {
  @Prop() public items!: any[];
  @Prop() public selectedItem!: string;
  @Prop() public compactMode!: boolean;

  public treeViewRef = 'treeViewRef';
  public treeView: any = undefined;

  public forwardClick(args: any) {
    this.$emit('click', args);
  }

  public handleMenuInitialized(event: any) {
    event.component.option('deferRendering', false);
  }

  public handleItemClick(e: any) {
    if (!e.itemData.path || this.compactMode) {
      return;
    }

    this.$router.push(e.itemData.path);

    const pointerEvent = e.event;
    pointerEvent.stopPropagation();
  }

  public handleSelectionChange(e: any) {
    this.updateSelection();
    const nodeClass = 'dx-treeview-node';
    const selectedClass = 'dx-state-selected';
    const leafNodeClass = 'dx-treeview-node-is-leaf';
    const element = e.element;

    const rootNodes = element.querySelectorAll(
      `.${nodeClass}:not(.${leafNodeClass})`,
    );
    Array.from(rootNodes).forEach((node: any) => {
      node.classList.remove(selectedClass);
    });

    let selectedNode = element.querySelector(
      `.${nodeClass}.${selectedClass}`,
    );

    while (selectedNode && selectedNode.parentElement) {
      if (selectedNode.classList.contains(nodeClass)) {
        selectedNode.classList.add(selectedClass);
      }
      selectedNode = selectedNode.parentElement;
    }
  }

  public updateSelection() {
    if (!this.treeView) {
      return;
    }

    this.treeView.selectItem(this.$route.path);
  }

  public mounted() {
    this.treeView = this.$refs[this.treeViewRef] && (this.$refs[this.treeViewRef] as DxTreeView).instance;
    this.updateSelection();
    if (this.compactMode) {
      this.treeView.collapseAll();
    }
  }

  @Watch('compactMode')
  public onCompactMode(val: string, oldVal: string) {
    if (this.compactMode) {
      this.treeView.collapseAll();
    }
  }

  @Watch('$route')
  public onRouteChanged() {
    this.updateSelection();
  }
}
