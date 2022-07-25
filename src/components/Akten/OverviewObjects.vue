<template>
  <main>
    <div class="filter-nav">
      <p v-if="categorySet" class="navigation">
        Akten-Edition
        <b-icon class="mx-1 breadcrumbarrow" icon="chevron-right" shift-v="-10" font-scale="0.7"></b-icon>
        <router-link
          router-link
          class="nav-link"
          :to="'/akten-edition/' + catLower"
        >
          {{ this.category }}
        </router-link>
        <b-icon class="mx-1 breadcrumbarrow" icon="chevron-right" shift-v="-10" font-scale="0.7"></b-icon>
        <router-link
          router-link
          class="nav-link"
          :to="
            '/akten-edition/' + catLower + '/' + subCatLower + '/collections'
          "
        >
          {{ this.showSubCat }}
        </router-link>
        <b-icon class="mx-1 breadcrumbarrow" icon="chevron-right" shift-v="-10" font-scale="0.7"></b-icon>
        <span class="semibold">{{ this.caseTitle }}</span>
      </p>
      <p v-if="!categorySet" class="navigation">
        Akten-Edition
        <b-icon class="mx-1 breadcrumbarrow" icon="chevron-right" shift-v="-10" font-scale="0.7"></b-icon>
        <span  class="semibold">{{ this.caseTitle }}</span>
      </p>
      <div class="filters">
        <div v-if="catLower !== 'kultur' && catLower !== 'politik'" class="searchPers">
          <input
            class="vt vtp"
            placeholder="Person:"
            list="persons"
            v-model="kwP"
            @keyup.enter="setCurrPers(kwP)"
          />
          <datalist id="persons">
            <option
              v-for="pers in this.allPersons"
              :key="pers.key"
              :value="pers.value"
            >
              {{ pers.value }}
            </option>
          </datalist>
        </div>
        <Search
          class="py-2 vt"
          ref="search"
          v-bind:col-id="colId"
          v-on:searchPerformed="searchPerformed($event)"
        ></Search>
        <span class="lbls">
          <div class="lbl" v-for="pers in currPersons" :key="pers.key">
            {{ pers.value }}
            <svg
              v-on:click="removePers(pers.key)"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
        </span>

        <div class="reset-filter">
          <button
            type="button"
            class="btn btn-secondary btn-sm reset-button"
            v-on:click="resetFilter"
          >
            Filter zurücksetzen
          </button>
        </div>

        <input
          class="vt vtt"
          type="text"
          placeholder="Dokument-Titel:"
          v-model="kwT"
          @keyup="filterAll()"
        />
      </div>
    </div>
    <!--   <div class="search-wrapper">
          <Search class="py-2" v-bind:col-id="colId" v-on:searchPerformed="searchPerformed($event)"></Search>
        </div>-->

    <div class="case-info">
      <p class="font-weight-bold">{{ this.caseTitle }}</p>
      <div v-if="loading">
        <p>Dokumente werden geladen.</p>
        <div class="loader"></div>
      </div>
      <b-button class="item"  v-if="!loading && this.caseData.doc_objs.length === 1" v-b-toggle.collapse-1-summary>{{ this.caseData.doc_objs.length }} Dokument: Zusammenfassung</b-button>
      <b-button class="item"  v-if="!loading && this.caseData.doc_objs.length !== 1" v-b-toggle.collapse-1-summary>{{ this.caseData.doc_objs.length }} Dokumente: Zusammenfassung</b-button>
       <b-collapse id="collapse-1-summary" class="mt-2 my-2">
        <IntrotextCollection class="mx-auto" v-if="this.caseData" :colid="this.numericColId" />
       </b-collapse>
      <div v-if="searchView">
        <b-col>
         <!-- <h5>Suchergebnisse zu "{{ this.keyword }}":</h5>
          <div v-if="searchResultsCount === 0">Keine Ergebnisse</div>
          <div v-else-if="searchResultsCount === 1">
            {{ searchResults.length }} Ergebnis
          </div>
          <div v-else-if="searchResultsCount >= 1">
            {{ searchResultsCount }} Ergebnisse
          </div>-->
          <button
            type="button"
            class="btn btn-secondary btn-sm mt-1"
            v-on:click="toggleView"
          >
            Zurück zur Fallansicht
          </button>
        </b-col>
      </div>
    </div>
    <div class="w-100 mt-5">
      <svg v-on:click="prevDocs()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
           class="bi bi-arrow-left text-bottom" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
      </svg>

      <span>
          Seite {{ currPage }} von {{ Math.ceil(this.filteredObjs.length / this.step) }}
    </span>

      <svg v-on:click="nextDocs()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
           class="bi bi-arrow-right text-bottom" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
      </svg>
    </div>
    <div class="cards-wrapper">
      <div class="card-deck">
        <div class="card" v-for="(val,idx) in  this.currentDocObjs" v-bind:key="val.title + idx">
          <div v-if="val.facs === '' || val.facs === 'no facs'">
            <p>Kein Bild vorhanden</p>
          </div>
          <img
            v-else
            class="embedded-img"
            :src="fixFacsSize(val.facs)"
            @error="fallbackImage"
            alt="facsimile"
            v-on:click="navToLesefassung(val)"
          />
          <div class="case-data scroll">
            <h6 class="card-title cursor-pointer" v-on:click="navToLesefassung(val)">
              <b>{{ val.title }}</b>
            </h6>
            <!--<span v-if="Object.keys(val.persons).length > 0">
              <p><b>Beteiligte:</b></p>
              <div
                class="pmb-link"
                v-for="(name,pmbid) in val.persons"
                :key="pmbid"
                v-on:click="navToPMBActor($event, pmbid)"
              >
                {{ name }}
              </div>
            </span>
            <div v-else>Beteiligte: -</div>-->
            <p v-if="val.date!==''">{{new Date(val.date).toLocaleDateString('de-DE', {year: 'numeric', month: 'long', day: 'numeric' })}}</p>
            <span v-if="Object.keys(val.places).length > 0">
              <p class="p-s">Orte:</p>
              <div
                class="pmb-link"
                v-for="(name,pmbid) in val.places"
                :key="pmbid"
                v-on:click="navToPMBPlace($event, pmbid)"
              >
                {{ name }}
              </div>
            </span>
            <div v-else>Orte: -</div>
          </div>
        </div>
      </div>
      <!--      <div v-if="searchView" class="card-deck">
        <div class="card" v-for="val in searchResults" v-bind:key="val.title" v-on:click="navToLesefassung(val)">
          <h4 class="card-title"> {{ val.title }}</h4>
          <p> {{ val.id }}</p>

          <h5>Treffer Volltextsuche:</h5>
          <b-row v-for="(kwic, i) in val.kwic" :key="`kw${i}`">
            <p v-html="kwic" class="text-left"></p>
          </b-row>
        </div>
      </div>-->
      <div v-if="searchView" class="list-items">
         <div>
         <svg :class="{'disabled':this.$refs.search.offset === 0}" v-on:click="prev()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
           class="bi bi-arrow-left text-bottom" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
      </svg>
      <span>{{ totalResultCount }}  Ergebnisse für "{{ keyword }}"</span><span>
    </span>
       <svg :class="{'disabled':this.$refs.search.offset + searchResultsCount >= totalResultCount}" v-on:click="next()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
           class="bi bi-arrow-right text-bottom" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
      </svg>
      <div v-if="this.$refs.search.loading && this.$refs.search.showMainLoader===false" class="loader"></div>
      </div>
        <div v-for="item in searchResults" v-bind:key="item.key">
          <SearchResultItem
            v-bind:item="item"
            v-on:nav-to-objects="navToObjects($event)"
          ></SearchResultItem>
        </div>
      </div>
    </div>
    <div class="w-100 mt-5">
      <svg v-on:click="prevDocs()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
           class="bi bi-arrow-left text-bottom" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
      </svg>

      <span>
          Seite {{ currPage }} von {{ Math.ceil(this.filteredObjs.length / this.step) }}
    </span>

      <svg v-on:click="nextDocs()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
           class="bi bi-arrow-right text-bottom" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
      </svg>
    </div>
  </main>
