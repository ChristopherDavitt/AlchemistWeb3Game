import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { stakingABI } from '../assets/helpers/tokenABI';
import alchemistNFTImage from '../assets/images/WizardSprite.png'
import { getItems, getNFTS, getNftsStakedForest } from '../assets/helpers/getTokens';
import Transaction from './Transaction';
import { potionIndexByLoc } from '../assets/helpers/potionIndexByLoc';
import Popup from './PopUp';
import { PotionPopUp } from './PotionPopUp';

export const QuestPopUp = (props: any) =>  {

    const [transacting, setTransacting] = useState(false);
    const [updated, setUpdated] = useState(false) ;
    const [potionPopUp, setPotionPopUp] = useState(false);
    const [potionId, setPotionId] = useState(0);
    const [tokenId, setTokenId] = useState(0);

    const address = useAppSelector((state) => state.address)

    const dispatch = useAppDispatch()

    const update = async () => {
      setUpdated(true)
      props.update() 
      setTimeout(() => {
          setUpdated(false)
          setTransacting(false)
          props.handleClose();
          
      }, 1000)
    }

    const quest = async (nft:number, potion:number) => {
      const ethers = require('ethers')
      const network = 'rinkeby'
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const stakingContract = new ethers.Contract(props.stakingAddress, stakingABI, signer)
      try {
        setTransacting(true)
        const tx = await stakingContract.stake(nft, potion) 
        await tx.wait()
        setPotionId(0);
        setTokenId(0);
        update();
      } catch (error) {

        console.log(error)
      }
    }

    const handlePotionId = (index: number) => {
      setPotionId(index);
      console.log(tokenId);
      console.log(index)
      quest(tokenId, index);
    }

    const handleTokenId = (index: number) => {
      setTokenId(index);
      setPotionPopUp(true);
    }

    const handleClose = () => {
      setTokenId(0);
      setPotionPopUp(false)
    }

    return (
        <div style={{display: 'grid',
            justifyItems: 'center',
            backgroundColor: 'black',
            zIndex: '900',
            margin: 'auto',
            overflowY: 'auto',
            }} >
            {potionPopUp && <Popup handleClose={props.handleClose} 
                                content={<PotionPopUp  
                                          potionArray={props.potionArray}
                                          handlePotionId={handlePotionId}
                                          stakingAddress={props.stakingAddress}/>} />}
                                          
            {transacting && <Transaction message={!updated ? 'Going on Quest...' : 'See Ya Soon!'} />}
            <p>Alchemists Available</p>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
              {props.nftArray.map((tokenId: number, index: number) => 
                <div key={tokenId} style={{display: 'grid', justifyItems: 'center', cursor: 'pointer'}}
                     onClick={() => handleTokenId(tokenId)}>
                  <img style={{width: '100px'}} src={alchemistNFTImage}  alt='Alchemist-Image' />
                  <p>#{tokenId}</p>
                </div>
              )}
            </div>
        </div>
    )
}
