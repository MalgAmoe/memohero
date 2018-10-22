import React from 'react'

const HeroCard = ({ hero, size, shuffle }) => {
  return (
    <img
      style={{height: size, width: size, borderRadius: Math.round(0.25 * size)}}
      alt={hero.name}
      src={hero.thumbnail}
      onClick={shuffle}
    />
  )
}

export default HeroCard