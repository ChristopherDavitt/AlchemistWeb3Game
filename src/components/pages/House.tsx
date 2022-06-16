import React, { useEffect, useState } from 'react'
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { useAppSelector } from '../store/hooks';
import { AlchemyStation }from './AlchemyStation'
import { ItemInventory } from '../popups/ItemInventory'
import { PotionInventory } from '../popups/PotionInventory'
import PopUp from '../popups/PopUp';

import homeImage from '../assets/images/House.png'
import loadingGif from '../assets/images/LoadingGif.gif';

export default function House() {
    
    const [potions, setPotions] = useState(false)
    const [items, setItems] = useState(false)
    const [alchemy, setAlchemy] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)
    const [mobile, setMobile] = useState(false)

    const loading = useAppSelector((state) => state.loading)
    const connected = useAppSelector((state) => state.connected)

    
    useEffect(() => {
        updateDimensions();
        
        window.addEventListener("resize", updateDimensions);
        return () => 
            window.removeEventListener("resize",updateDimensions);
    }, [])

    const updateDimensions = () => {
        const width = window.innerWidth
        if (width < 850) {
            setMobile(true)
        } else {
            setMobile(false)
        }
        setWindowWidth(width)
    }

    const handleItemToggle = () => {
        const bool = items
        setPotions(false)
        setAlchemy(false)
        setItems(!bool)
    }

    const handlePotionToggle = () => {
        const bool = potions
        setItems(false)
        setAlchemy(false)
        setPotions(!bool)
    }

    const handleAlchemyToggle = () => {
        const bool = alchemy
        setItems(false)
        setPotions(false)
        setAlchemy(!bool)
    }
    
    return (
        <>
            {!connected ? 
            
            <div style={{width: '100%', height: '80vh', display: 'grid', 
                        justifyContent: 'center', alignItems: 'center'}}>
                <p>connect Wallet</p>
            </div> 
            
            : loading ?

            <div style={{width: '100%', height: '80vh', display: 'grid', 
                         justifyItems: 'center', alignContent: 'center', margin: 0}}>
                <p>Loading ...</p>
                <img src={loadingGif} alt="loading-gif" />
            </div> 
            
            : !mobile ? 

            <div style={{
                backgroundImage: `url(${homeImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100vw',
                height: 'calc(100vh - 70px)'
            }}>
                { potions && <PopUp handleClose={handlePotionToggle} content={<PotionInventory />} /> }
                { items && <PopUp handleClose={handleItemToggle} content={<ItemInventory />} /> }
                { alchemy && <PopUp handleClose={handleAlchemyToggle} content={<AlchemyStation />} /> }
                
                <div style={{
                    position: 'fixed',
                    left: 'calc(50% - 535px)',
                    top: 'calc(50% + 8px)'
                }} className='house-div'>
                    <h4 onClick={handleAlchemyToggle} className='map-h4'>Alchemy Table</h4>
                </div>
                <div style={{
                    position: 'fixed',
                    left: 'calc(50% - 10px)',
                    top: 'calc(50% - 85px)'
                }} className='house-div'>
                    <h4 onClick={handlePotionToggle} className='map-h4'>Potion Inventory</h4>
                </div>
                <div style={{
                    position: 'fixed',
                    left: 'calc(50% + 260px)',
                    top: 'calc(50% + 50px)'
                }} className='house-div'>
                    <h4 onClick={handleItemToggle} className='map-h4'>Item Inventory</h4>
                </div>
                <div style={{
                    position: 'absolute',
                    left: 'calc(50% - 190px)',
                    top: 'calc(50% - 40px)'
                }} className='house-div'>
                    <Link to="/app" className='auth'><h4 className='map-h4'>Map</h4></Link>
                </div>
            </div> 
            
            : mobile ? 
            
            <div>
                { potions && <PopUp handleClose={handlePotionToggle} content={<PotionInventory />} /> }
                { items && <PopUp handleClose={handleItemToggle} content={<ItemInventory />} /> }
                { alchemy && <PopUp handleClose={handleAlchemyToggle} content={<AlchemyStation />} /> }
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <h4 onClick={handleAlchemyToggle} className='map-h4'>Alchemy Table</h4>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <h4 onClick={handlePotionToggle} className='map-h4'>Potion Inventory</h4>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <h4 onClick={handleItemToggle} className='map-h4'>Item Inventory</h4>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <Link to="/app" className='auth'><h4 className='map-h4'>Map</h4></Link>
                </div>
            </div> 
            
            :
            
            <p>Refresh Page</p>}
             
        </>
    )
}
