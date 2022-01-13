<template>
  <main>
    <p class="navigation">Akten-Edition <span class="arrow">></span> Recht</p>
    <h1 class="headline">Übersicht Recht</h1>
    <button type="button" class="item"><router-link class="nav-link" to="/recht/privatrecht/collections">Privatrecht</router-link></button>
    <button type="button" class="item"><router-link class="nav-link" to="/recht/strafrecht/collections">Strafrecht</router-link></button>
    <button type="button" class="item"><router-link class="nav-link" to="/recht/verwaltungsrecht/collections">Verwaltungsrecht</router-link></button>
    <button type="button" class="item"><router-link class="nav-link" to="/recht/zivilrecht/collections">Zivilrecht</router-link></button>
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

.navigation{
  margin-left: 1rem;
  text-align: left;
  padding-left: 2rem;
}

.arrow{
  color: #C85545;
}

</style>
