import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { potionBrewABI } from '../assets/abis/tokenABI';
import Transaction from './Transaction';
import { getItems } from '../assets/helpers/getTokens/getTokens';

export const PotionBrew = (props: any) =>  {

    const [transacting, setTransacting] = useState(false)
    const [updated, setUpdated] = useState(false) 
    
    const address = useAppSelector((state) => state.address)
    const dispatch = useAppDispatch()

    const update = async () => {
        setUpdated(true)
        const items = await getItems(address)
        dispatch({type: 'UPDATE_ITEMS', payload: items})
        console.log('Updated!')
        setTimeout(() => {
            setUpdated(false)
            setTransacting(false)
            props.handleClose();
            
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
          update();
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
                    {props.boolArray.map((value: boolean, index: number) => 
                        <p key={index} style={{fontSize: '10px',color: `${!value ? 'grey' : 'white'}`}} >
                            #{props.itemIds[index] + 1} {props.itemName[index]}: ( {props.costArray[index]} )</p>
                    )}
                </div>
                <br></br>
                {props.brewable ? <button onClick={() => brew()}>Brew Potion</button> : <button disabled>Cannot Brew</button>}
            </div>
        </div>
    )
}
