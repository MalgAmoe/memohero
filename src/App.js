import React, { Component } from 'react'
import { connect } from 'react-redux'
import Playground from './molecules/playground'
import './App.css'
import * as playgroundActions from './actions/playground'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      victory: false,
      score: 0,
      containerStyle: {
        margin: 'auto',
        height: '100vh',
        width: '100vw',
        padding: 20
      }
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    this.updateDimensions()
    window.addEventListener("resize", () => this.updateDimensions())
    dispatch(playgroundActions.fetchHeroes())
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

  checkVictory(status, score) {
    this.setState({ victory: status, score })
  }

  render() {
    const { containerStyle, containerSize, victory, score } = this.state

    return (
      <div className="App" style={containerStyle}>
        { !victory && <div style={{color:'white'}}>{score}</div> }
        {
          victory ?
          <div style={{color:'white'}}>Yeahhhh {score} points for you</div> :
          <Playground size={containerSize} victory={victory} checkVictory={(status, score) => this.checkVictory(status, score)} />
        }
      </div>
    )
  }
}

const mapStateToProps = ({ playground }) => ({
  score: playground.score,
  victory: playground.victory
})

export default connect(mapStateToProps)(App)
