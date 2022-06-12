import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../store/hooks';
import { stakingABI } from '../assets/abis/tokenABI';
import alchemistNFTImage from '../assets/images/WizardSprite.png'

export const QuestPopUp = (props: any) =>  {

    const [stakingNFT, setStakingNFT] = useState(false)
    var selected: boolean[] = []

    useEffect(() => {
      const selectedArray: boolean[] = [];
      for (let i=0; i< props.nftArray.length; i++) {
        selectedArray.push(false);
      }
      selected = selectedArray;
      
    }, [])

    const quest = async (tokenId: number, index: number) => {
      const ethers = require('ethers')
      const network = 'rinkeby'
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const stakingContract = new ethers.Contract(props.contractAddress, stakingABI, signer)
      try {
        selected[index] = true
        console.log(selected)
        setStakingNFT(true)
        const tx = await stakingContract.stake(tokenId) 
        selected[index] = false
        await tx.wait()
        console.log('Updated')
        console.log(selected)
      } catch (error) {
        console.log(error)
      }
    }

    return (
        <div style={{display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            backgroundColor: 'black',
            zIndex: '900',
            margin: 'auto',
            overflowY: 'auto'}} >
            <p>NFTs Available</p>
            {props.nftArray.map((tokenId: number, index: number) => 
              <div key={tokenId} style={{display: 'flex', alignItems: 'baseline',
                backgroundColor: `${selected[index] ? 'rgb(15, 15, 15)' : 'black' }`  }} onClick={() => quest(tokenId, index)}>
                <img style={{width: '100px'}} src={alchemistNFTImage}  alt='Alchemist-Image' />
                <p>#{tokenId}</p>
              </div>
            )}
        </div>
    )
}
