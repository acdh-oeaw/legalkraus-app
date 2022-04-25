<template>
  <main v-if="this.$store.getters.vocabReady">
    <p class="navigation">
      Akten-Edition <span class="arrow">></span> Alle Akten
    </p>
    <b-row>
      <b-col md="3">
        <b-form-select
          class="ml-2 mb-3"
          size="sm"
          v-model="selected"
          :options="selectOptions"
        ></b-form-select>
        
        <div  v-if="this.selected && this.selected.toString()">
        <Tree :key="`tr${item.title}${_self.selected.toString()}`"  v-for="item in this.selectOptions.slice(1,6).filter(option=>option.text === _self.selected.toString())"
          :title="item.text"
          class="tree filter"
          :isFilter="true"
          :filterprop="'keyword'"
          :tree-data="{
            children: [_self.$store.getters.getConceptWithCases(item.text)],
          }"
        />
        <Tree :key="`tr${item.title}${_self.selected.toString()}`"  v-for="item in this.selectOptions.slice(6,9).filter(option=>option.text === _self.selected)"
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
            :fields="[
              {
                key: 'title',
                label: 'Titel',
              },
              {
                key: 'size',
                label: 'Anzahl Dokumente',
              },
              {
                key: 'url',
                label: '',
              },
            ]"
            :items="getArcheCollections"
          >
            <template #table-busy>
              <div class="text-center my-2">
                <b-spinner type="grow" class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(url)="data">
              <a
                target="_blank"
                rel="noopener noreferrer"
                :href="`${data.value}`"
                >Daten in Arche</a
              >
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

export default {
  name: "OverviewAllCollections",
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
        { value: null, text: "Filter auswählen" },
        { value: "Rechtsbereich", text: "Rechtsbereich" },
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
    };
  },
  components: { Tree },
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

      this.$router.push({ name: "recht-objects", params: { id: id } });
    },
    getIdFromUrl(url) {
      let idx = url.lastIndexOf("/");
      return url.substring(idx + 1);
    },
  },
  mounted() {
    if (this.$route.query.filter) {
    this.filter = this.$route.query.filter.split(".");
    let filterkey = this.filter[0];
    this.filterParams = filterkey.split("-");
    this.filterTitle = this.filterParams[1].includes(":") ? this.filterParams[1].split(":")[1] : this.filterParams[1] ;
    console.log(this.filterTitle)
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
          this.filterTitle = this.filterParams[1].includes(":") ? this.filterParams[1].split(":")[1] : this.filterParams[1] ;
          console.log(this.filterTitle)
          this.selected = this.filterTitle;
          this.$refs.coltable.refresh();
          this.selected = this.filterTitle;
        }
      }
    );
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
</style>