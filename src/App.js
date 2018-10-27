import React, { Component } from 'react';
import HeroCard from './atoms/heroCard'
import getHeroes from './services/getHeroes'
import './App.css';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      heroes: {},
      heroesArray: [],
      heroesPicked: [],
      containerStyle: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: 'auto'
      }
    }
  }

  componentWillMount() {
    this.updateDimensions()
    window.addEventListener("resize", () => this.updateDimensions())
    getHeroes()
      .then(heroes => {
        this.setState({ heroes })
        this.getHeroesPlayground()
      })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.updateDimensions())
  }

  updateDimensions() {
    const { containerStyle } = this.state
    const containerSize = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth
    const newContainerStyle = { ...containerStyle, width: containerSize, height: containerSize }
    this.setState({ containerStyle: newContainerStyle, containerSize})
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

  getHeroesPlayground() {
    const { heroes } = this.state

    const heightHeroes = this.shuffleArray(Object.values(heroes))
      .slice(0, 8)
      .map(element => {
        return { ...element, discovered: false }
      })

    let heroesArray = this.shuffleArray(heightHeroes.concat(heightHeroes))

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
    const { heroesArray, heroesPicked, containerStyle, containerSize } = this.state

    return (
      <div className="App">
        <div style={containerStyle}>
          {heroesArray.map((hero, key) => {
            const picked = heroesPicked.includes(key) || hero.discovered
            return  <HeroCard
              size={containerSize * 0.25}
              key={key}
              hero={hero}
              picked={picked}
              pickCard={() => this.pickCard(key)}
            />
          })}
        </div>
      </div>
    );
  }
}

export default App;
