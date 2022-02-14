<template>
  <main>
  
  <p class="navigation">Alle Resourcen</p>
    <div class="card">
 <b-pagination
      page-class="custompaging"
      prev-class="custompagingarrows"
      next-class="custompagingarrows"
      first-class="custompagingarrows"
      last-class="custompagingarrows"
      class="custom-pagination"
      v-model="currentPage"
      :total-rows="this.$store.getters.noOfResources"
      :per-page="perPage"
      aria-controls="col-table"
    ></b-pagination>
      <b-table id="col-table" :small="'small'" :no-border-collapse="true" :borderless="'borderless'" :current-page="currentPage" :per-page="perPage"
      :busy.sync="isBusy" :fields="[
            {
              key: 'title',
              label: 'Titel'
            },
            {
              key: 'url',
              label: ''
            },
          ]" :items="getArcheResources">
          <template #table-busy>
        <div class="text-center my-2">
          <b-spinner type="grow" class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template #cell(url)="data">
        <a target="_blank" rel="noopener noreferrer" :href="`${data.value}`">Daten in Arche</a>
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
  </main>
</template>

<script>
import {getAllResources} from "@/services/ARCHEService";

export default {
  name: "OverviewAllResources",
  data: function () {
    return {
      isBusy: false,
      perPage: 10,
      currentPage: 1,
      
    }
  },
  methods: {
    getArcheResources(ctx, callback)  { 
      console.log(this.currentPage);
    const offset = ctx.currentPage === 1 ? 0 : (ctx.currentPage - 1) * ctx.perPage
    getAllResources(offset,(result) => {
      callback(result)
    });
    
    },
    navToObjects: function (url) {
      let id = this.getIdFromUrl(url)
      //this.$router.push({path: 'recht/objects/1'});
      this.$router.push({name: "recht-objects", params: {id: id}});
    },
    getIdFromUrl(url) {
      let idx = url.lastIndexOf('/');
      return url.substring(idx + 1);
    }
  },
  mounted() {
    /*getCollections((result) => {
      this.collections = result;
    });*/
  }

}
</script>

<style>
.card {
  width: auto;
  padding: 2rem;
  margin: auto;
  margin-left: 5rem;
  margin-right: 5rem;
}

.navigation{
  margin-left: 1rem;
  text-align: left;
  padding-left: 2rem;
}

.arrow{
  color: #C85545;
}

#col-table thead {
  background: var(--secondary-gray-meta)
}

#col-table {
  border-spacing:3px;
  font-size:0.9rem;
}

#col-table thead {
  text-transform: uppercase;
}

#col-table td {
  background: var(--secondary-gray-light)
}

.custom-pagination .page-link {
  border:none;
}

.custompaging.page-item .page-link {
  color:var(--text-black);
}

.custompaging.page-item.active .page-link {
  background-color:var(--secondary-gray-meta);
  border-color:var(--secondary-gray-meta);
  color:var(--text-black);
}

.custompagingarrows .page-link{
  color:var(--primary-red-dark);
} 

.custompaging .page-link:focus {
  box-shadow: none;
}
</style>