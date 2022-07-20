const store = require("./store");
const {
    ARCHErdfQuery,
    //ARCHEdownloadResourceIdM, 
    ARCHEdownloadResourceIdM2
} = require("arche-api");

const { getVocab, getChildrenOfConcept } = require('./services/VocabsService.js')

const collections2view = (collections) => {
    const collectionViewData = [];
    collections.forEach(collection => {
        let colobj = {};
        collection.value.forEach(collectionproperties => {
            if (collectionproperties.hasTitle) {
                colobj.title = collectionproperties.hasTitle.object;
                colobj.url = collectionproperties.hasTitle.subject;
            }
            if (collectionproperties.hasNumberOfItems) {
                colobj.size = collectionproperties.hasNumberOfItems.object.replace(/\^.*/, "");
            }
            if (collectionproperties.hasIdentifier) {
                if (collectionproperties.hasIdentifier.object.includes("C_")) {
                    colobj.identifier = collectionproperties.hasIdentifier.object;
                }
            }
        });
        collectionViewData.push(colobj);
    });
    return collectionViewData;
};

const resources2view = (resources) => {
    const resourceViewData = [];
    resources.forEach(resource => {
        let resobj = {};
        resource.value.forEach(collectionproperties => {
            if (collectionproperties.hasTitle) {
                resobj.title = collectionproperties.hasTitle.object;
                resobj.url = collectionproperties.hasTitle.subject;
            }
        });
        resourceViewData.push(resobj);
    });
    return resourceViewData;
};

const queryAndProcessMD = (archetype, baseurl, startPage, callback) => {

    const options = {};
    let metadata = null;
    const resources = [];
    switch (archetype) {
        case 'collection':
            options.subject = null;
            options.predicate = "https://vocabs.acdh.oeaw.ac.at/schema#isPartOf";
            options.object = `${baseurl}/37565`;
            options.expire = 14;
            options.paginate = [startPage, Math.min(startPage + store.default.getters.collectionPageSize, store.default.getters.noOfCollections || store.default.getters.collectionPageSize)]
            metadata = store.default.getters.MDAllCollections;
            break;
        case 'resource':
            options.subject = null;
            options.predicate = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
            options.object = 'https://vocabs.acdh.oeaw.ac.at/schema#Resource';
            options.expire = 14;
            options.paginate = [startPage, Math.min(startPage + store.default.getters.resourcePageSize, store.default.getters.noOfResources || store.default.getters.resourcePageSize)];
            metadata = store.default.getters.MDAllResources;
            break;
    }
    let all_resources = ARCHErdfQuery(options, metadata);
    if (archetype === 'resource') {
        store.default.dispatch('setNoOfResources', all_resources.fullLength)
    }
    if (archetype === 'collection') {
        store.default.dispatch('setNoOfCollections', all_resources.fullLength)
    }
    const promises = [];
    all_resources.value.forEach(function (rs) {
        var rsID = (archetype === 'resource') ? rs.type.subject.replace(`${baseurl}/`, "") : rs.isPartOf.subject.replace(`${baseurl}/`, "");
        let options = {
            "host": baseurl,
            "format": "application/n-triples",
            "resourceId": rsID,
            "readMode": "resource"
        };
        promises.push(ARCHEdownloadResourceIdM2(options));

    });

    return Promise.all(promises).then((results) => {
        results.forEach(resource => {
            let options = {
                "subject": null,
                "predicate": null,
                "object": null,
                "expiry": 14,
                "paginate": false
            };
            const resdata = ARCHErdfQuery(options, resource);
            resources.push(resdata);
        })

        let transformed;
        if (archetype === 'resource') {
            transformed = resources2view(resources);
        } else {
            transformed = collections2view(resources);
        }
        callback(transformed)
    });
}

const processCaseInfo = (caseInfo) => {

    const groupedData = group(caseInfo);


    getVocab().then((data) => {

        data.topconcepts.map(async (tc) => {
            getConceptChildren(tc).then(() => {
                for (const [uri, concept] of Object.entries(
                    store.default.getters.vocabs
                )) {
                    if (groupedData[concept.prefLabel]) {

                        store.default.dispatch("updateConcept", {
                            uri: uri,
                            propname: "cases",
                            propval: groupedData[concept.prefLabel],
                        });
                    }
                }
            });
        });


        createListsFromCases(caseInfo)
        store.default.dispatch("setVocabReady", true)
        //groupCasesByTopConcepts();
    })


}

