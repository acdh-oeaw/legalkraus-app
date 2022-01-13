<template>
  <main>
    <p class="navigation">Akten-Edition <span class="arrow">></span> Kultur</p>
    <h1 class="headline">Übersicht Kultur</h1>
    <button type="button" class="item">
      <router-link class="nav-link" to="/kultur/fackel/collections">Die Fackel</router-link>
    </button>
    <button type="button" class="item">
      <router-link class="nav-link" to="/kultur/fackel/collections">Theater</router-link>
    </button>
    <button type="button" class="item">
      <router-link class="nav-link" to="/kultur/verlagswesen/collections">Verlagswesen</router-link>
    </button>
    <button type="button" class="item">
      <router-link class="nav-link" to="/kultur/polemiken/collections">Die großen Polemiken</router-link>
    </button>
  </main>
</template>

<script>
export default {
  name: "OverviewRecht"
}
</script>

<style scoped>
main {
  display: grid;
  grid-gap: 2rem;
}

.headline {
  grid-column-start: 1;
  grid-column-end: 4;
}

.item {
  grid-column-start: 2;
  grid-column-end: 3;
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
