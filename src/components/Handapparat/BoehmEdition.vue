<template>
  <main>
    <p class="navigation">
      <router-link router-link class="nav-link" :to="'/handapparat'">
        Handapparat
      </router-link>
      <span class="arrow">></span>
      Böhm-Edition
    </p>
    <div class="container">
      <div class="header">
        <p class="header-el">Band 1</p>
        <p class="header-el">Band 2</p>
        <p class="header-el">Band 3</p>
        <p class="header-el">Band 4</p>
      </div>
      <div class="arrow-nav">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
             class="bi bi-arrow-left text-bottom" viewBox="0 0 16 16">
          <path fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
        <span class="px-1">Seite 1 von 44</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
             class="bi bi-arrow-right text-bottom" viewBox="0 0 16 16">
          <path fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
        </svg>
      </div>
      <div class="card">
        <img src="../../assets/boehm.jpg" alt="scan"/>
      </div>
      <div class="text">Dank an Böhm</div>
    </div>
  </main>
</template>

<script>
export default {
  name: "BoehmEdition",
}
</script>

<style>
.navigation {
  margin-left: 1rem;
  text-align: left;
  padding: 0 0 0 2rem;
  display: flex;
}

.arrow {
  color: var(--primary-red);
}

.nav-link {
  color: var(--text-gray);
  padding: 0;
}

.nav-link:link {
  text-decoration: none;
}

.nav-link:visited {
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: none;
  color: var(--text-gray);
}

.nav-link:active {
  text-decoration: none;
}

.container {
  display: grid;
  grid-template-columns: 10rem auto 10rem;
}

.header {
  color: var(--primary-red);
}

.card, .header, .arrow-nav, .text {
  grid-column: 2/3;
  margin: 0.1rem;
}

.card{
  width: 100%;
}

.header-el:hover {
  text-decoration: underline;
}

</style>