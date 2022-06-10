import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { creature1Address } from '../assets/contractAddresses/contractAddresses';
import { useAppSelector } from '../store/hooks';

export const Nursery =()=> {

    const creatureDict = [
        "Ghiblun", "Hoppunny", "Pluckinerr", "Flux", // Forest
        "Dirtruk", "Juepl", "Ghree", "Lundkrid", "Hazurk", // Forest
        "Gratur", "Phoog", "Skitt", "Swupix", "Caplin", "Crugley", // Swamp
        "Ingk", "Tuk", "Stagbu", "Creighb", "Ghoyster", "Ghoster", "Bol",  // Ocean
        "Turple", "Rainbo", "Blupper",                                    // Ocean
        "Furbat", "Geopul", "Crawk", "Mander", "Plubite", "Troglogbite", "Atelig", // Cave
        "Gohot", "Asgred", "Snuphex", "Cyl", "Hram", "Flutter",                     // Mtn
        "Icegol", "Lyr", "Engui", "Pubear", "Snuphex", "Walrax", "Moog", "Sussky"   // Tundra
    ]

    const count = useAppSelector((state)=> state.creatures)

    return (
        <div style={{
            display: 'grid',
            justifyContent: 'center',
            alignItems: 'center',
            }}>
            
            <h1 style={{color: 'white', textAlign: 'center'}}>Welcome to the Nursery</h1>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 3fr',
                gap: '0.5rem'
                }}>
                <div className='creature-sidebar' style={{border: 'solid 2px white', height: '400px'}}>
                    {count.map((value: number, index: number) => 
                    // On click here, change state variables to pass through into the creatureBio
                        <div style={{display: 'flex', color: 'white', justifyContent: 'space-between', border: 'solid 1px grey', padding: '0.5rem' }}>
                            <h6>{creatureDict[index]} </h6>
                            <h6>#{index + 1}</h6>
                        </div>
                    )}
                </div>
                
                <div className='creature-bio' style={{border: 'solid 2px white', height: '400px', display: 'grid', justifyItems: 'center',  }} >
                        
                    <h4>Ghiblun</h4>
                    <img src='https://via.placeholder.com/150' alt='creature-image' />
                    
                    <div style={{width: '500px'}}>
                        <p style={{fontSize: '12px'}}>Description: This is a description of the creature </p>
                    </div>
                </div>
                
            </div>
            <br></br>
            <Link to={'/app'} className='auth'><h3 className='quest-map'>Back to Map {'-->'}</h3></Link>
        </div>
    )
}