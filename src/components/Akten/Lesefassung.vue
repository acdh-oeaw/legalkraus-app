<template>
  <div class="main" v-if="this.dataLoaded">
    <Search class="py-2" v-bind:col-id="colId" v-bind:rs-id="objectId"></Search>
    <p v-if="propsSet" class="navigation">Akten-Edition
      <span class="arrow">></span>
      <router-link router-link class="nav-link" :to="'/akten-edition/' + this.cat">
        {{ this.$route.params.cat }}
      </router-link>
      <span class="arrow">></span>
      <router-link router-link class="nav-link"
                   :to="'/akten-edition/' + this.cat + '/'+ this.subcat +'/collections'">
        {{ this.$route.params.subcat }}
      </router-link>
      <span class="arrow">></span>
      <router-link router-link class="nav-link"
                   :to="'/akten-edition/' + this.cat + '/'+ this.subcat +'/objects/'+ this.colId">
        {{ this.colTitle }}
      </router-link>
      <span class="arrow">></span>
      <span style="font-weight: bold">{{ this.objectTitle }}</span>
    </p>
    <p v-if="!propsSet" class="navigation">Akten-Edition
      <span class="arrow">></span>
      <router-link router-link class="nav-link"
                   :to="'/objects/'+ this.colId">
        {{ this.colTitle }}
      </router-link>
      <span class="arrow">></span>
      <span style="font-weight: bold">{{ this.objectTitle }}</span>
    </p>
    <div class="meta-data">
      <p class="meta1">Metadaten Fall:</p>
      <div class="meta2">
        <router-link class="back" to="/">{{ this.colTitle }}</router-link>
        <p>Anzahl Dokumente: {{ this.colSize }}</p>
      </div>
      <div class="vl meta3"></div>
      <p class="meta4">Datum: (coming soon)</p>
      <div class="meta5">
        <span v-if="actorsClosed" class="hasActor">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-caret-right"
             viewBox="0 0 16 16" v-on:click="toggleActors">
          <path
              d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
        </svg>
        Beteiligte: {{ actors.length }}
          </span>
        <div v-if="!actorsClosed">
        <span class="hasActor">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-caret-down"
             viewBox="0 0 16 16" v-on:click="toggleActors">
  <path
      d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
