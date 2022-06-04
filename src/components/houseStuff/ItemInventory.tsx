import React, { useState } from 'react'
import { useAppSelector } from '../store/hooks';

export const ItemInventory = () => {
  const count = useAppSelector((state) => state.items);
  return (
    <div style={{backgroundColor: 'gray', opacity: '90'}} >
      <div style={{
        width: '98vw',
        height: '90vh',
        backgroundColor: 'black',
        position: 'absolute',
        zIndex: '900',
        paddingLeft: '1rem'
        }}>
          <h1 style={{color: 'white', display: 'flex', justifyContent: 'center'}}>Item Inventory</h1>
          <h1 style={{color: 'white', display: 'grid', justifyContent: 'start'}}>ETH: {count}</h1>
      </div>
    </div>
  )
}
