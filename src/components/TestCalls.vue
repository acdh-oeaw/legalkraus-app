<template>
  <div class="hello">
    <div class="card">
      <h4>Example: Object </h4>
      <table>
        <tr>
          <th>Title</th>
          <th>Date of Creation</th>
          <th>Subjects</th>

        </tr>
        <!--      <tr v-for="item in archeCollections" :key="item" :item="item">-->
        <tr v-for="val in objectData" v-bind:key="val.title">
          <td>
            {{ val.title }}
          </td>
          <td>
            {{ val.dateOfCreation }}
          </td>
          <td>
            <div v-for="subject in val.subjects" v-bind:key="subject.hasSubject.object">
              {{ subject.hasSubject.object }}
            </div>
          </td>

        </tr>
      </table>
    </div>

    <div class="card">
      <h4>Example: Collections </h4>
      <table>
        <tr>
          <th>Title</th>
          <th>URL</th>
          <th>Size</th>

        </tr>
        <!--      <tr v-for="item in archeCollections" :key="item" :item="item">-->
        <tr v-for="val in archeCollections" v-bind:key="val.title">
          <td>
            {{ val.title }}
          </td>
          <td>
            {{ val.url.object }}
          </td>
          <td>
            {{ val.size }}
          </td>

        </tr>
      </table>
    </div>

    <div class="card">
      <h4 class="card-title">Example: Documents of Collection 37573 </h4>
      <table>
        <tr>
          <th>Title</th>
          <th>URL</th>
          <th>Identifier</th>

        </tr>
        <!--      <tr v-for="item in archeCollections" :key="item" :item="item">-->
        <tr v-for="val in objectsOfCollection" v-bind:key="val.title">
          <td>
            {{ val.title }}
          </td>
          <td>
            {{ val.url }}
          </td>
          <td> {{val.identifier}}</td>
        </tr>
      </table>
    </div>

    <div class="card">
      <h4 class="card-title">Example: All documents </h4>
      <table>
        <tr>
          <th>Title</th>
          <th>URL</th>
          <th>Identifier</th>

        </tr>
        <!--      <tr v-for="item in archeCollections" :key="item" :item="item">-->
        <tr v-for="val in allObjects" v-bind:key="val.title">
          <td>
            {{ val.title }}
          </td>
          <td>
            {{ val.url.subject }}
          </td>
          <td> {{val.identifier}}</td>
        </tr>
      </table>
    </div>

    <div class="card">
      <h4 class="card-title">Example: Metadata</h4>
      <p class="meta_data">
        {{ archeMetaData }}
      </p>
    </div>

  </div>
</template>

<script>
import {ARCHEdownloadResourceIdM, ARCHErdfQuery} from "arche-api/src";
import {getObjectWithId, getMetaData, getCollections, getObjectsOfCollection, getCollectionOfObject, getAllObjects} from "../services/ARCHEService";


function extractPredicateAndObjectAsJSONfromRDF(queryJson) {
  let tempMetaData = [];
  for (let i = 0; i < queryJson.length; i++) {
    let indexHT = queryJson[i].predicate.indexOf("#");
    const p = queryJson[i].predicate.substring(indexHT + 1);
    const o = queryJson[i].object;
    //console.log(queryJson[i].predicate.substring(indexHT+1) + ": " + queryJson[i].object);
    tempMetaData[p] = o;
  }
  return tempMetaData;
}

