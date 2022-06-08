import React, { useState } from 'react'
import { useAppSelector } from '../store/hooks';


export const PotionInventory = () => {
  const count = useAppSelector((state) => state.potions);
  return (

    <div style={{
      width: '98vw',
      height: '90vh',
      backgroundColor: 'black',
      position: 'absolute',
      zIndex: '900',
      paddingLeft: '1rem',
      }}>
        <h1 style={{color: 'white', display: 'flex', justifyContent: 'center'}}>Potion Inventory</h1>
        
    </div>
  )
}