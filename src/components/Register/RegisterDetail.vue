<template>
  <main>
    <div v-if="category==='p'" class="detail">
      <div>PMB: <a v-bind:href="item.pmbURL" target="_blank">{{ this.item.surname }}</a></div>
      <div class="cases" v-if="this.cases.length>0">
        <div class="rb">Akten:</div>
        <div v-for="c in currentCases" :key="c.id">
          <!--          <detail-case v-bind:case="c" v-bind:name="item.title[0]._" v-bind:category="category"></detail-case>-->
          <div class="case" v-on:click="navToObjects(c)">{{ c.title }}</div>
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
        <div v-for="d in currentDocs" :key="d.id">
          <div class="doc" v-on:click="navToLF(d)">{{ d.title }}</div>
        </div>
        <div class="btns">
          <svg v-on:click="prevDocs" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-left-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          <svg v-on:click="nextDocs" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-right-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
          </svg>
        </div>
      </div>
    </div>
    <div v-if="category==='o'" class="detail">
      <div>PMB: <a v-bind:href="item.pmbURL" target="_blank">{{ this.item.placeName }}</a></div>
      <div class="cases" v-if="this.cases.length>0">
        <div class="rb">Akten:</div>
        <div v-for="c in currentCases" :key="c.id">
          <!--          <detail-case v-bind:case="c" v-bind:name="item.title[0]._" v-bind:category="category"></detail-case>-->
          <div class="case" v-on:click="navToObjects(c)">{{ c.title }}</div>
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
        <div v-for="d in currentDocs" :key="d.id">
          <!--          <detail-case v-bind:case="c" v-bind:name="item.title[0]._" v-bind:category="category"></detail-case>-->
          <div class="doc" v-on:click="navToLF(d)">{{ d.title }}</div>
        </div>
        <div class="btns">
          <svg v-on:click="prevDocs" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-left-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          <svg v-on:click="nextDocs" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-right-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
          </svg>
        </div>
      </div>
    </div>
    <div v-if="category==='w'" class="detail">
      <div>PMB: <a v-bind:href="item.pmbURL" target="_blank">{{ this.item.title }}</a></div>
      <div class="cases" v-if="this.cases.length>0">
        <div class="rb">Akten:</div>
        <div v-for="c in currentCases" :key="c.id">
          <div class="case" v-on:click="navToObjects(c)">{{ c.title }}</div>
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
        <div v-for="d in currentDocs" :key="d.id">
          <!--          <detail-case v-bind:case="c" v-bind:name="item.title[0]._" v-bind:category="category"></detail-case>-->
          <div class="doc" v-on:click="navToLF(d)">{{ d.title }}</div>
        </div>
        <div class="btns">
          <svg v-on:click="prevDocs" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-left-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          <svg v-on:click="nextDocs" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-right-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
          </svg>
        </div>
      </div>
    </div>
    <div v-if="category==='i'" class="detail">
      <div>PMB: <a v-bind:href="item.pmbURL" target="_blank">{{ this.item.orgName }}</a></div>
      <div class="cases" v-if="this.cases.length>0">
        <div class="rb">Akten:</div>
        <div v-for="c in currentCases" :key="c.id">
          <div class="case" v-on:click="navToObjects(c)">{{ c.title }}</div>
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
        <div v-for="d in currentDocs" :key="d.id">
          <!--          <detail-case v-bind:case="c" v-bind:name="item.title[0]._" v-bind:category="category"></detail-case>-->
          <div class="doc" v-on:click="navToLF(d)">{{ d.title }}</div>
        </div>
        <div class="btns">
          <svg v-on:click="prevDocs" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-left-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          <svg v-on:click="nextDocs" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-right-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
          </svg>
        </div>
      </div>
    </div>
    <div v-if="category==='f'" class="detail">
      <div>Die Fackel: <a v-bind:href="item.url" target="_blank">{{ this.item.title }}</a></div>
      <div class="cases" v-if="this.item.cases.length>0">
        <div class="rb">Akten:</div>
        <div v-for="c in sortedItemCases(this.item.cases)" :key="c.id">
          <div class="case" v-on:click="navToObjects(c)">{{ c.title }}</div>
        </div>
        <div class="btns">
          <!--<svg v-on:click="prevCases " xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-left-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          <svg v-on:click="nextCases" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-right-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
          </svg>-->
        </div>
      </div>
      <div class="docs" v-if="this.item.cases.length>0">
        <div class="rb">Dokumente:</div>
        <div v-for="(d,idx) in sortedItemDocs(this.item.docs)" :key="`${d.id}_${idx}`">
         <!-- <div class="doc" v-on:click="navToLF(d)">{{ d.title }} <small class="d-block">(F. {{cleanPagesFromUrl(d.target)}})</small></div>-->
         <div class="doc" v-on:click="navToLF(d)">{{ d.title }}</div>
        </div>
        <div class="btns">
          <!--<svg v-on:click="prevDocs" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-left-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          <svg v-on:click="nextDocs" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-right-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
          </svg>-->
        </div>
      </div>
    </div>
    <div v-if="category==='j'" class="detail">
      <div>ALEX: <a v-bind:href="item.url" target="_blank">{{ this.item.title }}</a></div>
      <div class="cases" v-if="this.item.cases.length>0">
        <div class="rb">Akten:</div>
        <div v-for="c in sortedItemCases(this.item.cases)" :key="c.id">
          <div class="case" v-on:click="navToObjects(c)">{{ c.title }}</div>
        </div>
        <div class="btns">
         <!-- <svg v-on:click="prevCases " xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-left-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          <svg v-on:click="nextCases" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-right-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
          </svg>-->
        </div>
      </div>
      <div class="docs" v-if="this.item.cases.length>0">
        <div class="rb">Dokumente:</div>
        <div v-for="d in sortedItemDocs(this.item.docs)" :key="d.id">
          <div class="doc" v-on:click="navToLF(d)">{{ d.title }}</div>
        </div>
        <div class="btns">
          <!--<svg v-on:click="prevDocs" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-left-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          <svg v-on:click="nextDocs" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-right-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
          </svg>-->
        </div>
      </div>
    </div>

  </main>
