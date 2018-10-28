import {
  FETCH_HEROES_REQUEST,
  FETCH_HEROES_SUCCESS,
  FETCH_HEROES_ERROR
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

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HEROES_REQUEST:
      return { ...state, loading: true }
    case FETCH_HEROES_SUCCESS:
      return { ...state, heroes: action.heroes, loading: false }
    case FETCH_HEROES_ERROR:
      return { ...state, error: action.error }
    default:
      return state
  }
}