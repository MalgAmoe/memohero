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
      heroesPicked: []
    }
  }

  componentDidMount() {
    getHeroes()
    .then(heroes => {
      this.setState({ heroes })
      this.shuffle()
    })
  }

  shuffle() {
    const { heroes } = this.state
    const position = Math.floor(Math.random() * 24)
    const heightHeroes = Object.values(heroes)
    .slice(position, position + 8)
    .map(element => {
      return { ...element, discovered: false }
    })

    let heroesArray = heightHeroes.concat(heightHeroes)

    for (var i = heroesArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = heroesArray[i];
      heroesArray[i] = heroesArray[j];
      heroesArray[j] = temp;
    }

    this.setState({ heroesArray })
  }

  pickCard(key) {
    const { heroesPicked } = this.state
    if (heroesPicked.length > 1) return this.setState({ heroesPicked: [] })
    console.log(heroesPicked[0], key)
    if (heroesPicked.length === 1 && heroesPicked[0] === key) return
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
      this.setState({ heroesArray: newHeroesArray })
    }
  }

  render() {
    const { heroesArray, heroesPicked } = this.state

    return (
      <div className="App">
        {heroesArray.map((hero, key) => {
          const picked = heroesPicked.includes(key) || hero.discovered
          return  <HeroCard
            size={200}
            key={key}
            hero={hero}
            picked={picked}
            pickCard={() => this.pickCard(key)}
          />
        })}
      </div>
    );
  }
}

export default App;
