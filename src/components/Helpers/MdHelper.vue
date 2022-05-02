<template>
    <span>{{this.content}}</span>
</template>

<script>
import {
  getPmbEntityViaArche
} from "../../services/ARCHEService";

export default {
  name: "MdHelper",
  props: {
      id: null
  },
  data() {
    return {
      content:''
    }
  },
  created() {
      getPmbEntityViaArche(this.id, rs => {
          this.content = rs[Object.keys(rs)[0]]['https://vocabs.acdh.oeaw.ac.at/schema#hasTitle'][0].value;
          
        })
  }
}

</script>