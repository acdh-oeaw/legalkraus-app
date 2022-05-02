<template>
  <div class="text-left maxwdth-75">
    <p>{{collectionDescription}}</p>
  </div>
</template>
<script>
import collectionDescriptions from "../../assets/paratexteCol.json";
export default {
  name: "IntrotextCollection",

  props: {
    colid: Number,
  },
  computed: {
    collectionDescription() {
      return collectionDescriptions[this.colid];
    },
  },
};
</script>
<style>
.maxwdth-75 {
  max-width:75%;
}
</style>