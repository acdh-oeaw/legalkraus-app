<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <AreaChart
          :title="'Rechtsbereich'"
          :yAxisLabel="'Fälle'"
          v-if="this.dataLoaded"
          :chart-data="this.topConceptsCases['Rechtsbereich']"
        />
        <AreaChart
          :title="'Art der Akte / des Deliktes'"
          :yAxisLabel="'Fälle'"
          v-if="this.dataLoaded"
          :chart-data="this.topConceptsCases['Art der Akte / des Deliktes']"
        />
        <AreaChart
          :title="'Delikttyp'"
          :yAxisLabel="'Fälle'"
          v-if="this.dataLoaded"
          :chart-data="this.topConceptsCases['Delikttyp']"
        />
        <AreaChart
          :title="'Ausgang / Ende des Verfahrens'"
          :yAxisLabel="'Fälle'"
          v-if="this.dataLoaded"
          :chart-data="this.topConceptsCases['Ausgang / Ende des Verfahrens']"
        />
        <Tree
        class="tree"
          v-if="this.dataLoaded"
          :tree-data="{ children: [this.topConceptsCases['Ausgehend von']] }"
        />
        <Tree
        class="tree"
          v-if="this.dataLoaded"
          :tree-data="{
            children: [this.additionalTreeData['Gerichtliche Institution']],
          }"
        />
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
import { getVocab, getChildrenOfConcept } from "../../services/VocabsService";
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
    this.$store.getters.caseInfo.then((data) => {

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
      getVocab().then((data) => {
        /**------------------**/
        data.topconcepts.map(async (tc) => {
          this.getChildren(tc).then(() => {
            for (const [uri, concept] of Object.entries(
              this.$store.getters.vocabs
            )) {
              if (this.casesForKeyword[concept.prefLabel]) {
                //this.concepts[uri].cases = [];

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
    });
  },
  methods: {
    getChildren(concept) {
      this.$store.dispatch("addConcept", concept);

      if (concept.hasChildren === true) {
        return getChildrenOfConcept(concept.uri).then((data) => {
          this.$store.dispatch("updateConcept", {
            uri: concept.uri,
            propname: "children",
            propval: data.narrower,
          });
          data.narrower.forEach((c) => this.getChildren(c));
        });
      }
    },
    groupCasesByTopConcepts() {
      Object.values(this.$store.getters.vocabs).forEach((c) => {
        if (c.topConceptOf) {
          this.topConceptsCases[c.label] = {};
          this.getDesc(c, c.label);
        }
      });
    },
    getDesc(concept, label) {
      if (concept.children) {
        concept.children.forEach((child) => {
          this.getDesc(child, label);
        });
      } else {
        this.topConceptsCases[label] = concept;
      }
    },
  },
};
</script>
<style scoped>
.container {
  grid-template-columns: unset;
}
</style>