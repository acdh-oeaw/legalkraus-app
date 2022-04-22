<template>
  <main>
    <div class="filter-nav">
      <p v-if="categorySet" class="navigation">Akten-Edition
        <span class="arrow">></span>
        <router-link router-link class="nav-link" :to="'/akten-edition/' + catLower">
          {{ this.category }}
        </router-link>
        <span class="arrow">></span>
        <router-link router-link class="nav-link" :to="'/akten-edition/' + catLower + '/'+ subCatLower +'/collections'">
          {{ this.subCategory }}
        </router-link>
        <span class="arrow">></span>
        <span style="font-weight: bold">{{ this.caseTitle }}</span>
      </p>
      <p v-if="!categorySet" class="navigation">Akten-Edition
        <span class="arrow">></span>
        <span style="font-weight: bold">{{ this.caseTitle }}</span>
      </p>
      <div class="filters">
        <div class="searchPers">
          <input class="vt vtp" placeholder="Person:" list="persons" v-model="kwP" @keyup.enter="setCurrPers(kwP)"/>
          <datalist id="persons">
            <option v-for="pers in this.allPersons" :key="pers.key" :value="pers.value">{{ pers.value }}</option>
          </datalist>
        </div>
        <Search class="py-2 vt" v-on:searchPerformed="searchPerformed($event)"></Search>
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
          <button type="button" class="btn btn-secondary btn-sm reset-button" v-on:click="resetFilter">Filter
            zurücksetzen
          </button>
        </div>

        <input class="vt vtt" type="text" placeholder="Dokument-Titel:" v-model="kwT"
               @keyup="filterAll()"/>
      </div>
    </div>
    <!--   <div class="search-wrapper">
          <Search class="py-2" v-bind:col-id="colId" v-on:searchPerformed="searchPerformed($event)"></Search>
        </div>-->
    <div class="case-info">
      <h3> Dokumente des Falles "{{ this.caseTitle }}"</h3>
      <div v-if="loading">
        <p> Dokumente werden geladen. </p>
        <div class="loader"></div>
      </div>

      <p v-else> Dieser Fall hat {{ this.objects.length }} Dokumente. </p>

      <div v-if="searchView">
        <b-col>
          <h5> Suchergebnisse zu "{{ this.keyword }}":</h5>
          <div v-if="searchResultsCount === 0">Keine Ergebnisse</div>
          <div v-else-if="searchResultsCount === 1">{{ searchResults.length }} Ergebnis</div>
          <div v-else-if="searchResultsCount >= 1">{{ searchResultsCount }} Ergebnisse</div>
          <button type="button" class="btn btn-secondary btn-sm" v-on:click="toggleView">Zurück zur Fallansicht</button>
        </b-col>
      </div>
    </div>
    <div class="cards-wrapper">
      <div v-if="!searchView" class="card-deck">
        <div class="card" v-for="val in currObjects" v-bind:key="val.title">
          <div v-if="val.facs === '' || val.facs === 'no facs'">
            <p>Kein Bild vorhanden</p>
          </div>
          <img v-else class="embedded-img" :src="fixFacsSize(val.facs)"
               onerror="this.onerror=null; this.src='../assets/noimage.svg'" alt="facsimile"
               v-on:click="navToLesefassung(val)">
          <div class="case-data scroll">
            <h6 class="card-title" v-on:click="navToLesefassung(val)"><b>{{ val.title }}</b></h6>
            <span v-if="val.actors.length > 0">
              <p> <b>Beteiligte:</b> </p>
            <div class="pmb-link" v-for="a in val.actorObjs" :key="a.identifier" v-on:click="navToPMBActor($event, a)"><!--   v-on:click="navToPMB($event, a)"-->
                {{ a.name }}
              </div>
            </span>
            <div v-if="val.actors.length === 0">Beteiligte: -</div>
            <span v-if="val.places.length > 0">
              <p class="p-s"> Orte:</p>
              <div class="pmb-link" v-for="pl in val.placeObjs" :key="pl.identifier"
                   v-on:click="navToPMBPlace($event, pl)">
                {{ pl.name }}</div>
            </span>
            <div v-if="val.places.length === 0">Orte: -</div>
          </div>
        </div>
      </div>
      <div v-if="searchView" class="card-deck">
        <div class="card" v-for="val in searchResults" v-bind:key="val.title" v-on:click="navToLesefassung(val)">
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
import {getEntity} from "../../services/ARCHEService";

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
      xmlIdCase: null,
      caseData: null,
      loading: true,
      path: String,
      searchView: false,
      subCategory: String,
      category: String,
      catLower: String,
      subCatLower: String,
      categorySet: true,
      caseInfo: null,
      allPersons: [],
      currPersons: [],
      currObjects: [],
      kwT: null,
      kwP: [],

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
      mK: 'Medienhistorisches',
      bK: 'Berichtigung (Ausgang)',
      bbK: 'Berliner Tageblatt, Kerr, Wolff',
      sK: 'Die Stunde, Békessy',
      schK: 'Schober, 15. Juli 1927',
      sP: 'Sozialdemokratie',
      cP: 'Christlich-National',
      nP: 'Nationalsozialismus'
    }
  },
  methods: {
    navToLesefassung: function (val) {
      let id = this.getIdFromUrl(val.url)
      if (this.categorySet) {
        if (this.searchView) {
          let text = new DOMParser()
              .parseFromString(val.kwic[0], "text/html")
              .documentElement.textContent;
          //remove multiple whitespaces
          let contextNoMultSpace = text.replace(/\s\s+/g, ' ').substring(0, 20);
          this.$router.push({
            name: "lesefassung",
            params: {
              id: id,
              cat: this.category,
              subcat: this.subCategory,
              case: this.caseTitle,
              searchTermContext: contextNoMultSpace
            }
          });
        } else {
          this.$router.push({
            name: "lesefassung",
            params: {id: id, cat: this.category, subcat: this.subCategory, case: this.caseTitle}
          });
        }
      } else {
        this.$router.push({
          name: "lesefassung",
          params: {id: id, case: this.caseTitle}
        });
      }


    },
    fixFacsSize(url) {
      return url.replace('full/full/', 'full/304,/')
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
      } else {
        //directly accessed overview objects
        this.categorySet = false;
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
      } else if (this.path.toString().includes('stunde')) {
        this.subCategory = this.sK;
      } else if (this.path.toString().includes('schober')) {
        this.subCategory = this.schK;
      } else if (this.path.toString().includes('tageblatt')) {
        this.subCategory = this.bbK;
      }else if (this.path.toString().includes('medienhistorisches')) {
        this.subCategory = this.mK;
      }else if (this.path.toString().includes('berichtigung')) {
        this.subCategory = this.bK;
      } else if (this.path.toString().includes('sozialdemokratie')) {
        this.subCategory = this.sP;
      } else if (this.path.toString().includes('christlich-national')) {
        this.subCategory = this.cP;
      } else if (this.path.toString().includes('nationalsozialismus')) {
        this.subCategory = this.nP;
      }

      if (this.subCategory === this.fK) {
        this.subCatLower = 'fackel';
      } else if (this.subCategory === this.sK) {
        this.subCatLower = 'die-stunde';
      } else if (this.subCategory === this.schK) {
        this.subCatLower = 'schober';
      } else if (this.subCategory === this.bbK) {
        this.subCatLower = 'berliner-tageblatt';
      } else {
        this.subCatLower = this.subCategory.toString().toLowerCase();
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
    toggleView() {
      this.searchView = false;
    },
    navToPMBActor(event, a) {
      let url = 'https://pmb.acdh.oeaw.ac.at/apis/entities/entity/person/' + a.id + '/detail'
      window.open(url, '_blank').focus();
    },
    navToPMBPlace(event, pl) {
      let url = 'https://pmb.acdh.oeaw.ac.at/apis/entities/entity/place/' + pl.id + '/detail';
      window.open(url, '_blank').focus();
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

      this.filterAll();

    },
    filterAll() {
      //extract objects that contain all persons in this.currPerson and match title
      let temp = [];
      //possible bottleneck
      this.objects.forEach(o => {
        let containsAll = true;

        //check if all p in currPersons are in o.actors
        this.currPersons.forEach(p => {
          //Kraus is not mentioned in the actors of case-info.json, since he is part of every case
          if (!p.value.includes("Kraus")) {
            let match = false;
            o.actorObjs.forEach(o => {
              if(o.name === p.value){
                match = true;
              }
            });
            if(match === false){
              containsAll = false;
            }
          }
        });


        if (this.kwT) {
          if (!(o.title.toUpperCase().includes(this.kwT.toUpperCase()))) {
            containsAll = false;
          }
        }

        if (containsAll === true) {
          temp.push(o)
        }
      });
      this.currObjects = temp;
      this.kwP = null;
      this.kwO = null
    },
    resetFilter() {
      this.currPersons = [];
      this.kwO = null;
      this.kwT = null;
      //this.currCases = this.cases;
    },
    removePers(key) {
      for (let i = 0; i < this.currPersons.length; i++) {
        if (this.currPersons[i].key === key) {
          this.currPersons = this.currPersons.filter(p => p.key !== key);
        }
      }
      this.filterAll();

    },
  },
  created() {
    this.colId = this.$route.params.id;
    this.path = this.$route.path;
    this.setCurrPageAndCategory();
    this.caseInfo = this.$store.getters.caseInfo;
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

      const optionsXmlId = {
        "subject": null,
        "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#hasIdentifier",
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
      let xmlId = ARCHErdfQuery(optionsXmlId, result).value[1].hasIdentifier.object;
      let documents = ARCHErdfQuery(optionsSize, result).value[0].hasNumberOfItems.object;

      let idx1 = documents.lastIndexOf('^');
      this.numberDocuments = documents.substring(0, idx1 - 1);

      let idx2 = xmlId.lastIndexOf('/');
      this.xmlIdCase = xmlId.substring(idx2 + 1) + '.xml';

      this.caseInfo.then(data => {
        const cases = data.cases;
        cases.forEach(c => {
          if (c.id === this.xmlIdCase)
            this.caseData = c;
        });
        for (var name in this.caseData.men_pers) {
          let p = {};
          p.key = name;
          p.value = this.caseData.men_pers[name];
          this.allPersons.push(p);
        }

        getObjectsOfCollection(this.colId, async (result) => {
          let objs = result.filter(r => !r.identifier.includes('C_'));
          objs.sort(function(a,b){
            let aId = a.identifier.substring(a.identifier.lastIndexOf('/') + 1);
            let bId = b.identifier.substring(b.identifier.lastIndexOf('/') + 1);
            let aIdNum = parseInt(aId.replace("D_","").replaceAll('-',''));
            let bIdNum = parseInt(bId.replace("D_","").replaceAll('-',''));

            return aIdNum - bIdNum;
          });

          //get facs preview, actors, places
          for (const o of objs) {
            //extract xml id
            let id = o.identifier.substring(o.identifier.lastIndexOf('/') + 1);

            //facs preview
            this.caseData.doc_objs.forEach(d => {
              if (d.id === id) {
                o.facs = d.facs;
              }
            });

            //actors
            o.actorObjs = [];
            o.actors.forEach(a => {
              let id = a.hasActor.object.substring(a.hasActor.object.lastIndexOf('/') + 1);
              getEntity(id, rs => {
                for (var key in this.caseData.men_pers) {

                  if (this.caseData.men_pers[key] === rs.title) {
                    o.actorObjs.push({
                      id: key.substring(3),
                      name: this.caseData.men_pers[key]
                    });

                  }

                }
              });
            });

            //places
            o.placeObjs = [];
            o.places.forEach(p => {
              let id = p.hasSpatialCoverage.object.substring(p.hasSpatialCoverage.object.lastIndexOf('/') + 1);
              getEntity(id, rs => {
                for (var key in this.caseData.men_pl) {
                  if (this.caseData.men_pl[key] === rs.title) {
                    o.placeObjs.push({
                      id: key.substring(3),
                      name: this.caseData.men_pl[key]
                    });
                  }

                }
              });
            });

            this.loading = false;
          }
          this.objects = objs;
          this.currObjects = objs;
        });

      });

    });

  },
}
</script>

