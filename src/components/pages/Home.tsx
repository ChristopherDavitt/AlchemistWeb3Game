import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import landingGif from '../assets/images/wizardgif.gif'
import title from '../assets/images/title.png'

export default class Home extends Component {
  render() {
    return (
      <>
        <div style={{
              backgroundImage: `url(${landingGif})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: '100vw',
              height: 'calc(100vh - 70px)'         
          }}>
          <div style={{display: 'grid', justifyItems: 'center', gap: '1rem', position: 'sticky', top: 'calc(50% - 200px)'}}>
            <img src={title} alt='title' />
            <div style={{
                display: "grid",
                justifyContent: "center",
                alignContent: "flex-end",
                gap: '0.3rem',
                paddingLeft: '150px',
                margin: 'auto',
                
            }}>
              
              <Link to="/minter" className='auth'>
                <button style={{width: '12em',height: '4.5em'}} className='auth-button'>
                  Mint Your NFT
                </button>
              </Link>
              
              <a href='https://github.com' className='auth'>
                <button style={{width: '12em', height: '4.5em'}} className='auth-button'>
                  Explore The Docs
                </button>
              </a>
              
              <Link to="/app" className='auth'>
                <button style={{width: '12em', height: '4.5em'}} className='auth-button'>
                  Enter App
                </button>
              </Link>
                
            </div>
          </div>
        </div>
      </>
    )
  }
}
