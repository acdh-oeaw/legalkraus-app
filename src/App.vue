<template>
  <div id="app">
    <Header></Header>
    <Search class="py-2"></Search>
    <router-view/>
    <Footer></Footer>
  </div>

</template>

<script>

import Header from "@/components/Header";
import Search from "@/components/Search";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Search
  }
};

</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  padding-top: 0;
}
</style>
