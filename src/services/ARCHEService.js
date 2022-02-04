const { default: fetch } = require('node-fetch');
const {ARCHErdfQuery, ARCHEdownloadResourceIdM, ARCHEdownloadResourceIdM2} = require("arche-api");
const {collections2view} = require("../utils")
const store = require("../store");

/*
* What the service needs :
* getAllCases()
* getAllDocs(Case case)
* getFilteredDocs(Filter filter)
* getFilteredCases(Filter filter)
* getAllX -> for registry
* fetFilteredX -> for registry
* getPublications() -> maybe not necessary
* getBöhm() -> maybe not necessary (can be static if not too big
* getProjectInfo() -> maybe not necessary
*
*
* getAllCases(filter[] : default = void)
* getCasePreview() -> metadata
* getAllDocsOfCase(caseid, filter[]: default = void)
* getDocPreview() -> doc metadata
* getDocFull()
*
* getRegistry(type, filter[]: default = void) -> type: ort | person | instituition | Werke | Texte*/

const ARCHE_BASE_URL = "https://arche-dev.acdh-dev.oeaw.ac.at/api";
const FORMAT = "application/n-triples";
const READMODE_RESOURCE = "resource";
const READMODE_RELATIVES = "relatives";

/**
 * extract object of rdf tripel and get rid of @de
 * @param title rdf triple
 * @returns {string} title string without @de
 */
function extractTitle(title) {
    return title[0].object.substring(0, title[0].object.length - 3);
}


module.exports.getObjectWithId = async(resourceId, callback) => {
    let url = ARCHE_BASE_URL + '/' + resourceId + '/' + `metadata?_format=${FORMAT}&readMode=${READMODE_RESOURCE}`;
    const options = {
        method: 'GET'
    };
    console.log(url);
    try {
        const response = await fetch(url, options);
        console.log("statusCode:", response.statusCode);
        console.log("headers:", response.headers);
        const body = await response.text();
        return callback(body);
    } catch (error) {
        console.log(error);
    }    
}

module.exports.getMetaData = async(callback) => {
    const resourceId = 37562;
    let url = ARCHE_BASE_URL + '/' + resourceId + '/' + `metadata?_format=${FORMAT}&readMode=${READMODE_RESOURCE}`;
    const options = {
        method: 'GET'
    };
    console.log(url);
    try {
        const response = await fetch(url, options);
        console.log("statusCode:", response.statusCode);
        console.log("headers:", response.headers);
        const body = await response.text();
        return callback(body);
    } catch (error) {
        console.log(error);
    }
}

module.exports.getCollections = async(startPage, callback) => {
    const resourceId = 37565;
    
    const collections = [];
    const options = {
        "host": ARCHE_BASE_URL,
        "format": "application/n-triples",
        "resourceId": resourceId,
        "readMode": "neighbors",
    };
    try {
        ARCHEdownloadResourceIdM(options, (rs) => {
          
            // query:
            const options = {
                "subject": null,
                "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#isPartOf",
                "object": `${ARCHE_BASE_URL}/37565`,
                "expiry": 14,
                "paginate": [startPage, Math.min(startPage + store.default.getters.collectionPageSize,store.default.getters.noOfCollections)]
                
            };
            console.log(Math.min(startPage + store.default.getters.collectionPageSize,store.default.getters.noOfCollections))
            let resources = ARCHErdfQuery(options, rs);
            console.log(store.default.getters)
            store.default.dispatch('setNoOfCollections', resources.fullLength)
            // how to use the object
            const promises = [];
            resources.value.forEach(function (rs) {

                    var rsID = rs.isPartOf.subject.replace(`${ARCHE_BASE_URL}/`,"");
                    let options = {
                        "host": ARCHE_BASE_URL,
                        "format": "application/n-triples",
                        "resourceId": rsID,
                        "readMode": "resource"
                    };   
                    promises.push(ARCHEdownloadResourceIdM2(options));  
            });
            Promise.all(promises).then((results) => {
                results.forEach(collection=> {
                    let options = {
                        "subject": null,
                        "predicate": null,
                        "object": null,
                        "expiry": 14,
                        "paginate": false
                    };
                    const coldata = ARCHErdfQuery(options, collection);
                    collections.push(coldata);
                })
                const transformed = collections2view(collections);
                callback(transformed)
              });
        });
        /*let result = [];
        for (let i = 0; i < child_resources.length; i++) {
            let title = ARCHErdfQuery(child_resources[i].subject,'https://vocabs.acdh.oeaw.ac.at/schema#hasTitle', null,body);
            let documents = ARCHErdfQuery(child_resources[i].subject,'https://vocabs.acdh.oeaw.ac.at/schema#hasNumberOfItems', null,body)

            let idx = documents[0].object.lastIndexOf('^');
            let docs = documents[0].object.substring(0, idx-1);

            let t = extractTitle(title);
            result.push({
                url: child_resources[i],
                title: t,
                size: docs});
        }
        return callback(result);*/
    } catch (error) {
        console.log(error);
    }
}

