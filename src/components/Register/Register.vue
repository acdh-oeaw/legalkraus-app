<template>
  <main>

    <div class="filter-nav">
      <p class="navigation">Register
        <b-icon class="mx-1 breadcrumbarrow" icon="chevron-right" shift-v="-10" font-scale="0.7"></b-icon>
        <span class="semibold">{{ this.category }}</span>
      </p>
      <div class="abc">
        <p class="l" :id="l" v-for="l in abc" :key="l" v-on:click="filterLetter(l)">{{ l }}</p>
      </div>
      <div class="c">
      <input class="vt" type="text" placeholder="Volltextsuche:" v-model="keyword"
             @keyup="filterKeyword(keyword)"/>
      </div>
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
          <b-table :tbody-tr-class="rowClass" ref="workTable" id="col-table" :small="'small'" :sort-by="'title'" :sort-compare="tableSortCompare"
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
          <b-table id="col-table" :tbody-tr-class="rowClass" ref="personTable" :small="'small'" sort-by="persName" :sort-compare="tableSortCompare"
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
          <b-table :tbody-tr-class="rowClass" id="col-table" ref="placeTable" :small="'small'" :sort-by="'placeName'" :sort-compare="tableSortCompare"
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
          <b-table :tbody-tr-class="rowClass" id="col-table" ref="instTable" :small="'small'" :sort-by="'orgName'" :sort-compare="tableSortCompare"
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
          {{this.currentItems}}
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
          <b-table id="col-table" :small="'small'" :sort-by="'title'" :sort-compare="tableSortCompareFackel"
                   :no-border-collapse="true" :borderless="'borderless'"
                   :current-page="currentPage" :per-page="perPage"
                   :busy.sync="isBusy" :fields="[
            {
              key: 'title',
              label: 'Titel',
              sortable: true,
              'class': 'title-column',
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
           <!-- <template #cell(id)="data">
             <div>{{data.item.title[0]._}}</div
             <div v-if="data.item.title[0]._ !== 'Die Fackel'">{{ data.item.title[0]._ }}</div>
              <div v-if="data.item.title[0]._ == 'Die Fackel'">{{ 'zzz'+ data.item.title[0]._ }}</div>
            </template>-->
            <template #cell(title)="data">
              <div>{{ data.value[0]._ }}</div>
            </template>
            <template #cell(num)="data">
              <div v-if="data.value">Fackel, {{ data.value[0]._ }}, {{ data.value[1]._ }}</div>
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
        <div v-if="categoryShort==='j' && !noItems" class="card">
          <b-pagination
              page-class="custompaging"
              prev-class="custompagingarrows"
              next-class="custompagingarrows"
              first-class="custompagingarrows"
              last-class="custompagingarrows"
              class="custom-pagination"
              v-model="currentPage"
              :total-rows="this.currentItems.item.length"
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

          ]" :items="this.currentItems.item" @row-clicked="openDetails">
            <template #table-busy>
              <div class="text-center my-2">
                <b-spinner type="grow" class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(title)="data">
              <div>{{ data.value[0]._ }}</div>
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
      noItems: false,
      caseInfo: null
    }
  },

  methods: {
    rowClass(item, type) {
      if (this.$route.query && this.$route.query.pmbId) {
        console.log(type)
       if (item['$']['xml:id'] === this.$route.query.pmbId.substring(1)) return "highlighted-row"   
      }
    },
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
                  self.currentItems = rs.TEI.text[0].body[0].listBibl[0];
                  self.allItems = JSON.parse(JSON.stringify(rs.TEI.text[0].body[0].listBibl[0]))
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
        f.biblScope = record.biblScope[0] ? record.biblScope[0]._ : '-'
      }

      if(record.$.corresp){
        f.url = record.$.corresp;
      }

      if(record.ref){
        let refCases = [];
        let refDocs = [];

        record.ref.forEach(r =>{
          let xmlId = r._.substring(record.ref[0]._.lastIndexOf('|')+1);
          let caseId = parseInt(xmlId.replace("D_","").substring(0,6).replace('0',''));
          this.caseInfo.then(cd =>{
            cd.cases.forEach(c => {
              let cid = parseInt(c.id.replace("C_",'').substring(0, c.id.length-4));
              if(cid === caseId){
                refCases.push(c);
                for (let i = 0; i < c.doc_objs.length; i++) {
                  if(c.doc_objs[i].id === xmlId){
                    refDocs.push(c.doc_objs[i]);
                    break;
                  }
                }
              }
            });
          })
        });
        f.docs = refDocs;
        f.cases = refCases;
      }
      return f;
    },
    processLaw(record){
      let l = {
        "title": "-",
        "url": "-",
        "date": "-",
      };

      if (record.title) {
        l.title = record.title[0] ? record.title[0]._ : '-'
      }

      if(record.$.corresp){
        l.url = record.$.corresp;
      }

      if (record.date) {
        l.date = record.date[0] ? record.date[0]._ : '-'
      }

      if (record.biblScope) {
        l.biblScope = record.biblScope[0] ? record.biblScope[0]._ : '-'
      }

      if(record.ref){
        let refCases = [];
        let refDocs = [];
        record.ref.forEach(r =>{
          let caseId = parseInt(r.$.target.replace("D_","").substring(0,6).replace('0',''));
          this.caseInfo.then(cd =>{
            cd.cases.forEach(c => {
              let cid = parseInt(c.id.replace("C_",'').substring(0, c.id.length-4));
              if(cid === caseId){
                refCases.push(c);
                for (let i = 0; i < c.doc_objs.length; i++) {
                  if(c.doc_objs[i].id === r.$.target){
                    refDocs.push(c.doc_objs[i]);
                    break;
                  }
                }
              }
            });
          })
        });
        l.docs = refDocs;
        l.cases = refCases;
      }

      return l;
    },
    async openDetails(record) {
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
      if (this.categoryShort === 'j'){
        item = this.processLaw(record);
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
    tableSortCompareFackel(a, b, key) {
      if (key === 'persName') {

        return a[key][0].surname[0].localeCompare(b[key][0].surname[0])
      } else if (key === 'title') {
        let sorta = a[key][0]._ === 'Die Fackel' ? 'zzzDie Fackel' : a[key][0]._;
        let sortb = b[key][0]._ === 'Die Fackel' ? 'zzzDie Fackel' : b[key][0]._;
        return sorta.localeCompare(sortb)
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
      }else if (this.categoryShort === 'j'){
        this.currentItems.item = this.allItems.item.filter(j =>
            j.title[1]._.startsWith(l));
      }else if (this.categoryShort === 'f'){
        this.currentItems.bibl = this.allItems.bibl.filter(j =>
            j.title[0]._.startsWith(l));
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
      }else if (this.categoryShort === 'j') {
        this.currentItems.item = this.allItems.item.filter(j =>
            (j.title[0]._.toUpperCase().includes(kw) ||
                (j.title[1]._.toUpperCase().includes(kw))));
        if (this.currentItems.place.length === 0) {
          this.noItems = true;
        }
      }
      else if (this.categoryShort === 'f') {
        this.currentItems.bibl = this.allItems.bibl.filter(j =>
            (j.title[0]._.toUpperCase().includes(kw) ||
                (j.num[0]._.toUpperCase().includes(kw)) || (j.num[1]._.toUpperCase().includes(kw))));
        if (this.currentItems.place.length === 0) {
          this.noItems = true;
        }
      }

    },
    async filterPmbId(pmbId) {

      this.noItems = false;
      //pmbId = pmbId.substring(4); //slice the leading '#pmb'
      pmbId = pmbId.substring(1); //slice the leading '#'

      if (pmbId) {
        if (this.categoryShort === 'p') {
          await this.$refs['personTable'];
          const rowposition = this.$refs.personTable.sortedItems.findIndex(p => p['$']['xml:id'] === pmbId);
          this.currentPage = Math.ceil(rowposition / this.perPage)
          await document.querySelectorAll(".highlighted-row");
          document.querySelectorAll(".highlighted-row")[0].scrollIntoView();

          //this.currentItems.person = this.allItems.person.filter(p => (p.idno[0]._.includes(pmbId)));
          //this.currentItems.person = this.allItems.person.filter(p => p['$']['xml:id'] === pmbId);
          /*console.log(pmbId);
          console.log(this.allItems)
          console.log(this.currentItems.person)*/
          if (this.currentItems.person.length === 0) {
            this.noItems = true;
          }
        } else if (this.categoryShort === 'i') {
          await this.$refs['instTable'];
          const rowposition = this.$refs.instTable.sortedItems.findIndex(p => p['$']['xml:id'] === pmbId);
          this.currentPage = Math.ceil(rowposition / this.perPage)
          await document.querySelectorAll(".highlighted-row");
          document.querySelectorAll(".highlighted-row")[0].scrollIntoView();
          if (this.currentItems.org.length === 0) {
            this.noItems = true;
          }
        } else if (this.categoryShort === 'o') {
          await this.$refs['placeTable'];
          const rowposition = this.$refs.placeTable.sortedItems.findIndex(o => o['$']['xml:id'] === pmbId);
          this.currentPage = Math.ceil(rowposition / this.perPage);
          await document.querySelectorAll(".highlighted-row");
          document.querySelectorAll(".highlighted-row")[0].scrollIntoView();
          if (this.currentItems.place.length === 0) {
            this.noItems = true;
          }
        } else if (this.categoryShort === 'w') {
          await this.$refs['workTable'];
          const rowposition = this.$refs.workTable.sortedItems.findIndex(o => o['$']['xml:id'] === pmbId);
          this.currentPage = Math.ceil(rowposition / this.perPage);
          await document.querySelectorAll(".highlighted-row");
          document.querySelectorAll(".highlighted-row")[0].scrollIntoView();
          if (this.currentItems.work.length === 0) {
            this.noItems = true;
          }
        }
      }
    }
  },
  created() {
    this.setCategory();
    if (this.$route.query) {
      this.query = this.$route.query;
    }

  },
  async mounted() {
    this.caseInfo = this.$store.getters.caseInfo;
    this.downloadRegistry();

  },
  watch: {
    $route() {
      this.setCategory();
      this.downloadRegistry();
      this.showDetails = false;
      this.noItems = false;
      this.keyword = null;
      this.currentPage = 1;
    },
    async allItems() {
      if (this.query && this.query.pmbId) {
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

.c{
  display: flex;
  justify-content: center;
  margin: 1rem;
}

.message {
  margin: 5rem;
}


</style>
<style>
.highlighted-row {
  font-weight:bold;
}

.title-column {
  max-width:300px;
  min-width:300px;
}
</style>