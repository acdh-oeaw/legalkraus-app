<template>
  <main v-if="this.$store.getters.vocabReady">
    
    <div class="filter-nav">
      <p class="navigation">
        Akten-Edition <b-icon class="mx-1 breadcrumbarrow" icon="chevron-right" shift-v="-10" font-scale="0.7"></b-icon> <span class="semibold">Alle Akten</span>
      </p>
      <div class="filters">
       <!-- <div class="searchPers">
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
        -->
        <Search class="py-2 vt" ref="search"  v-on:searchPerformed="searchPerformed($event)"></Search>
        <div class="mleft">
        <input class="vt vty" type="number" placeholder="Bis Jahr:" v-model="kwY"/>
        </div>
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
        <div>
          <input class="vt vto" type="text" placeholder="Fall-Titel:" v-model="kwT"/>
        </div>
      </div>
    </div>
    <div v-if="!searchView">
    <b-container class="mt-5 no-grid-col-container">
      <b-row>
        <b-col md="3">
          <b-form-select
              size="sm"
              v-model="selected"
              :options="selectOptions"
          ></b-form-select>

          <div v-if="this.selected && this.selected.toString()">
            <Tree :key="`tr${item.title}${_self.selected.toString()}`"
                  v-for="item in this.selectOptions.slice(1,6).filter(option=>option.text === _self.selected.toString())"
                  :title="item.text"
                  class="tree filter"
                  :isFilter="true"
                  :filterprop="'keyword'"
                  :tree-data="{
              children: [_self.$store.getters.getConceptWithCases(item.text)],
            }"
            />
            <Tree :key="`tr${item.title}${_self.selected.toString()}`"
                  v-for="item in this.selectOptions.slice(6,9).filter(option=>option.text === _self.selected)"
                  :title="''"
                  class="tree filter"
                  :isFilter="true"
                  :filterprop="item.filterprop"
                  :tree-data="{
              children: [_self.$store.getters.getGroupedCases(item.text)]
            }"
            />
          </div>
        </b-col>
        <b-col md="9">
        
            <div class="row align-items-center">
              <b-pagination
                  page-class="custompaging"
                  prev-class="custompagingarrows"
                  next-class="custompagingarrows"
                  first-class="custompagingarrows"
                  last-class="custompagingarrows"
                  class="custom-pagination col-md-4 mb-0"
                  v-model="currentPage"
                  :total-rows="this.$store.getters.noOfCollections"
                  :per-page="perPage"
                  aria-controls="col-table"
              ></b-pagination>
              <div class="col-md-4">{{ this.$store.getters.noOfCollections }} Akten</div>
            </div>
            <b-table
                :tbody-tr-class="'cursor-pointer'"
                ref="coltable"
                id="col-table"
                :small="'small'"
                :thead-class="'semi-bold'"
                :no-border-collapse="true"
                :borderless="'borderless'"
                :current-page="currentPage"
                :per-page="perPage"
                :busy.sync="isBusy"
                :no-provider-sorting="true"
                :no-provider-paging="true"
                :sort-by="'id'"
                :sort-compare="tableSortCompare"
                :fields="[
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
              ]"
                :items="getArcheCollections" @row-clicked="navToObjects"
            >
              <template #table-busy>
                <div class="text-center my-2">
                  <b-spinner type="grow" class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template #cell(size)="data">
                {{ data.item.docs.length }}
              </template>
              <template #cell(id)="data">
                {{ parseInt(data.item.id.substring(3, data.item.id.length - 4)) }}
              </template>
            </b-table>
        </b-col>
      </b-row>
    </b-container>
    </div>
    <div v-if="searchView">
      <div>
         <svg :class="{'disabled':this.$refs.search.offset === 0}" v-on:click="prev()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
           class="bi bi-arrow-left text-bottom" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
      </svg>
      <span>{{ totalResultCount }}  Ergebnisse für "{{ keyword }}"</span><span>
    </span>
       <svg :class="{'disabled':this.$refs.search.offset + searchResultsCount >= totalResultCount}" v-on:click="next()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
           class="bi bi-arrow-right text-bottom" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
      </svg>
      <div v-if="this.$refs.search.loading && this.$refs.search.showMainLoader===false" class="loader"></div>
      </div>
      <button type="button" class="btn btn-secondary btn-sm" v-on:click="toggleView">Zurück zur Übersicht</button>
      <div v-for="item in searchResults" v-bind:key="item.key">
        <SearchResultItem v-bind:item="item" v-on:nav-to-objects="navToObjects($event)"></SearchResultItem>
      </div>

    </div>
  </main>
