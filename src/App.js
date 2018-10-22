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
    const heroesIds = Object.keys(heroes)
    let heroesArray = heroesIds.concat(heroesIds)

    for (var i = heroesArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = heroesArray[i];
      heroesArray[i] = heroesArray[j];
      heroesArray[j] = temp;
    }
    this.setState({ heroesArray })
  }

  pickCard(heroId, key) {
    const { heroesPicked, heroesDiscovered } = this.state

    if (heroesDiscovered.has(heroId)) return this.setState({ heroesPicked: { key: null, id: 0 } })
    if (heroesPicked.key === null) return this.setState({ heroesPicked: { key, heroId } })
    else if (heroesPicked.heroId === heroId && heroesPicked.key !== key) {
      heroesDiscovered.add(heroId)
      return this.setState({ heroesPicked: { key: null, id: 0 }, heroesDiscovered })
    }
    this.setState({ heroesPicked: { key: null, id: 0 } })
  }

  render() {
    const { heroesArray, heroes, heroesPicked, heroesDiscovered } = this.state

    return (
      <div className="App">
        {heroesArray.map((heroId, key) => {
          const hero = heroes[heroId]
          const picked = heroesPicked.key === key
          const discovered = heroesDiscovered.has(heroId)
          return  <HeroCard
            size={200}
            key={key}
            hero={hero}
            picked={picked}
            discovered={discovered}
            pickCard={() => this.pickCard(heroId, key)}
          />
        })}
      </div>
    );
  }
}

export default App;
