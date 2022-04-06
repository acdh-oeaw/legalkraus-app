<template>
  <div>
    <div
      :class="{
        pointer: true,
        menuEntry: true,
        'mb-3':  isOpen,
        'font-weight-bold':isOpen
      }"
    >
    
      <!--<b-link
        class="entryLink"
        :to="{
          name: 'Werkübersicht',
          //params: { category: currentCategory, label: item.label, id: item.id, item: item },
        }"
      >-->
        <span   @click="toggle">
         {{item.prefLabel || item.label || item.title}} 
        </span> <span v-if="item.cases">({{item.cases.length}})</span>
        <!--</b-link
      >-->
    </div>
    <div  v-show="isOpen"> 
      <tree-item
        class="item pl-5 pb-1"
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
      ></tree-item>
    </div>
  </div>
</template>

<script>


/* import Icon from "./Icon.vue"; */
export default {
  name: "TreeItem",
  props: {
    item: Object,
  },
  /*  components: {
    Icon,
  }, */
  data() {
    
    return {
      isOpen: this.item.topConceptOf || this.item.isTopElement || false,
      treeData: [],
    };
  },

  computed: {
    isFolder() {
      return this.item.children && this.item.children.length || this.item.cases && this.item.cases.length;
    },
    /*isActive() {
      return (
        this.currentChapter.id == this.item.id || this.checkIdInChildren(this.item.children, this.currentChapter.id)
      );
    },*/
  },
  methods: {
    checkIdInChildren(children, id) {
      return children.find((c) => c.id == id || this.checkIdInChildren(c.children, id));
    },
    toggle() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    makeFolder() {
      if (!this.isFolder) {
        this.$emit("make-folder", this.item);
        this.isOpen = true;
      }
    },
  },
};
</script>
<style scoped>
.pointer {
  cursor: pointer;
}

.root {
  font-weight:bold;
}
</style>
