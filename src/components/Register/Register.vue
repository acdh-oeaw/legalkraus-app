<template>
  <main>

    <div class="filter-nav">
      <p class="navigation">Register
        <span class="arrow">></span>
        <span style="font-weight: bold">{{ this.category }}</span>
      </p>
      <div class="abc">
        <p class="l" :id="l" v-for="l in abc" :key="l" v-on:click="filterLetter(l)">{{ l }}</p>
      </div>
      <input class="vt" type="text" placeholder="Volltextsuche:" v-model="keyword"
             @keyup="filterKeyword(keyword)"/>
    </div>
    <div v-if="noItems" class="message">KEIN TREFFER</div>
    <div class="wrapper">
      <div class="tables">
        <div v-if="categoryShort==='w' && !noItems" class="card">
          <b-pagination
              page-class="custompaging"
              prev-class="custompagingarrows"
              next-class="custompagingarrows"
              first-class="custompagingarrows"
              last-class="custompagingarrows"
              class="custom-pagination"
              v-model="currentPage"
              :total-rows="this.currentItems.bibl.length"
              :per-page="perPage"
              aria-controls="col-table"
          ></b-pagination>
          <b-table id="col-table" :small="'small'" :sort-by="'title'" :sort-compare="tableSortCompare"
                   :no-border-collapse="true" :borderless="'borderless'"
                   :current-page="currentPage" :per-page="perPage"
                   :busy.sync="isBusy" :fields="[
            {
              key: 'title',
              label: 'Titel',
              sortable: true
            },
            {
              key: 'author',
              label: 'Autor/in'
            },
            {
              key: 'date',
              label: 'Datum'
            },
          ]" :items="this.currentItems.bibl" @row-clicked="openDetails">
            <template #table-busy>
              <div class="text-center my-2">
                <b-spinner type="grow" class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(title)="data">
              <div>{{ data.value[0]._ }}</div>
            </template>
            <template #cell(author)="data">
              <div v-if="data.value">{{ data.value[0]._ }}</div>
            </template>
            <template #cell(date)="data">
              <div v-if="data.value">{{ data.value[0]._ }}</div>
            </template>
          </b-table>
          <b-table v-if="categoryShort==='p'" id="col-table" :small="'small'" :no-border-collapse="true"
                   :borderless="'borderless'"
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
          ]" :items="this.currentItems.person">
            <template #table-busy>
              <div class="text-center my-2">
                <b-spinner type="grow" class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(persName)="data">
              <div v-if="data.value && data.value[0] && data.value[0].surname && data.value[0].forename">
                {{ data.value[0].surname[0].toUpperCase() }}, {{ data.value[0].forename[0] }}
              </div>
            </template>
            <template #cell(occupation)="data">
              <div v-if="data.value">{{ data.value[0]._ }}</div>
            </template>
            <template #cell(birth)="data">
              <div v-if="data.value && data.value[0] && data.value[0].settlement && data.value[0].date">
                {{ data.value[0].settlement[0].placeName[0]._ }}, {{ data.value[0].date[0]._ }}
              </div> <!-- {{data.value[0].settlement[0].placeName[0]._}}, {{data.value[0].date[0]._}}-->
            </template>
            <template #cell(death)="data">
              <div v-if="data.value && data.value[0] && data.value[0].settlement && data.value[0].date">
                {{ data.value[0].settlement[0].placeName[0]._ }}, {{ data.value[0].date[0]._ }}
              </div>
            </template>
          </b-table>
        </div>
        <div v-if="categoryShort==='p' && !noItems" class="card">
          <b-pagination
              page-class="custompaging"
              prev-class="custompagingarrows"
              next-class="custompagingarrows"
              first-class="custompagingarrows"
              last-class="custompagingarrows"
              class="custom-pagination"
              v-model="currentPage"
              :total-rows="this.currentItems.person.length"
              :per-page="perPage"
              aria-controls="col-table"
          ></b-pagination>
          <b-table id="col-table" :small="'small'" sort-by="persName" :sort-compare="tableSortCompare"
                   :no-border-collapse="true" :borderless="'borderless'"
                   :current-page="currentPage" :per-page="perPage"
                   :busy.sync="isBusy" :fields="[
            {
              key: 'persName',
              label: 'Name',
              sortable: true
            },
            {
              key: 'birth',
              label: 'Geburtsdatum'
            },
            {
              key: 'occupation',
              label: 'Beruf'
            }
          ]" :items="this.currentItems.person" @row-clicked="openDetails">
            <template #table-busy>
              <div class="text-center my-2">
                <b-spinner type="grow" class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(persName)="data">
              <span style="display: inline-flex">
          <div v-if="data.value && data.value[0] && data.value[0].surname">{{
              data.value[0].surname[0].toUpperCase()
            }}</div>
          <div
              v-if="data.value && data.value[0] && data.value[0].forename">, {{ data.value[0].forename[0] }}</div>
            </span>
            </template>
            <template #cell(occupation)="data">
              <div v-if="data.value">{{ data.value[0]._ }}</div>
            </template>
            <template #cell(birth)="data">
              <div v-if="data.value && data.value[0] && data.value[0].date">
                {{ data.value[0].date[0]._ }}
              </div>
            </template>
          </b-table>
        </div>
        <div v-if="categoryShort==='o' && !noItems" class="card">
          <b-pagination
              page-class="custompaging"
              prev-class="custompagingarrows"
              next-class="custompagingarrows"
              first-class="custompagingarrows"
              last-class="custompagingarrows"
              class="custom-pagination"
              v-model="currentPage"
              :total-rows="this.currentItems.place.length"
              :per-page="perPage"
              aria-controls="col-table"
          ></b-pagination>
          <b-table id="col-table" :small="'small'" :sort-by="'placeName'" :sort-compare="tableSortCompare"
                   :no-border-collapse="true" :borderless="'borderless'"
                   :current-page="currentPage" :per-page="perPage"
                   :busy.sync="isBusy" :fields="[
            {
              key: 'placeName',
              label: 'Name',
              sortable: true
            },
            {
              key: 'location',
              label: 'Lage'
            }
          ]" :items="this.currentItems.place" @row-clicked="openDetails">
            <template #table-busy>
              <div class="text-center my-2">
                <b-spinner type="grow" class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(location)="data">
              <div v-if="data.value && data.value[1] && data.value[1].placeName">{{ data.value[1].placeName[0]._ }}
              </div>
            </template>
            <template #cell(placeName)="data">
          <span style="display: inline-flex">
          <div v-if="data.value && data.value[0]">{{ data.value[0] }}</div>
          <div
              v-if="data.value && data.value[1] && data.value[1].$.type ==='alternative-name'"> &nbsp;({{
              data.value[1]._
            }})</div>
            </span>
            </template>
          </b-table>
        </div>
        <div v-if="categoryShort==='i' && !noItems" class="card">
          <b-pagination
              page-class="custompaging"
              prev-class="custompagingarrows"
              next-class="custompagingarrows"
              first-class="custompagingarrows"
              last-class="custompagingarrows"
              class="custom-pagination"
              v-model="currentPage"
              :total-rows="this.currentItems.org.length"
              :per-page="perPage"
              aria-controls="col-table"
          ></b-pagination>
          <b-table id="col-table" :small="'small'" :sort-by="'orgName'" :sort-compare="tableSortCompare"
                   :no-border-collapse="true" :borderless="'borderless'"
                   :current-page="currentPage" :per-page="perPage"
                   :busy.sync="isBusy" :fields="[
            {
              key: 'orgName',
              label: 'Name'
            },
            {
              key: 'location',
              label: 'Ort'
            }
          ]" :items="this.currentItems.org" @row-clicked="openDetails">
            <template #table-busy>
              <div class="text-center my-2">
                <b-spinner type="grow" class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(location)="data">
          <span style="display: flex">
          <div
              v-if="data.value && data.value[0] && data.value[0].$.type==='located_in_place'">{{
              data.value[0].placeName[0]._
            }}</div>
          <div
              v-if="data.value && data.value[1] && data.value[1].$.type==='located_in_place'">&nbsp;({{
              data.value[1].placeName[0]._
            }})</div>
            </span>
            </template>
            <template #cell(orgName)="data">
              <div v-if="data.value && data.value[0]">{{ data.value[0] }}</div>
            </template>
          </b-table>
        </div>
        <div v-if="categoryShort==='f' && !noItems" class="card">
          <b-pagination
              page-class="custompaging"
              prev-class="custompagingarrows"
              next-class="custompagingarrows"
              first-class="custompagingarrows"
              last-class="custompagingarrows"
              class="custom-pagination"
              v-model="currentPage"
              :total-rows="this.currentItems.bibl.length"
              :per-page="perPage"
              aria-controls="col-table"
          ></b-pagination>
          <b-table id="col-table" :small="'small'" :sort-by="'title'" :sort-compare="tableSortCompare"
                   :no-border-collapse="true" :borderless="'borderless'"
                   :current-page="currentPage" :per-page="perPage"
                   :busy.sync="isBusy" :fields="[
            {
              key: 'title',
              label: 'Titel',
              sortable: true
            },
            {
              key: 'num',
              label: 'Nummer'
            },
          ]" :items="this.currentItems.bibl" @row-clicked="openDetails">
            <template #table-busy>
              <div class="text-center my-2">
                <b-spinner type="grow" class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(title)="data">
              <div>{{ data.value[0]._ }}</div>
            </template>
            <template #cell(num)="data">
              <div v-if="data.value">Fackel &nbsp; {{ data.value[0]._ }}/{{ data.value[1]._ }}</div>
            </template>
          </b-table>
          <b-table v-if="categoryShort==='p'" id="col-table" :small="'small'" :no-border-collapse="true"
                   :borderless="'borderless'"
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
          ]" :items="this.currentItems.person">
            <template #table-busy>
              <div class="text-center my-2">
                <b-spinner type="grow" class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(persName)="data">
              <div v-if="data.value && data.value[0] && data.value[0].surname && data.value[0].forename">
                {{ data.value[0].surname[0].toUpperCase() }}, {{ data.value[0].forename[0] }}
              </div>
            </template>
            <template #cell(occupation)="data">
              <div v-if="data.value">{{ data.value[0]._ }}</div>
            </template>
            <template #cell(birth)="data">
              <div v-if="data.value && data.value[0] && data.value[0].settlement && data.value[0].date">
                {{ data.value[0].settlement[0].placeName[0]._ }}, {{ data.value[0].date[0]._ }}
              </div> <!-- {{data.value[0].settlement[0].placeName[0]._}}, {{data.value[0].date[0]._}}-->
            </template>
            <template #cell(death)="data">
              <div v-if="data.value && data.value[0] && data.value[0].settlement && data.value[0].date">
                {{ data.value[0].settlement[0].placeName[0]._ }}, {{ data.value[0].date[0]._ }}
              </div>
            </template>
          </b-table>
        </div>
      </div>
      <register-detail v-if="showDetails" v-bind:item="details" v-bind:category="categoryShort" class="details card">
        {{ details }}
      </register-detail>
    </div>
  </main>
