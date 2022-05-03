import Vue from 'vue'
import Router from 'vue-router'
import Test from "@/components/TestCalls"
import OverviewRecht from "@/components/Akten/Recht/OverviewRecht"
import OverviewCollections from "@/components/Akten/OverviewCollections";
import OverviewPolitik from "@/components/Akten/Politik/OverviewPolitik";
import OverviewKultur from "@/components/Akten/Kultur/OverviewKultur";
import OverviewObjects from "@/components/Akten/OverviewObjects";
import OverviewAllCollections from "@/components/Akten/OverviewAllCollections"
import Lesefassung from "@/components/Akten/Lesefassung";
import Main from "@/components/Main";
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import OverviewHandapparat from "../components/Handapparat/OverviewHandapparat";
//import BoehmEdition from "../components/Handapparat/BoehmEdition";
import Beitraege from "../components/Handapparat/Beitraege";
import OskarSamek from "../components/Handapparat/OskarSamek";
import Projektinformationen from "../components/Projekt/Projektinformationen";
import Editionsrichtlinien from "../components/Projekt/Editionsrichtlinien";
import Projektteam from "../components/Projekt/Projektteam";
import Publikationen from "../components/Projekt/Publikationen";
import Benutzungshinweise from "../components/Projekt/Benutzungshinweise";
import Lizenzen from "../components/Projekt/Lizenzen";
import Dokumentation from "../components/Projekt/Dokumentation";
import Register from "../components/Register/Register";
import Stats from "../components/Statistiken/Stats";
import OverviewHandschriftliches from "../components/Akten/OverviewHandschriftliches";


Vue.use(Router)
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        window.scrollTo(0, 0)
      },    
    routes: [
        {path: '/test', component: Test},
        {path: '/', name: 'home', component: Main},
        {path: '/akten-edition/recht', component: OverviewRecht},
        {path: '/akten-edition/recht/privatrecht/collections', component: OverviewCollections},
        {path: '/akten-edition/recht/privatrecht/objects/:id', name: 'privatrecht-objects', component: OverviewObjects},
        {path: '/akten-edition/recht/strafrecht/collections', component: OverviewCollections},
        {path: '/akten-edition/recht/strafrecht/objects/:id', name: 'strafrecht-objects', component: OverviewObjects},
        {path: '/akten-edition/recht/verwaltungsrecht/collections', component: OverviewCollections},
        {path: '/akten-edition/recht/verwaltungsrecht/objects/:id', name: 'verwaltungsrecht-objects', component: OverviewObjects},
        {path: '/akten-edition/recht/zivilrecht/collections', component: OverviewCollections},
        {path: '/akten-edition/recht/zivilrecht/objects/:id', name: 'zivilrecht-objects', component: OverviewObjects},

        {path: '/akten-edition/politik', component: OverviewPolitik},
        {path: '/akten-edition/politik/sozialdemokratie/collections', name: 'sozialdemokratie-collections', component: OverviewCollections},
        {path: '/akten-edition/politik/sozialdemokratie/objects/:id', name: 'sozialdemokratie-objects', component: OverviewObjects},
        {path: '/akten-edition/politik/christlich-sozial/collections', name: 'christlich-sozial-collections', component: OverviewCollections},
        {path: '/akten-edition/politik/christlich-sozial/objects/:id', name: 'christlich-sozial-objects', component: OverviewObjects},
        {path: '/akten-edition/politik/nationalsozialismus/collections', name: 'nationalsozialismus-collections', component: OverviewCollections},
        {path: '/akten-edition/politik/nationalsozialismus/objects/:id', name: 'nationalsozialismus-objects', component: OverviewObjects},
       // {path: '/politik/objects/:id', name: 'politik-objects', component: OverviewObjects},

        {path: '/akten-edition/kultur', component: OverviewKultur},
        {path: '/akten-edition/kultur/fackel/collections', name: 'fackel-collections', component: OverviewCollections},
        {path: '/akten-edition/kultur/fackel/objects/:id', name: 'fackel-objects', component: OverviewObjects},
        {path: '/akten-edition/kultur/theater/collections', name: 'theater-collections', component: OverviewCollections},
        {path: '/akten-edition/kultur/theater/objects/:id', name: 'theater-objects', component: OverviewObjects},
        {path: '/akten-edition/kultur/verlage/collections', name: 'verlage-collections', component: OverviewCollections},
        {path: '/akten-edition/kultur/verlage/objects/:id', name: 'verlage-objects', component: OverviewObjects},
        {path: '/akten-edition/kultur/medienhistorisches/collections', name: 'medienhistorisches-collections', component: OverviewCollections},
        {path: '/akten-edition/kultur/medienhistorisches/objects/:id', name: 'medienhistorisches-objects', component: OverviewObjects},
        {path: '/akten-edition/kultur/berichtigung/collections', name: 'berichtigung-collections', component: OverviewCollections},
        {path: '/akten-edition/kultur/berichtigung/objects/:id', name: 'berichtigung-objects', component: OverviewObjects},
        {path: '/akten-edition/kultur/schober/collections', name: 'schober-collections', component: OverviewCollections},
        {path: '/akten-edition/kultur/schober/objects/:id', name: 'schober-objects', component: OverviewObjects},
        {path: '/akten-edition/kultur/die-stunde/collections', name: 'stunde-collections', component: OverviewCollections},
        {path: '/akten-edition/kultur/die-stunde/objects/:id', name: 'stunde-objects', component: OverviewObjects},
        {path: '/akten-edition/kultur/berliner-tageblatt/collections', name: 'tageblatt-collections', component: OverviewCollections},
        {path: '/akten-edition/kultur/berliner-tageblatt/objects/:id', name: 'tageblatt-objects', component: OverviewObjects},

        {path: '/objects/:id', name:'overview-objects', component: OverviewObjects},

        {path: '/akten-edition/handschriftliches', component: OverviewHandschriftliches},
        {path: '/akten-edition/alle-akten', component: OverviewAllCollections},
        {path: '/lesefassung/:id', name: 'lesefassung', component: Lesefassung},

        {path: '/handapparat', component: OverviewHandapparat},
        //{path: '/handapparat/boehm', component: BoehmEdition},
        {path: '/handapparat/beitraege', component: Beitraege},
        {path: '/handapparat/oskar-samek', component: OskarSamek},
        {path: '/lesefassung/:id', name: 'lesefassung', component: Lesefassung, props: {
                header: true,
                content: true
            }},
        // {path: '/lesefassung/:id', name: 'lesefassung', component: Lesefassung},

        {path: '/register/personen', name: 'pReg', component: Register},
        {path: '/register/personen/:pmbid', name: 'pReg', component: Register},
        {path: '/register/orte', name: 'oReg', component: Register},
        {path: '/register/institutionen', name: 'iReg', component: Register},
        {path: '/register/werke', name: 'wReg', component: Register},
        {path: '/register/fackel', name: 'fReg', component: Register},
        {path: '/register/juristische-texte', name: 'gReg', component: Register},
        {path: '/projekt/projektinformationen', component: Projektinformationen},
        {path: '/projekt/editionsrichtlinien', component: Editionsrichtlinien},
        {path: '/projekt/projektteam', component: Projektteam},
        {path: '/projekt/publikationen', component: Publikationen},
        {path: '/projekt/benutzungshinweise', component: Benutzungshinweise},
        {path: '/projekt/lizenzen', component: Lizenzen},
        {path: '/projekt/dokumentation', component: Dokumentation},
        {path: '/visualisierungen/fallstatistik', name: 'fstat', component: Stats},
    ]
})
