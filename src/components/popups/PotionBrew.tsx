import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { potionBrewABI, tokenABI } from '../assets/helpers/tokenABI';
import Transaction from './Transaction';
import { getPotions } from '../assets/helpers/getTokens';
import { items } from '../assets/helpers/contractAddresses';

export const PotionBrew = (props: any) =>  {

    const [transacting, setTransacting] = useState(false)
    const [updated, setUpdated] = useState(false) 
    const [approvalItems, setApprovalItems] = useState<number[]>([]);
    const [count, setCount] = useState(0);
    
    const address = useAppSelector((state) => state.address);
    const dispatch = useAppDispatch();


    useEffect(() => {
        getApprovals();
    }, [count])

    const getApprovals = async () => {
        const isApproved: number[] = []
        const ethers = require('ethers')
        const network = 'rinkeby'
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        for (let i =0 ; i< props.itemIds.length; i++) {
            var itemContract = new ethers.Contract(items[props.itemIds[i]], tokenABI, provider)
            try {
                const approve = await itemContract.allowance(address, props.contractAddress)
                console.log(parseInt(approve._hex, 16))
                isApproved.push(parseInt(approve._hex, 16))
            } catch (error) {
                console.log(error)
            }
        }
        setApprovalItems(isApproved);
        console.log(isApproved)
    }

    const approve = async (index: number) => {
        const ethers = require('ethers')
        const network = 'rinkeby'
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const itemContract = new ethers.Contract(items[index], tokenABI, signer)
        try {
            const tx = await itemContract.approve(props.contractAddress, 1000000)
            await tx.wait() 
            setUpdated(true)
            console.log('Updated!')
            setCount(count + 1);
            setTimeout(() => {
                setUpdated(false)
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }

    const update = async () => {
        setUpdated(true)
        const potions = await getPotions(address)
        dispatch({type: 'UPDATE_POTIONS', payload: potions})
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
                            #{props.itemIds[index] + 1} {props.itemName[index]}: ( {props.costArray[index]} ) 
                            {approvalItems[index] < 10 && <button onClick={() => approve(props.itemIds[index])}>Approve</button>}
                        </p>
                    )}
                </div>
                <br></br>
                {props.brewable ? <button onClick={() => brew()}>Brew Potion</button> : <button disabled>Cannot Brew</button>}
            </div>
        </div>
    )
}
