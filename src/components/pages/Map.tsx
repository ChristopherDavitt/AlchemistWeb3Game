import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

import mapImage from '../assets/images/Map.png';
import loadingGif from '../assets/images/LoadingGif.gif'

export const Map = () => {
 
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
    return (
      <>
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
            backgroundImage: `url(${mapImage})`, backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center', width: '100vw',
            height: 'calc(100vh - 70px)', overflow: 'auto',
            }}>
            <div>
                <div style={{
                        position: 'fixed',left: 'calc(50% - 510px)',
                        top: 'calc(50% - 105px)'
                    }} className='map-div'>
                    <Link to="/app/mountains" className='auth'><h2 className='map-h2'>Mountains</h2></Link>
                </div>
                <div  style={{
                        position: 'fixed', left: 'calc(50% - 460px)',
                        top: 'calc(50% + 190px)'
                    }} className='map-div'>
                    <Link to="/app/forest" className='auth'><h2 className='map-h2'>Forest</h2></Link>
                </div>
                <div style={{
                        position: 'fixed', left: 'calc(50% + 310px)',
                        top: 'calc(50% + 170px)'
                    }} className='map-div'>
                    <Link to="/app/ocean" className='auth'><h2 className='map-h2'>Ocean</h2></Link>
                </div>
                <div style={{
                        position: 'fixed',left: 'calc(50% + 340px)',
                        top: 'calc(50% + 20px)'
                    }} className='map-div'>
                    <Link to="/app/swamp" className='auth'><h2 className='map-h2'>Swamp</h2></Link>
                </div>
                <div style={{
                        position: 'fixed', left: 'calc(50% - 30px)',
                        top: 'calc(50% - 240px)'
                    }} className='map-div'>
                    <Link to="/app/tundra" className='auth'><h2 className='map-h2'>Tundra</h2></Link>
                </div>
                <div style={{
                        position: 'fixed',left: 'calc(50% - 170px)',
                        top: 'calc(50%)'
                    }} className='map-div'>
                    <Link to="/app/caves" className='auth'><h2 className='map-h2'>Caves</h2></Link>
                </div>
                <div style={{
                        position: 'fixed',left: 'calc(50% + 80px)',
                        top: 'calc(50% + 140px)'
                    }} className='map-div'>
                    <Link to="/app/house" className='auth'> <h2 className='map-h2'>House</h2></Link>
                </div>
                <div style={{
                        position: 'fixed',
                        left: 'calc(50% - 45px)',
                        top: 'calc(50% + 220px)'
                    }} className='map-div'>
                    
                    <Link to="/app/nursery" className='auth'><h2 className='map-h2'>Nursery</h2></Link>
                </div>
            </div>
         </div>
        
        : 
        
        <div>
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
        
      </>
    )
}
