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
                colobj.size = collectionproperties.hasNumberOfItems.object.replace(/\^.*/,"");
            }
        });
        collectionViewData.push(colobj);
    });
    return collectionViewData;
  };
  
module.exports = {
    collections2view
}