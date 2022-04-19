<template>
  <main v-if="this.$store.getters.vocabReady">
      <p class="navigation">
      Akten-Edition <span class="arrow">></span> Alle Akten
    </p>
    <b-row>
      <b-col md="3">
         <b-form-select class="ml-2" size="sm" v-model="selected" :options="selectOptions"></b-form-select>
        <Tree v-if="selected"
        class="tree filter"
          :filterprop ="'keyword'"
          :tree-data="{ children: [this.$store.getters.getConceptWithCases(this.selected)] }"
        />
      </b-col>
      <b-col md="9">
        <div>{{ this.$store.getters.noOfCollections }} Sammlungen</div>
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
          <a target="_blank" rel="noopener noreferrer" :href="`${data.value}`"
            >Daten in Arche</a
          >
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
      selectOptions: [
        { value: null, text: 'Filter auswählen' },
        { value: 'Rechtsbereich', text: 'Rechtsbereich' },
        { value: 'Art der Akte / des Deliktes', text: 'Art der Akte / des Deliktes' },
      ]
    };
  },
  components: {Tree},
  methods: {
    getArcheCollections(ctx, callback) {
      const offset =
        ctx.currentPage === 1 ? 0 : (ctx.currentPage - 1) * ctx.perPage;
      let items = this.$store.getters.caseInfo.cases;
      let filter = this.$route.query.filter.split(".");
      let filterkey = filter[0];
      let filterval = filter[1];
      if (filterkey === "keyword") {
        items = items.filter((item) => item.keywords.indexOf(filterval) > -1);
      } else {
        const filterparams = filterkey.split("-");
        const filterprop = filterparams[0];
        const filternestedprop = filterparams[1].split(":")[0];
        const filternestedpropval = filterparams[1].split(":")[1];

        items = items.filter(
          (item) =>
            item[filterprop].filter(
              (im) =>
                im[filternestedprop] === filternestedpropval &&
                im.title === filterval
            ).length > 0
        );
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
  mounted() {},
  created() {
    this.$watch(
  () => this.$route.params,
  () => {
      this.$refs.coltable.refresh()
  })
  }
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
  font-size:0.9rem;
}

.filter .root > div > span {
  display:none;
}

.filter .pl-5  {
  padding-left:1rem !important;
}

.custom-select:focus {
  border-color:var(--secondary-gray-dark);
  box-shadow: 0 0 0 0.1rem var(--secondary-gray-dark);
}
</style>