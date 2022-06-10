import React, { useState } from 'react'
import { useAppSelector } from '../store/hooks';
import potionPic from '../assets/images/potionPic.png'

export const PotionInventory = () => {
  const count = useAppSelector((state) => state.potions);

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
        <h1 style={{margin: 'auto', textAlign: 'center', paddingTop: '25px'}}>Potion Inventory</h1>
        <div style={{display: 'grid', gridTemplateColumns: '1fr', width: '520px', border: 'solid 2px white', 
          paddingLeft: '0.5rem', justifyContent: 'center', alignItems: 'center', margin: '1rem auto'}}>
          {count.map((potion: number, index: number) =>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'left', gap: '1rem'}}> 
              <div style={{display: 'flex', alignItems: 'center'}}>
                <img src={potionPic} alt="potion-pic" />
                <p><sub><sub><sub>{potion}</sub></sub></sub></p>
              </div>
              <p style={{fontSize:'12px'}}> <span></span>{potionDict[index]}</p>
            </div>
          )}
        </div>
    </div>
  )
}