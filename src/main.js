import Vue from "vue";
import App from "./App.vue";
import router from './Router'
import '@/global.css'
import store from '@/store.js'

Vue.config.productionTip = false;
new Vue({
    router,
    store: store,
    render: h => h(App)
}).$mount("#app");
