<template>
  <main>
    <p class="navigation">Register
      <span class="arrow">></span>
      <span style="font-weight: bold">{{ this.category }}</span>
    </p>
    <div class="card">
      <b-pagination
          page-class="custompaging"
          prev-class="custompagingarrows"
          next-class="custompagingarrows"
          first-class="custompagingarrows"
          last-class="custompagingarrows"
          class="custom-pagination"
          v-model="currentPage"
          :total-rows="this.itemLength"
          :per-page="perPage"
          aria-controls="col-table"
      ></b-pagination>
      <b-table v-if="categoryShort==='w'" id="col-table" :small="'small'" :no-border-collapse="true" :borderless="'borderless'"
               :current-page="currentPage" :per-page="perPage"
               :busy.sync="isBusy" :fields="[
            {
              key: 'title',
              label: 'Titel'
            },
            {
              key: 'author',
              label: 'Autor/in'
            },
            {
              key: 'date',
              label: 'Datum'
            },
          ]" :items="this.items.bibl">
        <template #table-busy>
          <div class="text-center my-2">
            <b-spinner type="grow" class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template #cell(title)="data">
          <div>{{data.value[0]._}}</div>
        </template>
        <template #cell(author)="data">
          <div v-if="data.value">{{data.value[0]._}}</div>
        </template>
        <template #cell(date)="data">
          <div v-if="data.value">{{data.value[0]._}}</div>
        </template>
      </b-table>
      <b-table v-if="categoryShort==='p'" id="col-table" :small="'small'" :no-border-collapse="true" :borderless="'borderless'"
               :current-page="currentPage" :per-page="perPage"
               :busy.sync="isBusy" :fields="[
            {
              key: 'persName',
              label: 'Name'
            },
            {
              key: 'occupation',
              label: 'Beruf'
            },
            {
              key: 'birth',
              label: 'geboren'
            },
            {
              key: 'death',
              label: 'gestorben'
            },
          ]" :items="this.items.person">
        <template #table-busy>
          <div class="text-center my-2">
            <b-spinner type="grow" class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template #cell(persName)="data">
          <div v-if="data.value && data.value[0] && data.value[0].surname && data.value[0].forename">{{data.value[0].surname[0].toUpperCase()}}, {{data.value[0].forename[0]}}</div>
        </template>
        <template #cell(occupation)="data">
          <div v-if="data.value">{{data.value[0]._}}</div>
        </template>
        <template #cell(birth)="data">
         <div v-if="data.value && data.value[0] && data.value[0].settlement && data.value[0].date"> {{data.value[0].settlement[0].placeName[0]._}}, {{data.value[0].date[0]._}}</div> <!-- {{data.value[0].settlement[0].placeName[0]._}}, {{data.value[0].date[0]._}}-->
        </template>
        <template #cell(death)="data">
          <div v-if="data.value && data.value[0] && data.value[0].settlement && data.value[0].date">{{data.value[0].settlement[0].placeName[0]._}}, {{data.value[0].date[0]._}}</div>
        </template>
      </b-table>
    </div>
  </main>
</template>

<script>
import {parseString} from "xml2js"
export default {
  name: "Register",
  data: function () {
    return {
      category: null,
      categoryShort: null,
      items: [],
      currentPage: 1,
      perPage: 10,
      isBusy: false,
      itemLength: 0
    }
  },

  methods: {
    setCategory() {
      const p = this.$route.path.toString();
      if (p.includes("register/personen")) {
        this.category = "Personen";
        this.categoryShort = "p";
      } else if (p.includes("register/orte")) {
        this.category = "Orte";
        this.categoryShort = "o";
      } else if (p.includes("register/institutionen")) {
        this.category = "Institutionen";
        this.categoryShort = "i";
      } else if (p.includes("register/werke")) {
        this.category = "Werke";
        this.categoryShort = "w";
      } else if (p.includes("register/fackel")) {
        this.category = "Fackel";
        this.categoryShort = "f";
      } else if (p.includes("register/juristische-texte")) {
        this.category = "Juristische Texte";
        this.categoryShort = "j";
      }
    },
    saveStringToXML(xmlString) {
      var textFile = null
      var data = new Blob([xmlString], {type: 'text/xml'});

      textFile = window.URL.createObjectURL(data);

      // returns a URL you can use as a href
      return textFile;

    },
    downloadRegistry() {
      let url = null;
      var self = this;
      switch (this.categoryShort){
        case "p":
          url = "https://arche-dev.acdh-dev.oeaw.ac.at/api/310595";
          fetch(url)
              .then(response => response.text())
              .then(str => {
                parseString(str, function (err, rs){
                  self.items = rs.TEI.text[0].body[0].listPerson[0];
                  console.log(self.items)
                });
              })
              .catch((e) => console.log("Error while fetching or transforming xml file: " + e.toString()))
          break;
        case "o":
          url = "https://arche-dev.acdh-dev.oeaw.ac.at/api/310594";
          fetch(url)
              .then(response => response.text())
              .then(str => {
                parseString(str, function (err, rs){
                  self.items = rs.TEI.text[0].body[0].listPlace[0];
                  console.log(self.items)
                });
              })
              .catch((e) => console.log("Error while fetching or transforming xml file: " + e.toString()))
          break;
        case "i":
          url = "https://arche-dev.acdh-dev.oeaw.ac.at/api/310598";
          break;
        case "w":
          url = "https://arche-dev.acdh-dev.oeaw.ac.at/api/310598";
          fetch(url)
              .then(response => response.text())
              .then(str => {
                parseString(str, function (err, rs){
                  self.items = rs.TEI.text[0].body[0].listBibl[0];
                  console.log(self.items)
                });
              })
              .catch((e) => console.log("Error while fetching or transforming xml file: " + e.toString()))
          break;
        case "f":
          url = "https://arche-dev.acdh-dev.oeaw.ac.at/api/310596";
          break;
        case "j":
          url = "https://arche-dev.acdh-dev.oeaw.ac.at/api/310593";
          break;
      }
      self.itemLength = self.items.length;
    }
  },
  created() {
    this.setCategory();
  },
  mounted() {
   this.downloadRegistry();
  },
  watch: {
    $route() {
      this.setCategory();
      this.downloadRegistry();
    }
  }
}
</script>

<style scoped>

</style>