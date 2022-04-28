<template>
  <main v-if="this.$store.getters.vocabReady">
    <div class="filter-nav">
      <p class="navigation">
        Akten-Edition <span class="arrow">></span> Alle Akten
      </p>
      <div class="filters">
        <div class="searchPers">
          <input class="vt vtp" placeholder="Person:" list="persons" v-model="kwP" @keyup.enter="setCurrPers(kwP)"/>
          <datalist id="persons">
            <option v-for="pers in this.allPersons" :key="pers.key" :value="pers.value">{{ pers.value }}</option>
          </datalist>
        </div>
        <div class="searchOrgs">
          <input class="vt vto" placeholder="Institution:" list="orgs" v-model="kwO" @keyup.enter="setCurrOrgs(kwO)"/>
          <datalist id="orgs">
            <option v-for="org in this.allOrgs" :key="org.key" :value="org.value">{{ org.value }}</option>
          </datalist>
        </div>
        <Search class="py-2 vt" v-on:searchPerformed="searchPerformed($event)"></Search>
        <input class="vt vty" type="number" placeholder="Bis Jahr:" v-model="kwY"
               @keyup="filterAll()"/>
        <span class="lbls">
        <div class="lbl" v-for="pers in currPersons" :key="pers.key">{{ pers.value }}
          <svg v-on:click="removePers(pers.key)" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
               fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path
      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg></div>
          <div class="lbl" v-for="org in currOrgs" :key="org.key">{{ org.value }}
          <svg v-on:click="removeOrg(org.key)" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
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

        <input class="vt vtt" type="text" placeholder="Fall-Titel:" v-model="kwT"
               @keyup="filterAll()"/>
      </div>
    </div>
    <b-row>
      <b-col md="3">
        <b-form-select
            class="ml-2 mb-3"
            size="sm"
            v-model="selected"
            :options="selectOptions"
        ></b-form-select>

        <div v-if="this.selected && this.selected.toString()">
          <Tree :key="`tr${item.title}${_self.selected.toString()}`"
                v-for="item in this.selectOptions.slice(1,6).filter(option=>option.text === _self.selected.toString())"
                :title="item.text"
                class="tree filter"
                :isFilter="true"
                :filterprop="'keyword'"
                :tree-data="{
            children: [_self.$store.getters.getConceptWithCases(item.text)],
          }"
          />
          <Tree :key="`tr${item.title}${_self.selected.toString()}`"
                v-for="item in this.selectOptions.slice(6,9).filter(option=>option.text === _self.selected)"
                :title="''"
                class="tree filter"
                :isFilter="true"
                :filterprop="item.filterprop"
                :tree-data="{
            children: [_self.$store.getters.getGroupedCases(item.text)]
          }"
          />
        </div>
      </b-col>
      <b-col md="9">
        <div class="card">
          <div class="row align-items-center">
            <b-pagination
                page-class="custompaging"
                prev-class="custompagingarrows"
                next-class="custompagingarrows"
                first-class="custompagingarrows"
                last-class="custompagingarrows"
                class="custom-pagination col-md-4 mb-0"
                v-model="currentPage"
                :total-rows="this.$store.getters.noOfCollections"
                :per-page="perPage"
                aria-controls="col-table"
            ></b-pagination>
            <div class="col-md-4">{{ this.$store.getters.noOfCollections }} Sammlungen</div>
          </div>
          <b-table
              ref="coltable"
              id="col-table"
              :small="'small'"
              :no-border-collapse="true"
              :borderless="'borderless'"
              :current-page="currentPage"
              :per-page="perPage"
              :busy.sync="isBusy"
              :sort-by="'id'"
              :sort-compare="tableSortCompare"
              :fields="[
                 {
              key: 'id',
              label: 'Aktennummer',
              sortable: true
            },
              {
                key: 'title',
                label: 'Titel',
              },
              {
                key: 'size',
                label: 'Anzahl Dokumente',
              },
            ]"
              :items="currCases"
          >
            <template #table-busy>
              <div class="text-center my-2">
                <b-spinner type="grow" class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(size)="data">
              {{ data.item.docs.length }}
            </template>
            <template #cell(id)="data">
              {{ parseInt(data.item.id.substring(3, data.item.id.length - 4)) }}
            </template>
          </b-table>
        </div>
      </b-col>
    </b-row>
  </main>
</template>

<script>
//import {getCollections} from "@/services/ARCHEService";
import Tree from "../Statistiken/Tree";
//import Search from "../Search";

