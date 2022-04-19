<template>
  <main>
    <p class="navigation">Akten-Edition <span class="arrow">></span> <span style="font-weight: bold">Politik</span></p>
    <div class="grid-container">
      <button type="button" class="item">
        <router-link class="nav-link" to="/politik/sozialdemokratie/collections">Sozialdemokratie</router-link>
      </button>
      <button type="button" class="item">
        <router-link class="nav-link" to="/politik/christlich-national/collections">Christlich-National</router-link>
      </button>
      <button type="button" class="item">
        <router-link class="nav-link" to="/politik/nationalsozialismus/collections">Nationalsozialismus</router-link>
      </button>
    </div>
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
  border-radius: 0.25rem;
  border: transparent;
  padding: 0.5rem;
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
