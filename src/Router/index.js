import Vue from 'vue'
import Router from 'vue-router'
import Test from "@/components/TestCalls"
import OverviewRecht from "@/components/Akten/Recht/OverviewRecht"
import OverviewCollections from "@/components/Akten/OverviewCollections";
import OverviewPolitik from "@/components/Akten/Politik/OverviewPolitik";
import OverviewKultur from "@/components/Akten/Kultur/OverviewKultur";
import OverviewObjects from "@/components/Akten/OverviewObjects";
import OverviewAllCollections from "@/components/Akten/OverviewAllCollections"
import OverviewAllResources from "@/components/Akten/OverviewAllResources";
import Lesefassung from "@/components/Akten/Lesefassung";
import Main from "@/components/Main";
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import PersonenRegister from "../components/Register/PersonenRegisterDummy";
import OverviewHandapparat from "../components/Handapparat/OverviewHandapparat";
import BoehmEdition from "../components/Handapparat/BoehmEdition";
import Projektinformationen from "../components/Projekt/Projektinformationen";
import Editionsrichtlinien from "../components/Projekt/Editionsrichtlinien";
import Projektteam from "../components/Projekt/Projektteam";
import Publikationen from "../components/Projekt/Publikationen";
import Benutzungshinweise from "../components/Projekt/Benutzungshinweise";
import Lizenzen from "../components/Projekt/Lizenzen";
import Dokumentation from "../components/Projekt/Dokumentation";


Vue.use(Router)
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

export default new Router({
    routes: [
        {path: '/test', component: Test},
        {path: '/', name: 'home', component: Main},
        {path: '/recht', component: OverviewRecht},
        {path: '/recht/privatrecht/collections', component: OverviewCollections},
        {path: '/recht/privatrecht/objects/:id', name: 'privatrecht-objects', component: OverviewObjects},
        {path: '/recht/strafrecht/collections', component: OverviewCollections},
        {path: '/recht/strafrecht/objects/:id', name: 'strafrecht-objects', component: OverviewObjects},
        {path: '/recht/verwaltungsrecht/collections', component: OverviewCollections},
        {path: '/recht/verwaltungsrecht/objects/:id', name: 'verwaltungsrecht-objects', component: OverviewObjects},
        {path: '/recht/zivilrecht/collections', component: OverviewCollections},
        {path: '/recht/zivilrecht/objects/:id', name: 'zivilrecht-objects', component: OverviewObjects},

        {path: '/politik', component: OverviewPolitik},
        {path: '/politik/sozialdemokratie/collections', component: OverviewCollections},
        {path: '/politik/sozialdemokratie/objects/:id', name: 'sozialdemokratie-objects', component: OverviewObjects},
        {path: '/politik/christlich-national/collections', component: OverviewCollections},
        {path: '/politik/christlich-national/objects/:id', name: 'christlich-national-objects', component: OverviewObjects},
        {path: '/politik/nationalsozialismus/collections', component: OverviewCollections},
        {path: '/politik/nationalsozialismus/objects/:id', name: 'nationalsozialismus-objects', component: OverviewObjects},
       // {path: '/politik/objects/:id', name: 'politik-objects', component: OverviewObjects},

        {path: '/kultur', component: OverviewKultur},
        {path: '/kultur/fackel/collections', component: OverviewCollections},
        {path: '/kultur/fackel/objects/:id', name: 'fackel-objects', component: OverviewObjects},
        {path: '/kultur/theater/collections', component: OverviewCollections},
        {path: '/kultur/theater/objects/:id', name: 'theater-objects', component: OverviewObjects},
        {path: '/kultur/verlagswesen/collections', component: OverviewCollections},
        {path: '/kultur/verlagswesen/objects/:id', name: 'verlagswesen-objects', component: OverviewObjects},
        {path: '/kultur/polemiken/collections', component: OverviewCollections},
        {path: '/kultur/polemiken/objects/:id', name: 'polemiken-objects', component: OverviewObjects},

        {path: '/objects/:id', name:'overview-objects', component: OverviewObjects},

        {path: '/handschriftliches', component: OverviewObjects}, //todo: create page that loads objects with tag handschriftlich
        {path: '/alle-akten', component: OverviewAllCollections},
        {path: '/alle-resourcen', component: OverviewAllResources},
        {path: '/lesefassung/:id', name: 'lesefassung', component: Lesefassung},

        {path: '/handapparat', component: OverviewHandapparat},
        {path: '/handapparat/boehm', component: BoehmEdition},
        {path: '/lesefassung/:id', name: 'lesefassung', component: Lesefassung, props: {
                header: true,
                content: true
            }},
        // {path: '/lesefassung/:id', name: 'lesefassung', component: Lesefassung},

        {path: '/register/personen', name: 'pReg', component: PersonenRegister},
        {path: '/projektinformationen', component: Projektinformationen},
        {path: '/editionsrichtlinien', component: Editionsrichtlinien},
        {path: '/projektteam', component: Projektteam},
        {path: '/publikationen', component: Publikationen},
        {path: '/benutzungshinweise', component: Benutzungshinweise},
        {path: '/lizenzen', component: Lizenzen},
        {path: '/dokumentation', component: Dokumentation}


    ]
})
