<template>
  <main>
    <p class="navigation">Akten-Edition
      <span class="arrow">></span>
      <router-link router-link class="nav-link" :to="'/' + catLower">
        {{ this.category }}
      </router-link>
      <span class="arrow">></span>
      {{ this.currPage }}
    </p>
    <!--    <filter-component></filter-component>-->
    <table class="table-bordered">
      <tr>
        <th>Title</th>
        <th>Number of Documents</th>
      </tr>

      <tr v-for="collection in collections" v-bind:key="collection.val1"
          v-on:click="navToObjects(collection.url.subject)">

        <td>{{ collection.title }}</td>
        <td>{{ collection.size }}</td>

      </tr>


    </table>
  </main>
</template>

<script>

import FilterComponent from "./FilterComponent";
import {getCollections} from "@/services/ARCHEService";

export default {
  name: "OverviewCollections",
  comments: {
    'filter-component': FilterComponent
  },

  data: function () {
    return {
      collections: [],
      path: String,
      currPage: String,
      category: String,
      catLower: String,
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
    navToObjects: function (url) {
      console.log(url);
      console.log(this.currPage);
      let id = this.getIdFromUrl(url);
      //this.$router.push({path: 'recht/objects/1'});
      if (this.currPage === this.pR) {
        this.$router.push({name: "privatrecht-objects", params: {id: id}});
      } else if (this.currPage === this.sR) {
        this.$router.push({name: "strafrecht-objects", params: {id: id}});
      } else if (this.currPage === this.vR) {
        this.$router.push({name: "verwaltungsrecht-objects", params: {id: id}});
      } else if (this.currPage === this.zR) {
        this.$router.push({name: "zivilrecht-objects", params: {id: id}});
      } else if (this.currPage === this.fK) {
        this.$router.push({name: "fackel-objects", params: {id: id}});
      } else if (this.currPage === this.tK) {
        this.$router.push({name: "theater-objects", params: {id: id}});
      } else if (this.currPage === this.vK) {
        this.$router.push({name: "verlagswesen-objects", params: {id: id}});
      } else if (this.currPage === this.pK) {
        this.$router.push({name: "polemiken-objects", params: {id: id}});
      } else if (this.currPage === this.sP) {
        this.$router.push({name: "sozialdemokratie-objects", params: {id: id}});
      } else if (this.currPage === this.cP) {
        this.$router.push({name: "christlich-national-objects", params: {id: id}});
      } else if (this.currPage === this.nP) {
        this.$router.push({name: "nationalsozialismus-objects", params: {id: id}});
      }

    },
    getIdFromUrl(url) {
      console.log(url);
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
        this.currPage = this.pR;
      } else if (this.path.toString().includes('strafrecht')) {
        this.currPage = this.sR;
      } else if (this.path.toString().includes('verwaltungsrecht')) {
        this.currPage = this.vR;
      } else if (this.path.toString().includes('zivilrecht')) {
        this.currPage = this.zR;
      } else if (this.path.toString().includes('fackel')) {
        this.currPage = this.fK;
      } else if (this.path.toString().includes('theater')) {
        this.currPage = this.tK;
      } else if (this.path.toString().includes('verlagswesen')) {
        this.currPage = this.vK;
      } else if (this.path.toString().includes('polemiken')) {
        this.currPage = this.pK;
      } else if (this.path.toString().includes('sozialdemokratie')) {
        this.currPage = this.sP;
      } else if (this.path.toString().includes('christlich-national')) {
        this.currPage = this.cP;
      } else if (this.path.toString().includes('nationalsozialismus')) {
        this.currPage = this.nP;
      }
    }
  },
  created() {
    this.path = this.$route.path;
    this.setCurrPageAndCategory();

  },
  mounted() {
    getCollections((result) => {
      console.log(result);
      this.collections = result;
    });
  }
}

</script>

<style scoped>
main {
  /*display: flex;
  justify-content: center;*/
  display: grid;
  grid-gap: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 2rem;
}

.table-bordered {
  align-self: center;
  width: 100%;
}

.navigation {
  text-align: left;
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
