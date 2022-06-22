import React, { useEffect, useState } from 'react'
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useAppSelector } from '../store/hooks';
import { AlchemyStation }from './AlchemyStation'
import { ItemInventory } from './ItemInventory'
import { PotionInventory } from './PotionInventory'
import PopUp from '../popups/PopUp';

import homeImage9 from '../assets/images/House9.png'
import homeImage8 from '../assets/images/House8.png'
import homeImage7 from '../assets/images/House7.png'
import homeImage6 from '../assets/images/House6.png'
import homeImage5 from '../assets/images/House5.png'

import loadingGif from '../assets/images/LoadingGif.gif';

export default function House() {
    
    const [potions, setPotions] = useState(false)
    const [items, setItems] = useState(false)
    const [alchemy, setAlchemy] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)
    const [mobile, setMobile] = useState(false)
    const [responsiveNum, setResponsiveNum] = useState<number>(9)

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
        setMobile(false);
        if (width > 1000) {
            setResponsiveNum(9);
        }else if (width > 900) {
            setResponsiveNum(8);
        }else if (width > 800) {
            setResponsiveNum(7);
        }else if (width > 700) {
            setResponsiveNum(6);
        }else if (width > 600) {
            setResponsiveNum(5);
        } else {
            setMobile(true);
        }
        setWindowWidth(width);
    }
    const state= useAppSelector((state) => state)
    console.log(state)
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
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
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
                backgroundImage: `url(${responsiveNum == 9 ? homeImage9 :
                    responsiveNum == 8 ? homeImage8 :
                    responsiveNum == 7 ? homeImage7 :
                    responsiveNum == 6 ? homeImage6 :
                    responsiveNum == 5 ? homeImage5 : null
                })`,
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
                    left: `calc(50% - (565px * (${responsiveNum}/10)))`,
                    top: `calc(50% + (8px * (${responsiveNum}/10)))`
                }} className='house-div'>
                    <h4 onClick={handleAlchemyToggle} className='map-h4'>Alchemy Table</h4>
                </div>
                <div style={{
                    position: 'fixed',
                    left: `calc(50% - (10px* (${responsiveNum}/10)))`,
                    top: `calc(50% - (85px* (${responsiveNum}/10)))`
                }} className='house-div'>
                    <h4 onClick={handlePotionToggle} className='map-h4'>Potion Inventory</h4>
                </div>
                <div style={{
                    position: 'fixed',
                    left: `calc(50% + (285px * (${responsiveNum}/10)))`,
                    top: `calc(50% + (50px * (${responsiveNum}/10)))`
                }} className='house-div'>
                    <h4 onClick={handleItemToggle} className='map-h4'>Item Inventory</h4>
                </div>
                <div style={{
                    position: 'absolute',
                    left: `calc(50% - (210px * (${responsiveNum}/10)))`,
                    top: `calc(50% - (40px * (${responsiveNum}/10)))`
                }} className='house-div'>
                    <Link to="/app" className='auth'><h4 className='map-h4'>Map</h4></Link>
                </div>
            </div> 
            
            : mobile ? 
           
            <div style={{position: 'sticky', top: 'calc(50% - 325px)'}}>
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
             
        </motion.div>
    )
}
