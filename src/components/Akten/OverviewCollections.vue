<template>
  <main>
    <div :class="{'filter-nav': this.category !== 'Kultur' && this.category !== 'Politik'}">
      <p class="navigation">Akten-Edition
        <b-icon class="mx-1 breadcrumbarrow" icon="chevron-right" shift-v="-10" font-scale="0.7"></b-icon>
        <router-link router-link class="nav-link" :to="'/akten-edition/' + catLower">
          {{ this.category }}
        </router-link>
        <b-icon class="mx-1 breadcrumbarrow" icon="chevron-right" shift-v="-10" font-scale="0.7"></b-icon>
        <span class="semibold">{{ this.showSubCat }}</span>
      </p>
      <div class="filters" v-if="this.category !== 'Kultur' && this.category !== 'Politik'">
        <div class="searchPers">
          <input class="vt vtp" placeholder="Person:" list="persons" v-model="kwP" @keyup.enter="setCurrPers(kwP)"/>
          <datalist id="persons">
            <option v-for="pers in this.allPersons" :key="pers.key" :value="pers.value">{{ pers.value }}</option>
          </datalist>
        </div>
        <div class="searchOrgs">
          <input class="vt vto" placeholder="Institution:" list="orgs" v-model="kwO" @keyup.enter="setCurrOrgs(kwO)"/>
          <datalist id="orgs">
            <option v-for="org in this.allOrgs" :key="org.key" :value="org.value">{{ org.value }}</option>
          </datalist>
        </div>
        <Search class="py-2 vt" v-on:searchPerformed="searchPerformed($event)"></Search>
        <input class="vt vty" type="number" placeholder="Bis Jahr:" v-model="kwY"
               @keyup="filterAll()"/>
        <span class="lbls">
        <div class="lbl" v-for="pers in currPersons" :key="pers.key">{{ pers.value }}
          <svg v-on:click="removePers(pers.key)" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
               fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path
      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg></div>
          <div class="lbl" v-for="org in currOrgs" :key="org.key">{{ org.value }}
          <svg v-on:click="removeOrg(org.key)" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
               fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path
      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg></div>
      </span>

        <div class="reset-filter">
          <button type="button" class="btn btn-secondary btn-sm reset-button" v-on:click="resetFilter">Filter
            zurücksetzen
          </button>
        </div>

        <input class="vt vtt" type="text" placeholder="Fall-Titel:" v-model="kwT"
               @keyup="filterAll()"/>
      </div>
    </div>
     <Introtext class="my-5 text-justify w-75 mx-auto"/>
    <div v-if="!searchView" class="card">
      <b-row>
      <b-pagination
          page-class="custompaging"
          prev-class="custompagingarrows"
          next-class="custompagingarrows"
          first-class="custompagingarrows"
          last-class="custompagingarrows"
          class="custom-pagination"
          :no-provider-sorting="true"
          :no-provider-paging="true"
          v-model="currentPage"
          :total-rows="this.$store.getters.noOfCollections"
          :per-page="perPage"
          aria-controls="col-table"
      ></b-pagination>
      <div class="sammlungen ml-3">{{ this.$store.getters.noOfCollections }} Akten</div>
      </b-row>
      <b-table :tbody-tr-class="'cursor-pointer'" :thead-class="'semi-bold'" id="col-table" :small="'small'" :no-border-collapse="true" :borderless="'borderless'"
               :current-page="currentPage" :per-page="perPage" :sort-by="'id'"
               :busy.sync="isBusy"
                :sort-compare="tableSortCompare" :fields="[
            {
              key: 'id',
              label: 'Aktennummer',
              sortable: true
            },
           {
              key: 'title',
              label: 'Titel',
              sortable: true
            },
            {
              key: 'size',
              label: 'Anzahl Dokumente',
              sortable: true
            },
          ]" :items="currCases" @row-clicked="navToObjects">
        <template #table-busy>
          <div class="text-center my-2">
            <b-spinner type="grow" class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template #cell(id)="data">
          {{ parseInt(data.item.id.substring(3, data.item.id.length - 4)) }}
        </template>
      </b-table>
    </div>
    <div v-if="searchView">
      <p>{{ searchResultsCount }} Ergebnisse für "{{ keyword }}"</p>
      <button type="button" class="btn btn-secondary btn-sm" v-on:click="toggleView">Zurück zur Übersicht</button>
      <div v-for="item in searchResults" v-bind:key="item.key">
        <SearchResultItem v-bind:item="item" v-on:nav-to-objects="navToObjects($event)"></SearchResultItem>
      </div>

    </div>
  </main>
</template>

<script>

