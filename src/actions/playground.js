import md5 from 'blueimp-md5'

export const FETCH_HEROES_REQUEST = 'FETCH_HEROES_REQUEST'
export const FETCH_HEROES_SUCCESS = 'FETCH_HEROES_SUCCESS'
export const FETCH_HEROES_ERROR = 'FETCH_HEROES_ERROR'
export const SHUFFLE_HEROES = 'SHUFFLE_HEROES'
export const PICK_CARD = 'PICK_CARD'

const fetchHeroesRequest = () => ({ type: FETCH_HEROES_REQUEST })
const fetchHeroesSuccess = heroes => ({ type: FETCH_HEROES_SUCCESS, heroes })
const fetchHeroesError = error => ({ type: FETCH_HEROES_ERROR, error })

export const shuffleHeroes = () => ({ type: SHUFFLE_HEROES })

export const pickCard = (key) => ({ type: PICK_CARD, key })

export const fetchHeroes = () => (dispatch) => {
  const baseURL = 'https://gateway.marvel.com:443/v1/public/'
  const privateKey = 'e8b65f84acf29444acbc923a006b9c4963bfb1f6'
  const publicKey = '59a89e925adfc0807da3394a4528b889'

  const ts = Date.now();
  const stringToHash = ts + privateKey + publicKey
  const hash = md5(stringToHash)

  dispatch(fetchHeroesRequest())

  return fetch(`${baseURL}characters?limit=60&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
    .then(response => {
      return response.json()
    })
    .then(({ data }) => {
      const { results } = data
      let count = 0
      const heroes = results.filter((element) => {
        const elementHasAPicture = !element.thumbnail.path.includes('image_not_available') 
        if (elementHasAPicture) count++
        return elementHasAPicture && count <= 32
      }).map(element => {
        return {
          id: element.id,
          name: element.name,
          thumbnail: `${element.thumbnail.path}.${element.thumbnail.extension}`
        }
      }).reduce((heroes, hero) => {
        heroes = { ...heroes, [hero.id]: { ...hero } }
        return heroes
      }, {})
      dispatch(fetchHeroesSuccess(heroes));
    })
    .catch((error) => {
      dispatch(fetchHeroesError(error.message))
    });
}
