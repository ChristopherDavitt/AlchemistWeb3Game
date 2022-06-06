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
        <h1 style={{color: 'white'}} >Rejuvination: {count.potion1}</h1>
        <h1 style={{color: 'white'}} >Scent of Jarv: {count.potion2}</h1>
        <h1 style={{color: 'white'}} >Fun Gi Smelly: {count.potion3}</h1>
    </div>
  )
}