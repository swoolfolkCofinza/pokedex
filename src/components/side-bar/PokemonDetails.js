import React from 'react'

import './PokemonDetails.css';

function PokemonDetails({open, data}) {

  if(data === undefined) return <div />

  const {name, id, sprites, types, height, weight, abilities, stats} = data;
  const image = sprites.other['official-artwork'].front_default;

  const colorTypes = types.map(type => {
      return getComputedStyle(document.body).getPropertyValue('--'+type.type.name);
  });

  return (
    <div className={'pokemon-details ' + (!open ? ' closed' : '')}>
      <div className='background-gradient' style={{backgroundImage: 'linear-gradient(to bottom, ' + (colorTypes.length > 1 ? colorTypes.join(', ') : colorTypes[0] + ', ' + colorTypes[0]) + ')'}} />
      <div className='general'>
        <div>
          <h1>{name}</h1>
            {
              <h2>{types.map(type => type.type.name).join(' / ')}</h2>
            }
        </div>
        <img src={image} alt={name} />
      </div>
      <div className='info' style={{borderColor: colorTypes[0], color: colorTypes[0]}}>
        <div className='general-info'>
          <h4>Height</h4>
          <h3>{height * 10} cm</h3>
          <h4>Weight</h4>
          <h3>{(weight * 0.1).toFixed(1)} Kg</h3>
          <h4>Index</h4>
          <h3>{id.toString().padStart(3, '0')}</h3>
          <h4>Ability</h4>
          <h3>{abilities[0].ability.name}</h3>
        </div>
        <div className='stats'>
          {
            stats.map((stat, index) => (
              <StateContainer name={stat.stat.name} value={stat.base_stat} key={index} color={colorTypes[0]} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

function StateContainer({name, value, color}){

  return(
    <div className='stat-container'>
      <p>{name}</p>
      <div className='stat-background'>
        <div className='stat-fill' style={{backgroundImage: 'linear-gradient(to right, ' + color + '55, ' + color + ')', width: value+'%' }} />
      </div>
    </div>
  )
}

export default PokemonDetails;