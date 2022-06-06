import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import landingGif from '../assets/images/wizardgif.gif'
import title from '../assets/images/title.png'

export default class Home extends Component {
  render() {
    return (
      <div style={{
          display:'grid',
          justifyContent: 'center',
          backgroundImage: `url(${landingGif})`,
          width: '99vw',
          height: 'calc(100vh - 50px)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',          
      }}>
        <img src={title} style={{
          color: 'white',
          justifyContent: 'center',
          display:'grid',
          position: 'absolute',
          top: '100px',
          left: 'calc(50% - 220px)'
      }} />
        <div style={{
            display: "grid",
            justifyContent: "center",
            alignContent: "flex-start",
            gap: '0.5rem',
            position: 'absolute',
            top: '380px',
            left: 'calc(50%)'
            
        }}>
          <Link to="/minter" className='auth'>
            <button className='auth-button'>
              Mint Your NFT
            </button>
          </Link>
          <a href='https://github.com' className='auth'>
            <button className='auth-button'>
              Explore The Docs
            </button>
          </a>
          <Link to="/app" className='auth'>
            <button className='auth-button'>
              Enter App
            </button>
          </Link>
            
        </div>
      </div>
    )
  }
}
