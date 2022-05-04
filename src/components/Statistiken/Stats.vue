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
        </div>
        
       
        
       
      </div>
    </div>
  </div>
</template>

<script>
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