import shuffleArray from '../utils/shuffleArray'
import {
  FETCH_HEROES_REQUEST,
  FETCH_HEROES_SUCCESS,
  FETCH_HEROES_ERROR,
  SHUFFLE_HEROES,
  PICK_CARD
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

const getScore = (timestamps) => {
  return timestamps.reduce((score, timestampDelta, key) => {
    if(key === 0) return 0
    score = score + Math.pow(Math.round(100000 / timestampDelta), 2)
    return score
  }, 0)
}

const checkVictory = (heroesArray) => {
  return heroesArray.every(hero => {
    return hero.discovered
  })
}

const pickCard = (state, key) => {
  const { heroesPicked, heroesArray, oldTimestamp, timestamps } = state

  if ((heroesPicked.length === 1 && heroesPicked[0] === key) || heroesArray[key].discovered) return state
  if (heroesPicked.length > 1) return { ...state, heroesPicked: [] }

  const newHeroesPicked = [...heroesPicked, key]

  if (timestamps.length === 0) {
    const oldTimestamp = Date.now()
    return { ...state, heroesPicked: newHeroesPicked, oldTimestamp, timestamps: [oldTimestamp] }
  }

  if (newHeroesPicked.length < 2) return { ...state, heroesPicked: newHeroesPicked }

  const firstCardKey = newHeroesPicked[0]
  const secondCardKey = newHeroesPicked[1]
  const firstCardId = heroesArray[firstCardKey].id
  const secondCardId = heroesArray[secondCardKey].id

  if (firstCardId === secondCardId && firstCardKey !== secondCardKey) {
    const timestamp = Date.now()
    const newTimestamp = timestamp - oldTimestamp
    const newTimestamps = [...timestamps, newTimestamp]
    const newHeroesArray = heroesArray.map(hero => {
      if (hero.id === firstCardId || hero.id === secondCardId) {
        return { ...hero, discovered: true }
      }
      return hero
    })

    const score = getScore(newTimestamps)
    const victory = checkVictory(newHeroesArray)

    return { ...state, heroesArray: newHeroesArray, heroesPicked: [], oldTimestamp: timestamp, timestamps: newTimestamps, score, victory }
  }

  return { ...state, heroesPicked: newHeroesPicked }
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
    case PICK_CARD:
      return pickCard(state, action.key)
    default:
      return state
  }
}