<template>
  <div class="main">
    <div class="meta-data">
      <p>Here comes the metadata of object with id {{ this.objectId }}</p>
    </div>
    <div class="w-100 mb-5">
      <svg v-on:click="prev()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
           class="bi bi-arrow-left text-bottom" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
      </svg>
      <span class="px-1">Seite {{ selectedPage }} von {{ facsURLs.length }}</span>
      <svg v-on:click="next()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
           class="bi bi-arrow-right text-bottom" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
      </svg>
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
          <button class="format btn btn-light mb-2">Facsimile</button>
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
          <button class="format btn btn-light">Facsimile</button>
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
            Coming soon.
          </div>
        </div>
      </div>

      <div id="card-right-medium" class="card-right" v-if="this.showFacs && this.showLF">
        <div class="formats mb-2">
          <button class="format btn btn-light">Lesefassung</button>
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
          <div class="toggles">
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
              Place
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

          </div>


          <div class="body overflow-auto d-flex flex-row">
            <div v-if="this.$store.getters.linebreaks" class="w-5 text-right position-relative">
              <!--<div v-bind:key="lb.refkey" :id="lb.key" v-bind:style="{'position':'absolute','top':`${lb.top}px`}" v-for="lb in this.$store.getters.linebreaks">
              {{lb.lnr}}
              </div>-->
            </div>
            <component class="w-95" v-if="pages" :is="dynComponent"/>
          </div>
        </div>
      </div>

      <div id="card-right-large" class="view-full-width-right" v-if="!this.showFacs && this.showLF">
        <div class="formats-full-width">
          <button class="format btn btn-light">Lesefassung</button>
          <a class="format btn btn-light" role="button" :href="xmlFile"
             :download="filename">
            Download XML
          </a>
          <a class="format btn btn-light" role="button" :href="pdfFile"
             :download="filename">
            Download PDF
          </a>
        </div>
        <div class="card card-full">
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
          <div class="toggles">
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
              Place
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

          </div>
          <div class="body">
            <component class="w-95" v-if="pages" :is="dynComponent"/>
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
      <span class="px-1">Seite {{ selectedPage }} von {{ facsURLs.length }}</span>
      <svg v-on:click="next()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
           class="bi bi-arrow-right text-bottom" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
      </svg>
    </div>
  </div>
</template>

<script>
import {getObjectWithId, getTransformedHTML} from "@/services/ARCHEService";
import {ARCHErdfQuery} from "arche-api/src";
import EntitySpan from "./EntitySpan";
import {jsPDF} from "jspdf";
import {mapGetters} from 'vuex';


export default {
  components: {
    EntitySpan: EntitySpan
  },
  name: "Lesefassung",
  data: function () {
    return {
      objectId: -1,
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
      showAllAnnotations: false
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
            content: '',
          };
        },
        template,
        mounted() {
          const lbsrefs = [];
          Object.keys(this.$refs).forEach((refkey, idx) => {
            if (refkey.includes('linebreak')) {
              lbsrefs.push({
                key: refkey,
                lnr: idx + 1,
                top: this.$refs[refkey].getBoundingClientRect().y - this.$refs[refkey].parentElement.parentElement.getBoundingClientRect().y + this.$refs[refkey].getBoundingClientRect().height
              })
            }
          })
          this.$store.dispatch('setLinebreaks', lbsrefs)
        },
        computed: {
          ...mapGetters({
            selectedPage: 'selectedPage',
            highlighter: 'highlighter'
          })
        },
        methods: {
          navigateTo(id) {
            console.log(id)
          },
        }
      }
    }
  },
  methods: {
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
            let facs = this.dom.getElementsByTagName("graphic");
            for (let item of facs) {
              if (item.getAttribute("source") === "wienbibliothek") {
                console.log(item.getAttribute("url"));
                this.facsURLs.push(item.getAttribute("url"));
              }
            }

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
    toggleShowBoth() {
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
      return this.facsURLs[this.i];
    },
    next() {
      if (this.facsURLs.length > this.selectedPage) {
        console.log(this.selectedPage)
        this.i++;
        this.$store.dispatch('pageNext')
      }
    },
    prev() {
      if (this.$store.getters.selectedPage > 1) {
        this.i--;
        this.$store.dispatch('pagePrev')
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
  },
  mounted() {
    getObjectWithId(this.objectId, (rs) => {
      this.filename = ARCHErdfQuery(null, 'https://vocabs.acdh.oeaw.ac.at/schema#hasFilename', null, rs)[0].object;
      let url = ARCHErdfQuery(null, 'https://vocabs.acdh.oeaw.ac.at/schema#hasIdentifier', null, rs);
      let downloadLink = url[0].object;
      this.downloadXMLFromUrl(downloadLink);

      getTransformedHTML(this.objectId, (data) => {
        this.pages = data;
      });
    });

  }
}
</script>

<style>

.grid-container {
  display: grid;
  grid-template-columns: 10rem auto auto 10rem;
  grid-template-rows: auto;
}

.header {
  display: flex;
  margin: 1rem;
  justify-content: space-between;
}

.all-annotations {
  display: flex;
}

.card-full {
  padding: 0;
  margin: auto;
  border-width: 1rem;
}

.card-fixed {
  width: 40rem;
  height: 40rem;
  padding: 0;
  margin: auto;
  border-width: 1rem;
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
  width: 40rem;
  margin: auto;
  display: flex;
  justify-content: space-between;
}

.facs-full-width, .formats-full-width {
  display: flex !important;
  justify-content: space-between;
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

.lb::before {
  content: "\A";
  display: block;
}

.lb {
  padding-right: 1rem;
}

.w-5 {
  width: 5%;
}

.w-95 {
  width: 95%;
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

.toggles {
  margin:auto;
  display: grid;
  width: 100%;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;
  justify-items: center;
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

.note-hand{
  font-weight: 600;
  font-style: italic;
}

.hi-underlined{
  text-decoration: underline;
}
.hi-hand-underlined{
  text-decoration: underline;
  text-decoration-thickness: 0.2rem ;
}

.hi-spaced{
  letter-spacing: 0.2rem;
}

.add-hand{
  font-weight: 600;
}

.del{
  text-decoration: line-through;
}

.del-hand{
  text-decoration: line-through;
  text-decoration-thickness: 0.2rem ;
}

.paratext{
  color: #33ccff;
}

</style>


