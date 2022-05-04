<template>
  <span v-if="this.medium">{{ this.content }}, {{ getTranslatedMedium(this.medium) }}</span>
  <span v-else>{{ this.content }}</span>
</template>

<script>
import { getPmbPersonWithoutDetails } from "../../services/PMBService";

export default {
  name: "MdHelper",
  props: {
    id: null,
    medium: null,
    type: null,
  },
  data() {
    return {
      content: "",
    };
  },
  created() {
    getPmbPersonWithoutDetails(this.id, this.type, (rs) => {
      if (this.type === "place" || this.type === "institution") {
        console.log(rs)
        this.content = rs.name;
      } else {
        this.content = rs.first_name + " " + rs.name;
      }
    });
  },
  methods: {
    getTranslatedMedium(medium) {
      let translatedMedium = "";
      switch (medium) {
        case "black-ink":
          translatedMedium = "schwarze Tinte";
          break;
        case "brown-ink":
          translatedMedium = "braune Tinte";
          break;
        case "red-ink":
          translatedMedium = "rote Tinte";
          break;
        case "pencil":
          translatedMedium = "Bleistift";
          break;
        case "grey-pencil":
          translatedMedium = "Bleistift";
          break;
        case "blue-pencil":
          translatedMedium = "blauer Stift";
          break;
        case "red-pencil":
          translatedMedium = "roter Stift";
          break;
        case "green-pencil":
          translatedMedium = "grüner Stift";
          break;
        default:
          translatedMedium = medium;
      }
      return translatedMedium;
    },
  },
};
</script>