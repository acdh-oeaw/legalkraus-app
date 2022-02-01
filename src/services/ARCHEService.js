const {default: fetch} = require('node-fetch');
const {ARCHErdfQuery} = require("arche-api");

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


module.exports.getObjectWithId = async (resourceId, callback) => {
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

module.exports.getMetaData = async (callback) => {
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

module.exports.getCollections = async (callback) => {
    const resourceId = 37565;
    let url = ARCHE_BASE_URL + '/' + resourceId + '/' + `metadata?_format=${FORMAT}&readMode=${READMODE_RELATIVES}`;
    const options = {
        method: 'GET'
    };
    console.log(url);
    try {
        const response = await fetch(url, options);
        const body = await response.text();
        //get child resources of top collection (= Collections)
        let child_resources = ARCHErdfQuery(null, 'https://vocabs.acdh.oeaw.ac.at/schema#isPartOf', 'https://arche-dev.acdh-dev.oeaw.ac.at/api/' + resourceId, body);
        let result = [];
        for (let i = 0; i < child_resources.length; i++) {
            let title = ARCHErdfQuery(child_resources[i].subject, 'https://vocabs.acdh.oeaw.ac.at/schema#hasTitle', null, body);
            let documents = ARCHErdfQuery(child_resources[i].subject, 'https://vocabs.acdh.oeaw.ac.at/schema#hasNumberOfItems', null, body)

            let idx = documents[0].object.lastIndexOf('^');
            let docs = documents[0].object.substring(0, idx - 1);

            let t = extractTitle(title);
            result.push({
                url: child_resources[i],
                title: t,
                size: docs
            });
        }
        return callback(result);
    } catch (error) {
        console.log(error);
    }
}

module.exports.getObjectsOfCollection = async (id, callback) => {
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
    }
}

module.exports.getCollectionOfObject = async (id, callback) => {
    const resourceId = id;
    let url = ARCHE_BASE_URL + '/' + resourceId + '/' + `metadata?_format=${FORMAT}&readMode=${READMODE_RELATIVES}`;
    const options = {
        method: 'GET'
    };

    try {
        const response = await fetch(url, options);
        const body = await response.text();
        let col = ARCHErdfQuery('https://arche-dev.acdh-dev.oeaw.ac.at/api/' + resourceId, 'https://vocabs.acdh.oeaw.ac.at/schema#isPartOf', null, body);
        let colFetchUrl = col[0].object + 'metadata?_format=application/n-triples&readMode=resource';

        const colRs = await fetch(colFetchUrl, options);
        const colBody = await colRs.text();

        let result = [];
        let title = ARCHErdfQuery(col[0].object, 'https://vocabs.acdh.oeaw.ac.at/schema#hasTitle', null, colBody);
        let documents = ARCHErdfQuery(col[0].object, 'https://vocabs.acdh.oeaw.ac.at/schema#hasNumberOfItems', null, colBody)

        let idx = documents[0].object.lastIndexOf('^');
        let docs = documents[0].object.substring(0, idx - 1);

        let t = extractTitle(title);
        result.push({
            url: col[0].object,
            title: t,
            size: docs
        });
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
            let title = ARCHErdfQuery(all_resources[i].subject, 'https://vocabs.acdh.oeaw.ac.at/schema#hasTitle', null, body);
            let identifier = ARCHErdfQuery(all_resources[i].subject, 'https://vocabs.acdh.oeaw.ac.at/schema#hasIdentifier', null, body);
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


/*module.exports.getTransformedHTML = async(objectId, callback) => {
    console.log('get html ' + objectId)
    try {
        const url = `https://service4tei.acdh-dev.oeaw.ac.at/tei2html.xql?tei=https://arche-dev.acdh-dev.oeaw.ac.at/api/${objectId}&xsl=https://raw.githubusercontent.com/acdh-oeaw/legalkraus-app/master/src/lesefassung_xsl/legal_kraus_lesefassung.xsl`;
        console.log(url)
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

