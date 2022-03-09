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
        MDAllCollections: null
        
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
            console.log('here')
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
        }
    }
});