const {default: fetch} = require('node-fetch');
const {ARCHErdfQuery, ARCHEdownloadResourceIdM, ARCHEdownloadResourceIdM2} = require("arche-api");
const {collections2view} = require("../utils")
const store = require("../store");

const ARCHE_BASE_URL = "https://arche-dev.acdh-dev.oeaw.ac.at/api";
const FORMAT_NTRIPLES = "application/n-triples";
const READMODE_RESOURCE = "resource";
const READMODE_RELATIVES = "relatives";

/*module.exports.getObjectWithId = async (resourceId, callback) => {
    let url = ARCHE_BASE_URL + '/' + resourceId + '/' + `metadata?_format=${FORMAT_NTRIPLES}&readMode=${READMODE_RESOURCE}`;
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
}*/

module.exports.getObjectWithId = async (resourceId, callback) => {
    const options = {
        "host": ARCHE_BASE_URL,
        "format": "application/n-triples",
        "resourceId": resourceId,
        "readMode": READMODE_RESOURCE,
    };

    try {
        await ARCHEdownloadResourceIdM(options, (rs) => {
            return callback(rs);
        });
    } catch (error) {
        console.log(error);
    }

}

module.exports.getMetaData = async (callback) => {
    const resourceId = 37562;
    const options = {
        "host": ARCHE_BASE_URL,
        "format": "application/n-triples",
        "resourceId": resourceId,
        "readMode": READMODE_RESOURCE,
    };

    try {
        await ARCHEdownloadResourceIdM(options, (rs) => {
            return callback(rs);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports.getCollections = async (startPage, callback) => {
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
                "paginate": [startPage, Math.min(startPage + store.default.getters.collectionPageSize, store.default.getters.noOfCollections)]

            };
            console.log(Math.min(startPage + store.default.getters.collectionPageSize, store.default.getters.noOfCollections))
            let resources = ARCHErdfQuery(options, rs);
            console.log(store.default.getters)
            store.default.dispatch('setNoOfCollections', resources.fullLength)
            // how to use the object
            const promises = [];
            resources.value.forEach(function (rs) {

                var rsID = rs.isPartOf.subject.replace(`${ARCHE_BASE_URL}/`, "");
                let options = {
                    "host": ARCHE_BASE_URL,
                    "format": "application/n-triples",
                    "resourceId": rsID,
                    "readMode": "resource"
                };
                promises.push(ARCHEdownloadResourceIdM2(options));
            });
            Promise.all(promises).then((results) => {
                results.forEach(collection => {
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

module.exports.getObjectsOfCollection = async (resourceId, callback) => {
    const options = {
        "host": ARCHE_BASE_URL,
        "format": "application/n-triples",
        "resourceId": resourceId,
        "readMode": READMODE_RELATIVES,
    };
    try {
        ARCHEdownloadResourceIdM(options, (rs) => {
            // query:
            const optionsChildRes = {
                "subject": null,
                "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#isPartOf",
                "object": 'https://arche-dev.acdh-dev.oeaw.ac.at/api/' + resourceId,
                "expiry": 14
            };

            let childResources = ARCHErdfQuery(optionsChildRes, rs);
            let result = [];

            for (let i = 0; i < childResources.value.length; i++) {
                // query:
                const optionsTitle = {
                    "subject": childResources.value[i].isPartOf.subject,
                    "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#hasTitle",
                    "object": null,
                    "expiry": 14
                };

                const optionsIdentifier = {
                    "subject": childResources.value[i].isPartOf.subject,
                    "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#hasIdentifier",
                    "object": null,
                    "expiry": 14
                };
                let title = ARCHErdfQuery(optionsTitle, rs);
                let identifier = ARCHErdfQuery(optionsIdentifier, rs);

                result.push({
                    url: childResources.value[i].isPartOf.subject,
                    title: title.value[0].hasTitle.object,
                    identifier: identifier.value[1].hasIdentifier.object
                });
            }
            return callback(result);
        });

    } catch (error) {
        console.log(error);
    }
    /* try {
         let collection = ARCHErdfQuery(options, rs);

         const response = await fetch(url, options);
         const body = await response.text();
         let child_resources = ARCHErdfQuery(null, 'https://vocabs.acdh.oeaw.ac.at/schema#isPartOf', 'https://arche-dev.acdh-dev.oeaw.ac.at/api/' + resourceId, body);
         let result = [];
         for (let i = 0; i < child_resources.length; i++) {
             let title = ARCHErdfQuery(child_resources[i].subject, 'https://vocabs.acdh.oeaw.ac.at/schema#hasTitle', null, body);
             let identifier = ARCHErdfQuery(child_resources[i].subject, 'https://vocabs.acdh.oeaw.ac.at/schema#hasIdentifier', null, body);
             let t = extractTitle(title);
             result.push({
                 url: child_resources[i],
                 title: t,
                 identifier: identifier[1].object
             });
         }
         return callback(result);
     } catch (error) {
         console.log(error);
     }*/
}

module.exports.getCollectionOfObject = async (resourceId, callback) => {
    const options = {
        "host": ARCHE_BASE_URL,
        "format": FORMAT_NTRIPLES,
        "resourceId": resourceId,
        "readMode": READMODE_RELATIVES,
    };

    try {
        //load object
        await ARCHEdownloadResourceIdM(options, (rs) => {
            const optionsIsPartOf = {
                "subject": ARCHE_BASE_URL + '/' + resourceId,
                "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#isPartOf",
                "object": null,
                "expiry": 14
            };

            //get collection of object
            let col = ARCHErdfQuery(optionsIsPartOf, rs);
            let colFetchUrl = col.value[0].isPartOf.object;
            let idx = colFetchUrl.lastIndexOf('/');
            let colId = colFetchUrl.substring(idx + 1);

            const options = {
                "host": ARCHE_BASE_URL,
                "format": FORMAT_NTRIPLES,
                "resourceId": colId,
                "readMode": READMODE_RESOURCE,
            };

            ARCHEdownloadResourceIdM(options, (rs) => {
                const optionsColTitle = {
                    "subject": colFetchUrl,
                    "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#hasTitle",
                    "object": null,
                    "expiry": 14
                };

                const optionsItems = {
                    "subject": colFetchUrl,
                    "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#hasNumberOfItems",
                    "object": null,
                    "expiry": 14
                };

                let title = ARCHErdfQuery(optionsColTitle, rs);
                let documents = ARCHErdfQuery(optionsItems, rs);
                let t = title.value[0].hasTitle.object;

                let result = [];
                let idx = documents.value[0].hasNumberOfItems.object.lastIndexOf('^');
                let docs = documents.value[0].hasNumberOfItems.object.substring(0, idx - 1);

                result.push({
                    url: colFetchUrl,
                    title: t,
                    size: docs
                });
                return callback(result);
            });
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports.getAllObjects = async (callback) => {
    console.log('getAllObjects')
    const resourceId = 37565;
    const options = {
        "host": ARCHE_BASE_URL,
        "format": FORMAT_NTRIPLES,
        "resourceId": resourceId,
        "readMode": READMODE_RELATIVES
    };

    try {
        ARCHEdownloadResourceIdM(options, (rs) => {
            const options = {
                "subject": null,
                "predicate": 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
                "object": 'https://vocabs.acdh.oeaw.ac.at/schema#Resource',
                "expiry": 14,
                "paginate": [0,10]
            };
            let all_resources = ARCHErdfQuery(options, rs);
            console.log('objects:')
            console.log(all_resources);
            let result = [];

            for (let i = 0; i < all_resources.value.length; i++) {
                let identifier = all_resources.value[i].type.subject
                console.log(identifier);
                const optionsTitle = {
                    "subject": identifier,
                    "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#hasTitle",
                    "object": null,
                    "expiry": 14
                };

                let title = ARCHErdfQuery(optionsTitle, rs).value[0].hasTitle.object;
                console.log(title);
                result.push({
                    title: title,
                    identifier: identifier
                });
            }
            return callback(result);

            /*for (let i = 0; i < all_resources.value.length; i++) {
                let title = ARCHErdfQuery(all_resources[i].subject, 'https://vocabs.acdh.oeaw.ac.at/schema#hasTitle', null, body);
                let identifier = ARCHErdfQuery(all_resources[i].subject, 'https://vocabs.acdh.oeaw.ac.at/schema#hasIdentifier', null, body);
                let t = extractTitle(title);
                result.push({
                    url: all_resources[i],
                    title: t,
                    identifier: identifier[1].object
                });
            }*/

        });
    } catch (error) {
        console.log(error);
    }
}

/*
module.exports.getTransformedHTML = async(objectId, callback) => {
    try {
        const url = `https://service4tei.acdh-dev.oeaw.ac.at/tei2html.xql?tei=https://arche-dev.acdh-dev.oeaw.ac.at/api/${objectId}&xsl=https://raw.githubusercontent.com/acdh-oeaw/legalkraus-app/master/src/lesefassung_xsl/legal_kraus_lesefassung.xsl`;
        const resp = await fetch(url);
        const data = await resp.text();
        return callback(data);
    }catch (error){
        console.log(error);
    }

}*/

module.exports.getTransformedHTML = async (resourceId, callback) => {
    const resp = await fetch(`tmp/${resourceId}.html`)
    const data = await resp.text();
    return callback(data);
}

module.exports.performFullTextSearch = async (searchTerm, callback) => {
    const url = `${ARCHE_BASE_URL}/search?`;


    fetch(url + new URLSearchParams({
        "property[0]": "BINARY",
        "operator[0]": "@@",
        "value[0]": searchTerm,
        "property[1]": "https://vocabs.acdh.oeaw.ac.at/schema#isPartOf",
        "operator[1]": "=",
        "value[1]": "https://arche-dev.acdh-dev.oeaw.ac.at/api/37571",
        "ftsQuery": searchTerm

    }), {
        headers: {'Accept': 'application/json'}
    }).then(response => response.json()).then(data => {
        return callback(data);
    })


}


