import React, { Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { stakingABI, alchemistABI } from '../assets/abis/tokenABI';
import { nftStakingAddress, AlchemistNFTAddress } from '../assets/contractAddresses/contractAddresses';
import { QuestPopUp } from '../popups/QuestPopUp'
import Popup from '../popups/PopUp';
import { getApproved, getItems, getNFTS, getNftsStakedForest } from '../assets/helpers/getTokens/getTokens';
import Transaction from '../popups/Transaction';
import loadingGif from '../assets/images/LoadingGif.gif';


export const QuestLocation = (props:any) => {

  const [timeStaked, setTimeStaked] = useState<number[]>([])
  const [unstakeArray, setUnstakeArray] = useState<boolean[]>([])
  const [questBool, setQuest] = useState(false)
  const [tokenIds, setTokenIds] = useState<number[]>([])
  const [approved, setApproved] = useState(false);
  const [transacting, setTransacting] = useState(false)
  const [updated, setUpdated] = useState(false) 
  
  const nftCount = useAppSelector((state) => state.nftStaked)
  const approvals = useAppSelector((state) => state.approved)
  const potionCount = useAppSelector((state) => state.potions)
  const address = useAppSelector((state) => state.address)
  const nftArray = useAppSelector((state) => state.nfts)
  const connected = useAppSelector((state) => state.connected)
  const loading = useAppSelector((state) => state.loading)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (props.loc == 'forest'){
      setTokenIds(nftCount.forest)
      getTimeStaked(nftCount.forest, nftStakingAddress);
      setApproved(approvals[0])
    } else if (props.loc == 'mountains') {
      setTokenIds(nftCount.mountains)
      getTimeStaked(nftCount.mountains, nftStakingAddress);
    } else if (props.loc == 'caves') {
      setTokenIds(nftCount.caves)
      getTimeStaked(nftCount.caves, nftStakingAddress);
    } else if (props.loc == 'ocean') {
      setTokenIds(nftCount.ocean)
      getTimeStaked(nftCount.ocean, nftStakingAddress);
    }else if (props.loc == 'tundra') {
      setTokenIds(nftCount.tundra)
      getTimeStaked(nftCount.tundra, nftStakingAddress);
    } else if (props.loc == 'swamp') {
      setTokenIds(nftCount.swamp)
      getTimeStaked(nftCount.swamp, nftStakingAddress);
    }
  }, [approvals, nftCount])
  
  
  useEffect(() => {
    console.log('Use Effect Called')
    
  }, [nftCount])

  const handleStateChange = (timeArray: number[], boolArray: boolean[]) => {
    setTimeStaked(timeArray);
    setUnstakeArray(boolArray);
  }

  const getTimeStaked = async (nfts:number[], stakingAddress: any) => {

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
    const stakingContract = new ethers.Contract(stakingAddress, stakingABI, provider)
    for (var i = 0; i < nfts.length; i++) {
      const timeLeft = await stakingContract.tokenStakedAt(nfts[i])
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
  const update = async () => {
    setUpdated(true)
    
    const staked = await getNftsStakedForest(address)
    dispatch({type: 'NFTS_STAKED_FOREST', payload: staked})

    const nftAvail = await getNFTS(address);
    dispatch({type: 'NFTS_AVAIL', payload: nftAvail})

    const items = await getItems(address);
    dispatch({type: 'UPDATE_ITEMS', payload: items})

    console.log('Updated!')
    setTimeout(() => {
        setUpdated(false)
        setTransacting(false)        
    }, 1000)
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
      setTransacting(true)
      const tx = await stakingContract.unstake(tokenId) 
      await tx.wait()
      update();
    } catch (error) {
      alert("Already Unstaked, or Not Done With Quest")
    }
  }


  const approveAddress = async () => {
    const ethers = require('ethers')
    const network = 'rinkeby'
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const alchemistContract = new ethers.Contract(AlchemistNFTAddress, alchemistABI, signer)

    // get tokenId
    try {
      // Add potion to the tokenId mapping in the contract
      const tx = await alchemistContract.setApprovalForAll(nftStakingAddress, true) 
      await tx.wait()
      const approved = await getApproved(address)
      dispatch({type: 'UPDATE_APPROVALS', payload: approved})
      console.log('Updated!')
    } catch (error) {
      alert("Rejected or Approval Gone Wrong")
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
        <div style={{width: '100vw', height: '97vh'}}>
          {transacting && <Transaction message={!updated ? 'Returning From Quest' : 'ITEMS FOUND!!!'} />}
          {questBool && <Popup  handleClose={handleQuestClose} 
                                content={<QuestPopUp 
                                          handleClose={handleQuestClose} 
                                          nftArray={nftArray}
                                          contractAddress={nftStakingAddress} />}  />}   
          <div style={{display: 'grid',justifyItems: 'center', maxWidth: '1130px',
                  alignItems: 'center', border: 'double 5px white', margin: 'auto',
                  position: 'sticky', top: 'calc(50% - 270px)', maxHeight: '600px' }}>
              <h1 style={{color: 'white'}}>Explore the Forest</h1>
              <div style={{display: 'grid', gridTemplateColumns: '1fr',gap: '1rem'}}>
                  <div>
                    <div style={{display: 'flex', gap: '2rem', alignItems: 'center'}}>
                      {approved ? <button style={{width:'150px', height:'40px'}} onClick={() => setQuest(true)}>Go On Quest</button> : 
                      <button style={{width:'150px', height:'40px'}} onClick={()=> approveAddress()}>Approve Quest</button>  }
                      <h4 style={{color:'white'}}>NFT Staked: {tokenIds.length}</h4>
                    </div>
                    <div style={{display: 'grid'}}>
                      <div style={{display: 'grid', borderBottom: 'solid 2px white', marginBottom: '1rem', gridTemplateColumns: '0.5fr 1fr 1fr 1fr'}}>
                          <p>ID</p>
                          <p>Time Left</p>
                          <p>Potion</p>
                          <p>Quest Status</p>
                      </div>
                      {timeStaked.map((tokenTime: number, index: number) => 
                        <div key={index} style={{display: 'grid', alignItems: 'center', gridTemplateColumns: '0.5fr 1fr 1fr 1fr'}}>
                          <p><span style={{fontSize: '0px'}}>{timeStaked[index]}</span>#{tokenIds[index]}</p>
                          {!unstakeArray[index] 
                            ? <Countdown
                              date={Date.now() + (tokenTime * 1000)}
                              renderer={renderer} 
                              onComplete={() => changeBoolArray(index)} /> 
                          
                            : <p>Done!</p>} 
                            
                            
                                    
                          <p>potion</p>
                          
                          {/* {!potionIdArray[index] ? <button onClick={addPotion(tokenId, potionIdArray[index])} >+</button> : <h6>{potionIdArray[index]}</h6>} */}
                          {!unstakeArray[index] ? <h6>Not Done With Quest</h6> : <button onClick={() => unstake(tokenIds[index])}>Complete Quest</button>  }
                        </div>
                      )}
                    </div>
                  </div>

                {/* onClick={() => quest(tokenId) */}
              </div>
              <br></br>
              <Link to={'/app'} className='auth'><h3 className='quest-map'>Back to Map {'-->'}</h3></Link>
          </div>
        </div> : loading ? <div style={{width: '100%', height: '80vh', display: 'grid', 
                        justifyItems: 'center',alignContent: 'center', margin: 0}}>
                <p>Loading ...</p>
                <img src={loadingGif} alt="loading-gif" />
            </div> : !connected ? <div style={{width: '100%', height: '80vh', display: 'grid', 
                        justifyContent: 'center', alignItems: 'center'}}>
                <p>connect Wallet</p>
            </div>  : <p>Refresh Page</p>}
      </>
    )
}
