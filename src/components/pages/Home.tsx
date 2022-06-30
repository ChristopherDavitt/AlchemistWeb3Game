import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import landingGif from '../assets/images/wizardgif.gif';
import title from '../assets/images/title.png';
import mobileHome from '../assets/images/mobileHome.png';

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
      if (width > 1000) {
        setResponsiveNum(9);
        setMobile(false);
      }else if (width > 900) {
        setResponsiveNum(8);
        setMobile(false);
      }else if (width > 800) {
        setResponsiveNum(7);
        setMobile(false);
      }else if (width > 700) {
        setResponsiveNum(6);
        setMobile(false);
      }else if (width > 600) {
        setResponsiveNum(5);
        setMobile(false);
      } else {
        setMobile(true);
      }
  }

 
    return (
      <>
        {mobile ? 
        
        <div style={{width: '100vw', height: 'calc(100vh - 48px)',display: 'flex',
                  flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 'auto'}}>
          <img style={{width: '100vw', margin: '1rem auto'}} src={title} alt='title' />
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
            <img src={mobileHome} alt='mobile-home' />
            <div style={{ display: 'block', width: '160px'}}>
              <Link style={{margin: '1rem 0'}} to="/lore" className='auth'>
                <button style={{width: '44vw', height: '15vw', maxWidth:'12em', maxHeight: '4.5em'}} className='auth-button'>
                  Lore
                </button>
              </Link>
              
              <Link style={{margin: '1rem 0'}} to="/minter" className='auth'>
                <button style={{width: '44vw', height: '15vw', maxWidth:'12em', maxHeight: '4.5em'}} className='auth-button'>
                  Mint NFT
                </button>
              </Link>
              
              <Link style={{margin: '1rem 0'}} to="/app" className='auth'>
                <button style={{width: '44vw', height: '15vw', maxWidth:'12em', maxHeight: '4.5em'}} className='auth-button'>
                  Enter App
                </button>
              </Link>
            </div>
          </div>
         
        </div>

        :

        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}>
          <div style={{
                backgroundImage: `url(${landingGif})`,
                backgroundSize: `${responsiveNum == 9 ? '1152px' :
                responsiveNum == 8 ? '1024px' :
                responsiveNum == 7 ? '896px' :
                responsiveNum == 6 ? '768px' :
                responsiveNum == 5 ? '640px' : null}`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100vw',
                height: 'calc(100vh - 70px)'         
            }}>
            <div style={{display: 'grid', justifyItems: 'center', gap: '1rem', position: 'sticky', top: `${responsiveNum == 9 ? 'calc(50% - 200px)' :
                responsiveNum == 8 ? 'calc(50% - 200px)' :
                responsiveNum == 7 ? 'calc(50% - 200px)' :
                responsiveNum == 6 ? 'calc(50% - 140px)' :
                responsiveNum == 5 ? 'calc(50% - 130px)' : null}`}}>
              <img style={{width:`${responsiveNum == 9 ? '480px' :
                responsiveNum == 8 ? '480px' :
                responsiveNum == 7 ? '480px' :
                responsiveNum == 6 ? '320px' :
                responsiveNum == 5 ? '292px' : null}`,}} src={title} alt='title' />
              <div style={{
                  display: "grid",
                  justifyContent: "center",
                  alignContent: "flex-end",
                  gap: '0.3rem',
                  paddingLeft: '150px',
                  margin: 'auto',
                  
              }}>
                <Link to="/lore" className='auth'>
                  <button style={{minWidth: '6em', minHeight: '3.2em', width: '15vw', height: '5vw', maxWidth:'12em', maxHeight: '4.5em'}} className='auth-button'>
                    Lore
                  </button>
                </Link>
                
                <Link to="/minter" className='auth'>
                  <button style={{minWidth: '6em', minHeight: '3.2em', width: '15vw', height: '5vw', maxWidth:'12em', maxHeight: '4.5em'}} className='auth-button'>
                    Mint NFT
                  </button>
                </Link>
                
                <Link to="/app" className='auth'>
                  <button style={{minWidth: '6em', minHeight: '3.2em', width: '15vw', height: '5vw', maxWidth:'12em', maxHeight: '4.5em'}} className='auth-button'>
                    Enter App
                  </button>
                </Link>
                  
              </div>
            </div>
          </div>
        </motion.div>
        }
      </>
    )
}
