import React, { Component, useState } from 'react'
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import homeImage from '../assets/images/House.png'
import { AlchemyStation }from '../houseStuff/AlchemyStation'
import { ItemInventory } from '../houseStuff/ItemInventory'
import { PotionInventory } from '../houseStuff/PotionInventory'

export const House = () => {
    
    const [potions, setPotions] = useState(false)
    const [items, setItems] = useState(false)

    const handleItemToggle = () => {
        const bool = items
        setPotions(false)
        setItems(!bool)
    }

    const handlePotionToggle = () => {
        const bool = potions
        setItems(false)
        setPotions(!bool)
    }


    
    return (
        
        <div style={{
            backgroundImage: `url(${homeImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100vw',
            height: 'calc(100vh - 70px)'
        }}>
            { potions ? <><button style={{position: 'fixed',
                                        border: 'solid 2px black',
                                        backgroundColor: 'black',
                                        color: 'white',
                                        cursor: 'pointer',
                                        top: 'calc(50% - 200px)',
                                        left: 'calc(50% + 265px)',
                                        fontSize: '24px',
                                        zIndex: '1000'}} onClick={handlePotionToggle}>X</button><PotionInventory /></> : null }
            { items ? <><button style={{position: 'fixed',
                                        border: 'solid 2px black',
                                        backgroundColor: 'black',
                                        color: 'white',
                                        cursor: 'pointer',
                                        top: 'calc(50% - 200px)',
                                        left: 'calc(50% + 265px)',
                                        fontSize: '24px',
                                        zIndex: '1000'}} onClick={handleItemToggle}>X</button><ItemInventory /></> : null }
            <div style={{
                position: 'fixed',
                left: 'calc(50% - 575px)',
                top: 'calc(50% + 8px)'
            }} className='house-div'>
                <Link to="/app/house/alchemy-table" className='auth'><h4 className='map-h4'>Alchemy Table</h4></Link>
            </div>
            <div style={{
                position: 'fixed',
                left: 'calc(50%)',
                top: 'calc(50% - 90px)'
            }} className='house-div'>
                <h4 onClick={handlePotionToggle} className='map-h4'>Potion Inventory</h4>
            </div>
            <div style={{
                position: 'fixed',
                left: 'calc(50% + 310px)',
                top: 'calc(50% + 50px)'
            }} className='house-div'>
                <h4 onClick={handleItemToggle} className='map-h4'>Item Inventory</h4>
            </div>
            <div style={{
                position: 'fixed',
                left: 'calc(50% - 205px)',
                top: 'calc(50% - 40px)'
            }} className='house-div'>
                <Link to="/app" className='auth'><h4 className='map-h4'>Map</h4></Link>
            </div>
        </div>
    )
}
