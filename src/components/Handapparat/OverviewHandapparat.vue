<template>
  <main>
    <p class="navigation">Handapparat <span class="arrow">></span></p>


    <div class="grid-container">
      <button type="button" class="item">
        <router-link class="nav-link" to="/handapparat/boehm">Böhm Edition</router-link>
      </button>
      <button type="button" class="item">
        <router-link class="nav-link" to="/handapparat/beitraege">Beiträge</router-link>
      </button>
      <button type="button" class="item">
        <router-link class="nav-link" to="/handapparat/oskar-samek">Oskar Samek</router-link>
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
.grid-container {
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: auto auto auto;
  margin-top: 3rem;
}

.item {
  grid-column-start: 2;
  grid-column-end: 3;
  background-color: var(--primary-red);
  border-radius: 0.25rem;
  border: transparent;
  padding: 0.5rem;
}


.navigation {
  margin-left: 1rem;
  text-align: left;
  padding-left: 2rem;
}

.arrow {
  color: var(--primary-red);
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


</style>
