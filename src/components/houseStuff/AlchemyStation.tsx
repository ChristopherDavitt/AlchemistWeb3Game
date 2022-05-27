import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

export const AlchemyStation = () => {
    const count = useAppSelector((state) => state)
    return (
        <div style={{
            display: 'grid',
            justifyContent: 'center',
            alignItems: 'center',
            }}>
            {/* Background image of a mountain */}
            {/* if on quest Button not clickable */}
            {/* else */}
            
            <h1 style={{color: 'white', textAlign: 'center'}}>Recipe Book</h1>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr'
            }}>
              <p style={{color:'white'}}>The Plan is to map through a recipe book stored in a database, then check to see if
                the redux store has the items necessary to brew a potion. If so, it will be clickable to 
                trigger a Contract Interaction that will require the ERC-20 tokens to be in the wallet.
              </p>
                {/* Map through Recipe Book */}
            </div>

            <Link to={'/app/house'} className='auth'><h3 className='quest-map'>Back to House {'-->'}</h3></Link>
        </div>
    )
}