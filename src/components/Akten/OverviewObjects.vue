<template>
  <main>

    <p class="navigation">Akten-Edition
      <span class="arrow">></span>
      <router-link router-link class="nav-link" :to="'/' + catLower">
        {{ this.category }}
      </router-link>
      <span class="arrow">></span>
      <router-link router-link class="nav-link" :to="'/' + catLower + '/'+ subCatLower +'/collections'">
        {{ this.subCategory }}
      </router-link>
      <span class="arrow">></span>
      {{ this.caseTitle }}
    </p>
    <div class="search-wrapper">
      <Search class="py-2" v-bind:col-id="colId" v-on:searchPerformed="searchPerformed($event)"></Search>
    </div>
    <div class="case-info">
      <h3> Dokumente des Falles "{{ this.caseTitle }}"</h3>
      <p v-if="isEmpty"> Dieser Fall hat keine Dokumente. </p>
      <p v-else> Dieser Fall hat {{ this.numberDocuments }} Dokumente. </p>

    <div v-if="searchView">
      <b-col>
        <h5> Suchergebnisse zu "{{this.keyword}}":</h5>
        <div v-if="searchResultsCount === 0">Keine Ergebnisse</div>
        <div v-else-if="searchResultsCount === 1">{{ searchResults.length }} Ergebnis</div>
        <div v-else-if="searchResultsCount >= 1">{{ searchResultsCount }} Ergebnisse</div>
        <button type="button" class="btn btn-secondary btn-sm" v-on:click="toggleView">Zurück zur Fallansicht</button>
      </b-col>
    </div>
    </div>
    <div class="cards-wrapper">
      <div v-if="!searchView" class="card-deck">
        <div class="card" v-for="val in objects" v-bind:key="val.title" v-on:click="navToLesefassung(val.url)">
          <h4 class="card-title"> {{ val.title }}</h4>
          <p> {{ val.identifier }}</p>
          <p> {{ val.url }}</p>
        </div>
      </div>
      <div v-if="searchView" class="card-deck">
        <div class="card" v-for="val in searchResults" v-bind:key="val.title" v-on:click="navToLesefassung(val.url)">
          <h4 class="card-title"> {{ val.title }}</h4>
          <p> {{ val.id }}</p>

          <h5>Treffer Volltextsuche:</h5>
          <b-row v-for="(kwic, i) in val.kwic" :key="`kw${i}`">
            <p v-html="kwic" class="text-left"></p>
          </b-row>
        </div>
      </div>
    </div>
  </main>
</template>

<script>


import {getObjectsOfCollection, getObjectWithId} from "@/services/ARCHEService";
import {ARCHErdfQuery} from "arche-api/src";
import Search from "../Search";

export default {
  name: "OverviewObjects",
  components: {
    Search: Search
  },
  data: function () {
    return {
      colId: -1,
      objects: [],
      searchResults: [],
      searchResultsCount: 0,
      keyword: String,
      caseTitle: String,
      numberDocuments: Number,
      isEmpty: Boolean,
      path: String,
      searchView: false,
      subCategory: String,
      category: String,
      catLower: String,
      subCatLower: String,

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
    navToLesefassung: function (url) {
      let id = this.getIdFromUrl(url)
      this.$router.push({
        name: "lesefassung",
        params: {id: id, cat: this.category, subcat: this.subCategory, case: this.caseTitle, searchTerm: this.keyword}
      });
    },
    getIdFromUrl(url) {
      let idx = url.lastIndexOf('/');
      return url.substring(idx + 1);
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
        this.subCategory = this.pR;
      } else if (this.path.toString().includes('strafrecht')) {
        this.subCategory = this.sR;
      } else if (this.path.toString().includes('verwaltungsrecht')) {
        this.subCategory = this.vR;
      } else if (this.path.toString().includes('zivilrecht')) {
        this.subCategory = this.zR;
      } else if (this.path.toString().includes('fackel')) {
        this.subCategory = this.fK;
      } else if (this.path.toString().includes('theater')) {
        this.subCategory = this.tK;
      } else if (this.path.toString().includes('verlagswesen')) {
        this.subCategory = this.vK;
      } else if (this.path.toString().includes('polemiken')) {
        this.subCategory = this.pK;
      } else if (this.path.toString().includes('sozialdemokratie')) {
        this.subCategory = this.sP;
      } else if (this.path.toString().includes('christlich-national')) {
        this.subCategory = this.cP;
      } else if (this.path.toString().includes('nationalsozialismus')) {
        this.subCategory = this.nP;
      }

      if (this.subCategory === this.fK) {
        this.subCatLower = 'fackel';
      } else if (this.subCategory === this.pK) {
        this.subCatLower = 'polemiken';
      } else {
        this.subCatLower = this.subCategory.toString().toLowerCase();
      }

    },
    async searchPerformed(event) {
      if(event.keyword === ""){
        this.searchView = false;
        return;
      }
      this.searchView = true;
      this.searchResults = event.searchResults;
      this.searchResultsCount = event.searchResults.length;
      this.keyword = event.keyword;
    },
    toggleView(){
      this.searchView = false;
    }
  },
  created() {
    this.colId = this.$route.params.id;
    this.path = this.$route.path;
    this.setCurrPageAndCategory();

  },
  mounted() {
    if (isNaN(parseInt(this.colId)) || this.colId === -1) {
      this.$router.push({name: "home"});
      //todo: go to "home" when id-parameter is empty
    }
    getObjectWithId(this.colId, (result) => {
      // query:
      const optionsTitle = {
        "subject": null,
        "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#hasTitle",
        "object": null,
        "expiry": 14
      };

      const optionsSize = {
        "subject": null,
        "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#hasNumberOfItems",
        "object": null,
        "expiry": 14
      };

      this.caseTitle = ARCHErdfQuery(optionsTitle, result).value[0].hasTitle.object;
      let documents = ARCHErdfQuery(optionsSize, result).value[0].hasNumberOfItems.object;
      let idx = documents.lastIndexOf('^');
      this.numberDocuments = documents.substring(0, idx - 1);
    });

    getObjectsOfCollection(this.colId, (result) => {
      this.objects = result;
      this.isEmpty = (this.objects.length === 0);
    });
  }

}
</script>

<style scoped>
.card {
  width: 25rem;
  height: 25rem;
  padding: 2rem;
  margin: auto;
  grid-column: auto;
  cursor: pointer;
}

.card-deck {
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, max-content);
  grid-row-gap: 2rem;
  grid-column-gap: 6rem;
}

.case-info{
  margin: 2rem;
}

.cards-wrapper {
  display: flex;
  align-content: center;
}

.search-wrapper{
  display: flex;
}
.navigation {
  margin-left: 1rem;
  text-align: left;
  padding-left: 2rem;
}

.arrow {
  color: #C85545;
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

</style>