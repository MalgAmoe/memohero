import React, { Component } from 'react';
import Playground from './molecules/playground'
import getHeroes from './services/getHeroes'
import './App.css';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      heroes: {},
      heroesArray: [],
      containerStyle: {
        margin: 'auto',
        height: '100vh',
        width: '100vw',
        padding: 20
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

    const containerSize = (window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth) - 40
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

  render() {
    const { containerStyle, containerSize, heroesArray } = this.state

    return (
      <div className="App" style={containerStyle}>
        <Playground size={containerSize} heroesArray={heroesArray} />
      </div>
    );
  }
}

export default App;
