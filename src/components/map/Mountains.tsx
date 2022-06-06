import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

export const Mountains = () => {
    const nftCount = useAppSelector((state) => state.nftStaked)
    const potionCount = useAppSelector((state) => state.potions)

    return (
        <div style={{
            display: 'grid',
            justifyContent: 'center',
            alignItems: 'center',
            }}>
            {/* Background image of a mountain */}
            {/* if on quest Button not clickable */}
            {/* else */}
            
            <h1 style={{color: 'white'}}>Hike the Mountains</h1>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr'
            }}>
                <h4 style={{color:'white'}}>NFT Staked: </h4>
                <h4 style={{color:'white'}}>Potion Staked: </h4>
                <button>Stake NFT</button>
                <button>Stake Potion</button>
            </div>
            <br></br>
            <Link to={'/app'} className='auth'><h3 className='quest-map'>Back to Map {'-->'}</h3></Link>
        </div>
    )
}
