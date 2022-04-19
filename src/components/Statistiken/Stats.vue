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
          :tree-data="{ children: [this.$store.getters.getConceptWithCases('Ausgehend von')] }"
        />
       <Tree
        class="tree"
          :tree-data="{
            children: [this.$store.getters.getGroupedCases('Gerichtliche Institution')]}"
        />

        </div>
        
       
        
        <Tree
        class="tree"
          v-if="this.dataLoaded"
          :tree-data="{
            children: [
              this.additionalTreeData[
                'Vertreter (Ankläger / Anklägerin) / Vertreter (Angeklagter / Angeklagte)'
              ],
            ],
          }"
        />
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
    /*this.$store.getters.caseInfo.then((data) => {

      data.cases.map((cs) => {
        cs.org_actor.map((oa) => {
          if (!this.additionalTreeData[oa.role_label]) {
            this.additionalTreeData[oa.role_label] = {
              isTopElement: true,
              label: oa.role_label,
              children: [],
            };
          }
          if (
            this.additionalTreeData[oa.role_label].children.filter(
              (ch) => ch.title === oa.title
            ).length === 0
          ) {
            this.additionalTreeData[oa.role_label].children.push({
              ...oa,
              cases: [],
            });
          }
          this.additionalTreeData[oa.role_label].children
            .filter((ch) => ch.title === oa.title)[0]
            .cases.push(cs);
        });

        cs.actors.map((oa) => {
          if (!this.additionalTreeData[oa.role_label]) {
            this.additionalTreeData[oa.role_label] = {
              isTopElement: true,
              label: oa.role_label,
              children: [],
            };
          }
          if (
            this.additionalTreeData[oa.role_label].children.filter(
              (ch) => ch.title === oa.title
            ).length === 0
          ) {
            this.additionalTreeData[oa.role_label].children.push({
              ...oa,
              cases: [],
            });
          }
          this.additionalTreeData[oa.role_label].children
            .filter((ch) => ch.title === oa.title)[0]
            .cases.push(cs);
        });

        cs.keywords.map((kw) => {
          if (!this.casesForKeyword[kw]) {
            this.casesForKeyword[kw] = { cases: [] };
          }
          this.casesForKeyword[kw]["cases"].push(cs);
        });
      });
      /*getVocab().then((data) => {
        data.topconcepts.map(async (tc) => {
          this.getChildren(tc).then(() => {
            for (const [uri, concept] of Object.entries(
              this.$store.getters.vocabs
            )) {
              if (this.casesForKeyword[concept.prefLabel]) {
                
                this.$store.dispatch("updateConcept", {
                  uri: uri,
                  propname: "cases",
                  propval: this.casesForKeyword[concept.prefLabel].cases,
                });
              }
            }
          });
        });
        this.groupCasesByTopConcepts();
        this.dataLoaded = true;
        this.additionalTreeData[
          "Vertreter (Ankläger / Anklägerin) / Vertreter (Angeklagter / Angeklagte)"
        ] = {
          isTopElement: true,
          label:
            "Vertreter (Ankläger / Anklägerin) / Vertreter (Angeklagter / Angeklagte)",
          children: [
            ...this.additionalTreeData["Vertreter (Ankläger / Anklägerin)"]
              .children,
            ...this.additionalTreeData["Vertreter (Angeklagter / Angeklagte)"]
              .children,
          ],
        };
      });
    });*/
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