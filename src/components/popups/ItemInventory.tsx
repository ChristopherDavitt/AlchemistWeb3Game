import React, { useState, useEffect } from 'react'
import { useAppSelector } from '../store/hooks';
import itemImg from '../assets/images/item.png';

export const ItemInventory = () => {
  const count = useAppSelector((state) => state.items);

  const [windowWidth, setWindowWidth] = useState<number>()
  const [mobile, setMobile] = useState(false)

  useEffect(() => {

    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => 
        window.removeEventListener("resize",updateDimensions);
  }, [])

  const updateDimensions = () => {
      const width: number = window.innerWidth
      if (width < 620) {
          setMobile(true)
      } else {
          setMobile(false)
      }
      setWindowWidth(width)
      console.log('editing dimendions')
  }

  const itemDict = ['Bawnberry', 'Nickelstem', 'Valeria Pedals', 'Sugarbark', 'Caapi Root', 'Honey Fungus', 
                    'Mugwort', 'Eel', 'Water Lillies', 'Bottle o Bugs', 'Sugar Soot',
                    'Kelp', 'Jelly Jelly', 'Mackerel', 'Giant Tuna', 'Oyster Shells', 'OceanPearl']

  return (
    
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
    }}>
        <h1 style={{margin: 'auto', textAlign: 'center'}}>Item{mobile ? 's' : ' Inventory'}</h1>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
          alignItems: 'center', justifyItems: 'left', maxWidth: '500px', margin: ' 10px auto'}}>
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
        <div style={{display: 'grid', gridTemplateColumns: '1fr', maxWidth: '520px', border: 'solid 3px white', borderRadius: '5px',  
          paddingLeft: '0.5rem', justifyContent: 'center', alignItems: 'center', margin: '1rem auto'}}>
          {count.map((item: number, index: number) =>
            <div key={index} style={{display: 'flex', alignItems: 'center', justifyContent: 'left', gap: '1rem'}}> 
              <p style={{fontSize:'12px'}}>#{index + 1}</p>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <img src={itemImg} alt="potion-pic" />
                <p><sub><sub><sub>{item}</sub></sub></sub></p>
              </div>
              <p style={{fontSize:'12px'}}>{itemDict[index]}</p>
            </div>
          )}
          
        </div>
        
    </div>
   
  )
}
