<template>
  <div>
    <div
      :class="{
        pointer: true,
        menuEntry: true
      }"
    >
    
      <!--<b-link
        class="entryLink"
        :to="{
          name: 'Werkübersicht',
          //params: { category: currentCategory, label: item.label, id: item.id, item: item },
        }"
      >-->
        
        <span v-if="!isFolder || isFilter">
        <router-link class="dd-item" :to="{ path: '/akten-edition/alle-akten', query: {filter:filterprop + '-' + this.category +  '.' + (item.prefLabel || item.label || item.title)} }">
        <span @click="toggle">
         {{item.prefLabel || item.label || item.title}} 
        </span>
<!--          <span v-if="item.cases">({{item.cases.length}}) </span>-->
        </router-link>
        </span>
         <span v-else>
          <span @click="toggle">
         {{item.prefLabel || item.label || item.title}} 
        </span>
<!--           <span v-if="item.cases">({{item.cases.length}})</span>-->
         </span>
        <!--</b-link
      >-->
    </div>
    <div  v-show="isOpen"> 
      <tree-item
        class="item pl-5 pb-1"
        :class="{'active': isActive}"
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
        :isFilter="isFilter"
        :filterprop="filterprop"
        :category ="category"
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
    filterprop: String,
    isFilter: Boolean,
    category:String
  },
  /*  components: {
    Icon,
  }, */
  data() {
    
    return {
      treeData: [],
      isOpen: true
    };
  },

  computed: {
    isFolder() {
      return this.item.children && this.item.children.length;
    },
    label() {
      return this.item.label || this.item.prefLabel || this.item.title
    },
    isActive() {
      
      return this.$route.query.filter ? this.$route.query.filter.split(".").reverse()[0] === this.label : false
      
    },
    hasActiveChild() {
      console.log(this.item.children)
      return this.item.children  ?  this.item.children.map(child=>child.isActive === true).length > -1 : false 
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

.root > span > span {
  font-weight:bold;
}

a {
  color: #000;
}

a.router-link-exact-active {
  color: var(--primary-red-dark);
  font-weight:600;
}
</style>
