<template>
  <b-container class="mt-3">
    <h1 class="font-weight-bold text-left mb-3">Lizenzen</h1>
    <b-row>
      <b-col cols="7">
        <div class="text-left">
        </div>
      </b-col>
      <b-col cols="5">
          <Zitierempfehlung/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Zitierempfehlung from "./Zitierempfehlung";

export default {
  name: "Lizenzen",
  components: {Zitierempfehlung}
};
</script>

<style scoped>
main {
  display: grid;
  grid-template-columns: auto auto;
  margin: auto;
  grid-column-gap: 10rem;
  margin-left: 5rem;
  margin-right: 5rem;
}

.card {
  font-size: smaller;
}

.container {
  grid-template-columns: unset;
}

.left {
  grid-column: 1/2;
}

.right {
  grid-column: 2/3;
}
.text {
  text-align: left;
}

h2 {
  text-align: left;
}
</style>