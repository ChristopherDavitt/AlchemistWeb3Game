import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import landingGif from '../assets/images/wizardgif.gif'
export default class Home extends Component {
  render() {
    return (
      <div style={{
          display:'grid',
          backgroundImage: `url(${landingGif})`,
          width: '100vw',
          height: '100vh',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',          
      }}>
        <h1 style={{
          color: 'white',
          textAlign: 'center',
          alignContent:'center',
          display:'grid'
      }}>The Alchemist</h1>
        <div style={{
            display: "grid",
            justifyContent: "center",
            alignContent: "flex-start",
            gap: '0.5rem'
            
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
