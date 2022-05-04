//https://pmb.acdh.oeaw.ac.at/entity/${resourceId}/

module.exports.getObjectWithId = async (resourceId, type, callback) => {
    if (resourceId.startsWith('#pmb')) {
        resourceId = resourceId.substring(4); //removes the leading '#pmb'
    }
    let url = "";
    if (type === 'place') {
        url = "https://pmb.acdh.oeaw.ac.at/apis/api/entities/place/?id=" + resourceId + "&limit=1";
    } else {
        url = `https://pmb.acdh.oeaw.ac.at/entity/${resourceId}/?format=json`;
    }
    const resp = await fetch(url)
    const data = await resp.json();
    return callback(data);
}


module.exports.getPmbPersonWithoutDetails = async (resourceId,type, callback) => {
    if (resourceId.startsWith('#pmb')) {
        resourceId = resourceId.substring(4); //removes the leading '#pmb'
    }
    let url = "";
    if (type === 'place') {
        url = "https://pmb.acdh.oeaw.ac.at/apis/api/entities/place/?id=" + resourceId + "&limit=1";
    } else if (type === 'institution') {
        url = "https://pmb.acdh.oeaw.ac.at/apis/api/entities/institution/?id=" + resourceId + "&limit=1";
    }   else {
        url = "https://pmb.acdh.oeaw.ac.at/apis/api/entities/person/?id=" + resourceId + "&limit=1";
    }
    
    const resp = await fetch(url)
    const data = await resp.json();
    return callback(data.results[0]);
}