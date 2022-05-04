<template>
    <span v-if="this.medium">{{this.content}}, {{this.medium}}</span>
    <span v-else>{{this.content}}</span>
</template>

<script>
import {
  getPmbPersonWithoutDetails
} from "../../services/PMBService";

export default {
  name: "MdHelper",
  props: {
      id: null,
      medium:null,
      type:null,

  },
  data() {
    return {
      content:''
    }
  },
  created() {
      getPmbPersonWithoutDetails(this.id, this.type, rs => {
        if (this.type ==='place' || this.type ==='institution') {
          this.content = rs.name
        } else {
          this.content = rs.first_name + " " + rs.name;
        }
          
        })
  }
}

</script>