</svg>
        Beteiligte:

          </span>
          <p v-for="actor in actors" v-bind:key="actor.identifier">{{ actor.title }}</p>
        </div>
      </div>
      <div class="vl meta7"></div>
      <div class="meta8">
        <input class="vt" type="text" placeholder="Volltextsuche:" v-model="keyword" @keyup="highlight(keyword)"/>
        <button type="button" class="btn vt-button" data-search="next" v-on:click="highlightNext()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-down-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
          </svg>
        </button>
        <button type="button" class="btn vt-button" data-search="prev" v-on:click="highlightPrev()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-up-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="grid-container">
      <div id="card-left-small" class="card-left-small" v-if="this.showLF && !this.showFacs"
           v-on:click="this.toggleShowBoth">
        <div class="facs">
          <button class="format btn btn-light">Facsimile</button>
        </div>
        <div class="card card-fixed-small">
          <img class="embedded-img-small" :src="getCurrentFacs()" alt="facsimile">
        </div>
      </div>

      <div id="card-left-medium" class="card-left" v-if="this.showLF && this.showFacs">
        <div class="facs">
          <button class="format btn btn-light mb-2 btn-red">Facsimile</button>
        </div>
        <div class="card card-fixed border-0 bg-light">
          <div class="header">
            <svg v-on:click="toggleLF()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                    d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"/>
            </svg>
          </div>
          <img class="embedded-img" :src="getCurrentFacs()" alt="facsimile">
        </div>
      </div>

      <div id="card-left-large" class="view-full-width-left" v-if="!this.showLF && this.showFacs">
        <div class="facs-full-width">
          <button class="format btn btn-light btn-red">Facsimile</button>
        </div>
        <div class="card card-full">
          <img class="embedded-img" :src="getCurrentFacs()" alt="facsimile">
        </div>
      </div>

      <div id="card-right-small" class="card-right-small" v-if="this.showFacs && !this.showLF"
           v-on:click="this.toggleShowBoth">
        <div class="formats">
          <button class="format btn btn-light">Lesefassung</button>
        </div>
        <div class="card card-fixed-small">
          <div class="header">
          </div>
          <div class="body">
          </div>
        </div>
      </div>

      <div id="card-right-medium" class="card-right" v-if="this.showFacs && this.showLF">

        <div class="formats mb-2">
          <button class="format btn btn-light btn-red">Lesefassung</button>
          <a class="format btn btn-light" role="button" :href="xmlFile"
             :download="filename">
            Download XML
          </a>
          <a class="format btn btn-light" role="button" :href="pdfFile"
             :download="filename">
            Download PDF
          </a>
        </div>
        <div class="card card-fixed border-0 bg-light">
          <div class="header">
            <svg v-on:click="toggleFacs()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                    d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"/>
            </svg>
            <div class="all-annotations">
              <b-form-checkbox
                  v-model="showAllAnnotations"
                  value="true"
                  unchecked-value="false"
                  v-on:change="updateAllHighlighters()"
                  switch
                  size="lg"
              >Alle Annotationen
              </b-form-checkbox>

            </div>
          </div>
          <div class="toggles  mx-auto">
            <b-form-checkbox
                id="pe-toggle"
                v-model="highlighter['person']"
                v-on:change="updateHighlighter('person', highlighter['person'])"
                switch
            >
              Personen
            </b-form-checkbox>
            <b-form-checkbox
                id="i-toggle"
                v-model="highlighter['institution']"
                v-on:change="updateHighlighter('institution', highlighter['institution'])"
                switch
            >
              Institution
            </b-form-checkbox>

            <b-form-checkbox
                id="pl-toggle"
                v-model="highlighter['place']"
                v-on:change="updateHighlighter('place', highlighter['place'])"
                switch
            >
              Ort
            </b-form-checkbox>

            <b-form-checkbox
                id="l-toggle"
                v-model="highlighter['law']"
                v-on:change="updateHighlighter('law', highlighter['law'])"
                switch
            >
              jur. Texte
            </b-form-checkbox>
            <b-form-checkbox
                id="w-toggle"
                v-model="highlighter['work']"
                v-on:change="updateHighlighter('work', highlighter['work'])"
                switch
            >
              Werke
            </b-form-checkbox>

            <b-form-checkbox
                id="q-toggle"
                v-model="highlighter['quote']"
                v-on:change="updateHighlighter('quote', highlighter['quote'])"
                switch
            >
              Zitat
            </b-form-checkbox>
             <b-form-checkbox
                id="intertext-toggle"
                v-model="highlighter['intertext']"
                v-on:change="updateHighlighter('intertext', highlighter['intertext'])"
                switch
            >
              Intertext Fackel
            </b-form-checkbox>

          </div>

          <div class="vt-container">
            <input class="vt" type="text" placeholder="Volltextsuche:" v-model="keyword"
                   @keyup="highlight(keyword)"/>
            <button type="button" class="btn vt-button" data-search="next" v-on:click="highlightNext()">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   class="bi bi-arrow-down-short" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                      d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
              </svg>
            </button>
            <button type="button" class="btn vt-button" data-search="prev" v-on:click="highlightPrev()">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   class="bi bi-arrow-up-short" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                      d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
              </svg>
            </button>
          </div>
          <div class="body overflow-auto d-flex flex-row">
            <!-- <div v-if="this.$store.getters.linebreaks" class="w-5 text-right position-relative">
             </div>-->
            <component class="position-relative" v-if="pages" :is="dynComponent"
                       v-on:childToParent="childToParent($event)"/>
          </div>
        </div>
      </div>

      <div id="card-right-large" class="view-full-width-right" v-if="!this.showFacs && this.showLF"
           v-on="childToParent">
        <div class="formats-full-width">
          <button class="format btn btn-light btn-red">Lesefassung</button>
          <a class="format btn btn-light" role="button" :href="xmlFile"
             :download="filename">
            Download XML
          </a>
          <a class="format btn btn-light" role="button" :href="pdfFile"
             :download="filename">
            Download PDF
          </a>
        </div>
        <div class="card card-full bg-light">
          <div class="header">
            <div class="all-annotations">
              <b-form-checkbox
                  v-model="showAllAnnotations"
                  value="true"
                  unchecked-value="false"
                  v-on:change="updateAllHighlighters()"
                  switch
                  size="lg"
              >Alle Annotationen
              </b-form-checkbox>

            </div>
          </div>
          <div class="toggles mx-auto">
            <b-form-checkbox
                id="pe-toggle"
                v-model="highlighter['person']"
                v-on:change="updateHighlighter('person', highlighter['person'])"
                switch
            >
              Personen
            </b-form-checkbox>
            <b-form-checkbox
                id="i-toggle"
                v-model="highlighter['institution']"
                v-on:change="updateHighlighter('institution', highlighter['institution'])"
                switch
            >
              Institution
            </b-form-checkbox>

            <b-form-checkbox
                id="pl-toggle"
                v-model="highlighter['place']"
                v-on:change="updateHighlighter('place', highlighter['place'])"
                switch
            >
              Ort
            </b-form-checkbox>

            <b-form-checkbox
                id="l-toggle"
                v-model="highlighter['law']"
                v-on:change="updateHighlighter('law', highlighter['law'])"
                switch
            >
              jur. Texte
            </b-form-checkbox>
            <b-form-checkbox
                id="w-toggle"
                v-model="highlighter['work']"
                v-on:change="updateHighlighter('work', highlighter['work'])"
                switch
            >
              Werke
            </b-form-checkbox>

            <b-form-checkbox
                id="q-toggle"
                v-model="highlighter['quote']"
                v-on:change="updateHighlighter('quote', highlighter['quote'])"
                switch
            >
              Zitat
            </b-form-checkbox>
          <b-form-checkbox
                id="intertext-toggle"
                v-model="highlighter['intertext']"
                v-on:change="updateHighlighter('intertext', highlighter['intertext'])"
                switch
            >
              Intertext Fackel
            </b-form-checkbox>
          </div>
          <div class="body row m-0 overflow-auto">
            <component class="col-9" v-if="pages" :is="dynComponent" v-on:childToParent="childToParent($event)"
                       v-on:child-mounted="childMounted"/>
            <div class="col-3 position-relative" id="comments"></div>
          </div>
        </div>
      </div>


    </div>
    <div class="w-100 mt-5">
      <svg v-on:click="prev()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
           class="bi bi-arrow-left text-bottom" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
      </svg>
      <span class="px-1">Seite
        <span>
          <select class="page-jump" :value="selectedPage" @change="changePage($event)">
              <option v-for="(item,idx) in facsURLs" :key="`p${idx}`" :value="idx + 1">{{ idx + 1 }}</option>
          </select>
    </span>
         von {{ facsURLs.length }}</span>
      <svg v-on:click="next()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
           class="bi bi-arrow-right text-bottom" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
      </svg>
    </div>
 <b-modal id="bv-modal-witness" size="xl"  hide-footer>
    <template #modal-title>
      Textzeuge
    </template>
    <div class="d-block text-center">
      <div :key="`w${idx}`" v-for="(imgurl,idx) in this.witness">
      <img :src="witnessImageSize(imgurl)"/>
      </div>
    </div>
  </b-modal>
  </div>
