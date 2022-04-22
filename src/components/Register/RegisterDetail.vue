<template>
  <main>
    <div v-if="category==='p'" class="detail">
      <div><b>Person:</b></div>
      <div>Vorname: <b>{{ this.item.forename }}</b></div>
      <div>Nachname: <b>{{ this.item.surname }}</b></div>
      <div>Geburtdatum: <b>{{ this.item.birthDate }}</b></div>
      <div>Geburtsort: <b>{{ this.item.birthPlace }}</b></div>
      <div>Sterbedatum: <b>{{ this.item.deathDate }}</b></div>
      <div>Sterbeort: <b>{{ this.item.deathPlace }}</b> </div>
      <div>Beruf: <b>{{ this.item.occupation }}</b></div>
      <div>PMB: <a v-bind:href="item.pmbURL" target="_blank">{{ this.item.surname }}</a></div>
      <div v-if="this.cases.length>0">
        <div>Beteiligt an:</div>
        <div class="btns">
          <svg v-on:click="prevCases " xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-left-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          <svg v-on:click="nextCases" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-right-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
          </svg>
        </div>
        <div  v-for="c in currentCases" :key="c.id" class="case">
          <detail-case v-bind:case="c" v-bind:name="item.surname" v-bind:category="category"></detail-case>
        </div>


      </div>

    </div>
    <div v-if="category==='o'" class="detail">
      <div>Ort:</div>
      <div>Name: <b>{{ this.item.placeName }}</b></div>
      <div>Lage: <b>{{ this.item.location }}</b></div>
      <div>PMB: <a v-bind:href="item.pmbURL" target="_blank">{{ this.item.placeName }}</a></div>
      <div v-if="this.cases.length>0">
        <div>Erwähnungen:</div>
        <div class="btns">
          <svg v-on:click="prevCases " xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-left-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          <svg v-on:click="nextCases" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-right-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
          </svg>
        </div>
        <div v-for="c in currentCases" :key="c.id" class="case">
          <detail-case v-bind:case="c" v-bind:name="item.placeName" v-bind:category="category"></detail-case>
        </div>
      </div>
    </div>
    <div v-if="category==='w'" class="detail">
<!--      <div>Werk:</div>
      <div>Titel: <b>{{ this.item.title }}</b></div>-->
<!--      <div>Autor: <b>{{ this.item.author }}</b></div>
      <div>Datum:<b>{{ this.item.date }}</b></div>
      <div v-if="this.item.relations.length > 0">Enthalten in:
        <div v-for="r in this.item.relations" :key="r.id"><a v-bind:href="'https://pmb.acdh.oeaw.ac.at/apis/entities/entity/work/'+ r.id + '/detail'" target="_blank">{{r.name}}</a></div>
      </div>-->
      <div>PMB: <a v-bind:href="item.pmbURL" target="_blank">{{ this.item.title }}</a></div>
      <div class="cases" v-if="this.cases.length>0">
        <div class="rb">Fälle:</div>
        <div v-for="c in currentCases" :key="c.id">
<!--          <detail-case v-bind:case="c" v-bind:name="item.title[0]._" v-bind:category="category"></detail-case>-->
          <div class="case" v-on:click="navToObjects(c)">{{c.title}}</div>
        </div>
        <div class="btns">
          <svg v-on:click="prevCases " xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-left-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          <svg v-on:click="nextCases" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-right-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
          </svg>
        </div>
      </div>
      <div class="docs" v-if="this.docs.length>0">
        <div class="rb">Dokumente:</div>
        <div v-for="d in docs" :key="d.id" >
          <!--          <detail-case v-bind:case="c" v-bind:name="item.title[0]._" v-bind:category="category"></detail-case>-->
          <div class="doc" v-on:click="navToLF(d)">{{d.title}}</div>
        </div>
        <div class="btns">
          <svg v-on:click="prevCases " xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-left-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          <svg v-on:click="nextCases" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-right-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
          </svg>
        </div>
      </div>
    </div>
    <div v-if="category==='i'" class="detail">
<!--      <div>Institution:</div>
      <div>Name: <b>{{ this.item.orgName }}</b></div>
      <div>Ort: <b>{{ this.item.location }}</b></div>-->
      <div>PMB: <a v-bind:href="item.pmbURL" target="_blank">{{ this.item.orgName }}</a></div>