</template>

<script>
import { getObjectWithId } from "@/services/ARCHEService";
import { ARCHErdfQuery } from "arche-api/src";
import Search from "../Search";
import { getArcheIdFromXmlId } from "../../services/ARCHEService";
import fallbackImage from "@/assets/noimage.svg";
import SearchResultItem from "./SearchResultItem";
import IntrotextCollection from "./IntrotextCol.vue";

export default {
  name: "OverviewObjects",
  components: {
    Search: Search,
    SearchResultItem,
    IntrotextCollection,
  },
  data: function () {
    return {
      colId: -1,
      objects: [],
      searchResults: [],
      searchResultsCount: Number,
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
      showSubCat: null,
      categorySet: true,
      caseInfo: null,
      allPersons: [],
      currPersons: [],
      currObjects: [],
      kwT: null,
      kwP: [],
      idxD: 10,
      step: 10,
      currentDocObjs: [],
      filteredObjs: [],
      currPage: 1,
      totalResultCount: Number,

      r: "Recht",
      k: "Kultur",
      p: "Politik",
      pR: "Privatrecht",
      sR: "Strafrecht",
      vR: "Verwaltungsrecht",
      zR: "Zivilrecht",
      fK: "Die Fackel",
      tK: "Theater",
      vK: "Verlage",
      mK: "Medienhistorisches",
      bK: "Berichtigung (Ausgang)",
      bbK: "Berliner Tageblatt",
      sK: "Die Stunde, Békessy",
      schK: "Schober, 15. Juli 1927",
      sP: "Sozialdemokratie",
      cP: "Christlich-sozial",
      nP: "Nationalsozialismus",
    };
  },
  computed: {
    numericColId() {
      return parseInt(this.xmlIdCase.replace(/(^C_|\.xml$)/mg,""));
    },
  },
  methods: {
    fallbackImage: function (e) {
      return (e.target.src = `${fallbackImage}`);
    },
    navToLesefassung: function (val) {
      getArcheIdFromXmlId(val.id, rs =>{
        let id = rs;
        if (this.categorySet) {
          if (this.searchView && this.val) {
            
            let text = new DOMParser().parseFromString(val.kwic[0], "text/html")
                .documentElement.textContent;
            //remove multiple whitespaces
            let contextNoMultSpace = text.replace(/\s\s+/g, " ").substring(0, 20);
           /* this.$router.push({
              name: "lesefassung",
              params: {
                id: id,
                cat: this.category,
                subcat: this.subCategory,
                case: this.caseTitle,
                searchTermContext: contextNoMultSpace,
              },
            });*/
           let routeData = this.$router.resolve({name: 'lesefassung', params: {id: this.item.id}, query: {cat: this.category,
              subcat: this.subCategory,
              searchTermContext: contextNoMultSpace
            }
            });
            window.open(routeData.href, '_blank');
          } else {
           /* this.$router.push({
              name: "lesefassung",
              params: {
                id: id,
                cat: this.category,
                subcat: this.subCategory,
                case: this.caseTitle,
              },
            });*/
            let routeData = this.$router.resolve({name: 'lesefassung', params:{id:id}, query: {
                cat: this.category,
                subcat: this.subCategory,
               // case: this.caseTitle,
              }});
            window.open(routeData.href, '_blank');
          }
        } else {
          /*this.$router.push({
            name: "lesefassung",
            params: { id: id, case: this.caseTitle },
          });*/
         let routeData = this.$router.resolve({name: 'lesefassung', params:{id:id}})
          window.open(routeData.href, '_blank');
        }
      });

    },
    nextDocs() {
      if (this.currPage * this.step < this.filteredObjs.length) {
        
        this.currentDocObjs = this.filteredObjs.slice(this.currPage * this.step, this.currPage * this.step + this.step);
        this.currPage++;
      }
      //this.currPage  < this.filteredObjs.length; 
      //console.log("y")
      
      /*if ((this.idxD + this.step) < this.filteredObjs.length) {
        //more than 10 cases left
        this.currPage++;
        this.currentDocObjs = this.filteredObjs.slice(this.idxD, this.idxD + this.step);
        this.idxD += this.step;
        this.currPage++;
      }else{
        this.currentDocObjs = this.filteredObjs.slice(this.idxD);
        this.idxD = this.filteredObjs.length-1;
        this.currPage++;
      }
      console.log(this.filteredObjs)*/
    },
    prevDocs() {
      if (this.currPage > 1) {
        this.currPage--;
        this.currentDocObjs = this.filteredObjs.slice(this.currPage * this.step - this.step, this.currPage * this.step - this.step + this.step);
      /*if ((this.idxD - this.step) > 0) {
        //more than 10 cases left
        this.idxD -= this.step;
        this.currentDocObjs = this.filteredObjs.slice(this.idxD - this.step, this.idxD);
        this.currPage--;
      }else{
        this.currentDocObjs = this.filteredObjs.slice(0, this.idxD);
        this.idxD = 1;
        this.currPage--;
      }*/
      }
    },
    fixFacsSize(url) {
      return url.replace("full/full/", "full/304,/");
    },
    getIdFromUrl(url) {
      let idx = url.lastIndexOf("/");
      return url.substring(idx + 1);
    },
    setCurrPageAndCategory() {
      //category
      if (this.path.toString().includes("recht")) {
        this.category = this.r;
      } else if (this.path.toString().includes("kultur")) {
        this.category = this.k;
      } else if (this.path.toString().includes("politik")) {
        this.category = this.p;
      } else {
        //directly accessed overview objects
        this.categorySet = false;
      }

      this.catLower = this.category.toString().toLowerCase();
      //currPage
      if (this.path.toString().includes("privatrecht")) {
        this.subCategory = this.pR;
      } else if (this.path.toString().includes("strafrecht")) {
        this.subCategory = this.sR;
      } else if (this.path.toString().includes("verwaltungsrecht")) {
        this.subCategory = this.vR;
      } else if (this.path.toString().includes("zivilrecht")) {
        this.subCategory = this.zR;
      } else if (this.path.toString().includes("fackel")) {
        this.subCategory = this.fK;
      } else if (this.path.toString().includes("theater")) {
        this.subCategory = this.tK;
      } else if (this.path.toString().includes("verlage")) {
        this.subCategory = this.vK;
        this.showSubCat = "Verlage";
      } else if (this.path.toString().includes("stunde")) {
        this.subCategory = this.sK;
      } else if (this.path.toString().includes("schober")) {
        this.subCategory = this.schK;
      } else if (this.path.toString().includes("tageblatt")) {
        this.subCategory = this.bbK;
        this.showSubCat = "Berliner Tageblatt";
      } else if (this.path.toString().includes("medienhistorisches")) {
        this.subCategory = this.mK;
      } else if (this.path.toString().includes("berichtigung")) {
        this.subCategory = this.bK;
      } else if (this.path.toString().includes("sozialdemokratie")) {
        this.subCategory = this.sP;
      } else if (this.path.toString().includes("christlich-sozial")) {
        this.subCategory = this.cP;
        this.showSubCat = "Christlichsozial";
      } else if (this.path.toString().includes("nationalsozialismus")) {
        this.subCategory = this.nP;
      }

      if (this.subCategory === this.fK) {
        this.subCatLower = "fackel";
      } else if (this.subCategory === this.sK) {
        this.subCatLower = "die-stunde";
      } else if (this.subCategory === this.schK) {
        this.subCatLower = "schober";
      } else if (this.subCategory === this.bbK) {
        this.subCatLower = "tageblatt";
      } else {
        this.subCatLower = this.subCategory.toString().toLowerCase();
      }

      if (this.showSubCat === null) {
        this.showSubCat = this.currSubCat;
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
       this.totalResultCount = event.totalResultCount;
      this.keyword = event.keyword;
    },
    toggleView() {
      this.searchView = false;
    },
    navToPMBActor(event, pmbid) {
      let url =
        "https://pmb.acdh.oeaw.ac.at/apis/entities/entity/person/" +
        pmbid.replace('pmb','') +
        "/detail";
      window.open(url, "_blank").focus();
    },
    navToPMBPlace(event, pmbid) {
      let url =
        "https://pmb.acdh.oeaw.ac.at/apis/entities/entity/place/" +
        pmbid.replace('pmb','') +
        "/detail";
      window.open(url, "_blank").focus();
    },
    setCurrPers(kwP) {
      //get key of person and add person to this.currPersons
      for (var key in this.allPersons) {
        if (this.allPersons[key].value === kwP) {
          //check if person is already in this.currPersons
          if (
            !this.currPersons.filter((p) => p.key === this.allPersons[key].key)
              .length > 0
          ) {
            //remove leading '#' from key
            this.currPersons.push({
              key: this.allPersons[key].key,
              value: this.allPersons[key].value,
            });
          }
        }
      }

      this.filterAll();
    },
    filterAll() {
      //extract objects that contain all persons in this.currPerson and match title
      let temp = [];
      //possible bottlenecks
      this.caseData.doc_objs.forEach((o) => {
        let containsAll = true;
        //check if all p in currPersons are in o.actors
        this.currPersons.forEach((p) => {
          //Kraus is not mentioned in the actors of case-info.json, since he is part of every case
          if (!p.value.includes("Kraus")) {
           /* let match = false;
            o.actorObjs.forEach((o) => {
              if (o.name === p.value) {
                match = true;
              }
            });
            if (match === false) {
              containsAll = false;
            }*/
            if (!o.persons[p.key]) {
            containsAll = false;
          }
          }
        });

        if (this.kwT) {
          if (!(o.title.toUpperCase().includes(this.kwT.toUpperCase()))) {
            containsAll = false;
          }
        }
        console.log(o)
        console.log(containsAll);
        if (containsAll === true) {
          temp.push(o);
        }
      });
      //this.currObjects = temp;
      this.filteredObjs = temp;
  
      this.kwP = null;
      this.kwO = null;
    },
    resetFilter() {
      this.currPersons = [];
      this.kwO = null;
      this.kwT = null;
      this.filteredObjs = JSON.parse(JSON.stringify(this.docObjs));
      //this.currCases = this.cases;
    },
    removePers(key) {
      for (let i = 0; i < this.currPersons.length; i++) {
        if (this.currPersons[i].key === key) {
          this.currPersons = this.currPersons.filter((p) => p.key !== key);
        }
      }
      this.filterAll();
    },
    navToObjects: async function (event) {
      let id = event.id;
      if (!id.includes("_")) {
        if (this.currSubCat === this.pR) {
          this.$router.push({
            name: "privatrecht-objects",
            params: { id: id },
          });
        } else if (this.currSubCat === this.sR) {
          this.$router.push({ name: "strafrecht-objects", params: { id: id } });
        } else if (this.currSubCat === this.vR) {
          this.$router.push({
            name: "verwaltungsrecht-objects",
            params: { id: id },
          });
        } else if (this.currSubCat === this.zR) {
          this.$router.push({ name: "zivilrecht-objects", params: { id: id } });
        } else if (this.currSubCat === this.fK) {
          this.$router.push({ name: "fackel-objects", params: { id: id } });
        } else if (this.currSubCat === this.tK) {
          this.$router.push({ name: "theater-objects", params: { id: id } });
        } else if (this.currSubCat === this.vK) {
          this.$router.push({ name: "verlage-objects", params: { id: id } });
        } else if (this.currSubCat === this.sK) {
          this.$router.push({ name: "stunde-objects", params: { id: id } });
        } else if (this.currSubCat === this.mK) {
          this.$router.push({
            name: "medienhistorisches-objects",
            params: { id: id },
          });
        } else if (this.currSubCat === this.bK) {
          this.$router.push({
            name: "berichtigung-objects",
            params: { id: id },
          });
        } else if (this.currSubCat === this.schK) {
          this.$router.push({ name: "schober-objects", params: { id: id } });
        } else if (this.currSubCat === this.bbK) {
          this.$router.push({ name: "tageblatt-objects", params: { id: id } });
        } else if (this.currSubCat === this.sP) {
          this.$router.push({
            name: "sozialdemokratie-objects",
            params: { id: id },
          });
        } else if (this.currSubCat === this.cP) {
          this.$router.push({
            name: "christlich-sozial-objects",
            params: { id: id },
          });
        } else if (this.currSubCat === this.nP) {
          this.$router.push({
            name: "nationalsozialismus-objects",
            params: { id: id },
          });
        } else {
          this.$router.push({ name: "overview-objects", params: { id: id } });
        }
      } else {
        getArcheIdFromXmlId(event.id, (rs) => {
          id = rs;
          if (this.currSubCat === this.pR) {
            this.$router.push({
              name: "privatrecht-objects",
              params: { id: id },
            });
          } else if (this.currSubCat === this.sR) {
            this.$router.push({
              name: "strafrecht-objects",
              params: { id: id },
            });
          } else if (this.currSubCat === this.vR) {
            this.$router.push({
              name: "verwaltungsrecht-objects",
              params: { id: id },
            });
          } else if (this.currSubCat === this.zR) {
            this.$router.push({
              name: "zivilrecht-objects",
              params: { id: id },
            });
          } else if (this.currSubCat === this.fK) {
            this.$router.push({ name: "fackel-objects", params: { id: id } });
          } else if (this.currSubCat === this.tK) {
            this.$router.push({ name: "theater-objects", params: { id: id } });
          } else if (this.currSubCat === this.vK) {
            this.$router.push({ name: "verlage-objects", params: { id: id } });
          } else if (this.currSubCat === this.sK) {
            this.$router.push({ name: "stunde-objects", params: { id: id } });
          } else if (this.currSubCat === this.mK) {
            this.$router.push({
              name: "medienhistorisches-objects",
              params: { id: id },
            });
          } else if (this.currSubCat === this.bK) {
            this.$router.push({
              name: "berichtigung-objects",
              params: { id: id },
            });
          } else if (this.currSubCat === this.schK) {
            this.$router.push({ name: "schober-objects", params: { id: id } });
          } else if (this.currSubCat === this.bbK) {
            this.$router.push({
              name: "tageblatt-objects",
              params: { id: id },
            });
          } else if (this.currSubCat === this.sP) {
            this.$router.push({
              name: "sozialdemokratie-objects",
              params: { id: id },
            });
          } else if (this.currSubCat === this.cP) {
            this.$router.push({
              name: "christlich-sozial-objects",
              params: { id: id },
            });
          } else if (this.currSubCat === this.nP) {
            this.$router.push({
              name: "nationalsozialismus-objects",
              params: { id: id },
            });
          } else {
            this.$router.push({ name: "overview-objects", params: { id: id } });
          }
        });
      }
    },
    prev() {
      this.$refs.search.performFullTextSearch('prevPage',false)
    },
    next() {
      if (this.$refs.search.offset + this.searchResultsCount < this.totalResultCount) {
        this.$refs.search.performFullTextSearch('nextPage',false)
      }
    },
  },
  created() {
    this.colId = this.$route.params.id;
    this.path = this.$route.path;
    this.setCurrPageAndCategory();
    this.caseInfo = this.$store.getters.caseInfo;
    if (isNaN(parseInt(this.colId)) || this.colId === -1) {
      this.$router.push({ name: "home" });
      //todo: go to "home" when id-parameter is empty
    }
    getObjectWithId(this.colId, (result) => {
      // query:
      const optionsTitle = {
        subject: null,
        predicate: "https://vocabs.acdh.oeaw.ac.at/schema#hasTitle",
        object: null,
        expiry: 14,
      };

      const optionsXmlId = {
        subject: null,
        predicate: "https://vocabs.acdh.oeaw.ac.at/schema#hasIdentifier",
        object: null,
        expiry: 14,
      };

      const optionsSize = {
        subject: null,
        predicate: "https://vocabs.acdh.oeaw.ac.at/schema#hasNumberOfItems",
        object: null,
        expiry: 14,
      };
    
    
      this.caseTitle = ARCHErdfQuery(
        optionsTitle,
        result
      ).value[0].hasTitle.object;
      //let xmlId = ARCHErdfQuery(optionsXmlId, result).value[1].hasIdentifier.object;
      let archeIdentifiers = ARCHErdfQuery(optionsXmlId, result).value;
      let xmlId = archeIdentifiers.map(aI => aI.hasIdentifier.object).filter(id => id.includes('https://id.acdh.oeaw.ac.at/legalkraus/'))[0];
      let documents = ARCHErdfQuery(optionsSize, result).value[0]
        .hasNumberOfItems.object;

      let idx1 = documents.lastIndexOf("^");
      this.numberDocuments = documents.substring(0, idx1 - 1);

      let idx2 = xmlId.lastIndexOf("/");
      this.xmlIdCase = xmlId.substring(idx2 + 1) + ".xml";
      console.log(this.xmlIdCase)

      this.caseInfo.then((data) => {
        this.caseData = data.cases.filter((cs) => cs.id === this.xmlIdCase)[0];
        for (var name in this.caseData.men_pers) {
          let p = {};
          p.key = name;
          p.value = this.caseData.men_pers[name];
          this.allPersons.push(p);
        }
        this.loading = false;
        /*getObjectsOfCollection(this.colId, async (result) => {
          let objs = result.filter(r => !r.identifier.includes('C_'));
          objs.sort(function(a,b){
            let aId = a.identifier.substring(a.identifier.lastIndexOf('/') + 1);
            let bId = b.identifier.substring(b.identifier.lastIndexOf('/') + 1);
            let aIdNum = parseInt(aId.replace("D_","").replaceAll('-',''));
            let bIdNum = parseInt(bId.replace("D_","").replaceAll('-',''));

            return aIdNum - bIdNum;
          });*/

        //get facs preview, actors, places
        /*for (const o of objs) {
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
        });*/
        this.filteredObjs = JSON.parse(JSON.stringify(this.caseData.doc_objs)); //deep copy
        //this.filteredObjs = this.caseData.doc_objs;
      });
    });
  },
  watch: {
    filteredObjs() {
      console.log("watcher")
      this.currentDocObjs = this.filteredObjs.slice(0, this.idxD);
    },
  }
};
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

.list-items {
  margin-left: 2rem;
  margin-right: 2rem;
  padding-left: 2rem;
  width: 100%;
}

.case-info {
  margin: 2rem;
}

.p-s {
  font-weight: bold;
}

.pmb-link {
  cursor:pointer
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
  color: #c85545;
}

.nav-link {
  display: inline;
  color: black;
  padding: 0;
  margin: 0;
}

.nav-link:hover {
  color: #c85545;
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
  margin-bottom: 2rem;
  margin-top: 0;
  height: fit-content;
}

.searchPers {
  margin-left: 2rem;
}

.item {
  background-color: var(--primary-red) !important;
  color: var(--text-white);
  border-radius: 0.25rem;
  border: transparent;
  padding: 0.5rem;
}

.item:hover, .item:active {
  background-color: var(--primary-red-dark)!important;
}

svg.disabled {
  fill:#CCC;
}

</style>