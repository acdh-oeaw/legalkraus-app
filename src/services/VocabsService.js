const Vocabs_BaseUrl = 'https://vocabs.acdh.oeaw.ac.at/rest/v1/legal_kraus';
const Vocabs_TopConceptsEndpoint = `${Vocabs_BaseUrl}/topConcepts`;
//const Vocabs_DataEndpoint = `${Vocabs_BaseUrl}/data?format=application/json`;
const Vocabs_ChildrenEndpoint = `${Vocabs_BaseUrl}/children?format=application/json`;
//const Vocabs ={};

module.exports.getVocab = async () => {
  return fetch(Vocabs_TopConceptsEndpoint).then(response => response.json())
}

module.exports.getChildrenOfConcept = async (uri) => {
    return fetch(`${Vocabs_ChildrenEndpoint}&${new URLSearchParams({
        uri: uri})}`).then(response => response.json())
  }