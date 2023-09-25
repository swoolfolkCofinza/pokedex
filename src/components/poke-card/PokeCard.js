import React from 'react';

import './PokeCard.css';

function PokeCard({data, onClick}) {

    const {name, id, sprites, types} = data;
    const image = sprites.front_default;

    const colorTypes = types.map(type => {
        return getComputedStyle(document.body).getPropertyValue('--'+type.type.name);
    });

    return (
        <li className='poke-card' style={{backgroundImage: 'linear-gradient(to right, ' + (colorTypes.length > 1 ? colorTypes.join(', ') : colorTypes[0] + ', ' + colorTypes[0]) + ')'}} onClick={onClick}>
            <div className='white-cover'>
                <h1>{name}</h1>
                <h2>N° {id}</h2>
                <img src={image} alt='' />
            </div>
        </li>
    )
}

export default PokeCard