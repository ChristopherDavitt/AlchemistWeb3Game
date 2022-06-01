import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

export const Nursery =()=> {
    const count = useAppSelector((state)=> state.items)
    return (
        <div style={{
            display: 'grid',
            justifyContent: 'center',
            alignItems: 'center',
            }}>
            {/* Background image of a mountain */}
            {/* if on quest Button not clickable */}
            {/* else */}
            
            <h1 style={{color: 'white'}}>Welcome to the Nursery</h1>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr'
            }}>
                <h4 style={{color:'white'}}>Creatures Found: {count}</h4>
            </div>
            <br></br>
            <Link to={'/app'} className='auth'><h3 className='quest-map'>Back to Map {'-->'}</h3></Link>
        </div>
    )
}