<style scoped>
.card {
  width: 30rem;
  height: 25rem;
  padding: 2rem;
  margin: auto;
  grid-column: auto;
  display: grid;
  grid-template-columns: 40% 60%;
  grid-column-gap: 1rem;
  background-color: var(--secondary-gray-light);
}

.scroll {
  overflow-y: scroll;
}

.embedded-img {
  grid-column: 1/2;
  width: auto;
  cursor: pointer;
}

.case-data {
  grid-column: 2/3;
  margin-top: 3rem;
  text-align: left;
}

.card-title:hover {
  text-decoration: underline;
}

.card-title {
  border-bottom: solid var(--primary-red) 5px;
  padding-bottom: 0.5rem;
  margin-right: 1rem;
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

.case-info {
  margin: 2rem;
}

.p-s {
  padding-top: 2rem;
  font-weight: bold;
}

.pmb-link:hover {
  text-decoration: underline;
}

.cards-wrapper {
  display: flex;
  align-content: center;
}

.search-wrapper {
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

.loader {
  border: 16px solid #f3f3f3;
  border-top: 16px solid var(--primary-red);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 2s linear infinite;
  margin: auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.filter-nav {
  background-color: var(--secondary-gray-meta);
  border-bottom: solid var(--primary-red) 0.3rem;
  margin-left: 2rem;
  margin-right: 2rem;
}

.vt {
  display: flex;
  margin: 2rem;
  font-size: inherit;
}

.vtt {
  display: flex;
  grid-column: 2/3;
  grid-row: 1/2;
  width: fit-content;
  height: fit-content;
}


.lbl {
  background-color: var(--primary-red);
  color: var(--text-white);
  border-radius: 1.25rem;
  width: fit-content;
  padding: 0.1rem 0.3rem;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;

}

.lbls {
  grid-row: 2/3;
  display: inline-flex;
  grid-column: 1/4;
}

.filters {
  display: grid;
  grid-template-columns: repeat(4, minmax(5rem, auto));
  grid-template-rows: auto auto;
}

.reset-filter {
  display: flex;
  grid-row: 1/2;
  grid-column: 4/5;
}

.py-2 {
  display: flex;
  grid-row: 1/2;
  grid-column: 3/4;
  padding: 0;
  margin-left: 0;
}

.reset-button {
  display: flex;
  padding: 0.375rem 0.375rem;
  margin: 2rem;
  height: fit-content;
}


</style>