module.exports.getObjectsOfCollection = async(id, callback) => {
    const resourceId = id;
    let url = ARCHE_BASE_URL + '/' + resourceId + '/' + `metadata?_format=${FORMAT}&readMode=${READMODE_RELATIVES}`;
    const options = {
        method: 'GET'
    };
    console.log(url);
    try {
        const response = await fetch(url, options);
        const body = await response.text();
        let child_resources = ARCHErdfQuery(null, 'https://vocabs.acdh.oeaw.ac.at/schema#isPartOf', 'https://arche-dev.acdh-dev.oeaw.ac.at/api/' + resourceId, body);
        let result = [];
        for (let i = 0; i < child_resources.length; i++) {
            let title = ARCHErdfQuery(child_resources[i].subject,'https://vocabs.acdh.oeaw.ac.at/schema#hasTitle', null,body);
            let identifier = ARCHErdfQuery(child_resources[i].subject,'https://vocabs.acdh.oeaw.ac.at/schema#hasIdentifier', null,body);
            let t = extractTitle(title);
            result.push({
                url: child_resources[i],
                title: t,
                identifier: identifier[1].object});
        }
        return callback(result);
    } catch (error) {
        console.log(error);
    }
}

module.exports.getAllObjects = async (callback) => {
    const resourceId = 37565;
    let url = ARCHE_BASE_URL + '/' + resourceId + '/' + `metadata?_format=${FORMAT}&readMode=${READMODE_RELATIVES}`;
    const options = {
        method: 'GET'
    };
    try {
        const response = await fetch(url, options);
        const body = await response.text();
        let all_resources = ARCHErdfQuery(null, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'https://vocabs.acdh.oeaw.ac.at/schema#Resource', body);

        let result = [];
        for (let i = 0; i < all_resources.length; i++) {
            let title = ARCHErdfQuery(all_resources[i].subject,'https://vocabs.acdh.oeaw.ac.at/schema#hasTitle', null,body);
            let identifier = ARCHErdfQuery(all_resources[i].subject,'https://vocabs.acdh.oeaw.ac.at/schema#hasIdentifier', null,body);
            let t = extractTitle(title);
            result.push({
                url: all_resources[i],
                title: t,
                identifier: identifier[1].object
                });
        }
        return callback(result);
    } catch (error) {
        console.log(error);
    }
}


module.exports.getTransformedHTML = async(objectId, callback) => {
    try {
        const url = `https://service4tei.acdh-dev.oeaw.ac.at/tei2html.xql?tei=https://arche-dev.acdh-dev.oeaw.ac.at/api/${objectId}&xsl=https://raw.githubusercontent.com/acdh-oeaw/legalkraus-app/master/src/lesefassung_xsl/legal_kraus_lesefassung.xsl`;
        const resp = await fetch(url);
        const data = await resp.text();
        return callback(data);
    }catch (error){
        console.log(error);
    }

}

module.exports.performFullTextSearch = async (searchTerm, callback) => {
    const url = `${ARCHE_BASE_URL}/search?`;


        fetch(url + new URLSearchParams({
            "property[0]": "BINARY",
            "operator[0]":"@@",
            "value[0]":searchTerm,
            "property[1]": "https://vocabs.acdh.oeaw.ac.at/schema#isPartOf",
            "operator[1]":"=",
            "value[1]":"https://arche-dev.acdh-dev.oeaw.ac.at/api/37571",
            "ftsQuery":searchTerm

    }), {
           headers: { 'Accept': 'application/json' }
        }).then(response => response.json()).then(data => {
            return callback(data);
        })


}


