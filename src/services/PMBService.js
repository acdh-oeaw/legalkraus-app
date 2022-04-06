//https://pmb.acdh.oeaw.ac.at/entity/${resourceId}/

module.exports.getObjectWithId = async(resourceId, type, callback) => {
    let id = resourceId.substring(4); //removes the leading '#pmb'
    let url = "";
    if(type === 'place'){
        url = "https://pmb.acdh.oeaw.ac.at/apis/api/entities/place/" + id;
    }else{
        url = `https://pmb.acdh.oeaw.ac.at/entity/${id}/?format=json`;
    }
    const resp = await fetch(url)
    const data = await resp.json();
    return callback(data);
}