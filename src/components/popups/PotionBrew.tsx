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
        <div style={{display: 'grid',
            width: '98vw',
            height: '500px',
            backgroundColor: 'black',
            position: 'absolute',
            top: '110px',
            zIndex: '900',
            justifyItems: 'center'}} >
            <div className='creature-bio' style={{border: 'solid 3px white', width: '360px', height: '400px', 
            display: 'grid', justifyItems: 'center', justifyContent: 'center', padding: '1rem' }} >
                        
                <h4>{props.name}</h4>
                <img src='https://via.placeholder.com/150' alt='potion-image' />
                <h5>Ingredients</h5>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem'}}>
                    {mapArray.map((value: boolean, index: number) => 
                        <h6 key={index} color={!value ? 'grey' : 'white'} >{props.itemName[index]} : {props.costArray[index]}</h6>
                    )}
                </div>
                {brewable ? <button onClick={()=>brew()}>Brew Potion</button> : <button disabled>Cannot Brew</button>}
            </div>

        </div>
    )
}
