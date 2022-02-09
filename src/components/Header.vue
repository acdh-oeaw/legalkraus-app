<template>
  <main>
    <div class="title">
      <router-link class="nav-link" to="/">
        <p class="logo">RECHTSAKTEN</p>
        <p class="logo">Karl Kraus</p>
      </router-link>
    </div>

    <div class="navigation">
      <p class="nav-el">
        <b-dropdown id="dropdown-1" text="Projekt" class="m-md-2">
          <b-dropdown-item>Projektinformation</b-dropdown-item>
          <b-dropdown-item>Editionsrichtlinien</b-dropdown-item>
          <b-dropdown-item>Projektteam</b-dropdown-item>
          <b-dropdown-item>Publikationen</b-dropdown-item>
          <b-dropdown-item>Benutzungshinweise</b-dropdown-item>
          <b-dropdown-item>Lizenzen</b-dropdown-item>
          <b-dropdown-item>Technische Dokumentation</b-dropdown-item>
        </b-dropdown>
      </p>
      <p class="nav-el">
        <b-dropdown id="dropdown-2" text="Akten-Edition" class="m-md-2">
          <b-dropdown-item>
            <router-link class="dd-item" to="/kultur">
              Kultur
            </router-link>
          </b-dropdown-item>
          <b-dropdown-item>
            <router-link class="dd-item" to="/recht">
              Recht
            </router-link>
          </b-dropdown-item>
          <b-dropdown-item>
            <router-link class="dd-item" to="/politik">
              Politik
            </router-link>
          </b-dropdown-item>
          <b-dropdown-item>
            <router-link class="dd-item" to="/handschriftliches">
              Handschriftliches
            </router-link>
          </b-dropdown-item>
          <b-dropdown-item>
            <router-link class="dd-item" to="/alle-akten">
              Alle Akten
            </router-link>
          </b-dropdown-item>
        </b-dropdown>
      </p>
      <p class="nav-el">
        <b-dropdown id="dropdown-3" text="Statistik" class="m-md-2">
          <b-dropdown-item>Zeitstrahl</b-dropdown-item>
          <b-dropdown-item>Fallstatistik</b-dropdown-item>
          <b-dropdown-item>Sonstiges</b-dropdown-item>
        </b-dropdown>
      </p>
      <p class="nav-el">
        <b-dropdown id="dropdown-4" text="Register" class="m-md-2">
          <b-dropdown-item>Personen</b-dropdown-item>
          <b-dropdown-item>Orte</b-dropdown-item>
          <b-dropdown-item>Institutionen</b-dropdown-item>
          <b-dropdown-item>Werke</b-dropdown-item>
          <b-dropdown-item>Juristische Texte</b-dropdown-item>
        </b-dropdown>
      </p>
      <button type="button" class="btn nav-el handapparat">
        <router-link router-link class="nav-link-ha" :to="'/handapparat'">Handapparat</router-link></button>
      <button type="button" class="btn nav-el handapparat">How to use</button>
    </div>
  </main>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>

main {
  background: white;
  margin-top: 0;
  display: grid;
  justify-content: space-between;
  grid-template-columns: auto auto auto auto auto;
  grid-template-rows: 6rem;
  margin-left: 0;
  border-bottom: solid 0.3rem var(--primary-red);
  margin-bottom: 2rem;
}

.navigation {
  display: flex !important;
  grid-column-start: 3;
  align-self: end
}

.handapparat {
  background-color: #6c757d;
  color: white;
  border-radius: 0.25rem;
  font-size: 1rem !important;
  padding: 0.375rem 0.75rem !important;
}

.handapparat:hover {
  color: white;
  background-color: #5c636a;
  border-color: #565e64;
}

.title {
  font-size: 1.5rem;
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
  margin-top: 1rem;
  margin-left: 2rem;
  margin-bottom: 2rem;
  border-top: 0.5rem solid var(--primary-red);
}

.nav-link {
  color: var(--text-gray);
}

.nav-link-ha {
  color: var(--text-white);
}

.nav-link:link,.nav-link-ha:link {
  text-decoration: none;
}

.nav-link:visited, .nav-link-ha:visited {
  text-decoration: none;
}

.nav-link:hover, .nav-link-ha:hover {
  text-decoration: none;
}

.nav-link:active, .nav-link-ha:active {
  text-decoration: none;
}

.logo{
  margin-top: 0;
  margin-bottom: 0;
  text-align: left;
}
.nav-el {
  font-size: 1.5rem;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 1rem;
  margin-left: 1rem;
  padding: 0;
  font-family: "Open Sans", sans-serif !important;
  /*font-weight: 600 !important;*/

}

.dd-item {
  padding: 0;
  color: var(--text-black);
  text-decoration: none;
}

@media screen and (max-width: 600px) {
  .title {
    text-align: center;
    font-size: 2rem;
    margin: auto;
  }
}
</style>