</template>

<script>
import {
  getColArcheIdFromColXmlId,
  getCollectionOfObject,
  getEntity,
  getObjectWithId,
  getTransformedHtmlResource
} from "../../services/ARCHEService";
import {getObjectWithId as getPMBObjectWithId} from "../../services/PMBService";
import {ARCHErdfQuery} from "arche-api/src";
import EntitySpan from "./EntitySpan";
import Search from "../Search";
import {jsPDF} from "jspdf";
import {mapGetters} from 'vuex';
import * as Mark from "mark.js/dist/mark.min.js"


export default {
  components: {
    EntitySpan: EntitySpan,
    Search: Search
  },
  name: "Lesefassung",
  data: function () {
    return {
      objectId: -1,
      colTitle: String,
      colSize: Number,
      colUrl: String,
      colId: String,
      colXmlId: String,
      objectTitle: String,
      showLF: true,
      showFacs: true,
      downloadLink: String,
      xml: String,
      xmlFile: String,
      pdfFile: String,
      dom: Object,
      teiHeader: Object,
      filename: String,
      facsURLs: [],
      i: 0,
      transformedHTML: null,
      pages: null,
      showAllAnnotations: false,
      propsSet: false,
      keyword: null,
      actors: [],
      marks: [],
      idxCurrMark: 0,
      actorsClosed: true,
      cat: null,
      subcat: null,
      caseInfo: null,
      witness: [],
      dataLoaded:false,
    }
  },
  computed: {
    ...mapGetters({
      selectedPage: 'selectedPage',
      highlighter: 'highlighter'
    }),
    dynComponent() {

      const template = this.pages;
      return {
        data() {
          return {
            content: ''
          };
        },
        template,
        mounted() {
          this.$refs['readview'].querySelectorAll("[data-pgnr]").forEach((page) => {
            page.querySelectorAll(".lb").forEach((lb,idx) => {
              const ln = idx + 1;
              if (ln % 5 === 0) {
                lb.setAttribute('data-lbnr', idx + 1);
              }
            });
            this.$parent.childMounted();
          }
          )
        },
        computed: {
          ...mapGetters({
            selectedPage: 'selectedPage',
            highlighter: 'highlighter'
          }),
          currentFacsUrl() {
              return this.$parent.getCurrentFacs();
          },
        },
        methods: {
          navigateTo(pmbId, type, event) {
            console.log(event)
            this.$emit('childToParent', {pmbId: pmbId, type: type, htmlId: event.target.id});
          },
          setWitness(val) {
            console.log(val)
            this.$parent.witness = val
            }
        }
      }
    }
  },
  methods: {
    witnessImageSize(val) {
      console.log(val)
      return val.replace('full/full/', 'full/600,/')
  },
    async highlightQueryOnMounted(q) {
      await document.querySelector(`.d-block[data-pgnr='${this.selectedPage}']`);
      let men_id = document.getElementsByClassName("#" + q);

      //if class not found: go to next page until found
      while (men_id.length === 0 && this.facsURLs.length > this.selectedPage) {
        //there is at least one more page
        this.next();
        await document.querySelector(`.d-block[data-pgnr='${this.selectedPage}']`);
        men_id = document.getElementsByClassName("#" + q);

      }
      //found next mark; reset idxCurrMark
      this.idxCurrMark = 0;
      let page = men_id[0].closest('[data-pgnr]').dataset.pgnr;
      while(this.selectedPage < page){
        this.next();
      }
      men_id.item(0).classList.add("current-mark");

    },
    async highlightOnMounted(keyword) {
      var self = this;
      keyword = keyword.replace("\"", "?"); //markJS cannot detect quotes from our data

      const options = {
        "separateWordSearch": false,
        "wildcards": "enabled",
        "acrossElements": true,
        "noMatch": function () {
          alert("Kein Treffer für \" " + keyword + "\"");
        }
      };
      /* set page, need to find a solution for multiple marks */
      options.each = (elm) => {
        self.$store.dispatch('setSelectedPage', parseInt(elm.closest('[data-pgnr]').dataset.pgnr));
      }
      await document.querySelector(`.d-block[data-pgnr='${this.selectedPage}']`);
      var instance = new Mark(document.querySelector(".body"));
      instance.mark(keyword, options);
      this.marks = document.getElementsByClassName("d-block").item(0).querySelectorAll("mark");
      this.marks[this.idxCurrMark].classList.add("current-mark");
      document.getElementsByClassName('body').item(0).scrollTop = this.marks[this.idxCurrMark].offsetTop;
    },
    highlight(keyword) {
      keyword = keyword.replace("\"", "?"); //markJS cannot detect quotes from our data
      var instance = new Mark(document.querySelector(".body"));
      instance.unmark({
        done: function () {
          const options = {
            "separateWordSearch": false,
            "wildcards": "enabled",
            "acrossElements": true,
            "noMatch": function () {
              alert("Kein Treffer für \" " + keyword + "\"");
            }
          };
          instance.mark(keyword, options);

        }
      });
      this.marks = document.getElementsByClassName("d-block").item(0).querySelectorAll("mark");
      if (this.marks.length === 0) {
        //no match on current page
        this.highlightNext();
      } else {
        this.marks[this.idxCurrMark].classList.add("current-mark");
        document.getElementsByClassName('body').item(0).scrollTop = this.marks[this.idxCurrMark].offsetTop;
      }

    },
    async highlightNext() {
      if (this.idxCurrMark < this.marks.length) {
        this.marks[this.idxCurrMark].classList.remove("current-mark");
      }
      if ((this.idxCurrMark + 1) < this.marks.length) {
        //there are unvisited marks on the selectedPage
        this.idxCurrMark++;

      } else {
        //no more marks on the current page -> find the next page with marks
        let foundNext = false;
        while (this.facsURLs.length > this.selectedPage) {
          //there is at least one more page
          this.next();
          await document.querySelector(`.d-block[data-pgnr='${this.selectedPage}']`);
          this.marks = document.getElementsByClassName("d-block").item(0).querySelectorAll("mark");
          if (this.marks.length > 0) {
            //found next mark; reset idxCurrMark
            this.idxCurrMark = 0;
            foundNext = true;
            break;
          }
        }
        if (!foundNext) {
          //jump to firstPage and restart highlighting
          this.$store.dispatch('setSelectedPage', parseInt(1));
          await document.querySelector(`.d-block[data-pgnr='${this.selectedPage}']`);
          this.marks = document.getElementsByClassName("d-block").item(0).querySelectorAll("mark");

        }
      }
      this.marks[this.idxCurrMark].classList.add("current-mark");
      document.getElementsByClassName('body').item(0).scrollTop = this.marks[this.idxCurrMark].offsetTop;

    },
    async highlightPrev() {
      this.marks[this.idxCurrMark].classList.remove("current-mark");
      if (this.idxCurrMark > 0) {
        this.idxCurrMark--;
      } else {
        //no more marks on the current page -> find the most recent previous page with marks
        let foundNext = false;
        while (this.selectedPage > 1) {
          //there is at least one more page
          this.prev();
          await document.querySelector(`.d-block[data-pgnr='${this.selectedPage}']`);
          this.marks = document.getElementsByClassName("d-block").item(0).querySelectorAll("mark");
          if (this.marks.length > 0) {
            //found next mark; reset idxCurrMark
            this.idxCurrMark = this.marks.length - 1;
            foundNext = true;
            break;
          }
        }
        if (!foundNext) {
          //jump to last page
          this.$store.dispatch('setSelectedPage', parseInt(this.facsURLs.length));
          await document.querySelector(`.d-block[data-pgnr='${this.selectedPage}']`);
          this.marks = document.getElementsByClassName("d-block").item(0).querySelectorAll("mark");
        }
      }
      this.marks[this.idxCurrMark].classList.add("current-mark");
      document.getElementsByClassName('body').item(0).scrollTop = this.marks[this.idxCurrMark].offsetTop;

    },
    changePage(event) {
      
      this.$store.dispatch('setSelectedPage', parseInt(event.target.value))
      this.alignRdgs();
    },
    async alignRdgs() {
      await document.querySelector(`.d-block[data-pgnr='${this.selectedPage}']`);
          const rdgsLeft = document.querySelectorAll(".rdg.marginLeft");
          const rdgsRight = document.querySelectorAll(".rdg.mRight");
          rdgsLeft.forEach(async (rdg,idx) => {
      
            if (idx > 0) {
              await rdgsLeft[idx-1].offsetTop > 0;
              console.log(rdgsLeft[idx-1].offsetTop)
               const prevBottom = rdgsLeft[idx-1].offsetTop + rdgsLeft[idx-1].clientHeight;
               
            if ( prevBottom > rdg.offsetTop) {
              rdg.style.top = `${prevBottom + 10}px`;
            }
            }
          })
           rdgsRight.forEach(async (rdg,idx) => {
            if (idx > 0) {
               const prevBottom = rdgsRight[idx-1].offsetTop + rdgsRight[idx-1].clientHeight;
            if ( prevBottom > rdg.offsetTop) {
              rdg.style.top = `${prevBottom + 10}px`;
            }
            }
          })
    },
    childMounted() {
      if (this.keyword) {
        this.highlightOnMounted(this.keyword);
      }
      if(this.$route.query.q){
        this.highlightQueryOnMounted(this.$route.query.q);
      }
    },
    async childToParent(event) {
      //comment should only be generated if annotations for this type are highlighted
      if(!this.highlighter[event.type]){
        return;
      }
      this.toggleFacs(); //hide facsimile, switch to text-only view
      await new Promise(resolve => setTimeout(resolve, 500)); //vue needs time to change to card-full view
      let elem = document.getElementById(event.htmlId);
      const comments = document.querySelectorAll('.comment');

      const comment = document.getElementById("comments");

      //work does not refer to a pmb entry
      if (event.type === 'work' && this.highlighter.work) {
        let commentDiv = this.createCommentDiv(event, null, elem, event.type);
        //in case of an inline collision (due to nested elements, the comment is placed directly beneath the other comment)
        comments.forEach(e => {
          const eBCR = e.getBoundingClientRect();
          if(eBCR.top === commentDiv.style.top){
            commentDiv.style.top = commentDiv.style.top + eBCR.height;
          }
        })
        comment.appendChild(commentDiv);

        //in case of a normal collision, the old comment is removed
        comments.forEach(e => {
          if(this.hasCollision(e, commentDiv)){
            e.remove();
          }
        })
        return;
      }

      getPMBObjectWithId(event.pmbId, event.type, (rs) => {
        let commentDiv = this.createCommentDiv(event, rs, elem, event.type);
        //in case of an inline collision (due to nested elements, the comment is placed directly beneath the other comment)
         const curcomments = document.querySelectorAll('.comment');
        curcomments.forEach(e => {
          const eBCR = e.getBoundingClientRect();
          if(e.style.top === commentDiv.style.top){
            commentDiv.style.top = `${parseInt(commentDiv.style.top.replace('px',''),10) + eBCR.height}px`
          }
        })

        comment.appendChild(commentDiv);

        //in case of a normal collision, the old comment is removed
        comments.forEach(e => {
          if(this.hasCollision(e, commentDiv)){
            e.remove();
          }
        })
      });
    },
    createCommentDiv(event, rs, elem, type) {
      var div = document.createElement('div');
      div.className = "comment";
      div.style.color = "var(--text-black)";
      div.style.backgroundColor = "var(--comment-brown)";
      div.style.fontSize = "0.8rem";
      div.style.padding = "0 0.2rem 0 0.2rem";
      div.style.display = "flex";
      div.style.justifyContent = "flex-start";

      if (type === 'person') {
        if(rs.profession[0]){
          div.innerHTML = rs.name + ", " + rs.first_name + ", <br> " +  rs.profession[0].name;
        }else{
          div.innerHTML = rs.name + ", " + rs.first_name;
        }

      } else if (type === 'place') {
        if(rs.kind.name !== undefined){
          div.innerHTML = rs.name + ", " + rs.kind.name;
        }else{
          div.innerHTML = rs.name;
        }

      } else if (type === 'institution') {
        div.innerHTML = rs.name;
        if(rs.kind && rs.kind.name){
          div.innerHTML = rs.name + ', ' + rs.kind.name;
        }
      } else if (type === 'work') {
        if(event.pmbId === '' || event.pmbId === null){
          div.innerHTML = 'nicht erfasst'
        }else if(event.pmbId.includes('pmb')){
          getPMBObjectWithId(event.pmbId, 'work', rs=>{
            let url = "https://pmb.acdh.oeaw.ac.at/apis/entities/entity/work/" + rs.id + "/detail"
            div.innerHTML="PMB: " + "<a href='"+url+"' target='_blank'>"+ rs.name + "</a>";
          });
        }else if(event.pmbId.includes("https://id.acdh.oeaw.ac.at/legalkraus")){
          let filename = event.pmbId.substring(event.pmbId.lastIndexOf('/')+1)
          this.caseInfo.then(data => {
            let c = data.cases.filter(c => c.id.includes(this.colXmlId))[0];
            let d = c.doc_objs.filter(d => d.id.includes(filename))[0];
            let id = d.id.substring(3, d.id.length-4).replaceAll('-','.').replaceAll('0','');

            div.innerHTML = id.substring(0, id.length-1) + " "+ d.title;
          });
        }

      }

      div.style.position = "absolute";
      div.style.cursor = "pointer";
      div.style.top = elem.offsetTop + "px";

      let self = this; //"this" cannot be used in JS functions

      //if a work only refers to a pmb entry, no onclick function is needed
      if(!(type === 'work' && event.pmbId && event.pmbId.includes('pmb'))){
        div.onclick = function () {
          let routeData = "";
          if (type === 'person') {
            routeData = self.$router.resolve({name: "pReg", query: {pmbId: event.pmbId} });
          } else if (type === 'place') {
            routeData = self.$router.resolve({name: "oReg", query: {pmbId: event.pmbId} });
          } else if (type === 'institution') {
            routeData = self.$router.resolve({name: "iReg", query: {pmbId: event.pmbId} });
          } else if (type === 'work') {
            let idx = event.pmbId.lastIndexOf('/');
            let xmlId = event.pmbId.substring(idx +1) + '.xml';
            getColArcheIdFromColXmlId(xmlId, rs => {
              routeData = self.$router.resolve({name: "lesefassung", params: {id: rs} });
              window.open(routeData.href, '_blank');
            });

          }

          window.open(routeData.href, '_blank');
        };
      }

      return div;
    },
    hasCollision(a, b) {
      var aRect = a.getBoundingClientRect();
      var bRect = b.getBoundingClientRect();
      return !(
          ((aRect.top + aRect.height) < (bRect.top)) ||
          (aRect.top > (bRect.top + bRect.height)) ||
          ((aRect.left + aRect.width) < bRect.left) ||
          (aRect.left > (bRect.left + bRect.width))
      );
    },
    removeAllComments() {
      document.querySelectorAll('.comment').forEach(e => e.remove());
    },
    downloadXMLFromUrl(url) {
      return fetch(url)
          .then(response => response.text())
          .then(str => {
            let dom = new window.DOMParser().parseFromString(str, "text/xml");
            this.xml = str;
            this.xmlFile = this.saveStringToXML(this.xml);
            this.pdfFile = this.saveStringToPDF(str);
            this.dom = dom;
            this.teiHeader = this.dom.getElementsByTagName("teiHeader")[0];
            const pbsfacs = Array.from(this.dom.getElementsByTagName("pb")).map(pb => pb.attributes.facs.nodeValue.replace('#',''));
            pbsfacs.forEach(facsid => {
              let facsUrl = this.dom.querySelectorAll(`[*|id='${facsid}'] graphic[source='wienbibliothek']`)[0].attributes.url.nodeValue
              this.facsURLs.push(facsUrl)
            })
           this.dataLoaded = true;
           /*  let facs = this.dom.getElementsByTagName("graphic");
           for (let item of facs) {
              if (item.getAttribute("source") === "wienbibliothek") {
                this.facsURLs.push(item.getAttribute("url"));
              }
            }*/
            

          })
          .catch((e) => console.log("Error while fetching or transforming xml file: " + e.toString()))
    },
    toggleLF() {
      this.showLF = false;
      this.showFacs = true;
    },
    toggleFacs() {
      this.showFacs = false;
      this.showLF = true;
    },
    toggleActors() {
      this.actorsClosed = !this.actorsClosed;
    },
    toggleShowBoth() {
      this.removeAllComments();
      this.showLF = true;
      this.showFacs = true;
    },
    saveStringToXML(xmlString) {
      var textFile = null
      var data = new Blob([xmlString], {type: 'text/xml'});

      textFile = window.URL.createObjectURL(data);

      // returns a URL you can use as a href
      return textFile;

    },
    saveStringToPDF(data) {
      var line = 25 // Line height to start text at
      var lineHeight = 5
      var leftMargin = 20
      var wrapWidth = 180

      const pdf = new jsPDF();
      pdf.setFontSize(10);

      var splitText = pdf.splitTextToSize(data, wrapWidth)
      for (var i = 0, length = splitText.length; i < length; i++) {

        pdf.text(splitText[i], leftMargin, line)
        line = lineHeight + line
      }

      var blob = new Blob([pdf.output('blob')], {type: 'application/pdf'});
      return window.URL.createObjectURL(blob)
    },
    getCurrentFacs() {
      return this.facsURLs[this.selectedPage - 1];
    },
    next() {
      if (this.facsURLs.length > this.selectedPage) {
        this.removeAllComments();
        this.i++;
        this.$store.dispatch('pageNext')
        this.alignRdgs();
      }
    },
    prev() {
      if (this.$store.getters.selectedPage > 1) {
        this.removeAllComments();
        this.i--;
        this.$store.dispatch('pagePrev')
        this.alignRdgs();
      }
    },
    updateHighlighter(highlightprop, bool) {
      this.$store.dispatch('updateHighlighter', {highlightprop: highlightprop, highlightbool: bool})
    },
    updateAllHighlighters() {
      let bool = this.showAllAnnotations === "true";
      this.$store.dispatch('updateAllHighlighters', {highlightbool: bool})
    }
  },
  created() {
    this.objectId = this.$route.params.id;
    if (this.$route.params.cat) {
      this.propsSet = true;
    }
    if (this.$route.params.searchTermContext) {
      this.keyword = this.$route.params.searchTermContext;
    }
    if (this.$route.params.subcat === "Die Fackel") {
      this.$route.params.subcat = "Fackel"
    }

    this.cat = this.$route.params.cat.toLowerCase();

    if(this.$route.params.subcat.toLowerCase() === "berichtigung (ausgang)"){
      this.subcat = 'berichtigung'
    } else if(this.$route.params.subcat.toLowerCase().includes('tageblatt')){
      this.subcat = "berliner-tageblatt";
    } else if(this.$route.params.subcat.toLowerCase().includes('stunde')){
      this.subcat = "die-stunde";
    } else if(this.$route.params.subcat.toLowerCase().includes('schober')){
      this.subcat = "schober";
    }else{
      this.subcat = this.$route.params.subcat.toLowerCase();
    }


  },
  mounted() {
    this.caseInfo = this.$store.getters.caseInfo;
    getCollectionOfObject(this.objectId, (rs) => {
      this.colId = rs[0].id;
      this.colTitle = rs[0].title;
      this.colSize = rs[0].size;
      this.colUrl = rs[0].url;
      this.colXmlId = rs[0].xmlId;
    });
    getObjectWithId(this.objectId, (rs) => {
      const optionsFilename = {
        "subject": null,
        "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#hasFilename",
        "object": null,
        "expiry": 14
      };

      const optionsTitle = {
        "subject": null,
        "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#hasTitle",
        "object": null,
        "expiry": 14
      };

      const optionsUrl = {
        "subject": null,
        "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#hasIdentifier",
        "object": null,
        "expiry": 14
      };

      const optionsHasActor = {
        "subject": null,
        "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#hasActor",
        "object": null,
        "expiry": 14
      };
      this.objectTitle = ARCHErdfQuery(optionsTitle, rs).value[0].hasTitle.object;
      this.filename = ARCHErdfQuery(optionsFilename, rs).value[0].hasFilename.object;
      let url = ARCHErdfQuery(optionsUrl, rs).value[0].hasIdentifier.object;
      var actors = ARCHErdfQuery(optionsHasActor, rs).value;
      actors.forEach(x => {
        let idLong = x.hasActor.object;
        let idx = idLong.lastIndexOf('/');
        let id = idLong.substring(idx + 1);
        getEntity(id, rs => {
          this.actors.push(rs);
        });
      })
      this.downloadXMLFromUrl(url);

      getTransformedHtmlResource(this.objectId, (data) => {
        this.pages = data;

      });
    });

  }
}
</script>