export default {
  name: "HelloWorld",
  props: {
    msg: String
  }, data() {
    return {
      error: false,
      archeMetaData: [],
      archeCollections: [],
      objectData: [],
      objectsOfCollection: [],
      allObjects: []
    };
  },
  methods: {
    getMetaData() {
      console.log("getMetaData()");
      //const host = 'https://arche.acdh.oeaw.ac.at/api'
      const host = 'https://arche-dev.acdh-dev.oeaw.ac.at/api'
      //const resourceId = "37705"
      const resourceId = "37562";
      const format = "application/n-triples"
      const readMode = "resource"
      const downloader = ARCHEdownloadResourceIdM
      const query = ARCHErdfQuery

      downloader(host, resourceId, format, readMode, (rs) => {
        //console.log(rs)
        // if null is provided than it will return everything it finds.
        // if you pass in a string like "https://vocabs.acdh.oeaw.ac.at/schema#hasTitle"
        // as predicate and leave the others to null you will receive all titles and URIs
        let queryJson = query(null, null, null, rs)
        this.archeMetaData = extractPredicateAndObjectAsJSONfromRDF(queryJson);
        console.log(this.archeMetaData)
        //this.objectData[0].n = "w";

      });
    },
    getCollections() {
      console.log("getCollections()");
      const host = 'https://arche-dev.acdh-dev.oeaw.ac.at/api'
      //const host = 'https://arche.acdh.oeaw.ac.at/api'
      const resourceId = "37565";
      //const resourceId = "37562"
      //const resourceId = "95666"
      const format = "application/n-triples"
      const readMode = "relatives"
      const downloader = ARCHEdownloadResourceIdM
      const query = ARCHErdfQuery

      downloader(host, resourceId, format, readMode, (rs) => {
        /*//console.log(rs)
        // if null is provided than it will return everythin it finds.
        // if you pass in a string like "https://vocabs.acdh.oeaw.ac.at/schema#hasTitle"
        // as predicate and leave the others to null you will receive all titles and URIs
        let queryJson = query(null, null, null, rs)
        let childResources  = query(null, "https://vocabs.acdh.oeaw.ac.at/schema#isPartOf", "https://arche-dev.acdh-dev.oeaw.ac.at/api/37565", rs);

        for (let i = 0; i < childResources.length; i++) {
          let subject = childResources[i].subject;
          let idx = subject.lastIndexOf("/");
          let id =subject.substring(idx+1);
          downloader(host, id, format, "resource", (rs) => {
            let title = query(null, "https://vocabs.acdh.oeaw.ac.at/schema#hasTitle", null, rs);
            console.log(id + ": " + title[0].object);
          })
        }


        //console.log(queryJson)
        this.archeCollections = queryJson;*/
        let child_resources = query(null, 'https://vocabs.acdh.oeaw.ac.at/schema#isPartOf', 'https://arche-dev.acdh-dev.oeaw.ac.at/api/37565', rs);
        console.log(child_resources);
        for (let i = 0; i < child_resources.length; i++) {
          console.log(child_resources[i].subject);
          let title = ARCHErdfQuery(child_resources[i].subject, 'https://vocabs.acdh.oeaw.ac.at/schema#hasTitle', null, rs);
          console.log("title: " + title[0].object);
          let resource_id = ARCHErdfQuery(null, 'https://vocabs.acdh.oeaw.ac.at/schema#isPartOf', child_resources[i].subject, rs);
          console.log(resource_id);
          for (let i = 0; i < resource_id.length; i++) {
            let resource_titles = ARCHErdfQuery(resource_id[i].subject, 'https://vocabs.acdh.oeaw.ac.at/schema#hasTitle', null, rs);
            console.log(resource_titles[0].object);
          }
        }
      });
    },
    getObject(id) {
      console.log("getObject()");
      const host = 'https://arche-dev.acdh-dev.oeaw.ac.at/api'
      const resourceId = id;
      const format = "application/n-triples"
      const readMode = "resource"
      const downloader = ARCHEdownloadResourceIdM
      const query = ARCHErdfQuery

      downloader(host, resourceId, format, readMode, (rs) => {
        console.log(rs)
        // if null is provided than it will return everythin it finds.
        // if you pass in a string like "https://vocabs.acdh.oeaw.ac.at/schema#hasTitle"
        // as predicate and leave the others to null you will receive all titles and URIs
        let queryJson = query(null, null, null, rs)
        console.log(queryJson)
        let title = query(null, "https://vocabs.acdh.oeaw.ac.at/schema#hasTitle", null, rs);
        console.log(title[0].object);
        this.objectData = queryJson;

      });
    },
  },
  mounted() {
    getCollections((result) => {
      //let queryJson = ARCHErdfQuery(null, null, null, result);
      this.archeCollections = result;
    });
    getMetaData((result) => {
      const options = {
        "subject": null,
        "predicate": null,
        "object": null,
        "expiry": 14
      };
      let queryJson = ARCHErdfQuery(options, result);
      this.archeMetaData = queryJson.value;
    });

    getObjectWithId(37598, (result) => {

      // query:
      const optionsTitle = {
        "subject": null,
        "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#hasTitle",
        "object": null,
        "expiry": 14
      };

      const optionsDateCreation = {
        "subject": null,
        "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#hasCreatedStartDate",
        "object": null,
        "expiry": 14
      };

      const optionsSubjects = {
        "subject": null,
        "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#hasSubject",
        "object": null,
        "expiry": 14
      };
      let title = ARCHErdfQuery(optionsTitle, result);
      let dateCreation = ARCHErdfQuery(optionsDateCreation, result);
      let subjects = ARCHErdfQuery(optionsSubjects, result);

      //console.log(extractPredicateAndObjectAsJSONfromRDF(queryJson));
      this.objectData.push({
        rdf: result,
        title: title.value[0].hasTitle.object,
        dateOfCreation: dateCreation.value[0].hasCreatedStartDate.object.substring(0, 10),
        subjects: subjects.value
      });
    });

    getObjectsOfCollection(37573, (result) => {
      //37571
      this.objectsOfCollection = result;
    });

    getCollectionOfObject(37600, (rs) => {
      console.log(rs);
    })

    getAllObjects((result) => {
      //let queryJson = ARCHErdfQuery(null, null, null, result);
      this.allObjects = result;
    });

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.meta_data {
  text-align: left;
}

.card {
  width: auto;
  padding: 2rem;
  margin: auto;
}
</style>

