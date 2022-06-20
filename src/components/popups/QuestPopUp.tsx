import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { stakingABI } from '../assets/helpers/tokenABI';
import alchemistNFTImage from '../assets/images/WizardSprite.png'
import { getItems, getNFTS, getNftsStakedForest } from '../assets/helpers/getTokens';
import Transaction from './Transaction';

export const QuestPopUp = (props: any) =>  {

    const [transacting, setTransacting] = useState(false)
    const [updated, setUpdated] = useState(false) 
    
    const address = useAppSelector((state) => state.address)

    const dispatch = useAppDispatch()

    const update = async () => {
      setUpdated(true)
      const staked = await getNftsStakedForest(address)
      dispatch({type: 'NFTS_STAKED_FOREST', payload: staked})

      const nftAvail = await getNFTS(address);
      dispatch({type: 'NFTS_AVAIL', payload: nftAvail})
      console.log('Updated!')  
      setTimeout(() => {
          setUpdated(false)
          setTransacting(false)
          props.handleClose();
          
      }, 1000)
  }

    const quest = async (tokenId: number, index: number) => {
      const ethers = require('ethers')
      const network = 'rinkeby'
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const stakingContract = new ethers.Contract(props.contractAddress, stakingABI, signer)
      try {
        setTransacting(true)
        const tx = await stakingContract.stake(tokenId) 
        await tx.wait()
        update();
      } catch (error) {
        console.log(error)
      }
    }

    return (
        <div style={{display: 'grid',
            justifyItems: 'center',
            backgroundColor: 'black',
            zIndex: '900',
            margin: 'auto',
            overflowY: 'auto',
            }} >
            {transacting && <Transaction message={!updated ? 'Going on Quest...' : 'See Ya Soon!'} />}
            <p>Alchemists Available</p>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
              {props.nftArray.map((tokenId: number, index: number) => 
                <div key={tokenId} style={{display: 'grid', justifyItems: 'center', cursor: 'pointer'}}
                     onClick={() => quest(tokenId, index)}>
                  <img style={{width: '100px'}} src={alchemistNFTImage}  alt='Alchemist-Image' />
                  <p>#{tokenId}</p>
                </div>
              )}
            </div>
        </div>
    )
}
