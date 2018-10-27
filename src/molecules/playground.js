import React from 'react'
import HeroCard from '../atoms/heroCard'

class Playground extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      heroesPicked: [],
      containerStyle: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: 'auto',
        height: '100%',
        width: '100%'
      }
    }
  }

  pickCard(key) {
    const { heroesPicked } = this.state
    const { heroesArray } = this.props

    if (heroesPicked.length > 1) return this.setState({ heroesPicked: [] })
    if ((heroesPicked.length === 1 && heroesPicked[0] === key) || heroesArray[key].discovered) return

    heroesPicked.push(key)
    this.setState({ heroesPicked })
    this.checkCards()
  }

  checkCards() {
    const { heroesPicked } = this.state
    const { heroesArray } = this.props

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
    const { containerStyle, heroesPicked } = this.state
    const { heroesArray, size } = this.props

    return(
      <div style={containerStyle}>
        {heroesArray.map((hero, key) => {
          const picked = heroesPicked.includes(key) || hero.discovered
          return  <HeroCard
            size={size * 0.25}
            key={key}
            hero={hero}
            picked={picked}
            pickCard={() => this.pickCard(key)}
          />
        })}
      </div>
    )
  }
}

export default Playground