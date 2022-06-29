import React, { useState, useEffect } from 'react'
import { useAppSelector } from '../store/hooks';
import itemImg from '../assets/images/item.png';
import potionPic from '../assets/images/potionPic.png'

export const Inventory = (props: any) => {
  const itemCount = useAppSelector((state) => state.items);
  const potionCount = useAppSelector((state) => state.potions);

  const [windowWidth, setWindowWidth] = useState<number>()
  const [mobile, setMobile] = useState(false)

  const [forest, setForest] = useState(false)
  const [mountains, setMountains] = useState(false)
  const [caves, setCaves] = useState(false)
  const [ocean, setOcean] = useState(false)
  const [tundra, setTundra] = useState(false)
  const [swamp, setSwamp] = useState(false)
  const [allLocs, setAllLocs] = useState(true)

  const handleChange = (event:any) => {
    const name:string = event.target.name
    console.log(name)
    if (name == 'forest') {
      setForest(!forest)
    } else if (name == 'caves') {
      setCaves(!caves)
    } else if (name == 'ocean') {
      setOcean(!ocean)
    } else if (name == 'tundra') {
      setTundra(!tundra)
    } else if (name == 'swamp') {
      setSwamp(!swamp)
    } else if (name == 'mountains') {
      setMountains(!mountains)
    }
  }

  const checkAllLocs = () => {
    if (!forest && !caves && !mountains && !tundra && !ocean && !swamp) {
      setAllLocs(true);
    } else {
      setAllLocs(false);
    }
  }

  useEffect(() => {
    checkAllLocs();
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => 
        window.removeEventListener("resize",updateDimensions);
  }, [forest, caves, mountains, ocean, tundra, swamp])

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
                    'Kelp', 'Jelly Jelly', 'Mackerel', 'Giant Tuna', 'Oyster Shells']

  const potionDict = ['Ghibl Jam', 'Sweet Sea', 'Mycil Matte', 
                    'Hoppity Tonic', 'Fishy Philter', 'Electric Vial', 'Turt Tonic']
                  
  return (
    
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
    }}>
        <h1 style={{margin: 'auto', textAlign: 'center'}}>{props.inventoryType}{mobile ? 's' : ' Inventory'}</h1>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
          alignItems: 'center', justifyItems: 'left', maxWidth: '500px', margin: ' 10px auto'}}>
          <p style={{fontSize:'12px'}}>Forest</p>
          <input onChange={(e) => handleChange(e)} name='forest' type="checkbox" />
          <p style={{fontSize:'12px'}}>Ocean</p>
          <input onChange={(e) => handleChange(e)} name='ocean' type="checkbox" />
          <p style={{fontSize:'12px'}}>Caves</p>
          <input onChange={(e) => handleChange(e)} name='caves' type="checkbox" />
          <p style={{fontSize:'12px'}}>Mountains</p>
          <input onChange={(e) => handleChange(e)} name='mountains' type="checkbox" />
          <p style={{fontSize:'12px'}}>Swamp</p>
          <input onChange={(e) => handleChange(e)} name='swamp' type="checkbox" />
          <p style={{fontSize:'12px'}}>Tundra</p>
          <input onChange={(e) => handleChange(e)} name='tundra' type="checkbox" />
        </div>
        <div style={{ maxWidth: '520px', height: '390px', border: 'solid 3px white', borderRadius: '5px',  
          paddingLeft: '0.5rem', justifyContent: 'center', alignItems: 'center', overflowY: 'auto', margin: '1rem auto'}}>
          {props.inventoryType == 'Item' ? 
          <>
            {forest || allLocs ? itemCount.slice(0,6).map((item: number, index: number) =>
            <div  key={index}> 
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'left', gap: '1rem'}}> 
                <p style={{fontSize:'12px'}}>#{index + 1}</p>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <img src={itemImg} alt="potion-pic" />
                  <p><sub><sub><sub>{item}</sub></sub></sub></p>
                </div>
                <p style={{fontSize:'12px'}}>{itemDict[index]}</p>
              </div>
            </div>
            ): null}
            {swamp || allLocs ? itemCount.slice(6,11).map((item: number, index: number) =>
            <div key={index + 6}> 
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'left', gap: '1rem'}}> 
                <p style={{fontSize:'12px'}}>#{index + 7}</p>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <img src={itemImg} alt="potion-pic" />
                  <p><sub><sub><sub>{item}</sub></sub></sub></p>
                </div>
                <p style={{fontSize:'12px'}}>{itemDict[index + 6]}</p>
              </div> 
            </div>
            ): null}
            {ocean || allLocs ? itemCount.slice(11,16).map((item: number, index: number) =>
            <div key={index + 11}> 
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'left', gap: '1rem'}}> 
                <p style={{fontSize:'12px'}}>#{index + 12}</p>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <img src={itemImg} alt="potion-pic" />
                  <p><sub><sub><sub>{item}</sub></sub></sub></p>
                </div>
                <p style={{fontSize:'12px'}}>{itemDict[index + 11]}</p>
              </div>
            </div>
            ):null}
          </> 
          : 
          <>
            {forest || allLocs ? potionCount.slice(0,2).map((potion: number, index: number) =>
              <div key={index} style={{display: 'flex', alignItems: 'center', justifyContent: 'left', gap: '1rem'}}> 
                <p style={{fontSize:'12px'}}>#{index + 1}</p>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <img src={potionPic} alt="potion-pic" />
                  <p><sub><sub><sub>{potion}</sub></sub></sub></p>
                </div>
                <p style={{fontSize:'12px'}}>{potionDict[index]}</p>
              </div>
            ): null} 
            {swamp || allLocs ? potionCount.slice(2,4).map((potion: number, index: number) =>
              <div key={index + 2} style={{display: 'flex', alignItems: 'center', justifyContent: 'left', gap: '1rem'}}> 
                <p style={{fontSize:'12px'}}>#{index + 3}</p>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <img src={potionPic} alt="potion-pic" />
                  <p><sub><sub><sub>{potion}</sub></sub></sub></p>
                </div>
                <p style={{fontSize:'12px'}}>{potionDict[index + 2]}</p>
              </div>
            ): null}
            {ocean || allLocs ? potionCount.slice(4,6).map((potion: number, index: number) =>
              <div key={index + 4} style={{display: 'flex', alignItems: 'center', justifyContent: 'left', gap: '1rem'}}> 
                <p style={{fontSize:'12px'}}>#{index + 5}</p>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <img src={potionPic} alt="potion-pic" />
                  <p><sub><sub><sub>{potion}</sub></sub></sub></p>
                </div>
                <p style={{fontSize:'12px'}}>{potionDict[index + 4]}</p>
              </div>
            ): null}
          </>
          }
        </div>
    </div>
   
  )
}
