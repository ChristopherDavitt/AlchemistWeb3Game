import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useAppSelector } from '../store/hooks';
import { AlchemyStation }from './AlchemyStation'
import { Inventory } from './Inventory'
import PopUp from '../popups/PopUp';
import { MobileCard, MobileCardNoLink } from '../sharedComponents/SharedComponents';

import homeImage9 from '../assets/images/House9.png'

import door from '../assets/images/Door.png';
import bookshelf from '../assets/images/Bookshelf.png';
import table from '../assets/images/Table.png';
import chest from '../assets/images/Chest.png';

import loadingGif from '../assets/images/LoadingGif.gif';

export default function House() {
    
    const [potions, setPotions] = useState(false)
    const [items, setItems] = useState(false)
    const [alchemy, setAlchemy] = useState(false)
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
    }
    const state= useAppSelector((state) => state)
    
    const handleItemToggle = () => {
        setItems(!items)
    }

    const handlePotionToggle = () => {
        setPotions(!potions)
    }

    const handleAlchemyToggle = () => {
        setAlchemy(!alchemy)
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
                backgroundImage: `url(${homeImage9})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: `${responsiveNum == 9 ? '1152px' :
                    responsiveNum == 8 ? '1024px' :
                    responsiveNum == 7 ? '896px' :
                    responsiveNum == 6 ? '768px' :
                    responsiveNum == 5 ? '640px' : null}`,
                backgroundPosition: 'center',
                width: '100vw',
                height: 'calc(100vh - 70px)'
            }}>
                { potions && <PopUp handleClose={handlePotionToggle} content={<Inventory inventoryType='Potion'  />} /> }
                { items && <PopUp handleClose={handleItemToggle} content={<Inventory inventoryType='Item' />} /> }
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
           
            <div style={{display: 'grid', justifyItems: 'center', position: 'sticky', top: 'calc(50% - 325px)'}}>
                { potions && <PopUp handleClose={handlePotionToggle} content={<Inventory inventoryType='Potion' />} /> }
                { items && <PopUp handleClose={handleItemToggle} content={<Inventory inventoryType='Item' />} /> }
                { alchemy && <PopUp handleClose={handleAlchemyToggle} content={<AlchemyStation />} /> }
                <MobileCardNoLink handleClick={handlePotionToggle} name='Potions' image={bookshelf} />
                <MobileCardNoLink handleClick={handleItemToggle} name='Items' image={chest} />
                <MobileCardNoLink handleClick={handleAlchemyToggle} name='Table' image={table} />
                <MobileCard path='/app' name='Map' image={door} />
            </div> 
            :
            
            <p>Refresh Page</p>}
             
        </motion.div>
    )
}
