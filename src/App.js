import React, { Component } from 'react';
import HeroCard from './atoms/heroCard'
import getHeroes from './services/getHeroes'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      heroes: [],
      heroesArray: [],
      heroesPicked: { key: null, heroId: 0 },
      heroesDiscovered: new Set()
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
    const heightHeroes = heroes
    .slice(position, position + 8)
    .map(element => {
      return { ...element, picked: false }
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

  pickCard(hero, key) {
    const { heroesPicked, heroesDiscovered } = this.state

    if (heroesDiscovered.has(hero.id)) return this.setState({ heroesPicked: { key: null, id: 0 } })
    if (heroesPicked.key === null) return this.setState({ heroesPicked: { key, id: hero.id } })
    else if (heroesPicked.id === hero.id && heroesPicked.key !== key) {
      heroesDiscovered.add(hero.id)
      return this.setState({ heroesPicked: { key: null, id: 0 }, heroesDiscovered })
    }

    this.setState({ heroesPicked: { key: null, id: 0 } })
  }

  render() {
    const { heroesArray, heroesPicked, heroesDiscovered } = this.state

    return (
      <div className="App">
        {heroesArray.map((hero, key) => {
          const picked = heroesPicked.key === key || heroesDiscovered.has(hero.id)
          return  <HeroCard
            size={200}
            key={key}
            hero={hero}
            picked={picked}
            pickCard={() => this.pickCard(hero, key)}
          />
        })}
      </div>
    );
  }
}

export default App;
