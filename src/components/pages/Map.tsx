import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { motion } from 'framer-motion';

import mapImage from '../assets/images/Map9.png';

import loadingGif from '../assets/images/LoadingGif.gif'

export const Map = () => {
 
    const [windowWidth, setWindowWidth] = useState(0)
    const [mobile, setMobile] = useState(false)

    const loading = useAppSelector((state) => state.loading)
    const connected = useAppSelector((state) => state.connected)
    const [responsiveNum, setResponsiveNum] = useState<number>(9)
    
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
    return (
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
      >
        { !connected ? 

        <div style={{width: '100%', height: '80vh', display: 'grid', 
                    justifyContent: 'center', alignItems: 'center'}}>
            <p>connect Wallet</p>
        </div> 
        
        : loading ? 
        
        <div style={{width: '100%', height: '80vh', display: 'grid', 
                    justifyItems: 'center',alignContent: 'center', margin: 0}}>
            <p>Loading ...</p>
            <img src={loadingGif} alt="loading-gif" />
        </div>
            
        : !mobile ? 
      
        <div style={{
            backgroundImage: `url(${mapImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${responsiveNum == 9 ? '1152px' :
                                responsiveNum == 8 ? '1024px' :
                                responsiveNum == 7 ? '896px' :
                                responsiveNum == 6 ? '768px' :
                                responsiveNum == 5 ? '640px' : null}`,
            backgroundPosition: 'center', width: '100vw',
            height: 'calc(100vh - 70px)', overflow: 'auto',
            }}>
            <div>
                <div style={{
                        position: 'fixed',left: `calc(50% - ((510px * (${responsiveNum}/10)))`,
                        top: `calc(50% - (105px * (${responsiveNum}/10)))`
                    }} className='map-div'>
                    <Link to="/app/mountains" className='auth'><h2 className='map-h2'>Mountains</h2></Link>
                </div>
                <div  style={{
                        position: 'fixed', left: `calc(50% - (460px * (${responsiveNum}/10)))`,
                        top: `calc(50% + (190px* (${responsiveNum}/10)))`
                    }} className='map-div'>
                    <Link to="/app/forest" className='auth'><h2 className='map-h2'>Forest</h2></Link>
                </div>
                <div style={{
                        position: 'fixed', left: `calc(50% + (310px* (${responsiveNum}/10)))`,
                        top: `calc(50% + (170px* (${responsiveNum}/10)))`
                    }} className='map-div'>
                    <Link to="/app/ocean" className='auth'><h2 className='map-h2'>Ocean</h2></Link>
                </div>
                <div style={{
                        position: 'fixed',left: `calc(50% + (340px* (${responsiveNum}/10)))`,
                        top: `calc(50% + (20px* (${responsiveNum}/10)))`
                    }} className='map-div'>
                    <Link to="/app/swamp" className='auth'><h2 className='map-h2'>Swamp</h2></Link>
                </div>
                <div style={{
                        position: 'fixed', left: `calc(50% - (30px* (${responsiveNum}/10)))`,
                        top: `calc(50% - (240px* (${responsiveNum}/10)))`
                    }} className='map-div'>
                    <Link to="/app/tundra" className='auth'><h2 className='map-h2'>Tundra</h2></Link>
                </div>
                <div style={{
                        position: 'fixed',left: `calc(50% - (170px* (${responsiveNum}/10)))`,
                        top: `calc(50% )`
                    }} className='map-div'>
                    <Link to="/app/caves" className='auth'><h2 className='map-h2'>Caves</h2></Link>
                </div>
                <div style={{
                        position: 'fixed',left: `calc(50% + (80px* (${responsiveNum}/10)))`,
                        top: `calc(50% + (140px* (${responsiveNum}/10)))`
                    }} className='map-div'>
                    <Link to="/app/house" className='auth'> <h2 className='map-h2'>House</h2></Link>
                </div>
                <div style={{
                        position: 'fixed',
                        left: `calc(50% - (45px* (${responsiveNum}/10)))`,
                        top: `calc(50% + (220px* (${responsiveNum}/10)))`
                    }} className='map-div'>
                    
                    <Link to="/app/nursery" className='auth'><h2 className='map-h2'>Nursery</h2></Link>
                </div>
            </div>
         </div>
        
        : 
       
        <div style={{position: 'sticky', top: 'calc(50% - 325px)'}}>
            <div style={{display: 'flex'}}>
                <Link to="/app/mountains" className='auth'><h2 className='map-h2'>Mountains</h2></Link>  
            </div>
            <div style={{display: 'flex'}}>
            <Link to="/app/forest" className='auth'><h2 className='map-h2'>Forest</h2></Link>
            </div>
            <div style={{display: 'flex'}}>
            <Link to="/app/ocean" className='auth'><h2 className='map-h2'>Ocean</h2></Link>
            </div>
            <div style={{display: 'flex'}}>
            <Link to="/app/tundra" className='auth'><h2 className='map-h2'>Tundra</h2></Link>  
            </div>
            <div style={{display: 'flex'}}>
            <Link to="/app/swamp" className='auth'><h2 className='map-h2'>Swamp</h2></Link>  
            </div>
            <div style={{display: 'flex'}}>
            <Link to="/app/caves" className='auth'><h2 className='map-h2'>Caves</h2></Link> 
            </div>
            <div style={{display: 'flex'}}>
            <Link to="/app/house" className='auth'> <h2 className='map-h2'>House</h2></Link> 
            </div>
            <div style={{display: 'flex'}}>
            <Link to="/app/nursery" className='auth'><h2 className='map-h2'>Nursery</h2></Link>
            </div>
        </div>}
        
      </motion.div>
    )
}