</template>

<script>
import {getArcheIdFromXmlId} from "../../services/ARCHEService";

export default {
  name: "RegisterDetail",
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
      idxC: 3,
      idxD: 3,
      step: 3,
      caseInfo: null
    }
  },
  computed: {
    
  },
  methods: {
    sortedItemDocs(docs) {
      /*https://stackoverflow.com/a/29456041*/
      return docs.slice().sort((a, b) => {
        var aParts = a.title.substring(0, a.title.indexOf(' ')).split(".");
        var bParts = b.title.substring(0, b.title.indexOf(' ')).split(".");
        if (parseInt(aParts[0]) < parseInt(bParts[0])) return -1;
        if (parseInt(aParts[0]) > parseInt(bParts[0])) return 1;
        return parseInt(aParts[1]) - parseInt(bParts[1]);
      });
    },
    sortedItemCases(cases) {
      return cases.slice().sort((a, b) => parseInt(a.id.replace("C_",'').substring(0, a.id.length-4)) - parseInt(b.id.replace("C_",'').substring(0, b.id.length-4)));
    },
    cleanPagesFromUrl(url) {
      return `${url.replace('https://fackel.oeaw.ac.at/f/','').replace(',',', ')}`
    },
    nextCases() {
      
      if ((this.idxC) < this.cases.length) {
        //more than 10 cases left
        this.currentCases = this.cases.slice().sort((a, b) => parseInt(a.id.replace("C_",'').substring(0, a.id.length-4)) - parseInt(b.id.replace("C_",'').substring(0, b.id.length-4))).slice(this.idxC, this.idxC + this.step);
        this.idxC += this.step;
      }
    },
    prevCases() {
      if ((this.idxC - this.step) > 0) {
        //more than 10 cases left
        this.idxC -= this.step;
        this.currentCases = this.cases.slice().sort((a, b) => parseInt(a.id.replace("C_",'').substring(0, a.id.length-4)) - parseInt(b.id.replace("C_",'').substring(0, b.id.length-4))).slice(this.idxC - this.step, this.idxC);
      }
    },
    nextDocs() {
      if ((this.idxD) < this.docs.length) {
        
        //more than 10 cases left
        this.currentDocs = this.docs.slice().sort((a, b) => {
        var aParts = a.title.substring(0, a.title.indexOf(' ')).split(".");
        var bParts = b.title.substring(0, b.title.indexOf(' ')).split(".");
        if (parseInt(aParts[0]) < parseInt(bParts[0])) return -1;
        if (parseInt(aParts[0]) > parseInt(bParts[0])) return 1;
        return parseInt(aParts[1]) - parseInt(bParts[1]);
      }).slice(this.idxD, this.idxD + this.step);
        this.idxD += this.step;
      }
    },
    prevDocs() {
      if ((this.idxD - this.step) > 0) {
        //more than 10 cases left
        this.idxD -= this.step;
        this.currentDocs = this.docs.slice().sort((a, b) => {
        var aParts = a.title.substring(0, a.title.indexOf(' ')).split(".");
        var bParts = b.title.substring(0, b.title.indexOf(' ')).split(".");
        if (parseInt(aParts[0]) < parseInt(bParts[0])) return -1;
        if (parseInt(aParts[0]) > parseInt(bParts[0])) return 1;
        return parseInt(aParts[1]) - parseInt(bParts[1]);
      }).slice(this.idxD - this.step, this.idxD);
      }
    },
    setCasesAndDocs() {
      this.cases = [];
      this.docs = [];
      this.caseInfo.then(data => {
        const cases = data.cases;
        let pmbId = this.item.pmbID.toString();
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
          c.doc_objs.forEach(d => {
            this.item.docs.forEach(id => {
              if (d.id === id) {
                this.docs.push(d);
              }
            });
          });
        });
  
      });
    },
    navToObjects(c) {
      getArcheIdFromXmlId(c.id, rs => {
        let routeData = this.$router.resolve({name: 'overview-objects', params: {id: rs}});
        window.open(routeData.href, '_blank');
      });

    },
    navToLF(d) {
      let idx = d.id.lastIndexOf('/');
      let id = d.id.substring(idx + 1);

      getArcheIdFromXmlId(id, rs => {
        if(!(this.category === 'j'|| this.category === 'f')){
         //this.$router.push({name: "lesefassung", params: {id: rs}, query: {q: this.item.pmbID}});
         let routeData = this.$router.resolve({name: 'lesefassung', params: {id: rs}, query: {q: this.item.pmbID}});
         window.open(routeData.href, '_blank');
        }else{
          //laws do not have pmbIDs
          //this.$router.push({name: "lesefassung", params: {id: rs}, query: {q: d.target}});
          let routeData = this.$router.resolve({name: 'lesefassung', params: {id: rs}, query: {q: d.target}});
          window.open(routeData.href, '_blank');
        }

      });
    }
  },
  created() {
    this.caseInfo = this.$store.getters.caseInfo;
  },
  mounted() {
    if(this.category !== 'j' && this.category !== 'f'){
      this.setCasesAndDocs();
    }

  }
  ,
  watch: {
    item() {
      if(this.category !== 'j' && this.category !== 'f'){
        this.setCasesAndDocs();
      }
    }
    ,
    cases() {
      this.idxC = 3;
      this.currentCases = this.cases.slice().sort((a, b) => parseInt(a.id.replace("C_",'').substring(0, a.id.length-4)) - parseInt(b.id.replace("C_",'').substring(0, b.id.length-4))).slice(0, this.idxC);
    },
    docs() {
      this.idxD = 3;
      this.currentDocs = this.docs.slice().sort((a, b) => {
        var aParts = a.title.substring(0, a.title.indexOf(' ')).split(".");
        var bParts = b.title.substring(0, b.title.indexOf(' ')).split(".");
        if (parseInt(aParts[0]) < parseInt(bParts[0])) return -1;
        if (parseInt(aParts[0]) > parseInt(bParts[0])) return 1;
        return parseInt(aParts[1]) - parseInt(bParts[1]);
      }).slice(0, this.idxD);
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

.cases, .docs {
  margin-top: 1rem;
}

.case, .doc {
  margin-top: 0.3rem;
}

.case:hover, .doc:hover {
  text-decoration: underline;
  cursor: pointer;
}

.rb {
  font-weight: bold;
  color: var(--primary-red)
}

div > a{
  color: #0000EE;
}

</style>