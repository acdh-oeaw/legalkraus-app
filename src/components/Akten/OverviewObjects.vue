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
    <h3> Documents of case "{{ this.caseTitle }}"</h3>
    <p v-if="isEmpty"> This case does not have any documents. </p>
    <p v-else> This case has {{ this.numberDocuments }} documents. </p>
    <div class="wrapper">
      <div class="card-deck">
        <div class="card" v-for="val in objects" v-bind:key="val.title" v-on:click="navToLesefassung(val.url.subject)">
          <h4 class="card-title"> {{ val.title }}</h4>
          <p> {{ val.identifier }}</p>
          <p> {{ val.url.subject }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>


import {getObjectsOfCollection, getObjectWithId} from "@/services/ARCHEService";
import {ARCHErdfQuery} from "arche-api/src";

export default {
  name: "OverviewObjects",
  data: function () {
    return {
      caseId: -1,
      objects: [],
      caseTitle: String,
      numberDocuments: Number,
      isEmpty: Boolean,
      path: String,
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
    extractTitle: function (title) {
      return title[0].object.substring(0, title[0].object.length - 3);
    },
    navToLesefassung: function (url) {
      let id = this.getIdFromUrl(url)
      this.$router.push({name: "lesefassung", params: {id: id, cat: this.category, subcat: this.subCategory, case: this.caseTitle}});
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

    }
  },
  created() {
    this.caseId = this.$route.params.id;
    this.path = this.$route.path;
    this.setCurrPageAndCategory();

  },
  mounted() {
    if (isNaN(parseInt(this.caseId)) || this.caseId === -1) {
      this.$router.push({name: "home"});
      //todo: go to "home" when id-parameter is empty
    }
    getObjectWithId(this.caseId, (result) => {
      let title = ARCHErdfQuery(null, "https://vocabs.acdh.oeaw.ac.at/schema#hasTitle", null, result);
      this.caseTitle = this.extractTitle(title);
      let documents = ARCHErdfQuery(null, 'https://vocabs.acdh.oeaw.ac.at/schema#hasNumberOfItems', null, result)
      let idx = documents[0].object.lastIndexOf('^');
      this.numberDocuments = documents[0].object.substring(0, idx - 1);
    });

    getObjectsOfCollection(this.caseId, (result) => {
      this.objects = result;
      this.isEmpty = (this.objects.length === 0);
      console.log(this.objects);
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

.wrapper {
  display: flex;
  align-content: center;
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