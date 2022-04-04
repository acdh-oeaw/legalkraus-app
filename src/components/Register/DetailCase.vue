<template>
  <main>
    <div class="case">
      <svg v-if="!showDocs" v-on:click="toggleDocs" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
           class="bi bi-caret-right"
           viewBox="0 0 16 16">
        <path
            d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
      </svg>
      <svg v-if="showDocs" v-on:click="toggleDocs" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">
        <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
      </svg>
      <div v-on:click="navToObjects">
        {{ this.case.title }} ({{ this.case.start_date }})
      </div>
    </div>
    <div v-if="showDocs && !this.case.currDocs">
      <div class="obj" v-for="d in this.case.doc_objs" :key="d.id">{{ d.title }}</div>
    </div>
    <div v-if="showDocs && this.case.currDocs">
      <div class="obj" v-for="d in this.case.currDocs" :key="d.id" v-on:click="navToLF(d)">{{ d.title }}</div>
    </div>
  </main>
</template>

<script>
import {getColArcheIdFromColXmlId} from "../../services/ARCHEService";

export default {
  name: "DetailCase",
  props: {
    case: []
  },
  data: function () {
    return {
      showDocs: false,
      caseIdArche: null,
    }
  },
  methods: {
    toggleDocs() {
      this.showDocs = !this.showDocs;
      if (!this.case.currDocs && this.caseIdArche === null) {
        getColArcheIdFromColXmlId(this.case.id, rs => {
          this.caseIdArche = rs;
          console.log(rs);
          //todo: if currDocs is not set (e.g. for persons), find a way to extract documents that mention said entity
         /* getObjectsOfCollection(rs, docs => {
            console.log(docs);

          });*/
        });
      }
    },
    navToObjects() {
      getColArcheIdFromColXmlId(this.case.id, rs=>{
        this.$router.push({name: "overview-objects", params: {id: rs}});
      });

    },
    navToLF(d){
      console.log(d);
      //todo
    }
  },
  mounted() {
    console.log(this.case)
  }
}
</script>

<style scoped>
.case {
  text-decoration: underline;
  text-align: left;
  cursor: pointer;
  display: inline-flex;
  margin-top:1rem;
}
svg {
  min-width: 10px;
  min-height: 10px;
  max-width: 10px;
  max-height: 10px;

  margin-right: 0.3rem;
  margin-top: 0.5rem;
}

.obj {
  margin-left: 2rem;
}
</style>