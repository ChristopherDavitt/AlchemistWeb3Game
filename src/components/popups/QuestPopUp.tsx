import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../store/hooks';
import { stakingABI } from '../assets/abis/tokenABI';

export const QuestPopUp = (props: any) =>  {

    const [stakingNFT, setStakingNFT] = useState(false)
    const [tokenIdArray, setTokenIdArray] = useState<number[]>([])

    useEffect(() => {
      setTokenIdArray(props.nftArray)
    })

    const quest = async (tokenId: number) => {
        const ethers = require('ethers')
        const network = 'rinkeby'
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const stakingContract = new ethers.Contract(props.contractAddress, stakingABI, signer)
        try {
          setStakingNFT(true)
          const tx = await stakingContract.stake(tokenId) 
          await tx.wait()
          console.log('Updated')
          setStakingNFT(false) 
        } catch (error) {
          alert("No NFT Available to Stake")
        }
      }

    return (
        <div style={{display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            width: '98vw',
            height: '90vh',
            backgroundColor: 'black',
            position: 'absolute',
            zIndex: '900',
            paddingLeft: '1rem'}} >
            {tokenIdArray.map((tokenId: number, index: number) => 
                <div key={tokenId} style={{display: 'grid'}} onClick={() => quest(tokenId)}>
                    <img key={index} src='#' alt='Alchemist-Image' />
                    <h6 key={tokenId+10001} >{tokenId}</h6>
                </div>
            )}

        </div>
    )
}
