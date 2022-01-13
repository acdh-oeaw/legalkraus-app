<template>
  <main>
    <p class="navigation">Akten-Edition <span class="arrow">></span> Politik</p>
    <h1 class="headline">Übersicht Politk</h1>
    <button type="button" class="item">
      <router-link class="nav-link" to="/politik/sozialdemokratie/collections">Sozialdemokratie</router-link>
    </button>
    <button type="button" class="item">
      <router-link class="nav-link" to="/politik/christlich-national/collections">Christlich-National</router-link>
    </button>
    <button type="button" class="item">
      <router-link class="nav-link" to="/politik/nationalsozialismus/collections">Nationalsozialismus</router-link>
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
