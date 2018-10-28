import React from 'react'
import { connect } from 'react-redux'
import HeroCard from '../atoms/heroCard'
import * as playgroundActions from '../actions/playground'

class Playground extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      heroesPicked: [],
      heroesArray: [],
      oldTimestamp: 0,
      timestamps: [],
      containerStyle: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: 'auto',
        height: '100%',
        width: '100%'
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { heroes, dispatch } = this.props
    if(nextProps.heroes !== heroes) {
      dispatch(playgroundActions.shuffleHeroes(nextProps.heroes))
    }
  }

  componentDidUpdate(_, prevState) {
    const { oldTimestamp } = this.state
    if (prevState.oldTimestamp !== oldTimestamp) {
      this.checkGameStatus()
    }
  }

  // getHeroesPlayground(heroes) {
  //   const heightHeroes = shuffleArray(Object.values(heroes))
  //     .slice(0, 8)
  //     .map(element => {
  //       return { ...element, discovered: false }
  //     })
  //   const heroesArray = shuffleArray(heightHeroes.concat(heightHeroes))
  //   this.setState({ heroesArray })
  // }

  pickCard(key) {
    const { heroesPicked, timestamps } = this.state
    const { heroesArray } = this.props

    if (timestamps.length === 0) {
      const oldTimestamp = Date.now()
      this.setState({ oldTimestamp, timestamps: [oldTimestamp] })
    }
    if (heroesPicked.length > 1) return this.setState({ heroesPicked: [] })
    if ((heroesPicked.length === 1 && heroesPicked[0] === key) || heroesArray[key].discovered) return

    heroesPicked.push(key)
    this.setState({ heroesPicked })
    this.checkCards()
  }

  checkGameStatus() {
    const { timestamps } = this.state
    const { checkVictory, heroesArray } = this.props
    const status = heroesArray.every(hero => {
      return hero.discovered
    })
    const score = timestamps.reduce((score, timestampDelta, key) => {
      if(key === 0) return 0
      score = score + Math.pow(Math.round(100000 / timestampDelta), 2)
      return score
    }, 0)
    checkVictory(status, score)
  }

  checkCards() {
    const { heroesPicked, oldTimestamp, timestamps } = this.state
    const { heroesArray } = this.props

    if (heroesPicked.length < 2) return

    const firstCardKey = heroesPicked[0]
    const secondCardKey = heroesPicked[1]
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

      this.setState({ heroesArray: newHeroesArray, heroesPicked: [], oldTimestamp: timestamp, timestamps: newTimestamps })
    }
  }

  render() {
    const { containerStyle, heroesPicked } = this.state
    const { size, heroesArray } = this.props

    return(
      <div style={containerStyle}>
        {heroesArray.map((hero, key) => {
          const picked = heroesPicked.includes(key)
          const discovered = hero.discovered
          return  <HeroCard
            size={size * 0.25}
            key={key}
            hero={hero}
            picked={picked}
            discovered={discovered}
            pickCard={() => this.pickCard(key)}
          />
        })}
      </div>
    )
  }
}

const mapStateToProps = ({ playground }) => ({
  heroes: playground.heroes,
  heroesArray: playground.heroesArray
})

export default connect(mapStateToProps)(Playground)