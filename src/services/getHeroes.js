import md5 from 'blueimp-md5';

export default () => {
  const baseURL = 'https://gateway.marvel.com:443/v1/public/'
  const privateKey = 'e8b65f84acf29444acbc923a006b9c4963bfb1f6'
  const publicKey = '59a89e925adfc0807da3394a4528b889'

  const ts = Date.now();
  const stringToHash = ts + privateKey + publicKey
  const hash = md5(stringToHash)

  return fetch(`${baseURL}characters?limit=50&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      const results = data.data.results 
      let count = 0
      return results.filter((element) => {
        return !element.thumbnail.path.includes('image_not_available') && count++ < 16
      }).map(element => {
        return {
          id: element.id,
          name: element.name,
          thumbnail: `${element.thumbnail.path}.${element.thumbnail.extension}`
        }
      })
    })
}