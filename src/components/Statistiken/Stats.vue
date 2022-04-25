<template>
  <div class="container">
   
    <div class="row">
      <div class="col-md-12">
        <div v-if="this.$store.getters.vocabReady">
        <AreaChart
          :title="'Rechtsbereich'"
          :yAxisLabel="'Fälle'"
          :chart-data="this.$store.getters.getConceptWithCases('Rechtsbereich')"
        />
        <AreaChart
          :title="'Art der Akte / des Deliktes'"
          :yAxisLabel="'Fälle'"
          :chart-data="this.$store.getters.getConceptWithCases('Art der Akte / des Deliktes')"
        />
        <AreaChart
          :title="'Delikttyp'"
          :yAxisLabel="'Fälle'"
          :chart-data="this.$store.getters.getConceptWithCases('Delikttyp')"
        />
        <AreaChart
          :title="'Ausgang / Ende des Verfahrens'"
          :yAxisLabel="'Fälle'"
          :chart-data="this.$store.getters.getConceptWithCases('Ausgang / Ende des Verfahrens')"
        />
         <Tree
        class="tree"
        :title="'Ausgehend von'"
          :filterprop ="'keyword'"
          :tree-data="{ children: [this.$store.getters.getConceptWithCases('Ausgehend von')] }"
        />
       <Tree
        class="tree"
        :title="''"
        :filterprop ="'org_actor-role_label:Gerichtliche Institution'"
          :tree-data="{
            children: [this.$store.getters.getGroupedCases('Gerichtliche Institution')]}"
        />
        <Tree
        class="tree"
          :title="''"
          :filterprop = "'actors-role_label:Vertreter (Ankläger / Anklägerin)'"
          :tree-data="{
            children: [this.$store.getters.getGroupedCases('Vertreter (Ankläger / Anklägerin)')]}"
        />
        <Tree
        class="tree"
        :title="'Vertreter (Angeklagter / Angeklagte)'"
        :filterprop = "'actors-role_label:Vertreter (Angeklagter / Angeklagte)'"
          :tree-data="{
            children: [this.$store.getters.getGroupedCases('Vertreter (Angeklagter / Angeklagte)')]}"
        />
        </div>
        
       
        
       
      </div>
    </div>
  </div>
</template>

<script>
import Tree from "./Tree";
import AreaChart from "./Chart";

export default {
  data() {
    return {
      concepts: {},
      topConceptsCases: {},
      casesForKeyword: {},
      dataLoaded: false,
      additionalTreeData: {},
    };
  },
  components: {
    AreaChart,
    Tree,
  },
  mounted() {
  },
  methods: {
  
    
  },
};
</script>
<style scoped>
.container {
  grid-template-columns: unset;
}



</style>