<style>

.btn-red {
  background-color: var(--primary-red) !important;
  color: var(--text-white) !important;
}

.navigation {
  display: flex;
  margin-left: 2rem !important;
  margin-right: 2rem !important;
  text-align: left;
  padding-left: 0 !important;
}

.arrow {
  color: #C85545;
}

.nav-link {
  color: black;
  padding: 0 !important;
  margin: 0;
}

.nav-link:hover {
  color: #C85545;
}

.grid-container {
  display: grid;
  grid-template-columns: 10rem auto auto 10rem;
  grid-template-rows: auto;
  column-gap: 4rem;
  margin-left: 2rem;
  margin-right: 2rem;
}

.meta-data {
  display: grid;
  grid-template-columns: auto 6px auto 6px auto;
  grid-template-rows: auto auto auto;
  background-color: var(--secondary-gray-dark);
  padding: 4rem;
  text-align: left;
  font-size: 0.9rem;
  margin-bottom: 4rem;
}

.vl {
  border-left: 3px solid var(--primary-red);
  height: 100%;
}

.meta1 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row: 1/2;
}

.meta2 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row: 2/3;
}

.back {
  padding: 0;
  color: var(--text-black) !important;
  text-decoration: underline var(--primary-red) 3px;
  margin-bottom: 0.1rem;
}