</template>

<script>
//import {getCollections} from "@/services/ARCHEService";
import Tree from "../Statistiken/Tree";
import {getArcheIdFromXmlId} from "../../services/ARCHEService";
import Search from "../Search";
import SearchResultItem from "./SearchResultItem";

export default {
  name: "OverviewAllCollections",
  components: {
    Search: Search,
    Tree,
    SearchResultItem: SearchResultItem
  },
  data: function () {
    return {
      collections: [],
      isBusy: false,
      perPage: 10,
      currentPage: 1,
      selected: null,
      filter: null,
      filterTitle: null,
      filterParams: null,
      selectOptions: [
        {value: null, text: "Filter auswählen"},
        {value: "Rechtsbereich", text: "Rechtsbereich"},
        {
          value: "Art der Akte / des Deliktes",
          text: "Art der Akte / des Deliktes",
        },
        {
          value: "Delikttyp",
          text: "Delikttyp",
        },
        {
          value: "Ausgang / Ende des Verfahrens",
          text: "Ausgang / Ende des Verfahrens",
        },
        {
          value: "Ausgehend von",
          text: "Ausgehend von",
        },
        {
          value: "Gerichtliche Institution",
          text: "Gerichtliche Institution",
          filterprop: "org_actor-role_label:Gerichtliche Institution"
        },
        {
          value: "Vertreter (Ankläger / Anklägerin)",
          text: "Vertreter (Ankläger / Anklägerin)",
          filterprop: "actors-role_label:Vertreter (Ankläger / Anklägerin)"
        },
        {
          value: "Vertreter (Angeklagter / Angeklagte)",
          text: "Vertreter (Angeklagter / Angeklagte)",
          filterprop: "actors-role_label:Vertreter (Angeklagter / Angeklagte)"
        },
      ],
      kwT: null,
      kwY: null,
      kwO: null,
      kwP: null,
      allPersons: [],
      allOrgs: [],
      currOrgs: [],
      currPersons: [],
      cases: [],
      searchView: false,
      searchResults: [],
      searchResultsCount: Number,
      totalResultCount: Number,
      keyword: String,
    };
  },
  methods: {
    getArcheCollections() {
      /*const offset =
          ctx.currentPage === 1 ? 0 : (ctx.currentPage - 1) * ctx.perPage;*/
      let items = this.$store.getters.cases;
      if (this.filterParams) {
        const filterprop = this.filterParams[0];

        let filterval = this.filter[1];
        if (filterprop === "keyword") {
          items = items.filter(
              (item) => item.keywords.indexOf(this.filter[1]) > -1
          );
        } else {
          const filternestedprop = this.filterParams[1].split(":")[0];
          const filternestedpropval = this.filterParams[1].split(":")[1];

          items = items.filter(
              (item) =>
                  item[filterprop].filter(
                      (im) =>
                          im[filternestedprop] === filternestedpropval &&
                          im.title === filterval
                  ).length > 0
          );
        }
      }
      let temp = [];
      items.forEach(c => {
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
      items = temp;
      this.kwP = null;
      this.kwO = null
      this.$store.dispatch("setNoOfCollections", items.length);
      return items;
      //callback(items.slice(offset, offset + ctx.perPage));
    },
    navToObjects(item) {
      if(item.id.includes('_')){
        getArcheIdFromXmlId(item.id, rs => {
          //this.$router.push({name: "overview-objects", params: {id: rs}});
          let routeData = this.$router.resolve({name: 'overview-objects', params: {id: rs}});
          window.open(routeData.href, '_blank');
        })
      }else{
        //this.$router.push({name: "overview-objects", params: {id: item.id}});
        let routeData = this.$router.resolve({name: 'overview-objects', params: {id: item.id}});
        window.open(routeData.href, '_blank');
      }

    },
    prev() {
      this.$refs.search.performFullTextSearch('prevPage',false)
    },
    next() {
      if (this.$refs.search.offset + this.searchResultsCount < this.totalResultCount) {
        this.$refs.search.performFullTextSearch('nextPage',false)
      }
    },
    getIdFromUrl(url) {
      let idx = url.lastIndexOf("/");
      return url.substring(idx + 1);
    },
    tableSortCompare(a, b, key) {
     
      if (key === 'size') {
        let aInt = a.docs.length;
        let bInt = b.docs.length;
        return aInt - bInt;
      }

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
    },
    resetFilter() {
      this.currOrgs = [];
      this.currPersons = [];
      this.kwP = null;
      this.kwO = null;
      this.kwY = null;
      this.kwT = null;
      this.filterParams = false;
      this.selected = null;
      this.filter = null;
      this.filterTitle = null;
      this.filterParams = null;
      this.$router.replace({'query': null});
    },
    removePers(key) {
      for (let i = 0; i < this.currPersons.length; i++) {
        if (this.currPersons[i].key === key) {
          this.currPersons = this.currPersons.filter(p => p.key !== key);
        }
      }
    },
    removeOrg(key) {
      for (let i = 0; i < this.currOrgs.length; i++) {
        if (this.currOrgs[i].key === key) {
          this.currOrgs = this.currOrgs.filter(o => o.key !== key);
        }
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
      this.totalResultCount = event.totalResultCount;
      this.keyword = event.keyword;
    },
  toggleView() {
    this.searchView = !this.searchView;
  }
  },
  mounted() {
    if (this.$route.query.filter) {
      this.filter = this.$route.query.filter.split(".");
      let filterkey = this.filter[0];
      this.filterParams = filterkey.split("-");
      this.filterTitle = this.filterParams[1].includes(":") ? this.filterParams[1].split(":")[1] : this.filterParams[1];
      this.selected = this.filterTitle;
    }
  },
  watch: {
    kwT() {
      this.$refs.coltable.refresh();
    },
    currPersons() {
      this.$refs.coltable.refresh();
    },
    currOrgs() {
      this.$refs.coltable.refresh();
    },
    kwY() {
      this.$refs.coltable.refresh();
    }
  },
  created() {
    this.$watch(
        () => this.$route.params,
        () => {
          if (this.$route.query.filter) {
            this.filter = this.$route.query.filter.split(".");
            let filterkey = this.filter[0];
            this.filterParams = filterkey.split("-");
            this.filterTitle = this.filterParams[1].includes(":") ? this.filterParams[1].split(":")[1] : this.filterParams[1];
            this.selected = this.filterTitle;
            this.$refs.coltable.refresh();
            this.selected = this.filterTitle;
          }
        }
    );
    this.$store.getters.caseInfo.then(cD => {
      this.cases = cD.cases;
      for (var name in cD.persons) {
        let p = {};
        p.key = name;
        p.value = cD.persons[name];
        this.allPersons.push(p);
      }

      for (var orgKey in cD.orgs) {
        let o = {};
        o.key = orgKey;
        o.value = cD.orgs[orgKey];
        this.allOrgs.push(o);
      }
    });
  },
};
</script>

<style>
.card {
  width: auto;
  padding: 2rem;
  margin: auto;
  margin-left: 5rem;
  margin-right: 5rem;
}

.navigation {
  margin-left: 1rem;
  text-align: left;
  padding-left: 2rem;
}

.arrow {
  color: #c85545;
}

#col-table thead {
  background: var(--secondary-gray-meta);
}

#col-table {
  border-spacing: 3px;
  font-size: 0.9rem;
}

#col-table thead {
  text-transform: uppercase;
}