export default {
  name: "OverviewAllCollections",
  components: {
    //Search: Search,
    Tree
  },
  data: function () {
    return {
      collections: [],
      isBusy: false,
      perPage: 10,
      currentPage: 1,
      selected: null,
      filter: null,
      filterTitle: null,
      filterParams: null,
      selectOptions: [
        {value: null, text: "Filter auswählen"},
        {value: "Rechtsbereich", text: "Rechtsbereich"},
        {
          value: "Art der Akte / des Deliktes",
          text: "Art der Akte / des Deliktes",
        },
        {
          value: "Delikttyp",
          text: "Delikttyp",
        },
        {
          value: "Ausgang / Ende des Verfahrens",
          text: "Ausgang / Ende des Verfahrens",
        },
        {
          value: "Ausgehend von",
          text: "Ausgehend von",
        },
        {
          value: "Gerichtliche Institution",
          text: "Gerichtliche Institution",
          filterprop: "org_actor-role_label:Gerichtliche Institution"
        },
        {
          value: "Vertreter (Ankläger / Anklägerin)",
          text: "Vertreter (Ankläger / Anklägerin)",
          filterprop: "actors-role_label:Vertreter (Ankläger / Anklägerin)"
        },
        {
          value: "Vertreter (Angeklagter / Angeklagte)",
          text: "Vertreter (Angeklagter / Angeklagte)",
          filterprop: "actors-role_label:Vertreter (Angeklagter / Angeklagte)"
        },
      ],
      kwT: null,
      kwY: null,
      kwO: null,
      kwP: null,
      allPersons: [],
      allOrgs: [],
      currOrgs: [],
      currPersons: [],
      cases: [],
      currCases: []
    };
  },
  methods: {
    getArcheCollections(ctx, callback) {
      const offset =
          ctx.currentPage === 1 ? 0 : (ctx.currentPage - 1) * ctx.perPage;
      let items = this.$store.getters.cases;
      if (this.filterParams) {
        const filterprop = this.filterParams[0];

        let filterval = this.filter[1];
        if (filterprop === "keyword") {
          items = items.filter(
              (item) => item.keywords.indexOf(this.filter[1]) > -1
          );
        } else {
          const filternestedprop = this.filterParams[1].split(":")[0];
          const filternestedpropval = this.filterParams[1].split(":")[1];

          items = items.filter(
              (item) =>
                  item[filterprop].filter(
                      (im) =>
                          im[filternestedprop] === filternestedpropval &&
                          im.title === filterval
                  ).length > 0
          );
        }
      }
      this.$store.dispatch("setNoOfCollections", items.length);
      callback(items.slice(offset, offset + ctx.perPage));
    },
    navToObjects: function (url) {
      let id = this.getIdFromUrl(url);

      this.$router.push({name: "recht-objects", params: {id: id}});
    },
    getIdFromUrl(url) {
      let idx = url.lastIndexOf("/");
      return url.substring(idx + 1);
    },
    tableSortCompare(a, b, key) {
      if (key === 'id') {
        let aInt = parseInt(a[key].substring(3, a[key].length - 4));
        let bInt = parseInt(b[key].substring(3, b[key].length - 4));
        return aInt - bInt;
      }

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
    setCurrOrgs(kwO) {
      //get key of person and add person to this.currPersons
      for (var key in this.allOrgs) {
        if (this.allOrgs[key].value === kwO) {
          //check if person is already in this.currPersons
          if (!this.currOrgs.filter(o => o.key === this.allOrgs[key].key).length > 0) {
            //remove leading '#' from key
            this.currOrgs.push({'key': this.allOrgs[key].key.substring(1), 'value': this.allOrgs[key].value});
          }
        }
      }
      this.filterAll();
    },
    filterAll() {
      //extract cases that contain all persons in this.currPerson and all orgs in this.currOrgs and match title and year
      let temp = [];
      this.cases.forEach(c => {
        let containsAll = true;
        this.currPersons.forEach(p => {
          if (!c.men_pers[p.key]) {
            containsAll = false;
          }
        });
        this.currOrgs.forEach(o => {
          if (!c.men_orgs[o.key]) {
            containsAll = false;
          }
        });
        if (this.kwT) {
          if (!(c.title.toUpperCase().includes(this.kwT.toUpperCase()))) {
            containsAll = false;
          }
        }
        if (this.kwY) {
          if (!(parseInt(c.start_date.substring(0, 4)) < this.kwY)) {
            containsAll = false;
          }
        }
        if (containsAll === true) {
          temp.push(c)
        }
      });
      this.currCases = temp;
      this.kwP = null;
      this.kwO = null
    },
    resetFilter() {
      this.currOrgs = [];
      this.currPersons = [];
      this.kwP = null;
      this.kwO = null;
      this.kwY = null;
      this.kwT = null;
      this.currCases = this.cases;
    },
    removePers(key) {
      for (let i = 0; i < this.currPersons.length; i++) {
        if (this.currPersons[i].key === key) {
          this.currPersons = this.currPersons.filter(p => p.key !== key);
        }
      }
      this.filterAll();

    },
    removeOrg(key) {
      for (let i = 0; i < this.currOrgs.length; i++) {
        if (this.currOrgs[i].key === key) {
          this.currOrgs = this.currOrgs.filter(o => o.key !== key);
        }
      }
      this.filterAll();
    }
  },
  mounted() {
    if (this.$route.query.filter) {
      this.filter = this.$route.query.filter.split(".");
      let filterkey = this.filter[0];
      this.filterParams = filterkey.split("-");
      this.filterTitle = this.filterParams[1].includes(":") ? this.filterParams[1].split(":")[1] : this.filterParams[1];
      this.selected = this.filterTitle;
    }
  },
  created() {
    this.$watch(
        () => this.$route.params,
        () => {
          if (this.$route.query.filter) {
            this.filter = this.$route.query.filter.split(".");
            let filterkey = this.filter[0];
            this.filterParams = filterkey.split("-");
            this.filterTitle = this.filterParams[1].includes(":") ? this.filterParams[1].split(":")[1] : this.filterParams[1];
            this.selected = this.filterTitle;
            this.$refs.coltable.refresh();
            this.selected = this.filterTitle;
          }
        }
    );
    this.$store.getters.caseInfo.then(cD => {
      this.cases = cD.cases;
      this.currCases = cD.cases;
      for (var name in cD.persons) {
        let p = {};
        p.key = name;
        p.value = cD.persons[name];
        this.allPersons.push(p);
      }

      for (var orgKey in cD.orgs) {
        let o = {};
        o.key = orgKey;
        o.value = cD.orgs[orgKey];
        this.allOrgs.push(o);
      }
    });
  },
};
</script>

<style>
.card {
  width: auto;
  padding: 2rem;
  margin: auto;
  margin-left: 5rem;
  margin-right: 5rem;
}

.navigation {
  margin-left: 1rem;
  text-align: left;
  padding-left: 2rem;
}

.arrow {
  color: #c85545;
}

#col-table thead {
  background: var(--secondary-gray-meta);
}