.back:hover {
  text-decoration: none;
}

.meta3 {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row: 1/4;
}

.meta4 {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row: 1/2;
  margin-left: 3rem;
}

.meta5 {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row: 2/3;
  margin-left: 3rem;
}


.meta7 {
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row: 1/4;
}

.meta8 {
  grid-column-start: 5;
  grid-column-end: 6;
  grid-row: 1/2;
  margin-left: 3rem;
  display: inline-flex;
}

.vt {
  padding: 0.375rem 0.375rem;
  margin-right: 2rem;
  border-radius: 0.25rem;
  border: transparent;
}

.vt-button {
  background-color: white !important;
  margin-right: 0.5rem;
}

.header {
  display: flex;
  margin: 1rem !important;
  justify-content: space-between;
  color: var(--text-gray) !important;
}

.all-annotations {
  display: flex;
}

.card-full {
  padding: 0;
  margin: auto;
  border-width: 1rem;
}

.card {
  margin: auto !important;
}

.card-fixed {
  width: 40rem;
  height: 40rem;
  padding: 0;
  margin: auto;
  border-width: 1rem;
  padding-left: 1rem;
}

.card-fixed-small {
  border-width: 0.5rem;
  padding: 0;
}

.card-left {
  grid-column-start: 1;
  grid-column-end: 3;
}

