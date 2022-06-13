import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../store/hooks';
import potionPic from '../assets/images/potionPic.png'

export const PotionInventory = () => {
  const count = useAppSelector((state) => state.potions);

  const [mobile, setMobile] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {

    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => 
        window.removeEventListener("resize",updateDimensions);
    }, [])

const updateDimensions = () => {
    const width = window.innerWidth
    if (width < 620) {
        setMobile(true)
    } else {
        setMobile(false)
    }
    setWindowWidth(width)
    console.log('editing dimendions')
}



  const potionDict = [
    'Rejuvination',
    'Flask of Potatoes',
    'Philter of Fire',
  ]

  return (

    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
      }}>
        <h1 style={{margin: 'auto', textAlign: 'center'}}>Potion{!mobile ? ' Inventory' : 's'}</h1>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', alignItems: 'center', justifyItems: 'left', maxWidth: '500px', margin: ' 10px auto'}}>
          <p style={{fontSize:'12px'}}>Forest</p>
          <input id='forest' type="checkbox" />
          <p style={{fontSize:'12px'}}>Ocean</p>
          <input id='ocean' type="checkbox" />
          <p style={{fontSize:'12px'}}>Caves</p>
          <input id='caves' type="checkbox" />
          <p style={{fontSize:'12px'}}>Mountains</p>
          <input id='mountain' type="checkbox" />
          <p style={{fontSize:'12px'}}>Swamp</p>
          <input id='swamp' type="checkbox" />
          <p style={{fontSize:'12px'}}>Tundra</p>
          <input id='tundra' type="checkbox" />
        </div>
      
        <div style={{display: 'grid', gridTemplateColumns: '1fr', maxWidth: '520px', border: 'double 5px white', 
          paddingLeft: '0.5rem', justifyContent: 'center', alignItems: 'center', margin: '1rem auto'}}>
          {count.map((potion: number, index: number) =>
            <div key={index} style={{display: 'flex', alignItems: 'center', justifyContent: 'left', gap: '1rem'}}> 
              <p style={{fontSize:'12px'}}>#{index + 1}</p>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <img src={potionPic} alt="potion-pic" />
                <p><sub><sub><sub>{potion}</sub></sub></sub></p>
              </div>
              <p style={{fontSize:'12px'}}>{potionDict[index]}</p>
            </div>
          )}
        </div>
        
    </div>
  )
}