const createListsFromCases = (data) => {
    let lists = {};
    data.cases.map((cs) => {
        cs.org_actor.map((oa) => {
            if (!lists[oa.role_label]) {
                lists[oa.role_label] = {
                    isTopElement: true,
                    label: oa.role_label,
                    children: [],
                };
            }
            if (
                lists[oa.role_label].children.filter(
                    (ch) => ch.title === oa.title
                ).length === 0
            ) {
                lists[oa.role_label].children.push({
                    ...oa,
                    cases: [],
                });
            }
            lists[oa.role_label].children
                .filter((ch) => ch.title === oa.title)[0]
                .cases.push(cs);
        });

        cs.actors.map((oa) => {
            if (!lists[oa.role_label]) {
                lists[oa.role_label] = {
                    isTopElement: true,
                    label: oa.role_label,
                    children: [],
                };
            }
            if (
                lists[oa.role_label].children.filter(
                    (ch) => ch.title === oa.title
                ).length === 0
            ) {
                lists[oa.role_label].children.push({
                    ...oa,
                    cases: [],
                });
            }
            lists[oa.role_label].children
                .filter((ch) => ch.title === oa.title)[0]
                .cases.push(cs);
        });


    });
    store.default.dispatch("setGroupedCases", lists)
}

/*const groupCasesByTopConcepts = () => {
    let topConceptsCases = {};
    Object.values(store.default.getters.vocabs).forEach((c) => {
        if (c.topConceptOf) {
            topConceptsCases[c.label] = {};
            getDesc(c, c.label);
        }
    });
    store.default.dispatch('setTopConceptsCases',topConceptsCases)
}

const getDesc = (concept, label) => {
    if (concept.children) {
        concept.children.forEach((child) => {
            this.getDesc(child, label);
        });
    } else {
        //this.topConceptsCases[label] = concept;
    }
}*/

const getConceptChildren = (concept) => {
    store.default.dispatch("addConcept", concept);

    if (concept.hasChildren === true) {
        return getChildrenOfConcept(concept.uri).then((data) => {
            store.default.dispatch("updateConcept", {
                uri: concept.uri,
                propname: "children",
                propval: data.narrower,
            });
            data.narrower.forEach((c) => getConceptChildren(c));
        });
    }
}

const group = (items) => {
    let grouped = {};


    items['keywords'].map(gval => {
        grouped[gval] = items.cases.filter(item => item['keywords'].indexOf(gval) !== -1)
    })

    Object.values(items['orgs']).map(gval => {
        grouped[gval] = items.cases.filter(item => item.org_actor.filter(oa => oa.title === gval).length > 0)
    })

    /*Object.values(items['persons']).map(gval => {
        grouped[gval] = items.cases.filter(item => item.actors.filter(oa => oa.title === gval).length > 0)
    })*/

    return grouped;
}

const getTriples = (subj, predicate, data) => {
    const options = {
        "subject": subj,
        "predicate": predicate,
        "object": null,
        "expiry": 14
    };
    return ARCHErdfQuery(options, data).value.map((item) =>
        Object.values(item)[0]
    );
}


const parseTripleValue = (val) => {
    var match = val.match(/^[0-9]+(?<!\^\^)/);
    if (!match)
        throw new Error('wrong format');
    return match[0];
}


const processArcheSearchResults = (data, type = '') => {
    let searchResults = getTriples(null, 'search://fts', data)

    let searchResultCount = parseTripleValue(getTriples(null, 'search://count', data)[0].object)
    var finalResults = { count: searchResultCount, results: [] };

    searchResults.forEach(sr => {
        if (type != 'col') {
            const optionsIsPartOf = {
                "subject": sr.subject,
                "predicate": "https://vocabs.acdh.oeaw.ac.at/schema#isPartOf",
                "object": null,
                "expiry": 14
            };
            ARCHErdfQuery(optionsIsPartOf, data).value.map((op) => {
                const title = getTriples(sr.subject, "https://vocabs.acdh.oeaw.ac.at/schema#hasTitle", data)[0].object;
                const parentTitle = getTriples(Object.values(op)[0].object, "https://vocabs.acdh.oeaw.ac.at/schema#hasTitle", data)[0].object;
                const parentXMLId = getTriples(Object.values(op)[0].object, "https://vocabs.acdh.oeaw.ac.at/schema#hasIdentifier", data).map(tr => tr.object).filter(id => id.includes('https://id.acdh.oeaw.ac.at/legalkraus/'))[0];
                const mergedObj = { id: sr.subject, title: title, parent: Object.values(op)[0].object, parentTitle: parentTitle, kwic: sr.object, parentXMLId: parentXMLId }
                finalResults.results.push(mergedObj)
            } 

            );
        }
        else { 
            const title = getTriples(sr.subject, "https://vocabs.acdh.oeaw.ac.at/schema#hasTitle", data)[0].object;
            const mergedObj = { id: sr.subject, title: title, kwic: sr.object }
            finalResults.results.push(mergedObj)
        
        }

    });
    return finalResults;
}



module.exports = {
    collections2view,
    //resources2view
    queryAndProcessMD,
    processCaseInfo,
    getTriples,
    parseTripleValue,
    processArcheSearchResults
}