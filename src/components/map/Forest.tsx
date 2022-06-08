import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { stakingABI, alchemistABI } from '../assets/abis/tokenABI';
import { nftStakingAddress, AlchemistNFTAddress } from '../assets/contractAddresses/contractAddresses';


export const Forest = () => {
  
  interface stateProps {
    tokenIdArray : any[]
  }

  const [addingPotion, setAddingPotion] = useState(false)
  const [stakingNFT, setStakingNFT] = useState(false)
  const [tokenIdArray, setTokenIdArray] = useState<any[]>([])
  const [unstakeArray, setUnstakeArray] = useState<boolean[]>([])

  const nftCount = useAppSelector((state) => state.nftStaked.forest)
  const potionCount = useAppSelector((state) => state.potions)
  const address = useAppSelector((state) => state.address)

  var potionIdArray: any[] = [];
  
  useEffect(() => {
    console.log('Use Effect Called')
    getTimeStaked();
    // getPotionStaked();
  }, [nftCount])

  const getTimeStaked = async () => {
    const date = new Date()
    const time = Math.round(date.getTime() / 1000)
    console.log('Time since epoch ' + time)

    // to be used for state Changes
    const tokenTimeArray:any[] = [];
    const unstakeBoolArray: any[] = [];

    const questTime = 60
    const ethers = require('ethers')
    const network = 'rinkeby'
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const stakingContract = new ethers.Contract(nftStakingAddress, stakingABI, provider)
    for (var i = 0; i < nftCount.length; i++) {
      const timeLeft = await stakingContract.tokenStakedAt(nftCount[i])
      console.log("Block.timestamp " + parseInt(timeLeft._hex, 16))
      if (questTime - time - parseInt(timeLeft._hex, 16) < 0) {
        tokenTimeArray.push(String(0))
        unstakeBoolArray.push(true)
      } else {
        tokenTimeArray.push(String(time - parseInt(timeLeft._hex, 16) + questTime))
        unstakeBoolArray.push(false)
      }
    }
    setTokenIdArray(tokenTimeArray)

  }

  // const getPotionStaked = async () => {
  //   const ethers = require('ethers')
  //   const network = 'rinkeby'
  //   const provider = new ethers.providers.Web3Provider(window.ethereum)
  //   const stakingContract = new ethers.Contract(nftStakingAddress, stakingABI, provider)
  //   for (var i = 0; i < nftCount.length; i++) {
  //     const potionId = await stakingContract.nftHasPotion(nftCount[i])
  //     if (potionId == 0) {
  //       potionIdArray.push(false)
  //     } else {
  //       potionIdArray.push(potionId)
  //     }
  //   }
  // }

  // const addPotion = async (_tokenId: number, _potionId: number) => {
  //   const ethers = require('ethers')
  //   const network = 'rinkeby'
  //   const provider = new ethers.providers.Web3Provider(window.ethereum)
  //   const signer = provider.getSigner()
  //   const stakingContract = new ethers.Contract(nftStakingAddress, stakingABI, signer)
  //   // Add potion to the tokenId mapping in the contract
  //   setAddingPotion(true)
  //   const tx = await stakingContract.stakePotion(_tokenId, _potionId) 
  //   await tx.wait()
  //   setAddingPotion(false)
  // }

  const quest = async () => {
    const ethers = require('ethers')
    const network = 'rinkeby'
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const stakingContract = new ethers.Contract(nftStakingAddress, stakingABI, signer)
    const nftContract = new ethers.Contract(AlchemistNFTAddress, alchemistABI, provider)

    // get tokenId
    try {
      const firstTokenId = await nftContract.tokenOfOwnerByIndex(address, 0)
      console.log(parseInt(firstTokenId._hex, 16))
      
      // Add potion to the tokenId mapping in the contract
      setStakingNFT(true)
      const tx = await stakingContract.stake(firstTokenId) 
      await tx.wait()
      console.log('Updated')
      setStakingNFT(false) 
    } catch (error) {
      alert("No NFT Available to Stake")
    }
  }

  const unstake = async (tokenId:any) => {
    const ethers = require('ethers')
    const network = 'rinkeby'
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const stakingContract = new ethers.Contract(nftStakingAddress, stakingABI, signer)

    // get tokenId
    try {
      // Add potion to the tokenId mapping in the contract
      setStakingNFT(true)
      const tx = await stakingContract.unstake(tokenId) 
      await tx.wait()
      console.log('Updated')
      setStakingNFT(false) 
    } catch (error) {
      alert("Already Unstaked, or Not Done With Quest")
    }
  }


    return (
      <div style={{
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        }}>
        {/* Background image of a mountain */}
        {/* if on quest Button not clickable */}
        {/* else */}
        
          <h1 style={{color: 'white'}}>Explore the Forest</h1>
          <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '1rem'
            }}>
              <div>
                <h4 style={{color:'white'}}>NFT Staked: {nftCount.length}</h4>
                <div style={{display: 'grid'}}>
                  {nftCount.map((tokenId: number, index: number) => 
                    <div key={tokenId} style={{display: 'flex'}}>
                      <h6 key={index}>{tokenId} : Time Left for Quest: {tokenIdArray[index]}</h6>
                      {unstakeArray ? <button onClick={() => unstake(tokenId)}></button> : <h6>Not Done With Quest</h6> }
                      {/* {!potionIdArray[index] ? <button onClick={addPotion(tokenId, potionIdArray[index])} >+</button> : <h6>{potionIdArray[index]}</h6>} */}
                    </div>
                  )}
                </div>
              </div>
            <button onClick={quest}>Stake NFT</button>
          </div>
          <br></br>
          <Link to={'/app'} className='auth'><h3 className='quest-map'>Back to Map {'-->'}</h3></Link>
      </div>
    )
}