#col-table {
  border-spacing: 3px;
  font-size: 0.9rem;
}

#col-table thead {
  text-transform: uppercase;
}

#col-table td {
  background: var(--secondary-gray-light);
}

.custom-pagination .page-link {
  border: none;
}

.custompaging.page-item .page-link {
  color: var(--text-black);
}

.custompaging.page-item.active .page-link {
  background-color: var(--secondary-gray-meta);
  border-color: var(--secondary-gray-meta);
  color: var(--text-black);
}

.custompagingarrows .page-link {
  color: var(--primary-red-dark);
}

.custompaging .page-link:focus {
  box-shadow: none;
}

.tree {
  font-size: 0.9rem;
}

.filter .root > div > span {
  display: none;
}

.filter .pl-5 {
  padding-left: 1rem !important;
}

.filter .mb-3 {
  margin-bottom: 0.5rem !important;
}

.custom-select:focus {
  border-color: var(--secondary-gray-dark);
  box-shadow: 0 0 0 0.1rem var(--secondary-gray-dark);
}

.filter-nav {
  background-color: var(--secondary-gray-meta);
  border-bottom: solid var(--primary-red) 0.3rem;
}

.vt {
  display: flex;
  margin: 2rem;
  font-size: inherit;
  height: fit-content;
}

.vtt {
  display: flex;
  grid-column: 2/3;
  grid-row: 2/3;
  width: fit-content;
}

.vty {
  display: flex;
  grid-column: 1/2;
  grid-row: 2/3;
  width: fit-content;
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
  grid-row: 3/4;
  display: inline-flex;
  grid-column: 1/4;
}

.filters {
  display: grid;
  grid-template-columns: repeat(3, minmax(5rem, auto));
  grid-template-rows: auto auto auto;
}

.reset-filter {
  display: flex;
  grid-row: 2/3;
  grid-column: 3/4;
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
}

</style>