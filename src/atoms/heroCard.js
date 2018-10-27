import React from 'react'

const HeroCard = ({ hero, size, pickCard, picked, discovered }) => {
  const style = {
    height: size,
    width: size,
    borderRadius: Math.round(0.25 * size),
    cursor: 'pointer',
    opacity: discovered ? 0.67 : 1
  }

  const img = new Image()
  img.src = hero.thumbnail

  return (
    <img
      style={style}
      alt={hero.name}
      src={picked || discovered ? img.src : 'https://vignette.wikia.nocookie.net/callofduty/images/4/48/Evil_smiley_face.jpg/revision/latest?cb=20100921012126' }
      onClick={pickCard}
    />
)
}

export default HeroCard