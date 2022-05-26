import React, { useState } from 'react'
import { useAppSelector } from '../store/hooks';


export const PotionInventory = () => {
  const count = useAppSelector((state) => state);
  return (
    <div style={{
      width: '300px',
      height: '200px',
      backgroundColor: 'black',
      position: 'absolute',
      top: 'calc(50%) - 100px',
      left: 'calc(50%) - 150px',
      }}>
        <h1 style={{color: 'white'}}>Potion Inventory</h1>
        <h1 style={{color: 'white'}}>ETH: {count}</h1>
    </div>
  )
}