import shuffleArray from '../utils/shuffleArray'
import {
  FETCH_HEROES_REQUEST,
  FETCH_HEROES_SUCCESS,
  FETCH_HEROES_ERROR,
  SHUFFLE_HEROES
} from '../actions/playground'

const initialState = {
  loading: false,
  heroes: {},
  victory: false,
  score: 0,
  heroesPicked: [],
  heroesArray: [],
  oldTimestamp: 0,
  timestamps: [],
  error: null
}

const shuffleHeroes = (state) => {
  const { heroes } = state
  const heightHeroes = shuffleArray(Object.values(heroes))
      .slice(0, 8)
      .map(element => {
        return { ...element, discovered: false }
      })
  const heroesArray = shuffleArray(heightHeroes.concat(heightHeroes))
  return { ...state, heroesArray }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HEROES_REQUEST:
      return { ...state, loading: true }
    case FETCH_HEROES_SUCCESS:
      return { ...state, heroes: action.heroes, loading: false }
    case FETCH_HEROES_ERROR:
      return { ...state, error: action.error }
    case SHUFFLE_HEROES:
      return shuffleHeroes(state)
    default:
      return state
  }
}