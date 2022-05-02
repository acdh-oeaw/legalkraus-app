<template>
  <main>
    <p class="navigation">Akten-Edition <b-icon class="mx-1 breadcrumbarrow" icon="chevron-right" shift-v="-10" font-scale="0.7"></b-icon> <span class="semibold">Politik</span></p>
    <div class="grid-container">
      <button type="button" class="item">
        <router-link class="nav-link" to="/akten-edition/politik/sozialdemokratie/collections">Sozialdemokratie</router-link>
      </button>
      <button type="button" class="item">
        <router-link class="nav-link" to="/akten-edition/politik/christlich-sozial/collections">Christlichsozial</router-link>
      </button>
      <button type="button" class="item">
        <router-link class="nav-link" to="/akten-edition/politik/nationalsozialismus/collections">Nationalsozialismus</router-link>
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

.nav-link,.nav-link:hover {
  color: var(--text-white);
}

.item:hover {
  background-color:var(--primary-red-dark)
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
