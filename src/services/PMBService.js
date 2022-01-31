//https://pmb.acdh.oeaw.ac.at/entity/${resourceId}/

module.exports.getObjectWithId = async(resourceId, callback) => {
    let id = resourceId.substring(4); //removes the leading '#pmb'
    console.log(id);
    const resp = await fetch(`https://pmb.acdh.oeaw.ac.at/entity/${id}/?format=json`)
    const data = await resp.json();
    return callback(data);
}