import React from 'react'
import HeroCard from '../atoms/heroCard'

class Playground extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      heroesPicked: [],
      heroesArray: [],
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
    const { heroes } = this.props
    if(nextProps.heroes !== heroes) {
      this.getHeroesPlayground(nextProps.heroes)
    }
  }

  componentDidUpdate(_, prevState) {
    const { heroesArray } = this.state
    if (prevState.heroesArray !== heroesArray) {
      this.checkGameStatus()
    }
  }

  shuffleArray(array) {
    const newArray = [].concat(array)
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = newArray[i]
      newArray[i] = newArray[j]
      newArray[j] = temp
    }
    return newArray
  }

  getHeroesPlayground(heroes) {
    const heightHeroes = this.shuffleArray(Object.values(heroes))
      .slice(0, 8)
      .map(element => {
        return { ...element, discovered: false }
      })
    const heroesArray = this.shuffleArray(heightHeroes.concat(heightHeroes))
    this.setState({ heroesArray })
  }

  pickCard(key) {
    const { heroesPicked, heroesArray } = this.state

    if (heroesPicked.length > 1) return this.setState({ heroesPicked: [] })
    if ((heroesPicked.length === 1 && heroesPicked[0] === key) || heroesArray[key].discovered) return

    heroesPicked.push(key)
    this.setState({ heroesPicked })
    this.checkCards()
  }

  checkGameStatus() {
    const { heroesArray } = this.state
    const { checkVictory } = this.props
    const status = heroesArray.every(hero => {
      return hero.discovered
    })
    checkVictory(status)
  }

  checkCards() {
    const { heroesPicked, heroesArray } = this.state

    if (heroesPicked.length < 2) return

    const firstCardKey = heroesPicked[0]
    const secondCardKey = heroesPicked[1]
    const firstCardId = heroesArray[firstCardKey].id
    const secondCardId = heroesArray[secondCardKey].id

    if (firstCardId === secondCardId && firstCardKey !== secondCardKey) {
      const newHeroesArray = heroesArray.map(hero => {
        if (hero.id === firstCardId || hero.id === secondCardId) {
          return { ...hero, discovered: true }
        }
        return hero
      })
      this.setState({ heroesArray: newHeroesArray, heroesPicked: [] })
    }
  }

  render() {
    const { containerStyle, heroesPicked, heroesArray } = this.state
    const { size } = this.props

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

export default Playground