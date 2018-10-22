import React, { Component } from 'react';
import './App.css';
import getHeroes from './services/getHeroes'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      heroes: {},
      heroesArray: []
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

  render() {
    const { heroesArray, heroes } = this.state
    return (
      <div className="App">
        {heroesArray.map((heroId, key) => {
          const hero = heroes[heroId]
          return  <img
            style={{height: 200, width:200, borderRadius: 50}}
            key={key}
            alt={hero.name}
            src={hero.thumbnail}
            onClick={() => this.shuffle()}
          />
        })}
      </div>
    );
  }
}

export default App;