import {getCollections} from "@/services/ARCHEService";
import Search from "../Search";
import SearchResultItem from "./SearchResultItem";
import Introtext from "./Introtext.vue";
import {getArcheIdFromXmlId} from "../../services/ARCHEService";

export default {
  name: "OverviewCollections",
  components: {
    Search: Search,
    SearchResultItem: SearchResultItem,
    Introtext: Introtext,
  },
  data: function () {
    return {
      collections: [],
      isBusy: false,
      perPage: 10,
      currentPage: 1,
      searchView: false,
      searchResults: [],
      searchResultsCount: Number,
      keyword: String,
      kwT: null,
      kwP: [],
      kwO: [],
      kwY: null,
      path: String,
      currSubCat: String,
      showSubCat: null,
      category: String,
      catLower: String,
      cases: [],
      currCases: [],
      caseInfo: [],
      allPersons: [],
      allOrgs: [],
      currPersons: [],
      currOrgs: [],
      r: 'Recht',
      k: 'Kultur',
      p: 'Politik',
      pR: 'Privatrecht',
      sR: 'Strafrecht',
      vR: 'Verwaltungsrecht',
      zR: 'Zivilrecht',
      fK: 'Die Fackel',
      tK: 'Theater',
      vK: 'Verlagswesen',
      mK: 'Medienhistorisches',
      bK: 'Berichtigung (Ausgang)',
      bbK: 'Berliner Tageblatt, Kerr, Wolff',
      sK: 'Die Stunde, Békessy',
      schK: 'Schober, 15. Juli 1927',
      sP: 'Sozialdemokratie',
      cP: 'Christlich-sozial',
      nP: 'Nationalsozialismus'

    }
  },
  methods: {
    getArcheCollections(ctx, callback) {
      const offset = ctx.currentPage === 1 ? 0 : (ctx.currentPage - 1) * ctx.perPage;
      callback(this.cases.slice(offset, offset + ctx.perPage))
    },
    navToObjects: async function (event) {
      let id = event.id;
      if(!id.includes('_')){
        if (this.currSubCat === this.pR) {
          this.$router.push({name: "privatrecht-objects", params: {id: id}});
        } else if (this.currSubCat === this.sR) {
          this.$router.push({name: "strafrecht-objects", params: {id: id}});
        } else if (this.currSubCat === this.vR) {
          this.$router.push({name: "verwaltungsrecht-objects", params: {id: id}});
        } else if (this.currSubCat === this.zR) {
          this.$router.push({name: "zivilrecht-objects", params: {id: id}});
        } else if (this.currSubCat === this.fK) {
          this.$router.push({name: "fackel-objects", params: {id: id}});
        } else if (this.currSubCat === this.tK) {
          this.$router.push({name: "theater-objects", params: {id: id}});
        } else if (this.currSubCat === this.vK) {
          this.$router.push({name: "verlage-objects", params: {id: id}});
        } else if (this.currSubCat === this.sK) {
          this.$router.push({name: "stunde-objects", params: {id: id}});
        } else if (this.currSubCat === this.mK) {
          this.$router.push({name: "medienhistorisches-objects", params: {id: id}});
        } else if (this.currSubCat === this.bK) {
          this.$router.push({name: "berichtigung-objects", params: {id: id}});
        } else if (this.currSubCat === this.schK) {
          this.$router.push({name: "schober-objects", params: {id: id}});
        } else if (this.currSubCat === this.bbK) {
          this.$router.push({name: "tageblatt-objects", params: {id: id}});
        } else if (this.currSubCat === this.sP) {
          this.$router.push({name: "sozialdemokratie-objects", params: {id: id}});
        } else if (this.currSubCat === this.cP) {
          this.$router.push({name: "christlich-sozial-objects", params: {id: id}});
        } else if (this.currSubCat === this.nP) {
          this.$router.push({name: "nationalsozialismus-objects", params: {id: id}});
        }
      }
      else{
        getArcheIdFromXmlId(event.id, rs =>{
          id = rs;
          if (this.currSubCat === this.pR) {
            this.$router.push({name: "privatrecht-objects", params: {id: id}});
          } else if (this.currSubCat === this.sR) {
            this.$router.push({name: "strafrecht-objects", params: {id: id}});
          } else if (this.currSubCat === this.vR) {
            this.$router.push({name: "verwaltungsrecht-objects", params: {id: id}});
          } else if (this.currSubCat === this.zR) {
            this.$router.push({name: "zivilrecht-objects", params: {id: id}});
          } else if (this.currSubCat === this.fK) {
            this.$router.push({name: "fackel-objects", params: {id: id}});
          } else if (this.currSubCat === this.tK) {
            this.$router.push({name: "theater-objects", params: {id: id}});
          } else if (this.currSubCat === this.vK) {
            this.$router.push({name: "verlage-objects", params: {id: id}});
          } else if (this.currSubCat === this.sK) {
            this.$router.push({name: "stunde-objects", params: {id: id}});
          } else if (this.currSubCat === this.mK) {
            this.$router.push({name: "medienhistorisches-objects", params: {id: id}});
          } else if (this.currSubCat === this.bK) {
            this.$router.push({name: "berichtigung-objects", params: {id: id}});
          } else if (this.currSubCat === this.schK) {
            this.$router.push({name: "schober-objects", params: {id: id}});
          } else if (this.currSubCat === this.bbK) {
            this.$router.push({name: "tageblatt-objects", params: {id: id}});
          } else if (this.currSubCat === this.sP) {
            this.$router.push({name: "sozialdemokratie-objects", params: {id: id}});
          } else if (this.currSubCat === this.cP) {
            this.$router.push({name: "christlich-sozial-objects", params: {id: id}});
          } else if (this.currSubCat === this.nP) {
            this.$router.push({name: "nationalsozialismus-objects", params: {id: id}});
          }
        })
      }


    },
    tableSortCompare(a, b, key) {
     
      if (key === 'size') {
        let aInt = a.docs.length;
        let bInt = b.docs.length;
        return aInt - bInt;
      }

    },
    setCurrPageAndCategory() {
      //category
      if (this.path.toString().includes('recht')) {
        this.category = this.r;
      } else if (this.path.toString().includes('kultur')) {
        this.category = this.k;
      } else if (this.path.toString().includes('politik')) {
        this.category = this.p;
      }

      this.catLower = this.category.toString().toLowerCase();
      //currPage
      if (this.path.toString().includes('privatrecht')) {
        this.currSubCat = this.pR;
      } else if (this.path.toString().includes('strafrecht')) {
        this.currSubCat = this.sR;
      } else if (this.path.toString().includes('verwaltungsrecht')) {
        this.currSubCat = this.vR;
      } else if (this.path.toString().includes('zivilrecht')) {
        this.currSubCat = this.zR;
      } else if (this.path.toString().includes('fackel')) {
        this.currSubCat = this.fK;
      } else if (this.path.toString().includes('theater')) {
        this.currSubCat = this.tK;
      } else if (this.path.toString().includes('verlage')) {
        this.currSubCat = this.vK;
        this.showSubCat = 'Verlage';
      } else if (this.path.toString().includes('stunde')) {
        this.currSubCat = this.sK;
      } else if (this.path.toString().includes('schober')) {
        this.currSubCat = this.schK;
      } else if (this.path.toString().includes('tageblatt')) {
        this.currSubCat = this.bbK;
        this.showSubCat = 'Berliner Tageblatt';
      } else if (this.path.toString().includes('medienhistorisches')) {
        this.currSubCat = this.mK;
      } else if (this.path.toString().includes('berichtigung')) {
        this.currSubCat = this.bK;
      } else if (this.path.toString().includes('sozialdemokratie')) {
        this.currSubCat = this.sP;
      } else if (this.path.toString().includes('christlich-sozial')) {
        this.currSubCat = this.cP;
        this.showSubCat = 'Christlichsozial'
      } else if (this.path.toString().includes('nationalsozialismus')) {
        this.currSubCat = this.nP;
      }

      if(this.showSubCat === null){
        this.showSubCat = this.currSubCat;
      }
    },
    async searchPerformed(event) {
      if (event.keyword === "") {
        this.searchView = false;
        return;
      }
      this.searchView = true;
      this.searchResults = event.searchResults;
      this.searchResultsCount = event.searchResults.length;
      this.keyword = event.keyword;
    },
    setCurrPers(kwP) {
      //get key of person and add person to this.currPersons
      for (var key in this.allPersons) {
        if (this.allPersons[key].value === kwP) {
          //check if person is already in this.currPersons
          if (!this.currPersons.filter(p => p.key === this.allPersons[key].key).length > 0) {
            //remove leading '#' from key
            this.currPersons.push({'key': this.allPersons[key].key.substring(1), 'value': this.allPersons[key].value});
          }
        }
      }

      this.filterAll();

    },
    setCurrOrgs(kwO) {
      //get key of person and add person to this.currPersons
      for (var key in this.allOrgs) {
        if (this.allOrgs[key].value === kwO) {
          //check if person is already in this.currPersons
          if (!this.currOrgs.filter(o => o.key === this.allOrgs[key].key).length > 0) {
            //remove leading '#' from key
            this.currOrgs.push({'key': this.allOrgs[key].key.substring(1), 'value': this.allOrgs[key].value});
          }
        }
      }
      this.filterAll();
    },
    filterAll() {
      //extract cases that contain all persons in this.currPerson and all orgs in this.currOrgs and match title and year
      let temp = [];
      this.cases.forEach(c => {
        let containsAll = true;
        this.currPersons.forEach(p => {
          if (!c.men_pers[p.key]) {
            containsAll = false;
          }
        });
        this.currOrgs.forEach(o => {
          if (!c.men_orgs[o.key]) {
            containsAll = false;
          }
        });
        if (this.kwT) {
          if (!(c.title.toUpperCase().includes(this.kwT.toUpperCase()))) {
            containsAll = false;
          }
        }
        if (this.kwY) {
          if (!(parseInt(c.start_date.substring(0, 4)) < this.kwY)) {
            containsAll = false;
          }
        }
        if (containsAll === true) {
          temp.push(c)
        }
      });
      this.currCases = temp;
      this.kwP = null;
      this.kwO = null
    },
    toggleView() {
      this.searchView = !this.searchView;
    },
    resetFilter() {
      this.currOrgs = [];
      this.currPersons = [];
      this.kwP = null;
      this.kwO = null;
      this.kwY = null;
      this.kwT = null;
      this.currCases = this.cases;
    },
    removePers(key) {
      for (let i = 0; i < this.currPersons.length; i++) {
        if (this.currPersons[i].key === key) {
          this.currPersons = this.currPersons.filter(p => p.key !== key);
        }
      }
      this.filterAll();

    },
    removeOrg(key) {
      for (let i = 0; i < this.currOrgs.length; i++) {
        if (this.currOrgs[i].key === key) {
          this.currOrgs = this.currOrgs.filter(o => o.key !== key);
        }
      }
      this.filterAll();
    }
  },
  created() {
    this.path = this.$route.path;
    this.setCurrPageAndCategory();

  },
  mounted() {
    this.caseInfo = this.$store.getters.caseInfo;
    if (this.category) {
      this.caseInfo.then(data => {
        for (var name in data.persons) {
          let p = {};
          p.key = name;
          p.value = data.persons[name];
          this.allPersons.push(p);
        }

        for (var orgKey in data.orgs) {
          let o = {};
          o.key = orgKey;
          o.value = data.orgs[orgKey];
          this.allOrgs.push(o);
        }

        //set cases
        const cases = data.cases;
        cases.forEach(c => {
          if (c.keywords.includes(this.currSubCat)) {
            c.size = c.docs.length;
            this.cases.push(c);
            this.currCases.push(c)
          }
        });
        this.$store.dispatch("setNoOfCollections", this.cases.length)

      });
    } else {
      getCollections(0, (result) => {
        this.collections = result;
      });
    }

  }
}

