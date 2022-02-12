<template>
  <main>
    <p class="navigation">Akten-Edition
      <span class="arrow">></span>
      <router-link router-link class="nav-link" :to="'/' + catLower">
        {{ this.category }}
      </router-link>
      <span class="arrow">></span>
      {{ this.currSubCat }}
    </p>
<!--    <table class="table-bordered">
      <tr>
        <th>Title</th>
        <th>Number of Documents</th>
      </tr>

      <tr v-for="collection in collections" v-bind:key="collection.val1"
          v-on:click="navToObjects(collection.url.subject)">

        <td>{{ collection.title }}</td>
        <td>{{ collection.size }}</td>

      </tr>


    </table>-->
    <div>{{this.$store.getters.noOfCollections}} Sammlungen</div>
    <div class="card">
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
      <b-table id="col-table" :small="'small'" :no-border-collapse="true" :borderless="'borderless'" :current-page="currentPage" :per-page="perPage"
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
          ]" :items="getArcheCollections">
        <template #table-busy>
          <div class="text-center my-2">
            <b-spinner type="grow" class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template #cell(url)="data">
          <a target="_blank" rel="noopener noreferrer" :href="`${data.value}`">Daten in Arche</a>
        </template>
        <!-- <tr>
           <th>Titel</th>
           <th>Metadaten in Arche</th>
           <th>Anzahl Dokumente</th>

         </tr>
         <tr v-for="val in collections" v-bind:key="val.url" v-on:click="navToObjects(val.url)">
           <td>
             {{ val.title }}
           </td>
           <td>
             {{ val.url }}
           </td>
           <td> {{ val.size }}</td>
         </tr>-->
      </b-table>
    </div>
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
      isBusy: false,
      perPage: 10,
      currentPage: 1,
      path: String,
      currSubCat: String,
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
    getArcheCollections(ctx, callback)  {

      const offset = ctx.currentPage === 1 ? 0 : (ctx.currentPage - 1) * ctx.perPage
      console.log(offset)
      getCollections(offset,(result) => {
        callback(result)
      });

    },
    navToObjects: function (url) {
      console.log(url);
      console.log(this.currSubCat);
      let id = this.getIdFromUrl(url);
      //this.$router.push({path: 'recht/objects/1'});
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
</style>