<!--      <div v-if="this.cases.length>0">
        <div>Erwähnungen:</div>
        <div class="btns">
          <svg v-on:click="prev " xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-left-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          <svg v-on:click="next" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-right-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
          </svg>
        </div>
        <div v-for="c in currentCases" :key="c.id" class="case">
          <detail-case v-bind:case="c" v-bind:name="item.orgName" v-bind:category="category"></detail-case>
        </div>
      </div>-->
      <div class="cases" v-if="this.cases.length>0">
        <div class="rb">Fälle:</div>
        <div v-for="c in currentCases" :key="c.id">
          <!--          <detail-case v-bind:case="c" v-bind:name="item.title[0]._" v-bind:category="category"></detail-case>-->
          <div class="case" v-on:click="navToObjects(c)">{{c.title}}</div>
        </div>
        <div class="btns">
          <svg v-on:click="prevCases " xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-left-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          <svg v-on:click="nextCases" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-right-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
          </svg>
        </div>
      </div>
      <div class="docs" v-if="this.cases.length>0">
        <div class="rb">Dokumente:</div>
        <div v-for="d in currentDocs" :key="d.id" >
          <!--          <detail-case v-bind:case="c" v-bind:name="item.title[0]._" v-bind:category="category"></detail-case>-->
          <div class="doc" v-on:click="navToLF(d)">{{d.title}}</div>
        </div>
        <div class="btns">
          <svg v-on:click="prevCases " xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-left-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          <svg v-on:click="nextCases" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-right-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
          </svg>
        </div>
      </div>
    </div>

  </main>
</template>

<script>
import DetailCase from "./DetailCase";
import {getColArcheIdFromColXmlId} from "../../services/ARCHEService";

export default {
  name: "RegisterDetail",
  components: {
    DetailCase: DetailCase
  },
  props: {
    item: null,
    category: null
  },
  data: function () {
    return {
      cases: [],
      docs: [],
      currentCases: [],
      currentDocs: [],
      idxC: 5,
      idxD: 5,
      step: 5,
      caseInfo: null
    }
  },
  methods: {
    nextCases() {
      if ((this.idxC + this.step) < this.cases.length) {
        //more than 10 cases left
        this.currentCases = this.cases.slice(this.idxC, this.idxC + this.step);
        this.idxC += this.step;
      }
    },
    prevCases() {
      if ((this.idxC - this.step) > 0) {
        //more than 10 cases left
        this.idxC -= this.step;
        this.currentCases = this.cases.slice(this.idxC - this.step, this.idxC);
      }
    },
    nextDocs() {
      if ((this.idxD + this.step) < this.docs.length) {
        //more than 10 cases left
        this.currentDocs = this.docs.slice(this.idxD, this.idxD + this.step);
        this.idxD += this.step;
      }
    },
    prevDocs() {
      if ((this.idxD - this.step) > 0) {
        //more than 10 cases left
        this.idxD -= this.step;
        this.currentDocs = this.docs.slice(this.idxD - this.step, this.idxD);
      }
    },
    setCasesAndDocs() {
      this.cases = [];
      this.docs = [];
      this.caseInfo.then(data => {
        const cases = data.cases;
        let pmbId =  this.item.pmbID.toString();
        if (this.category === 'p') {
          //match pmbId to case;
          cases.forEach(c => {
            if (c.men_pers[pmbId] && !this.cases.includes(c)) {
              this.cases.push(c);
            }
          });
        } else if (this.category === 'o') {
          //match pmbId to case;
          cases.forEach(c => {
            if (c.men_pl[pmbId] && !this.cases.includes(c)) {
              this.cases.push(c);
            }
          });
        } else if (this.category === 'i') {
          //match pmbId to case;
          cases.forEach(c => {
            if (c.men_orgs[pmbId] && !this.cases.includes(c)) {
              this.cases.push(c);
            }
          });
        } else if (this.category === 'w') {
          //match pmbId to case;
          cases.forEach(c => {
            if (c.men_works[pmbId] && !this.cases.includes(c)) {
              this.cases.push(c);
            }
          });
        }

        //bottleneck
        this.cases.forEach(c => {
          c.doc_objs.forEach(d =>{
            this.item.docs.forEach(id =>{
              if(d.id === id){
                this.docs.push(d);
              }
            });
          });
        });

      });
    },
    navToObjects(c) {
      getColArcheIdFromColXmlId(c.id, rs => {
        this.$router.push({name: "overview-objects", params: {id: rs}});
      });

    },
    navToLF(d) {
      let idx = d.id.lastIndexOf('/');
      let id = d.id.substring(idx + 1);

      getColArcheIdFromColXmlId(id, rs => {
        this.$router.push({name: "lesefassung", params: {id: rs}, query:{q: this.item.pmbID}});
      });
    }
  },
  created() {
    this.caseInfo = this.$store.getters.caseInfo;
  },
  mounted() {
    this.setCasesAndDocs();
  }
  ,
  watch: {
    item() {
      this.setCasesAndDocs();
    }
    ,
    cases() {
      this.idxC = 5;
      this.currentCases = this.cases.slice(0, this.idxC);
    },
    docs(){
      this.idxD = 5;
      this.currentDocs = this.docs.slice(0, this.idxD);
    }
  }
}
</script>

<style scoped>
.detail {
  text-align: left;
}

.btns {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.cases, .docs{
  margin-top: 1rem;
}

.case, .doc{
  margin-top: 0.3rem;
}

.case:hover, .doc:hover{
  text-decoration: underline;
  cursor: pointer;
}

.rb{
  font-weight: bold;
  color: var(--primary-red)
}

</style>