</script>

<style scoped>
main {
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 2rem;
}

.navigation {
  text-align: left;
}

.arrow {
  color: var(--primary-red);
}

.nav-link {
  display: inline;
  color: black;
  padding: 0;
  margin: 0;
}

.nav-link:hover {
  color: #C85545;
}

.filter-nav {
  background-color: var(--secondary-gray-meta);
  border-bottom: solid var(--primary-red) 0.3rem;
}

.vt {
  display: flex;
  margin: 2rem;
  font-size: inherit;
  height: fit-content;
}

.vtt {
  display: flex;
  grid-column: 2/3;
  grid-row: 2/3;
  width: fit-content;
}

.vty {
  display: flex;
  grid-column: 1/2;
  grid-row: 2/3;
  width: fit-content;
  margin-left: 2rem !important;
}

.lbl {
  background-color: var(--primary-red);
  color: var(--text-white);
  border-radius: 1.25rem;
  width: fit-content;
  padding: 0.1rem 0.3rem;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;

}

.lbls {
  grid-row: 3/4;
  display: inline-flex;
  grid-column: 1/4;
}

.filters {
  display: grid;
  grid-template-columns: repeat(3, minmax(5rem, auto));
  grid-template-rows: auto auto auto;
}

.reset-filter {
  display: flex;
  grid-row: 2/3;
  grid-column: 3/4;
}

.py-2 {
  display: flex;
  grid-row: 1/2;
  grid-column: 3/4;
  padding: 0;
  margin-left: 0;
}

.reset-button {
  display: flex;
  padding: 0.375rem 0.375rem;
  margin-bottom: 2rem;
  margin-top: 0;
}

.sammlungen {
  padding: 0.35rem 0.75rem;
}

.searchPers{
  margin-left: 2rem;
}
</style>
