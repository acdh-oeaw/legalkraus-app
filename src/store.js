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
    },

    mutations: {
        MUTATE_LINEBREAKS: (state, linebreaks) => {
            Vue.set(state, 'linebreaks', linebreaks);
        },
        MUTATE_SELECTED_PAGE: (state, selectedPage) => {
            Vue.set(state, 'selectedPage', selectedPage);
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
        MUTATE_COLLECTION_PAGE_SIZE: (state, collectionpagesize) => {
            Vue.set(state, 'collectionPageSize', collectionpagesize);
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
        }
    }
});