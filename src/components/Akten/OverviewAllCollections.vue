<template>
  <main><p class="navigation">Akten-Edition <span class="arrow">></span> Alle Akten</p>
    <div class="card">
      <h4 class="card-title">All collections </h4>
      <table>
        <tr>
          <th>Title</th>
          <th>URL</th>
          <th>Size</th>

        </tr>
        <!--      <tr v-for="item in archeCollections" :key="item" :item="item">-->
        <tr v-for="val in collections" v-bind:key="val.title" v-on:click="navToObjects(val.url.subject)">
          <td>
            {{ val.title }}
          </td>
          <td>
            {{ val.url.subject }}
          </td>
          <td> {{ val.size }}</td>
        </tr>
      </table>
    </div>
  </main>
</template>

<script>
import {getCollections} from "@/services/ARCHEService";

export default {
  name: "OverviewAllCollections",
  data: function () {
    return {
      collections: []
    }
  },
  methods: {
    navToObjects: function (url) {
      let id = this.getIdFromUrl(url)
      //this.$router.push({path: 'recht/objects/1'});
      this.$router.push({name: "recht-objects", params: {id: id}});
    },
    getIdFromUrl(url) {
      console.log(url);
      let idx = url.lastIndexOf('/');
      return url.substring(idx + 1);
    }
  },
  mounted() {
    getCollections((result) => {
      this.collections = result;
    });
  }

}
</script>

<style scoped>
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

</style>