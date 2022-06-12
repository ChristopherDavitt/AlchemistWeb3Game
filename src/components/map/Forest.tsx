import React, { Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown';

import { useAppSelector } from '../store/hooks';
import { stakingABI, alchemistABI } from '../assets/abis/tokenABI';
import { nftStakingAddress, AlchemistNFTAddress } from '../assets/contractAddresses/contractAddresses';
import { QuestPopUp } from '../popups/QuestPopUp'
import Popup from '../popups/PopUp';
import { count } from 'console';



export const Forest = () => {

  const [addingPotion, setAddingPotion] = useState(false)
  const [stakingNFT, setStakingNFT] = useState(false)
  const [tokenIdArray, setTokenIdArray] = useState<number[]>([])
  const [unstakeArray, setUnstakeArray] = useState<boolean[]>([])
  const [questBool, setQuest] = useState(false)

  const nftCount = useAppSelector((state) => state.nftStaked.forest)
  const potionCount = useAppSelector((state) => state.potions)
  const address = useAppSelector((state) => state.address)
  const nftArray = useAppSelector((state) => state.nfts)
  const connected = useAppSelector((state) => state.connected)
  var potionIdArray: any[] = [];
  
  useEffect(() => {
    console.log('Use Effect Called')
    getTimeStaked();
  }, [nftCount])

  const handleTimeChange = (val:number) => {
    setTokenIdArray(prevState => [...prevState, val]);
  }
  const handleBoolChange = (val:boolean) => {
    setUnstakeArray(prevState => [...prevState, val]);
  }

  const handleStateChange = (timeArray: number[], boolArray: boolean[]) => {
    setTokenIdArray(timeArray);
    setUnstakeArray(boolArray);
  }

  const getTimeStaked = async () => {

    // State Arrays
    var timeArray: number[] = []
    var boolArray: boolean[] = []

    const date = new Date()
    const time = Math.round(date.getTime() / 1000)
    console.log('Time since epoch ' + time)

    const questTime = 60
    const ethers = require('ethers')
    const network = 'rinkeby'
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const stakingContract = new ethers.Contract(nftStakingAddress, stakingABI, provider)
    for (var i = 0; i < nftCount.length; i++) {
      const timeLeft = await stakingContract.tokenStakedAt(nftCount[i])
      console.log("Block.timestamp " + parseInt(timeLeft._hex, 16));
      if (parseInt(timeLeft._hex, 16) + questTime < time) {
        boolArray.push(true)
        timeArray.push(0)

      } else {
        timeArray.push(questTime - (time - parseInt(timeLeft._hex, 16)));
        boolArray.push(false)  
      }
    }
    handleStateChange(timeArray, boolArray)
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
    // Random component
  const Completionist = () => <span>Done!</span>;

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }: {
    hours: number,
    minutes: number, 
    seconds: number,
    completed: any
  }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return <span>{hours}:{minutes}:{seconds}</span>;
    }
  };

  const handleQuestClose = () => {
    setQuest(false)
  }

  const changeBoolArray = (index:number) => {
    setUnstakeArray(prevState => [...prevState, unstakeArray[index] = true])
  }

    return (
      
       <>
        {connected ?
        <>
          {questBool && <Popup content={<QuestPopUp nftArray={nftArray} contractAddress={nftStakingAddress} />} handleClose={handleQuestClose} />}   
          <div style={{display: 'grid',justifyItems: 'center',alignItems: 'center', }}>
              <h1 style={{color: 'white'}}>Explore the Forest</h1>
              <div style={{display: 'grid', gridTemplateColumns: '1fr',gap: '1rem'}}>
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
                      {tokenIdArray.map((tokenTime: number, index: number) => 
                        <div key={index} style={{display: 'grid', alignItems: 'center', gridTemplateColumns: '0.5fr 1fr 1fr 1fr'}}>
                          <p><span style={{fontSize: '0px'}}>{tokenIdArray[index]}</span>#{nftCount[index]}</p>
                          {!unstakeArray[index] 
                            ? <Countdown
                              date={Date.now() + (tokenTime * 1000)}
                              renderer={renderer} 
                              onComplete={() => changeBoolArray(index)} /> 
                          
                            : <p>Done!</p>} 
                            
                            
                                    
                          <p>potion</p>
                          
                          {/* {!potionIdArray[index] ? <button onClick={addPotion(tokenId, potionIdArray[index])} >+</button> : <h6>{potionIdArray[index]}</h6>} */}
                          {!unstakeArray[index] ? <h6>Not Done With Quest</h6> : <button onClick={() => unstake(nftCount[index])}>Complete Quest</button>  }
                        </div>
                      )}
                    </div>
                  </div>

                {/* onClick={() => quest(tokenId) */}
              </div>
              <br></br>
              <Link to={'/app'} className='auth'><h3 className='quest-map'>Back to Map {'-->'}</h3></Link>
          </div>
        </> : <div style={{width: '100%', height: '80vh', display: 'grid', justifyContent: 'center', alignItems: 'center'}}><p>connect Wallet</p></div> }
      </>
    )
}
