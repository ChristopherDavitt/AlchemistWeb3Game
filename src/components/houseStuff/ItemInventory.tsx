import React, { useState } from 'react'
import { useAppSelector } from '../store/hooks';

export const ItemInventory = () => {
  const count = useAppSelector((state) => state.items);

  const itemDict = [
    'Berry',
    'Grape',
    'Fungus',
  ]

  return (
    <div style={{backgroundColor: 'gray', opacity: '90'}} >
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        }}>
          <h1 style={{color: 'white', display: 'flex', justifyContent: 'center'}}>Item Inventory</h1>
          <div>
            {count.map((potion: number, index: number) =>
              <div style={{display: 'flex', justifyContent: 'center'}}> 
                <h5>{itemDict[index]}</h5>
                <h5>: {potion}</h5>
              </div>
            )}
          </div>
          
      </div>
    </div>
  )
}
