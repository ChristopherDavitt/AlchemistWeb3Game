import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../store/hooks';
import { potionBrewABI } from '../assets/abis/tokenABI';

export const PotionBrew = (props: any) =>  {

    const [brewingPotion, setBrewingPotion] = useState(false)

    const brewable: boolean = props.brewable
    const mapArray: any[] = props.boolArray 

    const brew = async () => {
        const ethers = require('ethers')
        const network = 'rinkeby'
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const stakingContract = new ethers.Contract(props.contractAddress, potionBrewABI, signer)
        try {
          setBrewingPotion(true)
          const tx = await stakingContract.createPotion() 
          await tx.wait()
          console.log('Updated')
          setBrewingPotion(false) 
        } catch (error) {
          alert("Not Enough Resources")
        }
      }

    return (
        <div>
            <div className='creature-bio' style={{justifyItems: 'center', display: 'grid',
            width: '360px', height: '400px', justifyContent: 'center', padding: '1rem', margin: 'auto' }} >
                        
                <p>#{props.id} {props.name}</p>
                <img src='https://via.placeholder.com/150' alt='potion-image' />
                <p>Ingredients</p>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem'}}>
                    {mapArray.map((value: boolean, index: number) => 
                        <p style={{fontSize: '10px'}} key={index} color={!value ? 'grey' : 'white'} >
                            #{props.itemIds[index] + 1} {props.itemName[index]}: {props.costArray[index]}</p>
                    )}
                </div>
                {brewable ? <button onClick={()=>brew()}>Brew Potion</button> : <button disabled>Cannot Brew</button>}
            </div>
        </div>
    )
}
