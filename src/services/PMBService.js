//https://pmb.acdh.oeaw.ac.at/entity/${resourceId}/

module.exports.getObjectWithId = async(resourceId, callback) => {
    let id = resourceId.substring(1); //removes the leading '#'
    const resp = await fetch(`https://pmb.acdh.oeaw.ac.at/entity/${id}/?format=json`)
    const data = await resp.json();
    return callback(data);
}