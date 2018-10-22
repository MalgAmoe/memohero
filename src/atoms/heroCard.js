import React from 'react'

const HeroCard = ({ hero, size, pickCard, picked, discovered }) => {
  const style = {
    height: size,
    width: size,
    borderRadius: Math.round(0.25 * size),
    opacity: discovered ? 0 : 1
  }
  return (
    <img
      style={style}
      alt={hero.name}
      src={picked ? hero.thumbnail : 'https://vignette.wikia.nocookie.net/callofduty/images/4/48/Evil_smiley_face.jpg/revision/latest?cb=20100921012126' }
      onClick={pickCard}
    />
)
}

export default HeroCard