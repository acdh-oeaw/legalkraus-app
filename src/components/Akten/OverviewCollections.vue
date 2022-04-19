<template>
  <main>
    <Search class="py-2" v-on:searchPerformed="searchPerformed($event)"></Search>
    <div class="filter-nav">
      <p class="navigation">Akten-Edition
        <span class="arrow">></span>
        <router-link router-link class="nav-link" :to="'/' + catLower">
          {{ this.category }}
        </router-link>
        <span class="arrow">></span>
        <span style="font-weight: bold">{{ this.currSubCat }}</span>
      </p>
      <div class="filters">
        <div class="searchPers">
        <input class="vt-titel" placeholder="Person:" list="persons" v-model="kwP" @keyup.enter="setCurrPers(kwP)"/>
        <datalist id="persons">
          <option v-for="pers in this.allPersons" :key="pers.key" :value="pers.value">{{ pers.value }}</option>
        </datalist>
        </div>
        <span class="lbls">
        <div class="lbl" v-for="pers in currPersons" :key="pers.key">{{ pers.value }}
          <svg v-on:click="removePers(pers.key)" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
               fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path
      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg></div>
      </span>

        <div class="reset-filter">
        <button type="button" class="btn btn-secondary btn-sm" v-on:click="resetFilter">Filter zurücksetzen</button>
        </div>

        <input class="vt-titel" type="text" placeholder="Fall-Titel:" v-model="kw"
               @keyup="filterTitleByKeyword(kw)"/>
      </div>
    </div>
    <div>{{ this.$store.getters.noOfCollections }} Sammlungen</div>
    <div v-if="!searchView" class="card">
      <b-pagination
          page-class="custompaging"
          prev-class="custompagingarrows"
          next-class="custompagingarrows"
          first-class="custompagingarrows"
          last-class="custompagingarrows"
          class="custom-pagination"
          v-model="currentPage"
          :total-rows="this.$store.getters.noOfCollections"
          :per-page="perPage"
          aria-controls="col-table"
      ></b-pagination>
      <b-table id="col-table" :small="'small'" :no-border-collapse="true" :borderless="'borderless'"
               :current-page="currentPage" :per-page="perPage"
               :busy.sync="isBusy" :fields="[
            {
              key: 'title',
              label: 'Titel'
            },
            {
              key: 'size',
              label: 'Anzahl Dokumente'
            },
            {
              key: 'url',
              label: ''
            },
          ]" :items="currCases" @row-clicked="navToObjects">
        <template #table-busy>
          <div class="text-center my-2">
            <b-spinner type="grow" class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template #cell(url)="data">
          <a target="_blank" rel="noopener noreferrer" :href="`${data.value}`">Daten in Arche</a>
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
import {getColArcheIdFromColXmlId} from "../../services/ARCHEService";

export default {
  name: "OverviewCollections",
  components: {
    Search: Search,
    SearchResultItem: SearchResultItem
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
      kw: null,
      kwP: [],
      path: String,
      currSubCat: String,
      category: String,
      catLower: String,
      cases: [],
      currCases: [],
      caseInfo: [],
      allPersons: [],
      currPersons: [],
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
      pK: 'Die großen Polemiken',
      sP: 'Sozialdemokratie',
      cP: 'Christlich-National',
      nP: 'Nationalsozialismus'

    }
  },
  methods: {
    getArcheCollections(ctx, callback) {
      const offset = ctx.currentPage === 1 ? 0 : (ctx.currentPage - 1) * ctx.perPage;
      callback(this.cases.slice(offset, offset + ctx.perPage))
    },
    navToObjects: async function (record) {
      getColArcheIdFromColXmlId(record.id, async id => {
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
          this.$router.push({name: "verlagswesen-objects", params: {id: id}});
        } else if (this.currSubCat === this.pK) {
          this.$router.push({name: "polemiken-objects", params: {id: id}});
        } else if (this.currSubCat === this.sP) {
          this.$router.push({name: "sozialdemokratie-objects", params: {id: id}});
        } else if (this.currSubCat === this.cP) {
          this.$router.push({name: "christlich-national-objects", params: {id: id}});
        } else if (this.currSubCat === this.nP) {
          this.$router.push({name: "nationalsozialismus-objects", params: {id: id}});
        }
      });
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
      } else if (this.path.toString().includes('verlagswesen')) {
        this.currSubCat = this.vK;
      } else if (this.path.toString().includes('polemiken')) {
        this.currSubCat = this.pK;
      } else if (this.path.toString().includes('sozialdemokratie')) {
        this.currSubCat = this.sP;
      } else if (this.path.toString().includes('christlich-national')) {
        this.currSubCat = this.cP;
      } else if (this.path.toString().includes('nationalsozialismus')) {
        this.currSubCat = this.nP;
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
    filterTitleByKeyword(keyword) {
      this.currCases = this.cases.filter(c => c.title.toUpperCase().includes(keyword.toUpperCase()));
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
      console.log(this.currPersons)

      this.filterPers();

    },
    filterPers() {
      //extract cases that contain all persons in this.currPerson
      let temp = [];
      this.cases.forEach(c => {
        let containsAll = true;
        this.currPersons.forEach(p => {
          if (!c.men_pers[p.key]) {
            containsAll = false;
          }
        });
        if (containsAll === true) {
          temp.push(c)
        }
      });
      this.currCases = temp;
      this.kwP = null;
    },
    toggleView() {
      this.searchView = !this.searchView;
    },
    resetFilter() {
      this.currCases = this.cases;
    },
    removePers(key) {
      for (let i = 0; i < this.currPersons.length; i++) {
        if (this.currPersons[i].key === key) {
          this.currPersons = this.currPersons.filter(p => p.key !== key);
        }
      }
      console.log(this.currPersons)
      this.filterPers();

    },
  },
  created() {
    this.path = this.$route.path;
    this.setCurrPageAndCategory();

  },
  mounted() {
    this.caseInfo = this.$store.getters.caseInfo;
    if (this.category && this.currSubCat === "Die großen Polemiken") {
      this.caseInfo.then(data => {
        for (var name in data.persons) {
          let p = {};
          p.key = name;
          p.value = data.persons[name];
          this.allPersons.push(p);
        }
        const cases = data.cases;
        cases.forEach(c => {
          if (c.keywords.includes("Schober, 15. Juli 1927" || "Die Stunde, Békessy" || "Berliner Tageblatt, Kerr, Wolff")) {
            c.size = c.docs.length;
            this.cases.push(c);
            this.currCases.push(c)
          }
        });
        this.$store.dispatch("setNoOfCollections", this.cases.length)
      });
    } else if (this.category) {
      this.caseInfo.then(data => {
        for (var name in data.persons) {
          let p = {};
          p.key = name;
          p.value = data.persons[name];
          this.allPersons.push(p);
        }
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
    console.log(this.cases)

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

.vt-titel {
  margin: 2rem;
  grid-column: 2/3;
  grid-row: 2/3;
}

.lbl {
  background-color: var(--primary-red);
  color: var(--text-white);
  border-radius: 1.25rem;
  width: fit-content;
  padding: 0.1rem 0.3rem;
  margin-left: 0.5rem;

}
.lbls{
  grid-row: 3/4;
  display: inline-flex;
  grid-column: 1/4;
}
.filters {
  display: grid;
  grid-template-columns: repeat(3, minmax(5rem, auto)) ;
  grid-template-rows: auto auto auto;
}
.reset-filter{
  grid-row: 2/3;
  grid-column: 3/4;
}
</style>
