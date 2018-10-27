import React, { Component } from 'react';
import Playground from './molecules/playground'
import getHeroes from './services/getHeroes'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      heroes: {},
      victory: false,
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
      })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.updateDimensions())
  }

  updateDimensions() {
    const { containerStyle } = this.state
    const containerSize = Math.max(window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth, 300) - 40
    const newContainerStyle = { ...containerStyle, width: containerSize, height: containerSize }
    this.setState({ containerStyle: newContainerStyle, containerSize})
  }

  checkVictory(status) {
    status && this.setState({ victory: status })
  }

  render() {
    const { containerStyle, containerSize, heroes, victory } = this.state

    return (
      <div className="App" style={containerStyle}>
        {
          victory ?
          <div style={{color:'white'}}>Yeahhhh</div> :
          <Playground size={containerSize} heroes={heroes} victory={victory} checkVictory={(status) => this.checkVictory(status)} />
        }
      </div>
    );
  }
}

export default App;
