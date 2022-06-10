import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { stakingABI, alchemistABI } from '../assets/abis/tokenABI';
import { nftStakingAddress, AlchemistNFTAddress } from '../assets/contractAddresses/contractAddresses';
import { QuestPopUp } from '../popups/QuestPopUp'

export const Forest = () => {

  const [addingPotion, setAddingPotion] = useState(false)
  const [stakingNFT, setStakingNFT] = useState(false)
  const [tokenIdArray, setTokenIdArray] = useState<any[]>([])
  const [unstakeArray, setUnstakeArray] = useState<boolean[]>([])
  const [questBool, setQuest] = useState(false)

  const nftCount = useAppSelector((state) => state.nftStaked.forest)
  const potionCount = useAppSelector((state) => state.potions)
  const address = useAppSelector((state) => state.address)
  const nftArray = useAppSelector((state) => state.nfts)

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
        tokenTimeArray.push('Done')
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
      <>
        {questBool ? <><QuestPopUp nftArray={nftArray} contractAddress={nftStakingAddress} />
                      <button style={{position: 'fixed',
                                      border: 'solid 2px black',
                                      backgroundColor: 'black',
                                      color: 'white',
                                      cursor: 'pointer',
                                      top: '70px',
                                      left: 'calc(100% - 65px)',
                                      fontSize: '30px',
                                      zIndex: '1000'}} onClick={() => setQuest(false)}>X</button></> : null}   
        <div style={{
          display: 'grid',
          justifyItems: 'center',
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
                  <div style={{display: 'flex', gap: '2rem'}}>
                    <button onClick={() => setQuest(true)}>Go On Quest</button>
                    <h4 style={{color:'white'}}>NFT Staked: {nftCount.length}</h4>
                  </div>
                  <div style={{display: 'grid'}}>
                    <div style={{display: 'grid', borderBottom: 'solid 2px white', marginBottom: '1rem', gridTemplateColumns: '0.5fr 1fr 1fr 1fr'}}>
                        <p>ID</p>
                        <p>Time Left</p>
                        <p>Potion</p>
                        <p>Quest Status</p>
                    </div>
                    {nftCount.map((tokenId: number, index: number) => 
                      <div key={tokenId} style={{display: 'grid', gridTemplateColumns: '0.5fr 1fr 1fr 1fr'}}>
                        <p>#{tokenId}</p>
                        <p>{tokenIdArray[index]}</p>
                        <p></p>
                        
                        {/* {!potionIdArray[index] ? <button onClick={addPotion(tokenId, potionIdArray[index])} >+</button> : <h6>{potionIdArray[index]}</h6>} */}
                        {unstakeArray ? <button onClick={() => unstake(tokenId)}>Complete Quest</button> : <h6>Not Done With Quest</h6> }
                      </div>
                    )}
                  </div>
                </div>

              {/* onClick={() => quest(tokenId) */}
            </div>
            <br></br>
            <Link to={'/app'} className='auth'><h3 className='quest-map'>Back to Map {'-->'}</h3></Link>
        </div>
      </>
    )
}
