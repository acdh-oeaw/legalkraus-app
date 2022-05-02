<template>
  <main>
    <div class="title">
      <router-link class="nav-link" to="/">
        <p class="logo">RECHTSAKTEN</p>
        <p class="logo mt-n2">Karl Kraus</p>
      </router-link>
    </div>
    <div>
      <b-button @click="showBetaVersionModal" pill class="btn-sm mt-2 ml-n5 beta-badge" variant="outline-primary">
        Beta Version <b-icon icon="info" aria-hidden="true"></b-icon>
      </b-button>
      <b-modal hide-footer :content-class="'rounded-0 opensans'" id="modal-betaversion" title="Beta Version">
        <div v-html="modalcontent"/>
      </b-modal>
    </div>
    <div class="navigation">
      <p class="nav-el">
        <b-dropdown  id="dropdown-1" :class="{'active':this.itemIsActive('projekt')}" text="Projekt" variant='none' class="m-md-2">
          <b-dropdown-item class="dd-item" to="/projekt/projektinformationen">
              Projektinformation
          </b-dropdown-item>
          <b-dropdown-item class="dd-item" to="/projekt/editionsrichtlinien">
              Editionsrichtlinien
          </b-dropdown-item>
          <b-dropdown-item class="dd-item" to="/projekt/projektteam">
              Projektteam
          </b-dropdown-item>
          <b-dropdown-item class="dd-item" to="/projekt/publikationen">
              Publikationen
          </b-dropdown-item>
          <b-dropdown-item class="dd-item" to="/projekt/benutzungshinweise">
              Benutzungshinweise
          </b-dropdown-item>
          <b-dropdown-item class="dd-item" to="/projekt/lizenzen">
              Lizenzen
          </b-dropdown-item>
          <b-dropdown-item class="dd-item" to="/projekt/dokumentation">
              Technische Dokumentation
          </b-dropdown-item>
        </b-dropdown>
      </p>
      <p class="nav-el">
        <b-dropdown id="dropdown-2"  :class="{'active':this.itemIsActive('akten-edition')}" text="Akten-Edition"  variant='none' class="m-md-2">
          <b-dropdown-item class="dd-item"  to="/akten-edition/kultur"> 
              Kultur
          </b-dropdown-item>
          <b-dropdown-item class="dd-item" to="/akten-edition/politik">
              Politik
          </b-dropdown-item>
           <b-dropdown-item class="dd-item" to="/akten-edition/recht"> 
              Recht
          </b-dropdown-item>
          <b-dropdown-item class="dd-item" to="/akten-edition/handschriftliches">
              Handschriftliches
          </b-dropdown-item>
          <b-dropdown-item class="dd-item" to="/akten-edition/alle-akten">
              Alle Akten
          </b-dropdown-item>
        </b-dropdown>
      </p>
      <p class="nav-el">
        <b-dropdown id="dropdown-3" text="Visualisierungen"  variant='none' class="m-md-2">
          <b-dropdown-item>Zeitstrahl</b-dropdown-item>
          <b-dropdown-item><router-link class="dd-item" to="/visualisierungen/fallstatistik">
              Fallstatistik
            </router-link></b-dropdown-item>
        </b-dropdown>
      </p>
      <p class="nav-el">
        <b-dropdown id="dropdown-4" :class="{'active':this.itemIsActive('register')}" text="Register" variant="none" class="m-md-2">
          <b-dropdown-item>
            <router-link class="dd-item" to="/register/personen">
              Personen
            </router-link>
          </b-dropdown-item>
          <b-dropdown-item>
            <router-link class="dd-item" to="/register/orte">
              Orte
            </router-link>
          </b-dropdown-item>
          <b-dropdown-item>
            <router-link class="dd-item" to="/register/institutionen">
              Institutionen
            </router-link>
          </b-dropdown-item>
          <b-dropdown-item>
            <router-link class="dd-item" to="/register/werke">
              Werke
            </router-link>
          </b-dropdown-item>
          <b-dropdown-item>
            <router-link class="dd-item" to="/register/juristische-texte">
              Juristische Texte
            </router-link>
          </b-dropdown-item>
          <b-dropdown-item>
            <router-link class="dd-item" to="/register/fackel">
              Fackel
            </router-link>
          </b-dropdown-item>
        </b-dropdown>
      </p>
      <button type="button" class="btn nav-el rounded-0">
        <router-link router-link class="nav-link-ha" :to="'/handapparat'">Handapparat</router-link>
      </button>
    </div>
  </main>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      modalcontent:null
    }
  },
  methods: {
    itemIsActive(val) {
      console.log(this.$route.path.includes(val))
      return this.$route.path.includes(val)
    },
     showBetaVersionModal() {
       fetch('https://raw.githubusercontent.com/wiki/acdh-oeaw/legalkraus-app/Beta-Version.md', {cache: "no-store"}).then(response => response.text())
  .then(data => fetch('https://api.github.com/markdown',{cache: "no-store", method:'POST', body: JSON.stringify({'mode': 'markdown', 'text': data})})
  .then(response => response.text()).then(data => {this.modalcontent = data;this.$root.$emit('bv::show::modal', 'modal-betaversion', '#btnShow')}))
      
    },
  },
  created() {
    
  }
}
</script>

<style>
.navigation .btn {
  font-weight:600 !important;
}

.navigation .dropdown-toggle::after {
  display:none
}

.navigation .dropdown.active .btn {
  color: var(--primary-red-dark)
}

.btn:focus, .btn.focus {
  box-shadow: none !important
}


</style>
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
  margin-bottom: 0;
  padding-bottom: 0.1rem;
}

.navigation {
  display: flex !important;
  grid-column-start: 3;
  align-self: end
}

.handapparat {
  background-color: #565149;
  color: white;
  border-radius: 0.25rem;
  font-size: 1rem !important;
  padding: 0.375rem 0.75rem !important;
}

.handapparat:hover {
  color: white;
  background-color: #565149;
  border-color: #565149;
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
  color: var(--text-gray);
}

.nav-link-ha.router-link-active {
  color: var(--primary-red-dark)
}

.nav-link:link, .nav-link-ha:link {
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

.logo {
  margin-top: 0;
  margin-bottom: 0;
  text-align: left;
}

.nav-el {
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

.beta-badge {
  color: var(--primary-red);
  border-color: var(--primary-red);
  font-size: 0.775rem;
  padding: 0.2rem 0.4rem;
  white-space: nowrap;
}

.beta-badge:hover, .beta-badge:active, .beta-badge:focus {
  background-color: var(--primary-red) !important;
  border-color: var(--primary-red) !important;
  color: white;
}

@media screen and (max-width: 600px) {
  .title {
    text-align: center;
    font-size: 2rem;
    margin: auto;
  }
}


</style>