#col-table td {
  background: var(--secondary-gray-light);
}

.custom-pagination .page-link {
  border: none;
}

.custompaging.page-item .page-link {
  color: var(--text-black);
}

.custompaging.page-item.active .page-link {
  background-color: var(--secondary-gray-meta);
  border-color: var(--secondary-gray-meta);
  color: var(--text-black);
}

.custompagingarrows .page-link {
  color: var(--primary-red-dark);
}

.custompaging .page-link:focus {
  box-shadow: none;
}

.tree {
  font-size: 0.9rem;
}

.filter .root > div > span {
  display: none;
}

.filter .pl-5 {
  padding-left: 1rem !important;
}

.filter .mb-3 {
  margin-bottom: 0.5rem !important;
}

.custom-select:focus {
  border-color: var(--secondary-gray-dark);
  box-shadow: 0 0 0 0.1rem var(--secondary-gray-dark);
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
  margin-left: 2rem;

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
  grid-row-gap: 2rem;
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
  padding: 0 !important;
  margin-left: 0;
}

.reset-button {
  display: flex;
  padding: 0.375rem 0.375rem;
  margin-top: 0;
  margin-bottom: 2rem;
}
.searchPers{
  margin-left: 2rem;
}

.mleft{
  margin-left: 2rem;
}
</style>

<style scoped>
svg.disabled {
  fill:#CCC;
}
</style>