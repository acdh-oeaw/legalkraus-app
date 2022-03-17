const store = require("./store");
const {
    ARCHErdfQuery,
    //ARCHEdownloadResourceIdM, 
    ARCHEdownloadResourceIdM2
} = require("arche-api");

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

const queryMDAndGetCategories = (baseurl, startPage, caseIDs, callback) => {
    const options = {};
    let metadata = store.default.getters.MDAllCollections;

    const result = [];
    let all_resources = [];

    caseIDs.forEach(cid => {
        options.subject = null;
        //options.predicate = "https://vocabs.acdh.oeaw.ac.at/schema#isPartOf";
        options.predicate = "https://vocabs.acdh.oeaw.ac.at/schema#hasIdentifier"
        //options.object = `${baseurl}/37565`;
        options.object = "https://id.acdh.oeaw.ac.at/legalkraus/"+cid;
        options.expire = 14;
        options.paginate = [startPage, Math.min(startPage + store.default.getters.collectionPageSize, store.default.getters.noOfCollections || store.default.getters.collectionPageSize)]

        all_resources.push(ARCHErdfQuery(options, metadata));
    });

    store.default.dispatch('setNoOfCollections', all_resources.fullLength)
    console.log(all_resources)
    const promises = [];
    all_resources.forEach(function (rs) {
        //var rsID = rs.isPartOf.subject.replace(`${baseurl}/`, "");
        var rsID = rs.value[0].hasIdentifier.subject.replace(`${baseurl}/`, "");
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
            result.push(resdata);
        })

        let transformed = collections2view(result);
        callback(transformed)
    });
}

module.exports = {
    collections2view,
    //resources2view
    queryAndProcessMD,
    queryMDAndGetCategories
}