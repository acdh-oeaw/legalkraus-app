<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>

</template>

<script>

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {downloadCaseInfo} from "./services/ARCHEService";
import { processCaseInfo } from './utils';


export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  created() {
    let data = downloadCaseInfo();
    this.$store.dispatch('setCaseInfo', data);
    data.then(dt=>{
      this.$store.dispatch('setCases', dt.cases);
      processCaseInfo(dt)
    })  
  }
};

</script>

<style>
#app {
  font-family: var(--open-sans-regular) !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
  padding-top: 0;
}
</style>
