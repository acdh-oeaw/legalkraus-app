<template>
  <b-container>
    <b-row>
      <b-col>
        <div class="metainfo">
          <b-form @submit="performFullTextSearch()">
            <b-form-input size="sm" placeholder="Volltextsuche" :type="'search'" v-model="searchTerm"></b-form-input>
          </b-form>
        </div>
      </b-col>
    </b-row>
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

export default {
  name: "Header",
  data() {
    return {
      searchTerm: '',
      searchResults: [],
      searchResultsCount: null,
      loading: false,
    }
  },
  props: ['colId', 'rsId'],
  methods:
      {
        processSearchResults(data) {
          this.searchResults = [];
          for (const [key, value] of Object.entries(data)) {
            if (Object.prototype.hasOwnProperty.call(value, "https://vocabs.acdh.oeaw.ac.at/schema#hasTitle")) {
              const id = key.replace("https://arche-dev.acdh-dev.oeaw.ac.at/api/", "");
              this.searchResults.push({
                "id": id,
                "url": key,
                "title": value["https://vocabs.acdh.oeaw.ac.at/schema#hasTitle"][0].value,
                "collection": value["https://vocabs.acdh.oeaw.ac.at/schema#isPartOf"][0].value,
                "kwic": value["search://fts"].map(kwic => kwic.value.replace('\n', '')),
              })
            }
          }
          this.searchResultsCount = this.searchResults.length;
          this.$emit('searchPerformed', {searchResults: this.searchResults, keyword: this.searchTerm});
        },
        performFullTextSearch() {
          this.loading = true;
          performFullTextSearch(this.searchTerm, this.colId, this.rsId, data => {
            this.processSearchResults(data)
          });
          this.loading = false;
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
  margin-left: 2rem;
}

</style>
