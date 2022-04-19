import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        linebreaks: [],
        selectedPage: 1,
        highlighter: {
            person: false,
            institution: false,
            place: false,
            law: false,
            work: false,
            quote: false,
        },
        noOfCollections: null,
        collectionPageSize: 10,
        noOfResource: null,
        resourcePageSize: 10,
        MDAllResources: null,
        MDAllCollections: null,
        caseInfo: null,
        vocabs: {},
        topConceptsCases:{},
        vocabReady:false,
        groupedCases: {}
        
    },

    getters: {
        linebreaks: state => {
            return state.linebreaks
        },
        selectedPage: state => {
            return state.selectedPage
        },
        highlighter: state => {
            return state.highlighter
        },
        noOfCollections: state => {
            return state.noOfCollections
        },
        collectionPageSize: state => {
            return state.collectionPageSize
        },
        noOfResources: state => {
            return state.noOfResources
        },
        resourcePageSize: state => {
            return state.resourcePageSize
        },
        MDAllResources: state => {
            return state.MDAllResources;
        },
        MDAllCollections: state => {
            return state.MDAllCollections;
        },
        caseInfo: state => {
            return state.caseInfo;
        },
        vocabs: state => {
            return state.vocabs;
        },
        topConceptsCases: state => {
            return state.topConceptsCases
        },
        getConceptWithCases: (state) => (label) => {
            return Object.values(state.vocabs).filter(concept => concept.label === label)[0]
        },
        vocabReady: state => {
            return state.vocabReady
        },
        getGroupedCases: (state) => (groupingkey) => {
            return state.groupedCases[groupingkey]
        }
    },

    mutations: {
        MUTATE_LINEBREAKS: (state, linebreaks) => {
            Vue.set(state, 'linebreaks', linebreaks);
        },
        MUTATE_SELECTED_PAGE: (state, selectedPage) => {
            //Vue.set(state, 'selectedPage', selectedPage);
            state.selectedPage = selectedPage;
        },
        MUTATE_SELECTED_PAGE_INCREMENT: (state) => {
            state.selectedPage++
        },
        MUTATE_SELECTED_PAGE_DECREMENT: (state) => {
            state.selectedPage--
        },
        MUTATE_HIGHLIGHTER: (state, highlight) => {
            state.highlighter[highlight.highlightprop] = highlight.highlightbool;
            console.log(highlight)
        },
        MUTATE_All_HIGHLIGHTERS:(state, b) => {
            state.highlighter.person = b.highlightbool;
            state.highlighter.institution = b.highlightbool;
            state.highlighter.place = b.highlightbool;
            state.highlighter.law = b.highlightbool;
            state.highlighter.work = b.highlightbool;
            state.highlighter.quote = b.highlightbool;
        },
        MUTATE_NOOFCOLLECTIONS: (state, noofcollections) => {
            Vue.set(state, 'noOfCollections', noofcollections);
        },
        MUTATE_NOOFRESOURCES: (state, noofresources) => {
            Vue.set(state, 'noOfResources', noofresources);
        },
        MUTATE_COLLECTION_PAGE_SIZE: (state, collectionpagesize) => {
            Vue.set(state, 'collectionPageSize', collectionpagesize);
        },
        MUTATE_RESOURCE_PAGE_SIZE: (state, resourcepagesize) => {
            Vue.set(state, 'resourcePageSize', resourcepagesize);
        },
        MUTATE_MD_ALL_RESOURCES: (state, mdallresources) => {
            Vue.set(state, 'MDAllResources', mdallresources);
        },
        MUTATE_MD_ALL_COLLECTIONS: (state, mdallcollections) => {
            Vue.set(state, 'MDAllCollections', mdallcollections);
        },
        MUTATE_CASEINFO: (state, caseInfo) => {
            Vue.set(state, 'caseInfo', caseInfo)
        },
        MUTATE_VOCABS: (state, vocabs) => {
            Vue.set(state, 'vocabs', vocabs)
        },
        ADD_CONCEPT: (state,concept) => {
            Vue.set(state.vocabs,concept.uri,concept);
        },
        MUTATE_CONCEPT: (state,conceptinfo) => {
            Vue.set(state.vocabs[conceptinfo.uri],conceptinfo.propname,conceptinfo.propval);
        },
        MUTATE_TOP_CONCEPTS_CASES: (state,topconceptscases) => {
            Vue.set(state.topConceptsCases, topconceptscases);
        },
        MUTATE_VOCAB_READY: (state,vocabready) => {
            state.vocabReady = vocabready;
        },
        MUTATE_GROUPED_CASES: (state, groupedcases) => {
            Vue.set(state, 'groupedCases', groupedcases);
        }
    },

    actions: {
        setLinebreaks: (context, linebreaks) => {
            context.commit('MUTATE_LINEBREAKS', linebreaks);
        },
        setSelectedPage: (context, selectedPage) => {
            context.commit('MUTATE_SELECTED_PAGE', selectedPage);
        },
        pagePrev: (context) => {
            context.commit('MUTATE_SELECTED_PAGE_DECREMENT');
        },
        pageNext: (context) => {
            context.commit('MUTATE_SELECTED_PAGE_INCREMENT');
        },
        updateHighlighter: (context, highlight) => {
            context.commit('MUTATE_HIGHLIGHTER',highlight)
        },
        updateAllHighlighters: (context, b) => {
            context.commit('MUTATE_All_HIGHLIGHTERS', b)
        },
        setNoOfCollections: (context, noofcollections) => {
            context.commit('MUTATE_NOOFCOLLECTIONS', noofcollections)
        },
        setNoOfResources: (context, noofresources) => {
            context.commit('MUTATE_NOOFRESOURCES', noofresources)
        },
        setMDAllResources: (context, mdallresources) => {
            context.commit('MUTATE_MD_ALL_RESOURCES', mdallresources)
        },
        setMDAllCollections: (context, mdallcollections) => {
            context.commit('MUTATE_MD_ALL_COLLECTIONS', mdallcollections)
        },
        setCaseInfo: (context, caseInfo) => {
            context.commit('MUTATE_CASEINFO', caseInfo);
        },
        setVocabs: (context, vocabs) => {
             context.commit('MUTATE_VOCABS', vocabs);
        },
        addConcept: (context, concept) => {
            context.commit('ADD_CONCEPT', concept);
        },
        updateConcept: (context, conceptinfo) => {
            context.commit('MUTATE_CONCEPT', conceptinfo);
        },
        setTopConceptsCases: (context, topconceptscases) => {
            context.commit(' MUTATE_TOP_CONCEPTS_CASES', topconceptscases);
        },
        setVocabReady: (context, vocabready) => {
            context.commit('MUTATE_VOCAB_READY', vocabready);
        },
        setGroupedCases: (context, groupedcases) => {
            context.commit('MUTATE_GROUPED_CASES', groupedcases);
        }
    }
});