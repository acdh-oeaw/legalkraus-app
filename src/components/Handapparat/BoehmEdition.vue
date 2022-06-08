<template>
  <main>
    <p class="navigation">
      <router-link router-link class="nav-link" :to="'/handapparat'">
        Handapparat
      </router-link>
      <b-icon class="mx-1 breadcrumbarrow" icon="chevron-right" shift-v="-10" font-scale="0.7"></b-icon>
      Böhm-Edition
    </p>
    
    <b-container class="d-block no-grid-col-container custom-mw">
      <b-row>
        <b-col>
      <div class="sel-vol text-left">
        <ul class="p-0">
        <li class="pr-4"><span @click="selectVolume(1)" :class="{'selectedVol':this.selectedVolume === 1}">Band 1</span></li>
        <li class="pr-4"><span href="#" @click="selectVolume(2)" :class="{'selectedVol':this.selectedVolume === 2}">Band 2</span></li>
        <li class="pr-4"><span href="#" @click="selectVolume(3)" :class="{'selectedVol':this.selectedVolume === 3}">Band 3</span></li>
        <li class="pr-4"><span href="#" @click="selectVolume(4)" :class="{'selectedVol':this.selectedVolume === 4}">Band 4</span></li>
        </ul>
      </div>
      </b-col>
        </b-row>
        <b-row>
          <b-col>
      <div class="arrow-nav">
        <svg v-on:click="prevImg()" :class="{'disabled':selectedImagePage === 1}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
             class="bi bi-arrow-left text-bottom" viewBox="0 0 16 16">
          <path fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
        <span class="px-1">Seite</span>
        <select class="sel-page" :value="selectedImagePage" @change="changeImagePage($event)">
              <option v-for="(idx) in this.volSize" :key="`p${idx}`" :value="idx">{{ idx}}</option>
          </select>
        <span class="px-1">von {{this.volSize}}</span>
        <svg v-on:click="nextImg()" :class="{'disabled':selectedImagePage === volSize}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
             class="bi bi-arrow-right text-bottom" viewBox="0 0 16 16">
          <path fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
        </svg>
      </div>
      </b-col>
      </b-row>
      <div class="card">
        <div class="w-100 viewer" id ="iiif_viewer"/>
      </div>
      <div class="text">Mit großem Dank an Hermann Böhm</div>
    </b-container>
  </main>
</template>

<script>
import OpenSeadragon from "openseadragon";
import tSources from "./boehm_tilesources.json";
window.OpenSeadragon = OpenSeadragon;
export default {
  name: "BoehmEdition",
  data() {
    return {
      selectedVolume: 1,
      viewer:null,
      selectedImagePage: 1,
      startPages: [
        0,
        314,
        758,
        1153
      ]
    }
  },
  computed: {
    imageUrl() {
              return `https://loris.acdh.oeaw.ac.at/uuid:/legalkraus/boehm/vol${this.selectedVolume}/00001.tif/full/full/0/default.jpg` 
    },
    volSize() {
      let volSize;
      switch (this.selectedVolume) {
        case 1: 
          volSize = 314;
          break;
        case 2:
           volSize = 444;
          break;
        case 3:
           volSize = 395;
          break;
        case 4:
           volSize = 413; 
      }
      return volSize;
    }
  },
  methods: {
    prevImg() {
      if (this.selectedImagePage > 1) {
      this.selectedImagePage--;
       this.viewer.goToPage(parseInt(this.startPages[this.selectedVolume-1]) + parseInt(this.selectedImagePage) - 1);
      }
    },
    nextImg() {
      if (this.selectedImagePage < this.volSize) {
      this.selectedImagePage++;
       this.viewer.goToPage(parseInt(this.startPages[this.selectedVolume-1]) + parseInt(this.selectedImagePage) - 1);
      }
    },
    changeImagePage(event) {
      this.selectedImagePage = parseInt(event.target.value);
      this.viewer.goToPage(parseInt(this.startPages[this.selectedVolume-1]) + parseInt(event.target.value) - 1);
    },
    selectVolume(vol) {
      this.selectedVolume = vol;
      this.selectedImagePage = 1;
      switch (vol) {
        case 1: 
          this.viewer.goToPage(0);
          break;
        case 2:
          this.viewer.goToPage(314);
          break;
        case 3:
          this.viewer.goToPage(758);
          break;
        case 4:
          this.viewer.goToPage(1153);  
      }
        
      
      //this.viewer.goToNextPage();
      return false;
    },
  },
  mounted() {
    this.viewer = OpenSeadragon({
      id: "iiif_viewer",
      sequenceMode: true,
      showNavigationControl: false,
      showSequenceControl: false,
      tileSources: tSources
    });
  }
};
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

.card,
.header,
.arrow-nav,
.text {
  grid-column: 2/3;
  margin: 0.1rem;
}

.card {
  width: 100%;
}

.header-el:hover {
  text-decoration: underline;
}


</style>

<style scoped>
svg.disabled {
  fill:#CCC;
}

.sel-vol li {
  display: inline;
  color:var(--primary-red);
  font-weight:bold;
}

.sel-vol li span {
  cursor: pointer;
}

.custom-mw {
  max-width: 600px
}

.viewer {
  height:700px;
}

.selectedVol {
  text-decoration: underline;
}

.sel-page {
  border-radius: 0.25rem;
  border: solid var(--secondary-gray-light);
  height: 2rem;
}

</style>