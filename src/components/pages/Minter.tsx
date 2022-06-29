import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { alchemistABI } from '../assets/helpers/tokenABI';
import { AlchemistNFTAddress } from '../assets/helpers/contractAddresses';
import { useAppSelector } from '../store/hooks';
import nftImage from '../assets/images/AlchemistGameNFTAlternate.png'
import { transferTokens, allowCreatureContracts } from '../assets/helpers/getTokens';
import loadingGif from '../assets/images/LoadingGif.gif'

export const Minter = () => {
    
    const [supply, setSupply] = useState<any>('???')
    const [count, setCount] = useState(1)
    const [minting, setMinting] = useState(false)

    const connected = useAppSelector((state) => state.connected)

    const cost = 0.1
    const maxMint = 10

    function handleNegate () {
        if (count > 1) {
            setCount(count - 1)
        }
    }
    function handlePlus () {
        if (count < maxMint) {
            setCount(count + 1)
        }
    }

    useEffect(() => {
        if (connected) {
            getSupply();
        }
    }, [minting, connected])

    const getSupply = async () => {
        const ethers = require('ethers')
        const network = 'rinkeby'
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const nftContract = new ethers.Contract(AlchemistNFTAddress, alchemistABI, provider)
        const supply = await nftContract.totalSupply()
        console.log(parseInt(supply._hex, 16))
        setSupply(parseInt(supply._hex, 16))
    }

    const mint = async (_count: number) => {
        const value = _count * cost
        const ethers = require('ethers')
        const network = 'rinkeby'
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const nftContract = new ethers.Contract(AlchemistNFTAddress, alchemistABI, signer)
        try {
            // Add potion to the tokenId mapping in the contract
            setMinting(true)
            const tx = await nftContract.mint(_count, {value: ethers.utils.parseEther(String(value))} ) 
            await tx.wait()
            console.log('Minted!')
            setMinting(false) 
          } catch (error) {
            alert("Error in txn")
            console.log(error)
          }
    }

    return (
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}>
            <div style={{width: '100vw', height: 'calc(95vh - 40px)'}}>
                <div style={{margin: 'auto', position: 'sticky', top: 'calc(50% - 270px)'}} className="Minter">
                    <p style={{textAlign: 'center', fontSize: '32px', margin: '5px 0'}}>Start Your Adventure</p>
                    <div style={{display: 'flex', margin: 'auto', justifyContent: 'center'}}>
                        <div>
                            <img style={{margin: 'auto', width: '50vh', maxWidth: '320px'}} src={nftImage} alt='nftImage' ></img>
                            <p style={{margin: '20px auto'}}>Price: {cost} RETH</p>
                            <p style={{margin: '20px auto'}}>Supply: {supply}/10000</p>
                            <p style={{margin: 'auto', display: 'flex', alignItems: 'center', gap: '10px'}}>Mint Amount: <span><button onClick={handleNegate}>-</button></span> {count} <span><button onClick={handlePlus} >+</button></span></p>
                        </div>
                    </div>
                    <br></br>
                    <div style={{justifyContent: 'center', display:'flex', alignItems: 'center'}}>
                        {connected ? <button style={{width: '200px', height: '50px'}} onClick={() => mint(count)} >Mint</button>
                                    : <button style={{width: '200px', height: '50px'}} disabled>Connect Wallet</button> }
                        {/* <button style={{width: '200px', height: '50px'}} onClick={() => allowCreatures()} >Change Cost</button> */}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