.card-left-small {
  grid-column-start: 1;
  grid-column-end: 2;
}

.card-right {
  grid-column-start: 3;
  grid-column-end: 5;
}

.card-right-small {
  grid-column-start: 4;
  grid-column-end: 5;
}

.view-full-width-right {
  grid-column-start: 2;
  grid-column-end: 5;
  margin-left: 4rem;
  margin-right: 4rem;
}

.view-full-width-left {
  grid-column-start: 1;
  grid-column-end: 3;
  margin-left: 4rem;
  margin-right: 4rem;
}

.formats, .facs {
  width: auto;
  margin: auto;
  display: flex;
  justify-content: space-between;
}

.facs-full-width, .formats-full-width {
  display: flex !important;
  justify-content: space-between;
  margin-bottom: 0.5rem !important;
}

.body {
  text-align: left;
  margin: 0;
  padding: 1rem;
}

/*.bi-arrow-right {
  margin-top: 3rem;
}*/

.embedded-img {
  margin: auto;
  overflow: scroll;
  max-width: 100%;
  max-height: 100%;
}

.embedded-img-small {
  max-width: 100%;
  max-height: 100%;
}

.lb::after {
  content: "\A";
  display: block;
}

.lb::before {
  content: attr(data-lbnr);
  padding-top: 0.2rem;
  left: -0.8rem;
  width: auto;
  text-align: right;
  font-size: 80%;
  position: absolute;
  display: block;
}

