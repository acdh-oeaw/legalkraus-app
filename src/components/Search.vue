<template>
  <b-container>

    <b-row>
      <b-col>
        <div class="metainfo">
          <b-form @submit="performFullTextSearch('',true)" @submit.prevent >
            <b-form-input size="sm" placeholder="Volltextsuche" :type="'search'" v-model="searchTerm"></b-form-input>
          </b-form>
        </div>
      </b-col>
    </b-row>
    <div v-if="loading && showMainLoader===true" class="loader"></div>
    <!--    <b-row>
          <b-col>
            <b-spinner v-if="this.loading === true" type="grow" label="Spinning"></b-spinner>
            <b-row>
              <b-col>
                <div v-if="searchResultsCount === 0">Keine Ergebnisse</div>
                <div v-else-if="searchResultsCount === 1">{{ searchResults.length }} Ergebnis</div>
                <div v-else-if="searchResultsCount >= 1">{{ searchResultsCount }} Ergebnisse</div>
              </b-col>
            </b-row>
            <b-row v-for="(searchResult, idx) in searchResults" :key="`sr${idx}`">
              <b-col>
                <b-row>
                  <router-link :to="{ name: 'lesefassung', params: { id: searchResult.id }}">{{ searchResult.title }}
                  </router-link>
                </b-row>
                <b-row v-for="(kwic, i) in searchResult.kwic" :key="`kw${i}`">
                  <b-col>
                    <div v-html="kwic" class="text-left"/>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </b-row>-->
  </b-container>
</template>
<script>
import {performFullTextSearch} from "@/services/ARCHEService";
//import {getCollectionOfObject} from "../services/ARCHEService";

export default {
  name: "Header",
  data() {
    return {
      searchTerm: '',
      searchResults: [],
      searchResultsCount: null,
      loading: false,
      offset: 0,
      totalResultsCount:0,
      showMainLoader:false
    }
  },
  props: ['colId', 'rsId'],
  methods: {
    async processSearchResults(data) {
      this.totalResultCount = data.count

      //keine Unterschiedliche Darstellung von Suche in allen collections bzw nur in einer
      //search in all collections
      //const promises = [];
      this.searchResults = data.results.map(r => {
        const id = r.id.replace("https://arche.acdh.oeaw.ac.at/api/", "");
        let parentid = null;
        if (r.parent) {
        parentid = r.parent.replace("https://arche.acdh.oeaw.ac.at/api/", "");
        }
          if (id && id !== "" && (/[0-9]+/).test(id)) { 
            return  {
              "type": 'searchInAllCol',
              "id": id,
              "xmlid":r.parentXMLId,
              "url": r.id,
              "collection": r.parentTitle,
              "collectionId": parentid,
              "title": r.title,
              "kwic": [r.kwic.replace('\n', '')],
              "searchTerm":this.searchTerm
              }
          }
      }
      )
        this.searchResultsCount = this.searchResults.length;
      /*  this.searchResults.sort((a,b) => {
          parseInt(a.xmlid.replace("C_",'').substring(0, a.xmlid.length-4)) < parseInt(b.xmlid.replace("C_",'').substring(0, b.xmlid.length-4))
        } )*/
        this.$emit('searchPerformed', {searchResults: this.searchResults, keyword: this.searchTerm, totalResultCount: this.totalResultCount});
        this.loading = false;
    },
    performFullTextSearch(page='',showMainLoader=true) {

      this.showMainLoader = showMainLoader;
      this.loading = true;
      if (page==='nextPage') {
        this.offset += 25;
      } else
      if (page==='prevPage') {
        this.offset -= 25;
      }
      else {
        this.offset = 0;
      }
      performFullTextSearch(this.searchTerm, this.colId, this.rsId, this.offset, data => {
        this.processSearchResults(data)
      });
    },
  },
}
</script>

<style scoped>

.metainfo {
  background: white;
  margin-top: 0;
  display: grid;
  justify-content: space-between;
  grid-template-columns: auto auto auto auto auto;
}

.loader {
  border: 16px solid #f3f3f3;
  border-top: 16px solid var(--primary-red);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 2s linear infinite;
  margin-left: 2rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
