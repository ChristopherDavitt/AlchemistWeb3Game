import React, { useState } from 'react'
import { useAppSelector } from '../store/hooks';

export const ItemInventory = () => {
  const count = useAppSelector((state) => state);
  return (
    <div style={{backgroundColor: 'gray', opacity: '90'}} >
      <div style={{
        width: '600px',
        height: '400px',
        backgroundColor: 'black',
        position: 'absolute',
        top: 'calc(50% - 200px)',
        left: 'calc(50% - 300px)',
        zIndex: '900',
        paddingLeft: '1rem'
        }}>
          <h1 style={{color: 'white'}}>Item Inventory</h1>
          <h1 style={{color: 'white'}}>ETH: {count}</h1>
      </div>
    </div>
  )
}