.card-full .lb::before {
  content: attr(data-lbnr);
  padding-top: 0.2rem;
  left: 0.5rem;
  width: auto;
  text-align: right;
  font-size: 80%;
  position: absolute;
  display: block;
}

.d-block p {
  padding-left: 1rem;
}

.w-5 {
  width: 5%;
}

.w-95 {
  width: 95%;
}

.person, .work, .institution, .place {
  cursor: pointer;
}

.highlighter.person {
  background: var(--toggle-person);
}

.highlighter.institution {
  background: var(--toggle-institution);
}

.highlighter.place {
  background: var(--toggle-place);
}

.highlighter.law {
  background: var(--toggle-law);
}

.highlighter.work {
  background: var(--toggle-work);
}

.highlighter.quote {
  background: var(--toggele-quote);
}

.highlighter.fackel-ref {
  background: var(--toggle-intertext);
}

.toggles {
  display: grid;
  width: 80%;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;
  justify-items: left;
  justify-content: space-between;
  margin-bottom: 2rem;
}

/* toggle person */
#pe-toggle:focus ~ ::before {
  border-color: var(--toggle-person) !important;
  box-shadow: 0 0 0 0.2rem rgba(255, 47, 69, 0.25) !important;
}

#pe-toggle:checked ~ ::before {
  border-color: var(--toggle-person) !important;
  background-color: var(--toggle-person) !important;
}

#pe-toggle:active ~ ::before {
  background-color: var(--toggle-person) !important;
  border-color: var(--toggle-person) !important;
}

#pe-toggle:focus:not(:checked) ~ ::before {
  border-color: var(--toggle-person) !important;
}

/* toggle institutions */
#i-toggle:focus ~ ::before {
  border-color: var(--toggle-institution) !important;
  box-shadow: 0 0 0 0.2rem rgba(232, 236, 129, 0.25) !important;
}

