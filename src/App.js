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
    const containerSize = Math.max(window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth, 250) - 40
    const newContainerStyle = { ...containerStyle, width: containerSize, height: containerSize }
    this.setState({ containerStyle: newContainerStyle, containerSize})
  }

  restartGame() {
    const { dispatch } = this.props
    dispatch(playgroundActions.shuffleHeroes())
  }

  render() {
    const { containerStyle, containerSize } = this.state
    const { victory, score, loading } = this.props
    return (
      <div className="App" style={containerStyle}>
        { (!victory && !loading) && <div style={{color:'white', fontSize: '2em', marginTop: -20}}>Score: {score}</div> }
        {
          victory ?
          <div
            style={{color:'white', fontSize: '3em', cursor: 'pointer'}}
            onClick={() => this.restartGame()}
          >Yeahhhh {score} points for you, click to retry
          </div> :
          <Playground size={containerSize} />
        }
      </div>
    )
  }
}

const mapStateToProps = ({ playground }) => ({
  score: playground.score,
  victory: playground.victory,
  loading: playground.loading
})

export default connect(mapStateToProps)(App)
