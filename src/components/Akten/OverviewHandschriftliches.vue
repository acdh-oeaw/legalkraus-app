<template>
  <main>
    <div class="filter-nav">
      <p class="navigation">
        Akten-Edition
        <b-icon
          class="mx-1 breadcrumbarrow"
          icon="chevron-right"
          shift-v="-10"
          font-scale="0.7"
        ></b-icon>
        <span class="semibold">Handschriftliches</span>
      </p>
      <div class="filters">
        <!--<div class="searchPers">
          <input class="vt vtp" placeholder="Person:" list="persons" v-model="kwP" @keyup.enter="setCurrPers(kwP)"/>
          <datalist id="persons">
            <option v-for="pers in this.allPersons" :key="pers.key" :value="pers.value">{{ pers.value }}</option>
          </datalist>
        </div>-->
        <div class="searchMat ml-5">
          <input
            class="vt vtm"
            placeholder="Material:"
            list="mats"
            v-model="kwM"
            @keyup.enter="setCurrMat(kwM)"
          />
          <datalist id="mats">
            <option v-for="m in this.matTypeStrings" :key="m" :value="m">
              {{ m }}
            </option>
          </datalist>
        </div>
        <Search
          class="py-2 vt"
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
          <div class="lbl" v-for="m in currMat" :key="m">
            {{ m }}
            <svg
              v-on:click="removeMat(m)"
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

        <input
          class="vt vtt"
          type="text"
          placeholder="Dokument-Titel:"
          v-model="kwT"
          @keyup="filterAll()"
        />
      </div>
    </div>
    <div class="w-100 mt-5">
      <svg
        v-on:click="prevDocs()"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="bi bi-arrow-left text-bottom"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
        />
      </svg>
      <span>
        Seite {{ currPage }} von
        {{ Math.ceil(this.filteredObjs.length / this.step) }}
      </span>

      <svg
        v-on:click="nextDocs()"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="bi bi-arrow-right text-bottom"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
        />
      </svg>
    </div>
    <div class="cards-wrapper">
      <div class="card-deck">
        <div class="card" v-for="val in currentDocObjs" v-bind:key="val.id">
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
            <h6
              class="card-title cursor-pointer"
              v-on:click="navToLesefassung(val)"
            >
              <b>{{ val.title }}</b>
            </h6>
            <p v-if="val.date !== ''">
              {{
                new Date(val.date).toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </p>
            <div style="padding-bottom: 1rem">
              <span
                class="d-block"
                v-for="(mat, idx) in val.materiality"
                :key="`mat${idx}`"
                >{{ mat
                }}<span v-if="idx < val.materiality.length - 1">,</span></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-100 mt-5">
      <svg
        v-on:click="prevDocs()"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="bi bi-arrow-left text-bottom"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
        />
      </svg>

      <span>
        Seite {{ currPage }} von
        {{ Math.ceil(this.filteredObjs.length / this.step) }}
      </span>

      <svg
        v-on:click="nextDocs()"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="bi bi-arrow-right text-bottom"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
        />
      </svg>
    </div>
  </main>
</template>

<script>
import fallbackImage from "@/assets/noimage.svg";
import { getArcheIdFromXmlId } from "../../services/ARCHEService";

export default {
  name: "OverviewHandschriftliches",
  data: function () {
    return {
      matTypeStrings: [
        "Druck mit handschriftlichen Annotationen",
        "Druck mit handschriftlichen Überarbeitungen",
        "Durchschlag mit handschriftlichen Annotationen",
        "Durchschlag mit handschriftlichen Überarbeitungen",
        "Durchschlag mit handschriftlicher Mitteilung",
        "Durchschlag mit sonstigen Schreibspuren",
        "Manuskript",
        "Manuskript mit handschriftlichen Annotationen",
        "Manuskript mit handschriftlicher Mitteilung",
        "Typoskript mit handschriftlichen Annotationen",
        "Typoskript mit handschriftlichen Überarbeitungen",
        "Typoskript mit handschriftlicher Mitteilung",
        "Typoskript mit sonstigen Schreibspuren",
      ],
      allPersons: [],
      currPersons: [],
      currMat: [],
      searchResults: [],
      searchResultsCount: Number,
      keyword: String,
      kwT: null,
      kwP: [],
      kwM: [],
      docObjs: [],
      filteredObjs: [],
      currentDocObjs: [],
      idxD: 10,
      step: 10,
      currPage: 1,
    };
  },
  methods: {
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
              key: this.allPersons[key].key.substring(1),
              value: this.allPersons[key].value,
            });
          }
        }
      }
      this.filterAll();
    },
    setCurrMat(kwM) {
      this.currMat.push(kwM);
      this.filterAll();
    },
    filterAll() {
      this.currPage = 1;
      //extract docs that contain all persons in this.currPerson and all orgs in this.currOrgs and match title and year
      let temp = [];
      this.docObjs.forEach((d) => {
        let containsAll = true;
        this.currPersons.forEach((p) => {
          if (!d.persons[p.key]) {
            containsAll = false;
          }
        });

        if (
          !this.currMat
            .map((m) => m.toUpperCase())
            .some(
              (r) => d.materiality.map((dm) => dm.toUpperCase()).indexOf(r) >= 0
            )
        ) {
          containsAll = false;
        }

        /* this.currMat.forEach(m => {
        
          if (!(d.materiality[0].toUpperCase() === m.toUpperCase())) {
            containsAll = false;
          }
        });*/

        if (this.kwT) {
          if (!d.title.toUpperCase().includes(this.kwT.toUpperCase())) {
            containsAll = false;
          }
        }
        if (containsAll === true) {
          temp.push(d);
        }
      });
      this.filteredObjs = temp;
      this.kwP = null;
      this.kwM = null;
    },
    toggleView() {
      this.searchView = !this.searchView;
    },
    resetFilter() {
      this.currMat = [];
      this.currPersons = [];
      this.kwP = null;
      this.kwT = null;
      this.filteredObjs = JSON.parse(JSON.stringify(this.docObjs)); //deep copy
    },
    removePers(key) {
      for (let i = 0; i < this.currPersons.length; i++) {
        if (this.currPersons[i].key === key) {
          this.currPersons = this.currPersons.filter((p) => p.key !== key);
        }
      }
      this.filterAll();
    },
    removeMat(key) {
      this.currMat = this.currMat.filter((m) => m !== key);
      this.filterAll();
    },
    removeOrg(key) {
      for (let i = 0; i < this.currOrgs.length; i++) {
        if (this.currOrgs[i].key === key) {
          this.currOrgs = this.currOrgs.filter((o) => o.key !== key);
        }
      }
      this.filterAll();
    },
    /*nextDocs() {
      if ((this.idxD + this.step) < this.filteredObjs.length) {
        //more than 10 cases left
        this.currentDocObjs = this.filteredObjs.slice(this.idxD, this.idxD + this.step);
        this.idxD += this.step;
        this.currPage++;
      }else{
        this.currentDocObjs = this.filteredObjs.slice(this.idxD);
        this.idxD = this.filteredObjs.length-1;
        this.currPage++;
      }
    },*/
    nextDocs() {
      if (this.currPage * this.step < this.filteredObjs.length) {
        this.currentDocObjs = this.filteredObjs.slice(
          this.currPage * this.step,
          this.currPage * this.step + this.step
        );
        this.currPage++;
      }
    },
    prevDocs() {
      if (this.currPage > 1) {
        this.currPage--;
        this.currentDocObjs = this.filteredObjs.slice(
          this.currPage * this.step - this.step,
          this.currPage * this.step - this.step + this.step
        );
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
    /*prevDocs() {
      if ((this.idxD - this.step) > 0) {
        //more than 10 cases left
        this.idxD -= this.step;
        this.currentDocObjs = this.filteredObjs.slice(this.idxD - this.step, this.idxD);
        this.currPage--;
      }else{
        this.currentDocObjs = this.filteredObjs.slice(0, this.idxD);
        this.idxD = 1;
        this.currPage--;
      }
    },*/
    fixFacsSize(url) {
      return url.replace("full/full/", "full/304,/");
    },
    fallbackImage: function (e) {
      return (e.target.src = `${fallbackImage}`);
    },
    getIdFromUrl(url) {
      let idx = url.lastIndexOf("/");
      return url.substring(idx + 1);
    },
    navToLesefassung: function (val) {
      let xmlid = this.getIdFromUrl(val.id);
      getArcheIdFromXmlId(xmlid, (rs) => {
        if (this.categorySet) {
          /*this.$router.push({
            name: "lesefassung",
            params: {id: rs, cat: this.category, subcat: this.subCategory, case: this.caseTitle}
          });*/
          let routeData = this.$router.resolve({
            name: "lesefassung",
            params: { id: rs },
            query: { cat: this.category, subcat: this.subCategory },
          });
          window.open(routeData.href, "_blank");
        } else {
          /* this.$router.push({
          name: "lesefassung",
          params: {id: rs, case: this.caseTitle}
        });*/
          let routeData = this.$router.resolve({
            name: "lesefassung",
            params: { id: rs }
          });
          window.open(routeData.href, "_blank");
        }
      });
    },
    navToPMBActor(event, a) {
      let id = a.pmbId.substring(3); //remove leading 'pmb'
      let url =
        "https://pmb.acdh.oeaw.ac.at/apis/entities/entity/person/" +
        id +
        "/detail";
      window.open(url, "_blank").focus();
    },
    navToPMBPlace(event, pl) {
      let id = pl.pmbId.substring(3); //remove leading 'pmb'
      let url =
        "https://pmb.acdh.oeaw.ac.at/apis/entities/entity/place/" +
        id +
        "/detail";
      window.open(url, "_blank").focus();
    },
  },
  created() {
    //load all docs where materiality is one of the
    let caseInfo = this.$store.getters.caseInfo;
    caseInfo.then((cD) => {
      //extract persons
      for (var name in cD.persons) {
        let p = {};
        p.key = name;
        p.value = cD.persons[name];
        this.allPersons.push(p);
      }
      //verified: every case contains at least one doc that falls into the handschriftlich category
      cD.cases.forEach((c) => {
        c.doc_objs.forEach((d) => {
          if (this.matTypeStrings.some((r) => d.materiality.indexOf(r) >= 0)) {
            // if (this.matTypeStrings.includes(d.materiality[0])) {
            d.pers = [];
            d.pls = [];
            for (const [key, value] of Object.entries(d.persons)) {
              d.pers.push({ pmbId: key, value: value });
            }
            for (const [key, value] of Object.entries(d.places)) {
              d.pls.push({ pmbId: key, value: value });
            }
            this.docObjs.push(d);
          }
        });
      });

      this.filteredObjs = JSON.parse(JSON.stringify(this.docObjs)); //deep copy
    });
  },
  watch: {
    filteredObjs() {
      this.currentDocObjs = this.filteredObjs.slice(0, this.idxD);
    },
  },
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

.vtt {
  display: flex;
  grid-column: 3/4;
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
  grid-template-columns: 20% 20%;
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
  margin-top: 0;
  margin-bottom: 2rem;
  height: fit-content;
}
</style>