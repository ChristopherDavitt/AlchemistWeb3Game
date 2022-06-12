import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../store/hooks';
import { potionBrewABI } from '../assets/abis/tokenABI';
import Transaction from './Transaction';

export const PotionBrew = (props: any) =>  {

    const [transacting, setTransacting] = useState(false)
    const [updated, setUpdated] = useState(false) 

    const brewable: boolean = props.brewable
    const mapArray: any[] = props.boolArray
    
    const update = () => {
        setUpdated(true)
        setTimeout(() => {
            setUpdated(false)
            setTransacting(false)
        }, 1000)
    }

    const brew = async () => {
        const ethers = require('ethers')
        const network = 'rinkeby'
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const stakingContract = new ethers.Contract(props.contractAddress, potionBrewABI, signer)
        try {
            setTransacting(true)
          const tx = await stakingContract.createPotion() 
          await tx.wait()
          console.log('Updated')
          update() 
        } catch (error) {
          setTransacting(false) 
          alert("TXN FAILED!!! ... or rejected")
        }
      }

    return (
        <div>
            {transacting && <Transaction message={!updated ? 'Brewing Potion' : 'POTION ADDED!!!'} />}
            <div style={{justifyItems: 'center', display: 'grid',border: 'double 10px white', padding: '2rem 0',
            maxWidth: '400px', height: '400px', justifyContent: 'center', margin: 'auto' }} >
                        
                <p style={{textAlign: 'center'}}>#{props.id} {props.name}</p>
                <img style={{border: 'double 10px white'}} src='https://via.placeholder.com/150' alt='potion-image' />
                <p style={{textDecorationLine: 'underline'}}>Ingredients</p>
                <div style={{display: 'grid', gridTemplateColumns: '1fr'}}>
                    {mapArray.map((value: boolean, index: number) => 
                        <p style={{fontSize: '10px'}} key={index} color={!value ? 'grey' : 'white'} >
                            #{props.itemIds[index] + 1} {props.itemName[index]}: ( {props.costArray[index]} )</p>
                    )}
                </div>
                <br></br>
                {brewable ? <button onClick={() => brew()}>Brew Potion</button> : <button disabled>Cannot Brew</button>}
            </div>
        </div>
    )
}
