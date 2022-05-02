//https://pmb.acdh.oeaw.ac.at/entity/${resourceId}/

module.exports.getObjectWithId = async (resourceId, type, callback) => {
    if (resourceId.startsWith('#pmb')) {
        resourceId = resourceId.substring(4); //removes the leading '#pmb'
    }
    let url = "";
    if (type === 'place') {
        url = "https://pmb.acdh.oeaw.ac.at/apis/api/entities/place/" + resourceId + "&limit=1";
    } else {
        url = `https://pmb.acdh.oeaw.ac.at/entity/${resourceId}/?format=json`;
    }
    const resp = await fetch(url)
    const data = await resp.json();
    return callback(data);
}