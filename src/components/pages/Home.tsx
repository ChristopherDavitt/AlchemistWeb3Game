import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import landingGif from '../assets/images/wizardgif.gif';
import title from '../assets/images/title.png';

export default function Home () {

  const [mobile, setMobile] = useState(false)
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
  }

 
    return (
      <motion.div 
      initial={{opacity: 0}}
      animate={{opacity: 1}}>
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
              <Link to="/lore" className='auth'>
                <button style={{width: '12em', height: '4.5em'}} className='auth-button'>
                  Lore
                </button>
              </Link>
              
              <Link to="/minter" className='auth'>
                <button style={{width: '12em',height: '4.5em'}} className='auth-button'>
                  Mint NFT
                </button>
              </Link>
              
              <Link to="/app" className='auth'>
                <button style={{width: '12em', height: '4.5em'}} className='auth-button'>
                  Enter App
                </button>
              </Link>
                
            </div>
          </div>
        </div>
      </motion.div>
    )
}
