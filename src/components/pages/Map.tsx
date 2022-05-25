import React, { Component, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import mapImage from '../assets/images/Map.png';

export default class Map extends Component {
  render(){
    return (
      <div style={{
        backgroundImage: `url(${mapImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100vw',
        height: 'calc(100vh - 70px)'
    }}>
        
        <div>
          <div  style={{
                  position: 'fixed',
                  left: 'calc(50% - 510px)',
                  top: 'calc(50% - 130px)'
              }}  className='map-div'>
              
              <Link to="/app/mountains" className='auth'><h2 className='map-h2'>Mountains</h2></Link>
          </div>
          <div  style={{
                  position: 'fixed',
                  left: 'calc(50% - 500px)',
                  top: 'calc(50% + 210px)'
              }} className='map-div'>
              
              <Link to="/app/forest" className='auth'><h2 className='map-h2'>Forest</h2></Link>
          </div>
          <div style={{
                  position: 'fixed',
                  left: 'calc(50% + 340px)',
                  top: 'calc(50% + 190px)'
              }} className='map-div'>
              
              <Link to="/app/ocean" className='auth'><h2 className='map-h2'>Ocean</h2></Link>
          </div>
          <div style={{
                  position: 'fixed',
                  left: 'calc(50% + 390px)',
                  top: 'calc(50% + 20px)'
              }} className='map-div'>
              
              <Link to="/app/swamp" className='auth'><h2 className='map-h2'>Swamp</h2></Link>
          </div>
          <div style={{
                  position: 'fixed',
                  left: 'calc(50% - 30px)',
                  top: 'calc(50% - 260px)'
              }} className='map-div'>
              
              <Link to="/app/tundra" className='auth'><h2 className='map-h2'>Tundra</h2></Link>
          </div>
          <div style={{
                  position: 'fixed',
                  left: 'calc(50% - 190px)',
                  top: 'calc(50%)'
              }} className='map-div'>
              
              <Link to="/app/caves" className='auth'><h2 className='map-h2'>Caves</h2></Link>
          </div>
          <div style={{
                  position: 'fixed',
                  left: 'calc(50% + 80px)',
                  top: 'calc(50% + 160px)'
              }} className='map-div'>
            
              <Link to="/app/house" className='auth'> 
                <h2 className='map-h2'>House</h2>
              </Link>
          </div>
          <div style={{
                  position: 'fixed',
                  left: 'calc(50% - 45px)',
                  top: 'calc(50% + 240px)'
              }} className='map-div'>
              
              <Link to="/app/house" className='auth'><h2 className='map-h2'>Nursery</h2></Link>
          </div>
        </div>
      </div>
    )
  }
}
