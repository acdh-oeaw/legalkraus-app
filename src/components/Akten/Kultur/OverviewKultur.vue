<template>
  <main>
    <p class="navigation">Akten-Edition <span class="arrow">></span> <span style="font-weight: bold">Kultur</span></p>
    <div class="grid-container">
      <button type="button" class="item">
        <router-link class="nav-link" to="/akten-edition/kultur/fackel/collections">Die Fackel</router-link>
      </button>
      <button type="button" class="item">
        <router-link class="nav-link" to="/akten-edition/kultur/theater/collections">Theater</router-link>
      </button>
      <button type="button" class="item">
        <router-link class="nav-link" to="/akten-edition/kultur/verlagswesen/collections">Verlagswesen</router-link>
      </button>
      <button type="button" class="item">
        <router-link class="nav-link" to="/akten-edition/kultur/medienhistorisches/collections">Medienhistorisches</router-link>
      </button>
      <button type="button" class="item">
        <router-link class="nav-link" to="/akten-edition/kultur/berichtigung/collections">Literarische Berichtigungen</router-link>
      </button>
      <button type="button" class="item" v-on:click="togglePolemiken">
        Die Großen Polemiken
      </button>

      <button v-if="showPolemiken" type="button" class="item-s">
        <router-link class="nav-link" to="/akten-edition/kultur/berliner-tageblatt/collections">Berliner Tageblatt, Kerr, Wolff</router-link>
      </button>
      <button v-if="showPolemiken" type="button" class="item-s">
        <router-link class="nav-link" to="/akten-edition/kultur/die-stunde/collections">Die Stunde, Békessy</router-link>
      </button>
      <button v-if="showPolemiken" type="button" class="item-s">
        <router-link class="nav-link" to="/akten-edition/kultur/schober/collections">Schober, 15. Juli 1927</router-link>
      </button>
      </div>

  </main>
</template>

<script>
export default {
  name: "OverviewRecht",
  data: function (){
    return{
      showPolemiken: false
    }
  },
  methods:{
    togglePolemiken(){
      this.showPolemiken = !this.showPolemiken;
    }
  }
}
</script>

<style scoped>
main {
  display: grid;
  grid-gap: 2rem;
}

.grid-container {
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: auto auto auto;
  margin-top: 0;
}

.item {
  grid-column-start: 2;
  grid-column-end: 3;
  background-color: var(--primary-red);
  color: var(--text-white);
  border-radius: 0.25rem;
  border: transparent;
  padding: 0.5rem;
}

.item-s{
  grid-column-start: 2;
  grid-column-end: 3;
  background-color: var(--text-white);
  border-radius: 0.25rem;
  border: transparent;
  padding: 0.5rem;
  width: fit-content;
  margin: auto;
}
.item-s > .nav-link{
  color: var(--text-black);
}
.nav-link {
  color: var(--text-white);
}

.nav-link:link {
  text-decoration: none;
}

.nav-link:visited {
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: none;
}

.nav-link:active {
  text-decoration: none;
}


.navigation {
  margin-left: 1rem;
  text-align: left;
  padding-left: 2rem;
}

.arrow {
  color: #C85545;
}

</style>
