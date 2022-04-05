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
      <div class="title" v-on:click="navToObjects">
        {{ this.case.title }} ({{ this.case.start_date }})
      </div>
    </div>
    <ul v-if="showDocs && !this.case.currDocs">
      <div v-if="docsLoading">Loading....</div>
      <ul v-if="!docsLoading" style="padding-left: 0;">
      <li class="obj" v-for="d in this.case.doc_objs" :key="d.id" v-on:click="navToLF(d)">{{ d.title }}</li>
      </ul>
    </ul>
    <ul v-if="showDocs && this.case.currDocs">
      <li class="obj" v-for="d in this.case.currDocs" :key="d.id" v-on:click="navToLF(d)">{{ d.title }}</li>
    </ul>
  </main>
</template>

<script>
import {
  getColArcheIdFromColXmlId,
  getEntity,
  getObjectsOfCollection,
  getObjectWithId
} from "../../services/ARCHEService";
import {ARCHErdfQuery} from "arche-api/src";

export default {
  name: "DetailCase",
  props: {
    case: [],
    name: null,
  },
  data: function () {
    return {
      showDocs: false,
      caseIdArche: null,
      docsLoading: false
    }
  },
  methods: {
    toggleDocs() {
      this.showDocs = !this.showDocs;
      if (this.showDocs && !this.case.currDocs && this.caseIdArche === null) {
        this.docsLoading = true;
        getColArcheIdFromColXmlId(this.case.id, rs => {
          this.caseIdArche = rs;
          //todo: if currDocs is not set (e.g. for persons), find a way to extract documents that mention said entity
         getObjectsOfCollection(rs, docs => {
            let currdocs = [];
            docs.forEach(d => {
              let idx = d.url.lastIndexOf('/');
              let id = d.url.substring(idx+1);

              getObjectWithId(id, rs =>{
                const optionsHasActor = {
                  "subject": null,
                  "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#hasActor",
                  "object": null,
                  "expiry": 14
                };
                var actors = ARCHErdfQuery(optionsHasActor, rs).value;
                let actorObjs = [];
                actors.forEach(x => {
                  let idLong = x.hasActor.object;
                  let idx = idLong.lastIndexOf('/');
                  let id = idLong.substring(idx + 1);
                  getEntity(id, rs => {
                    actorObjs.push(rs.title);
                    if(rs.title.includes(this.name)){
                      currdocs.push(d);
                    }
                  });
                });

              });
            });
           this.case.doc_objs = currdocs;
           this.docsLoading = false;


          });
        });
      }
    },
    navToObjects() {
      getColArcheIdFromColXmlId(this.case.id, rs=>{
        this.$router.push({name: "overview-objects", params: {id: rs}});
      });

    },
    navToLF(d){
      let idx = d.identifier.lastIndexOf('/');
      let id = d.identifier.substring(idx+1);
      getColArcheIdFromColXmlId(id, rs =>{
        this.$router.push({name: "lesefassung", params: {id: rs}});
      });
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.case {
  text-decoration: underline;
  text-align: left;
  display: inline-flex;
  margin-top:1rem;
}

.title:hover{
  cursor: pointer;
  font-weight: bold;
}

.bi-caret-right:hover, .bi-caret-down:hover{
  background-color: var(--secondary-gray);
  cursor: pointer;
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

.obj:hover{
  text-decoration: underline;
  cursor: pointer;
}
</style>