</template>

<script>
import {parseString} from "xml2js"
import RegisterDetail from "./RegisterDetail";
import {getObjectWithId as getPMBObjectWithId} from "../../services/PMBService";

export default {
  name: "Register",
  components: {
    RegisterDetail: RegisterDetail
  },
  data: function () {
    return {
      category: null,
      categoryShort: null,
      currentItems: [],
      allItems: [],
      currentPage: 1,
      perPage: 15,
      isBusy: false,
      showDetails: false,
      details: String,
      keyword: null,
      abc: ["Kein Filter", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Sonderzeichen"],
      query: null,
      noItems: false
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
    downloadRegistry() {
      let url = null;
      var self = this;
      switch (this.categoryShort) {
        case "p":
          url = "https://arche-dev.acdh-dev.oeaw.ac.at/api/27726";
          fetch(url)
              .then(response => response.text())
              .then(str => {
                parseString(str, function (err, rs) {
                  self.currentItems = rs.TEI.text[0].body[0].listPerson[0];
                  self.allItems = JSON.parse(JSON.stringify(rs.TEI.text[0].body[0].listPerson[0])); //deep copy
                });
              })
              .catch((e) => console.log("Error while fetching or transforming xml file: " + e.toString()))
          break;
        case "o":
          url = "https://arche-dev.acdh-dev.oeaw.ac.at/api/27721";
          fetch(url)
              .then(response => response.text())
              .then(str => {
                parseString(str, function (err, rs) {
                  self.currentItems = rs.TEI.text[0].body[0].listPlace[0];
                  self.allItems = JSON.parse(JSON.stringify(rs.TEI.text[0].body[0].listPlace[0]));
                });
              })
              .catch((e) => console.log("Error while fetching or transforming xml file: " + e.toString()))
          break;
        case "i":
          url = "https://arche-dev.acdh-dev.oeaw.ac.at/api/27722";
          fetch(url)
              .then(response => response.text())
              .then(str => {
                parseString(str, function (err, rs) {
                  self.currentItems = rs.TEI.text[0].body[0].listOrg[0];
                  self.allItems = JSON.parse(JSON.stringify(rs.TEI.text[0].body[0].listOrg[0]));
                });
              })
              .catch((e) => console.log("Error while fetching or transforming xml file: " + e.toString()))
          break;
        case "w":
          url = "https://arche-dev.acdh-dev.oeaw.ac.at/api/27723";
          fetch(url)
              .then(response => response.text())
              .then(str => {
                parseString(str, function (err, rs) {
                  console.log(rs)
                  self.currentItems = rs.TEI.text[0].body[0].listBibl[0];
                  self.allItems = JSON.parse(JSON.stringify(rs.TEI.text[0].body[0].listBibl[0]));
                });
              })
              .catch((e) => console.log("Error while fetching or transforming xml file: " + e.toString()))
          break;
        case "f":
          url = "https://arche-dev.acdh-dev.oeaw.ac.at/api/27724";
          fetch(url)
              .then(response => response.text())
              .then(str => {
                parseString(str, function (err, rs) {
                  self.currentItems = rs.TEI.text[0].body[0].listBibl[0];
                  self.allItems = JSON.parse(JSON.stringify(rs.TEI.text[0].body[0].listBibl[0]));
                  console.log(self.allItems)
                });
              })
              .catch((e) => console.log("Error while fetching or transforming xml file: " + e.toString()))
          break;
        case "j":
          url = "https://arche-dev.acdh-dev.oeaw.ac.at/api/27725";
          fetch(url)
              .then(response => response.text())
              .then(str => {
                parseString(str, function (err, rs) {
                  console.log(rs)
                  /*self.currentItems = rs.TEI.text[0].body[0].listBibl[0];
                  self.allItems = JSON.parse(JSON.stringify(rs.TEI.text[0].body[0].listBibl[0]));*/
                });
              })
              .catch((e) => console.log("Error while fetching or transforming xml file: " + e.toString()))
          break;
      }

    },
    processPerson(record) {
      let p = {
        "forename": "-",
        "surname": "-",
        "sex": "-",
        "birthPlace": "-",
        "birthDate": "-",
        "deathPlace": "-",
        "deathDate": "-",
        "occupation": "-"
      };
      if (record.persName[0]) {
        p.forename = (record.persName[0].forename ? record.persName[0].forename[0] : '-');
        p.surname = (record.persName[0].surname ? record.persName[0].surname[0] : '-');
      }

      p.sex = record.sex[0] ? record.sex[0].$.value : '-';

      if (record.birth) {
        p.birthPlace = (record.birth[0].settlement && record.birth[0].settlement[0].placeName) ? record.birth[0].settlement[0].placeName[0]._ : '-';
        p.birthDate = (record.birth[0].date && record.birth[0].date[0]) ? record.birth[0].date[0]._ : '-';
      }

      if (record.death) {
        p.deathPlace = (record.death[0].settlement && record.death[0].settlement[0].placeName) ? record.death[0].settlement[0].placeName[0]._ : '-';
        p.deathDate = (record.death[0].date && record.death[0].date[0]) ? record.death[0].date[0]._ : '-';
      }

      if (record.occupation) {
        let o = [];
        for (let i = 0; i < record.occupation.length; i++) {
          o.push(record.occupation[i]._);
        }
        p.occupation = o.toString();
      }

      if (record.$) {
        let xmlId = record.$['xml:id'];
        p.pmbID = xmlId;
        let id = xmlId.substring(3)
        p.pmbURL = "https://pmb.acdh.oeaw.ac.at/apis/entities/entity/person/" + id + "/detail";
      }

      if (record.listEvent) {
        let docs =[];
        record.listEvent[0].event.forEach(e => {
          let url = e.linkGrp[0].link[0].$.target;
          let idx = url.lastIndexOf('/');
          let id = url.substring(idx+1);
          docs.push(id);
        });
        p.docs = docs;

      }
      return p;
    },
    processPlace(record) {
      let o = {
        "placeName": "-",
        "location": "-",
        "eventCount": "-",
        "events": "-"
      };
      if (record.placeName) {
        o.placeName = record.placeName[0] ? record.placeName[0] : '-';
      }

      if (record.location) {
        o.location = record.location[1] ? record.location[1].placeName[0]._ : '-';
      }

      if (record.listEvent) {
        o.eventCount = record.listEvent[0].event ? record.listEvent[0].event.length : '-';
      }
      if (record.listEvent) {
        o.events = record.listEvent[0].event ? record.listEvent[0].event : '-';
      }

      if (record.$) {
        let xmlId = record.$['xml:id'];
        o.pmbID = xmlId;
        let id = xmlId.substring(3)
        o.pmbURL = "https://pmb.acdh.oeaw.ac.at/apis/entities/entity/place/" + id + "/detail";
      }
      if (record.listEvent) {
        let docs =[];
        record.listEvent[0].event.forEach(e => {
          let url = e.linkGrp[0].link[0].$.target;
          let idx = url.lastIndexOf('/');
          let id = url.substring(idx+1);
          docs.push(id);
        });
        o.docs = docs;

      }
      return o;
    },
    processInstitutions(record) {
      let i = {
        "orgName": "-",
        "location": "-",
        "eventCount": "-"
      };
      if (record.orgName) {
        i.orgName = record.orgName[0] ? record.orgName[0] : '-';
      }

      if (record.location) {
        i.location = record.location[0] ? record.location[0].placeName[0]._ : '-';
        i.location += record.location[1] ? (", " + record.location[1].placeName[0]._) : '';
      }

      if (record.listEvent) {
        i.eventCount = record.listEvent[0].event ? record.listEvent[0].event.length : '-';
      }

      if (record.$) {
        let xmlId = record.$['xml:id'];
        i.pmbID = xmlId;
        let id = xmlId.substring(3);
        i.pmbURL = "https://pmb.acdh.oeaw.ac.at/apis/entities/entity/institution/" + id + "/detail";
      }

      if (record.listEvent) {
        let docs =[];
        record.listEvent[0].event.forEach(e => {
          let url = e.linkGrp[0].link[0].$.target;
          let idx = url.lastIndexOf('/');
          let id = url.substring(idx+1);
          docs.push(id);
        });
        i.docs = docs;

      }
      return i;
    },
    async processWork(record) {
      let w = {
        "title": "-",
        "author": "-",
        "date": "-"
      };

      if (record.title) {
        w.title = record.title[0] ? record.title[0]._ : '-'
      }

      if (record.author) {
        w.author = record.author[0] ? record.author[0]._ : '-'
      }

      if (record.date) {
        w.date = record.date[0] ? record.date[0]._ : '-'
      }
      if (record.$) {
        let xmlId = record.$['xml:id'];
        w.pmbID = xmlId;
        let id = xmlId.substring(3)
        w.pmbURL = "https://pmb.acdh.oeaw.ac.at/apis/entities/entity/work/" + id + "/detail";
        await getPMBObjectWithId(id, 'work', rs => {
          let relations = [];
          rs.relations.works.forEach(w => {
            relations.push(w.target);
          })
          w.relations = relations;
        });
      }
      if (record.listEvent) {
        let docs =[];
        record.listEvent[0].event.forEach(e => {
          let url = e.linkGrp[0].link[0].$.target;
          let idx = url.lastIndexOf('/');
          let id = url.substring(idx+1);
          docs.push(id);
        });
        w.docs = docs;

      }
      return w;
    },
    processFackel(record){
      let f = {
        "title": "-",
        "author": "-",
        "url": "-",
        "date": "-",
        "biblScope": "-"
      };

      if (record.title) {
        f.title = record.title[0] ? record.title[0]._ : '-'
      }

      if (record.date) {
        f.date = record.date[0] ? record.date[0]._ : '-'
      }

      if (record.author) {
        f.author = record.author[0] ? record.author[0]._ : '-'
      }

      if (record.biblScope) {
        f.biblScope = record.author[0] ? record.biblScope[0]._ : '-'
      }

      if(record.$.corresp){
        f.url = record.$.corresp;
      }
      console.log(f);
      return f;
    },
    async openDetails(record) {
      console.log(record)
      let item;
      if (this.categoryShort === 'p') {
        item = this.processPerson(record);
      }
      if (this.categoryShort === 'o') {
        item = this.processPlace(record);
      }
      if (this.categoryShort === 'i') {
        item = this.processInstitutions(record);
      }
      if (this.categoryShort === 'w') {
        item = await this.processWork(record);
      }if (this.categoryShort === 'f'){
        item = this.processFackel(record);
      }
      this.details = item;
      this.showDetails = true;
    },
    tableSortCompare(a, b, key) {
      if (key === 'persName') {

        return a[key][0].surname[0].localeCompare(b[key][0].surname[0])
      } else if (key === 'title') {
        return a[key][0]._.localeCompare(b[key][0]._)
      } else if (key === 'placeName' || key === 'orgName') {
        return a[key][0].localeCompare(b[key][0]);
      } else {
        return false
      }
    },
    filterLetter(l) {
      //remove old highlight
      for (let i = 0; i < document.getElementsByClassName('active').length; i++) {
        document.getElementsByClassName('active')[i].classList.remove('active');
      }
      //highlight current letter
      document.getElementById(l).classList.add('active');


      if (l === 'Kein Filter') {
        this.currentItems = JSON.parse(JSON.stringify(this.allItems)); //deep copy
        return;
      }
      if (this.categoryShort === 'p') {
        if (l === 'Sonderzeichen') {
          this.currentItems.person = this.allItems.person.filter(p =>
              (p.persName[0].surname[0].charAt(0) < 'A' || p.persName[0].surname[0].charAt(0) > 'Z'));
        } else {
          this.currentItems.person = this.allItems.person.filter(p =>
              p.persName[0].surname[0].startsWith(l));
        }

      } else if (this.categoryShort === 'o') {
        if (l === 'Sonderzeichen') {
          this.currentItems.place = this.allItems.place.filter(o =>
              (o.placeName[0].charAt(0) < 'A' || o.placeName[0].charAt(0) > 'Z'));
        } else {
          this.currentItems.place = this.allItems.place.filter(o =>
              o.placeName[0].startsWith(l));
        }
      } else if (this.categoryShort === 'w') {
        if (l === 'Sonderzeichen') {
          this.currentItems.bibl = this.allItems.bibl.filter(w =>
              (w.title[0]._.charAt(0) < 'A' || w.title[0]._.charAt(0) > 'Z'));
        } else {
          this.currentItems.bibl = this.allItems.bibl.filter(w =>
              w.title[0]._.startsWith(l));
        }
      } else if (this.categoryShort === 'i') {
        if (l === 'Sonderzeichen') {
          this.currentItems.org = this.allItems.org.filter(i =>
              (i.orgName[0].charAt(0) < 'A' || i.orgName[0].charAt(0) > 'Z'));
        } else {
          this.currentItems.org = this.allItems.org.filter(i =>
              i.orgName[0].startsWith(l));
        }
      }

    },
    filterKeyword(keyword) {
      this.noItems = false;
      let kw = keyword.toUpperCase();
      if (this.categoryShort === 'p') {
        this.currentItems.person = this.allItems.person.filter(p => (
                p.persName[0].surname[0].toUpperCase().includes(kw) ||
                (p.persName[0].forename && p.persName[0].forename[0].toUpperCase().includes(kw)) ||
                (p.occupation && p.occupation[0]._.toUpperCase().includes(kw))) ||
            (p.birth && p.birth[0].date && p.birth[0].date[0] && p.birth[0].date[0]._ && p.birth[0].date[0]._.includes(kw)));
        if (this.currentItems.person.length === 0) {
          this.noItems = true;
        }
      } else if (this.categoryShort === 'w') {
        this.currentItems.bibl = this.allItems.bibl.filter(w =>
            (w.title[0]._.toUpperCase().includes(kw) ||
                (w.date && w.date[0] && w.date[0]._ && w.date[0]._.includes(kw)) ||
                (w.author && w.author[0] && w.author[0]._.toUpperCase().includes(kw))));
        if (this.currentItems.bibl.length === 0) {
          this.noItems = true;
        }
      } else if (this.categoryShort === 'i') {
        this.currentItems.org = this.allItems.org.filter(i =>
            (i.orgName[0].toUpperCase().includes(kw)) ||
            (i.location && i.location[0] && i.location[0].$.type === 'located_in_place' && i.location[0].placeName[0]._.toUpperCase().includes(kw)) ||
            (i.location && i.location[1] && i.location[1].$.type === 'located_in_place' && i.location[1].placeName[0]._.toUpperCase().includes(kw)));
        if (this.currentItems.org.length === 0) {
          this.noItems = true;
        }
      } else if (this.categoryShort === 'o') {
        this.currentItems.place = this.allItems.place.filter(o =>
            (o.placeName[0].toUpperCase().includes(kw) ||
                (o.location && o.location[1] && o.location[1].placeName && o.location[1].placeName[0]._.toUpperCase().includes(kw))));
        if (this.currentItems.place.length === 0) {
          this.noItems = true;
        }
      }

    },
    filterPmbId(pmbId) {
      this.noItems = false;
      pmbId = pmbId.substring(4); //slice the leading '#pmb'

      if (pmbId) {
        if (this.categoryShort === 'p') {
          this.currentItems.person = this.allItems.person.filter(p => (p.idno[0]._.includes(pmbId)));
          if (this.currentItems.person.length === 0) {
            this.noItems = true;
          }
        } else if (this.categoryShort === 'i') {
          this.currentItems.org = this.allItems.org.filter(o => (o.$['xml:id'].includes(pmbId)));
          if (this.currentItems.org.length === 0) {
            this.noItems = true;
          }
        } else if (this.categoryShort === 'o') {
          this.currentItems.place = this.allItems.place.filter(o => (o.$['xml:id'].includes(pmbId)));
          if (this.currentItems.place.length === 0) {
            this.noItems = true;
          }
        }
      }
    }
  },
  created() {
    this.setCategory();
    if (this.$route.query !== null) {
      this.query = this.$route.query;
    }

  },
  async mounted() {
    this.downloadRegistry();

  },
  watch: {
    $route() {
      this.setCategory();
      this.downloadRegistry();
      this.showDetails = false;
      this.noItems = false;
      this.keyword = null;
    },
    async allItems() {
      if (this.query !== null) {
        this.filterPmbId(this.query.pmbId);

      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  margin-left: 2rem;
}

.details {
  width: min-content;
  min-width: 20%;
}

.tables {
  min-width: 70%;
  max-width: 70%;
}

.tables > .card {
  border: none;
}

.tables > .card:hover {
  cursor: pointer !important;
}

.filter-nav {
  background-color: var(--secondary-gray-meta);
  border-bottom: solid var(--primary-red) 0.3rem;
}

.abc {
  display: inline-flex;
  justify-content: space-evenly;
  width: 100%;
}

.l {
  margin: 0.3rem;
  cursor: pointer;
}

.l:hover {
  text-decoration: underline;
}

.active {
  text-decoration: underline;
  color: var(--primary-red);
  font-weight: bold;
}

.vt {
  margin: 2rem;
}

.message {
  margin: 5rem;

}
</style>