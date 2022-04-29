const {default: fetch} = require('node-fetch');
const {
    ARCHErdfQuery, ARCHEdownloadResourceIdM,
} = require("arche-api");
const {queryAndProcessMD} = require("../utils")
const store = require("../store");

const ARCHE_BASE_URL = "https://arche-dev.acdh-dev.oeaw.ac.at/api";
const FORMAT_NTRIPLES = "application/n-triples";
const READMODE_RESOURCE = "resource";
const READMODE_RELATIVES = "relatives";

module.exports.getObjectWithId = async (resourceId, callback) => {

    let options = {
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

module.exports.getEntity = async (resourceId, callback) => {
    const options = {
        "host": ARCHE_BASE_URL,
        "format": "application/n-triples",
        "resourceId": resourceId,
        "readMode": READMODE_RESOURCE,
    };

    try {
        await ARCHEdownloadResourceIdM(options, (rs) => {
            const optionsHasTitel = {
                "subject": null,
                "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#hasTitle",
                "object": null,
                "expiry": 14
            };

            const optionsHasIdentifier = {
                "subject": null,
                "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#hasIdentifier",
                "object": null,
                "expiry": 14
            };
            let titel = ARCHErdfQuery(optionsHasTitel, rs).value[0].hasTitle.object;
            let id = ARCHErdfQuery(optionsHasIdentifier, rs).value[0].hasIdentifier.object;
            let result =
                {
                    "title": titel,
                    "identifier": id
                };
            return callback(result);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports.getMetaData = async (callback) => {
    const resourceId = 17722;
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
    const resourceId = 17722;

    const options = {
        "host": ARCHE_BASE_URL,
        "format": "application/n-triples",
        "resourceId": resourceId,
        "readMode": "neighbors",
    };
    if (store.default.getters.MDAllCollections === null) {
        try {
            ARCHEdownloadResourceIdM(options, (rs) => {
                store.default.dispatch('setMDAllCollections', rs);
                queryAndProcessMD('collection', ARCHE_BASE_URL, startPage, callback);
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        queryAndProcessMD('collection', ARCHE_BASE_URL, startPage, callback);
    }
}

/**
 * Given the xmlId of a resource, the function return the corresponding archeId by making a call over the Arche API
 * @param xmlId full xmlid, e.g.D_000001-003-000.xml or C_000004.xml
 * @param callback
 * @returns the ArcheId of the corresponding xmlID
 */
module.exports.getArcheIdFromXmlId = async (xmlId, callback) => {
    let httpRequest = new XMLHttpRequest();
    if (xmlId.includes('C_')) {
        xmlId = xmlId.substring(0, xmlId.length - 4);
    }
    httpRequest.onload = function () {
        let url = httpRequest.responseURL;
        //remove /metadata
        let urlShort = url.substring(0, url.length - 9);
        let idx = urlShort.lastIndexOf('/');
        callback(urlShort.substring(idx + 1));
    };
    httpRequest.open('GET', 'https://id.acdh.oeaw.ac.at/legalkraus/' + xmlId, true)
    httpRequest.setRequestHeader('Accept', 'application/ld+json')
    httpRequest.send()
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

                const optionsActor = {
                    "subject": childResources.value[i].isPartOf.subject,
                    "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#hasActor",
                    "object": null,
                    "expiry": 14
                };
                const optionsSpatialCoverage = {
                    "subject": childResources.value[i].isPartOf.subject,
                    "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#hasSpatialCoverage",
                    "object": null,
                    "expiry": 14
                };

                let title = ARCHErdfQuery(optionsTitle, rs);
                let identifier = ARCHErdfQuery(optionsIdentifier, rs);
                let actors = ARCHErdfQuery(optionsActor, rs);
                let places = ARCHErdfQuery(optionsSpatialCoverage, rs);

                result.push({
                    url: childResources.value[i].isPartOf.subject,
                    title: title.value[0].hasTitle.object,
                    identifier: identifier.value[1].hasIdentifier.object,
                    actors: actors.value,
                    places: places.value
                });
            }
            return callback(result);
        });

    } catch (error) {
        console.log(error);
    }
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

                const optionsIdentifier = {
                    "subject": colFetchUrl,
                    "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#hasIdentifier",
                    "object": null,
                    "expiry": 14
                };

                let title = ARCHErdfQuery(optionsColTitle, rs);
                let identifier = ARCHErdfQuery(optionsIdentifier, rs);
                let documents = ARCHErdfQuery(optionsItems, rs);
                let t = title.value[0].hasTitle.object;

                let result = [];
                let idx = documents.value[0].hasNumberOfItems.object.lastIndexOf('^');
                let docs = documents.value[0].hasNumberOfItems.object.substring(0, idx - 1);

                result.push({
                    url: colFetchUrl,
                    title: t,
                    size: docs,
                    id: colId,
                    xmlId: identifier.value[1].hasIdentifier.object.substring(identifier.value[1].hasIdentifier.object.lastIndexOf('/') + 1)
                });
                return callback(result);
            });
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports.getAllResources = async (startPage, callback) => {
    const resourceId = 17722;
    const options = {
        "host": ARCHE_BASE_URL,
        "format": FORMAT_NTRIPLES,
        "resourceId": resourceId,
        "readMode": READMODE_RELATIVES
    };
    if (store.default.getters.MDAllResources === null) {
        try {
            ARCHEdownloadResourceIdM(options, (rs) => {
                store.default.dispatch('setMDAllResources', rs);
                queryAndProcessMD('resource', ARCHE_BASE_URL, startPage, callback);
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        queryAndProcessMD('resource', ARCHE_BASE_URL, startPage, callback);
    }
}

module.exports.getTransformedHtmlResource = async (objectId, callback) => {
    try {
        const url = `https://service4tei.acdh-dev.oeaw.ac.at/tei2html.xql?tei=https://arche-dev.acdh-dev.oeaw.ac.at/api/${objectId}&xsl=https://raw.githubusercontent.com/acdh-oeaw/legalkraus-app/dev-comments-meta-data/src/lesefassung_xsl/legal_kraus_lesefassung.xsl`;
        const resp = await fetch(url);
        const data = await resp.text();
        return callback(data);
    } catch (error) {
        console.log(error);
    }
}

/*module.exports.getTransformedHTML = async (resourceId, callback) => {
    //const resp = await fetch(`tmp/${resourceId}.html`)
    const resp = await fetch('tmp/37600.html')
    const data = await resp.text();
    return callback(data);
}*/

module.exports.performFullTextSearch = async (searchTerm, colId, rsId, callback) => {
    const url = `${ARCHE_BASE_URL}/search?`;

    if (colId && rsId) {
        //searches in the resource that has rsId and is part of the collection with colId
        fetch(url + new URLSearchParams({
            "property[0]": "BINARY",
            "operator[0]": "@@",
            "value[0]": searchTerm,
            "property[1]": "https://vocabs.acdh.oeaw.ac.at/schema#isPartOf",
            "operator[1]": "=",
            "value[1]": "https://arche-dev.acdh-dev.oeaw.ac.at/api/" + colId,
            "value[2]": "https://arche-dev.acdh-dev.oeaw.ac.at/api/" + rsId,
            "ftsQuery": searchTerm

        }), {
            headers: {'Accept': 'application/json'}
        }).then(response => response.json()).then(data => {
            return callback(data);
        })

    } else if (colId) {
        console.log('col')
        //searches in all resources that are part of the collection with colId
        fetch(url + new URLSearchParams({
            "property[0]": "BINARY",
            "operator[0]": "@@",
            "value[0]": searchTerm,
            "property[1]": "https://vocabs.acdh.oeaw.ac.at/schema#isPartOf",
            "operator[1]": "=",
            "value[1]": "https://arche-dev.acdh-dev.oeaw.ac.at/api/" + colId,
            "ftsQuery": searchTerm

        }), {
            headers: {'Accept': 'application/json'}
        }).then(response => response.json()).then(data => {
            data.type = 'col';
            return callback(data);
        })
    } else {
        console.log('all')
        //searches in all collections
        const url = "https://arche-dev.acdh-dev.oeaw.ac.at/api/search?sql=SELECT id FROM full_text_search JOIN (SELECT (get_relatives(id, ?, 9999, 0)).id FROM identifiers WHERE ids = ?) t USING (id)  WHERE websearch_to_tsquery('simple', ?) @@ segments&sqlParam[]=https://vocabs.acdh.oeaw.ac.at/schema%23isPartOf&sqlParam[]=https://arche-dev.acdh-dev.oeaw.ac.at/api/17722&format=application/json&sqlParam[]=" + searchTerm + "&readMode=ids&limit=25&ftsQuery=" + searchTerm;
        fetch(url).then(rs => rs.json()).then(data => {
            return callback(data);
        });

        /*const baseColId = 37562;
        fetch(url + new URLSearchParams({
            "property[0]": "BINARY",
            "operator[0]": "@@",
            "value[0]": searchTerm,
            "property[1]": "https://vocabs.acdh.oeaw.ac.at/schema#isPartOf",
            "operator[1]": "=",
            "value[1]": "https://arche-dev.acdh-dev.oeaw.ac.at/api/" + baseColId,
            "ftsQuery": searchTerm
        }), {
            headers: { 'Accept': 'application/json' }
        }).then(response => response.json()).then(data => {
            return callback(data);
        })*/
    }


}

module.exports.downloadCaseInfo = async () => {
    try {
        // const url = "https://id.acdh.oeaw.ac.at/legalkraus/cases-index.json";
        const url = "https://arche-dev.acdh-dev.oeaw.ac.at/api/17726";
        const resp = await fetch(url);
        return await resp.json();
    } catch (error) {
        console.log(error);
    }
}

module.exports.getPmbEntityViaArche = async(pmbId, callback) =>{
    console.log(pmbId)
    let url = "https://id.acdh.oeaw.ac.at/pmb/" + pmbId;
    fetch(url, {
        headers: {'Accept': 'application/json'}
    }).then(response => response.json()).then(data => {
        return callback(data);
    })
}