#i-toggle:checked ~ ::before {
  border-color: var(--toggle-institution) !important;
  background-color: var(--toggle-institution) !important;
}

#i-toggle:active ~ ::before {
  background-color: var(--toggle-institution) !important;
  border-color: var(--toggle-institution) !important;
}

#i-toggle:focus:not(:checked) ~ ::before {
  border-color: var(--toggle-institution) !important;
}

/* toggle place */
#pl-toggle:focus ~ ::before {
  border-color: var(--toggle-place) !important;
  box-shadow: 0 0 0 0.2rem rgba(150, 251, 228, 0.25) !important;
}

#pl-toggle:checked ~ ::before {
  border-color: var(--toggle-place) !important;
  background-color: var(--toggle-place) !important;
}

#pl-toggle:active ~ ::before {
  background-color: var(--toggle-place) !important;
  border-color: var(--toggle-place) !important;
}

#pl-toggle:focus:not(:checked) ~ ::before {
  border-color: #96FBE4 !important;
}

/* toggle law */
#l-toggle:focus ~ ::before {
  border-color: var(--toggle-law) !important;
  box-shadow: 0 0 0 0.2rem rgba(216, 216, 216, 0.25) !important;
}

#l-toggle:checked ~ ::before {
  border-color: var(--toggle-law) !important;
  background-color: var(--toggle-law) !important;
}

#l-toggle:active ~ ::before {
  background-color: var(--toggle-law) !important;
  border-color: var(--toggle-law) !important;
}

#l-toggle:focus:not(:checked) ~ ::before {
  border-color: var(--toggle-law) !important;
}

/* toggle quote */
#q-toggle:focus ~ ::before {
  border-color: var(--toggele-quote) !important;
  box-shadow: 0 0 0 0.2rem rgba(108, 233, 127, 0.25) !important;
}

#q-toggle:checked ~ ::before {
  border-color: var(--toggele-quote) !important;
  background-color: var(--toggele-quote) !important;
}

#q-toggle:active ~ ::before {
  background-color: var(--toggele-quote) !important;
  border-color: var(--toggele-quote) !important;
}

#q-toggle:focus:not(:checked) ~ ::before {
  border-color: var(--toggele-quote) !important;
}


/* toggle work */
#w-toggle:focus ~ ::before {
  border-color: var(--toggle-work) !important;
  box-shadow: 0 0 0 0.2rem rgba(156, 171, 255, 0.25) !important;
}

#w-toggle:checked ~ ::before {
  border-color: var(--toggle-work) !important;
  background-color: var(--toggle-work) !important;
}

#w-toggle:active ~ ::before {
  background-color: var(--toggle-work) !important;
  border-color: var(--toggle-work) !important;
}

#w-toggle:focus:not(:checked) ~ ::before {
  border-color: var(--toggle-work) !important;
}

/* toggle intertext */
#intertext-toggle:focus ~ ::before {
  border-color: var(--toggle-intertext) !important;
  box-shadow: 0 0 0 0.2rem rgba(231, 232, 232, 0.25) !important;
}

#intertext-toggle:checked ~ ::before {
  border-color: var(--toggle-intertext) !important;
  background-color: var(--toggle-intertext) !important;
}

#intertext-toggle:active ~ ::before {
  background-color: var(--toggle-intertext) !important;
  border-color: var(--toggle-intertext) !important;
}

#intertext-toggle:focus:not(:checked) ~ ::before {
  border-color: var(--toggle-intertext) !important;
}

.note-hand {
  font-weight: 600;
  font-style: italic;
}

.hi-underlined {
  text-decoration: underline;
}

.hi-hand-underlined {
  text-decoration: underline;
  text-decoration-thickness: 0.2rem;
}

.hi-spaced {
  letter-spacing: 0.2rem;
}

.add-hand {
  font-weight: 600;
}

.del {
  text-decoration: line-through;
}

.del-hand {
  text-decoration: line-through;
  text-decoration-thickness: 0.2rem;
}

.paratext {
  color: #33ccff;
}

.c {
  margin: 0;
}

.marginalie-text {
  font-weight: 600;
}

.marginalie-text.marginLeft {
  border-right: 1.8px solid;
}

.marginalie-text.marginRight {
  border-left: 1.8px solid left;
}

.marginalie-text.marginLeft, .rdg.marginLeft {
  padding-top: 0.2rem;
  padding-right: 2px;
  text-align:right;
  position: absolute;
  font-size: 80%;
  left:-1rem;
  width:6rem;
}

.marginalie-text.marginRight, .rdg {
  padding-top: 0.2rem;
  position: absolute;
  font-size: 80%;
  right: -11rem;
}

.rdg {
  width:10rem;
  background: var(--comment-brown);
}

.pl-custom {
  padding-left: 5rem;
}

mark {
  background: orange !important;
  padding: 0 !important;
}

.current-mark {
  background: red !important;
}

.page-jump {
  padding: 0.375rem 0.375rem;
  border-radius: 0.25rem;
  border: solid var(--secondary-gray-light);
  width: 3rem;
  height: 2rem;
}

.hasActor {
  display: flex;
}

.comment {
  max-width: 100%;
  width: 100%;
  word-break: break-all;
}

.witness-link {
  color:var(--primary-red-dark);
  text-decoration:underline;
  cursor:pointer;
}

/*** additional padding if left marginal exists ***/
.addPadding {
  padding-left:4.5rem;
}

</style>


