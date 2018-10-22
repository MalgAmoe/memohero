import React, { Component } from 'react';
import './App.css';
import getHeroes from './services/getHeroes'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      heroes: {}
    }
  }

  componentDidMount() {
    getHeroes()
    .then(heroes => this.setState({ heroes }))
  }

  render() {
    const { heroes } = this.state
    const heroesArray = Object.values(heroes)
    return (
      <div className="App">
        {heroesArray.map(hero => {
          return  <img style={{height: 200, width:200, borderRadius: 50}} key={hero.id} alt={hero.name} src={hero.thumbnail} />
        })}
      </div>
    );
  }
}

export default App;
