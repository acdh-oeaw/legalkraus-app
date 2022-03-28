<template>
  <main>
    <p class="navigation">Register
      <span class="arrow">></span>
      <span style="font-weight: bold">{{ this.category }}</span>
    </p>
    <div class="body overflow-auto d-flex flex-row">
      <!-- <div v-if="this.$store.getters.linebreaks" class="w-5 text-right position-relative">
       </div>-->
      <component class="position-relative" v-if="table" :is="dynComponent"/>
    </div>
  </main>
</template>

<script>
import {getTransformedHtmlRegistry} from "../../services/ARCHEService";

export default {
  name: "Register",
  data: function () {
    return {
      category: null,
      table: null
    }
  },
  computed: {
    dynComponent() {

      const template = this.table;
      return {
        template,
      }
    }
  },
  methods: {
    setCategory() {
      const p = this.$route.path.toString();
      if (p.includes("register/personen")) {
        this.category = "Personen";
      } else if (p.includes("register/orte")) {
        this.category = "Orte";
      } else if (p.includes("register/institutionen")) {
        this.category = "Institutionen";
      } else if (p.includes("register/werke")) {
        this.category = "Werke";
      } else if (p.includes("register/fackel")) {
        this.category = "Fackel";
      } else if (p.includes("register/juristische-texte")) {
        this.category = "Juristische Texte";
      }
    }
  },
  mounted() {
    this.setCategory();
    getTransformedHtmlRegistry(rs => {
      console.log(rs);
      this.table = rs;
    });
  },
  watch: {
    $route() {
      this.setCategory();
    }
  }
}
</script>

<style scoped>

</style>