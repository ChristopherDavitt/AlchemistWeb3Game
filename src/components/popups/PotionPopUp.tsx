import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../store/hooks'
import { AlchemistNFTAddress, potions } from '../assets/helpers/contractAddresses'
import { alchemistABI, potionBrewABI, tokenABI } from '../assets/helpers/tokenABI'

export const PotionPopUp = (props:any) => {

    const [count, setCount] = useState<number>(0)
    const [approvals, setApprovals] = useState<number[]>([])

    const address = useAppSelector((state) => state.address)
    const potionCount = useAppSelector((state) => state.potions)

    const potionNameDict = ['Ghibl Jam', 'Sweet Sea', 'Mycil Matte', 
    'Hoppity Tonic', 'Fishy Philter', 'Electric Vial', 'Turt Tonic']

    useEffect(() => {
        getApprovals();
    }, [count])

    const getApprovals = async () => {
        console.log(props.potionArray)
        console.log(props.stakingAddress)
        const isApproved: number[] = []
        const ethers = require('ethers')
        const network = 'rinkeby'
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        for (let i =0 ; i< props.potionArray.length; i++) {
            var potionContract = new ethers.Contract(potions[props.potionArray[i]], tokenABI, provider)
            try {
                const approve = await potionContract.allowance(address, props.stakingAddress)
                console.log(parseInt(approve._hex, 16))
                isApproved.push(parseInt(approve._hex, 16))
            } catch (error) {
                console.log(error)
            }
        }
        setApprovals(isApproved);
        console.log(isApproved)
    }

    const approve = async (index: number) => {
        const ethers = require('ethers')
        const network = 'rinkeby'
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const potionContract = new ethers.Contract(potions[props.potionArray[index]], potionBrewABI, signer)
        try {
            const tx = await potionContract.approve(props.stakingAddress, 1000000)
            await tx.wait() 
            console.log('Updated!')
            setCount(count + 1);
        } catch (error) {
            console.log(error)
        }
    }
    
  
  return (
    <div style={{display: 'grid',
            justifyItems: 'center',
            backgroundColor: 'black',
            zIndex: '1000',
            margin: 'auto',
            overflowY: 'auto',
            }} >  
            <p>Potions Available</p>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                <div>
                    <button onClick={()=>props.handlePotionId(0)}>Take No Potions</button>
                </div>
              {props.potionArray.map((potionIndex: number, index: number) => 
                <div key={potionNameDict[potionIndex]} style={{display: 'grid', justifyItems: 'center', cursor: 'pointer'}}>
                    {
                        approvals[index] < 10 
                        
                        ? <button onClick={() => approve(index)}>Approve Potion</button> 
                        
                        : potionCount[potionIndex] > 0 ? 
                        
                        <button onClick={()=>props.handlePotionId(index + 1)}>Take On Quest</button>:

                        <button disabled>Not Enough Potions</button>  
                        
                        }
                  <img 
                    style={{width: '100px'}}
                    src='https://gateway.pinata.cloud/ipfs/QmZKSYKxV3ZYUaA4rXBS8273yQn6Hg6QmWyYXT1wCPfmeD/Potionipfs.png'
                    alt='Alchemist-Image' />
                  <p><sub>{potionCount[potionIndex]}</sub></p>
                  <p>#{potionIndex} {potionNameDict[potionIndex]}</p>
                </div>
              )}
            </div>
        </div>
  )
}
