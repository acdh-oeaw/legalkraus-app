<template>

  <div class="text-left">

    <!-- <b-select
      v-model="selectedCategory"
      :options="selectOptions"
      class="mb-3 categorySelect"
      style="color: var(--primary); font-size: 1.15rem; font-weight: 600"
    >
    </b-select> -->
    
    <div v-if="treeData && treeData.children">
      <tree-item
        v-for="(child, idx) in treeData.children"
        :key="`c${idx}`"
        class="item mb-3"
        :item="child"
        @make-folder="makeFolder"
      ></tree-item>
    </div>
  </div>
</template>

<script>
import TreeItem from "./TreeItem.vue";
export default {
  name: "Tree",
  props: ["treeData"],
  components: {
    TreeItem,
  },
  data() {
    return {
    };
  },
  methods: {
    makeFolder(item) {
      this.$set(item, "children", []);
      this.addItem(item);
    },
    addItem(item) {
      item.children.push({
        name: "new stuff",
      });
    },
  },
  mounted() {
    console.log(this.treeData)
  }
};
</script>
<style>

</style>
