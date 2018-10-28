import React from 'react'
import { connect } from 'react-redux'
import HeroCard from '../atoms/heroCard'
import * as playgroundActions from '../actions/playground'

class Playground extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      containerStyle: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: 'auto',
        height: '100%',
        width: '100%'
      }
    }
  }

  pickCard(key) {
    const { dispatch } = this.props
    dispatch(playgroundActions.pickCard(key))
  }

  render() {
    const { containerStyle } = this.state
    const { size, heroesArray, heroesPicked } = this.props
    return(
      <div style={containerStyle}>
        {heroesArray.map((hero, key) => {
          const picked = heroesPicked.includes(key)
          const discovered = hero.discovered
          return  <HeroCard
            size={size * 0.25}
            key={key}
            hero={hero}
            picked={picked}
            discovered={discovered}
            pickCard={() => this.pickCard(key)}
          />
        })}
      </div>
    )
  }
}

const mapStateToProps = ({ playground }) => ({
  heroes: playground.heroes,
  heroesArray: playground.heroesArray,
  heroesPicked: playground.heroesPicked
})

export default connect(mapStateToProps)(Playground)