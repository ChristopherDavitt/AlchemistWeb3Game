import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { potionBrewABI, tokenABI } from '../assets/helpers/tokenABI';
import Transaction from './Transaction';
import { getItems } from '../assets/helpers/getTokens';
import { items } from '../assets/helpers/contractAddresses';

export const PotionBrew = (props: any) =>  {

    const [transacting, setTransacting] = useState(false)
    const [updated, setUpdated] = useState(false) 

    const address = useAppSelector((state) => state.address)
    const dispatch = useAppDispatch()

    var approvals:number[] = [];

    useEffect(() => {
        getApprovals();
    }, [])

    const getApprovals = async () => {
        const isApproved: number[] = []
        const ethers = require('ethers')
        const network = 'rinkeby'
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        for (let i =0 ; i< props.itemIds.length; i++) {
            var itemContract = new ethers.Contract(items[i], tokenABI, provider)
            try {
                const approve = await itemContract.allowance(address, props.contractAddress)
                console.log(approve)
                isApproved.push(parseInt(approve._hex, 16))
            } catch (error) {
                console.log(error)
            }
        }
        approvals = isApproved
        console.log(approvals)
    }

    const approve = async (index: number) => {
        const isApproved: boolean[] = []
        const ethers = require('ethers')
        const network = 'rinkeby'
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const itemContract = new ethers.Contract(items[index], props.contractAddress, signer)
        try {
            const tx = await itemContract.approve(props.contractAddress, 1000000) 
        } catch (error) {
            console.log(error)
        }
    }

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
            <div style={{justifyItems: 'center', display: 'grid',border: 'solid 2px white', borderRadius: '10px', padding: '2rem 0',
            maxWidth: '400px', height: '400px', justifyContent: 'center', margin: 'auto', overflowY: 'auto' }} >
                        
                <p style={{textAlign: 'center'}}>#{props.id} {props.name}</p>
                <img style={{border: 'double 10px white'}} src='https://gateway.pinata.cloud/ipfs/QmZKSYKxV3ZYUaA4rXBS8273yQn6Hg6QmWyYXT1wCPfmeD/Potionipfs.png' alt='potion-image' />
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
