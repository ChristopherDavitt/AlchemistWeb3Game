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
    
    const [supply, setSupply] = useState<number>()
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
        getSupply();
    }, [minting])

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

    const changeCost = async() => {
        const ethers = require('ethers')
        const network = 'rinkeby'
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const nftContract = new ethers.Contract(AlchemistNFTAddress, alchemistABI, signer)
        try {
            // Add potion to the tokenId mapping in the contract
            setMinting(true)
            const tx = await nftContract.setCost(ethers.utils.parseEther("0.1")) 
            await tx.wait()
            console.log('Cost Changed!')
            setMinting(false) 
          } catch (error) {
            alert("Error in txn")
            console.log(error)
          }
    }

    const withdrawFunds = async() => {
        const ethers = require('ethers')
        const network = 'rinkeby'
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const nftContract = new ethers.Contract(AlchemistNFTAddress, alchemistABI, signer)
        try {
            // Add potion to the tokenId mapping in the contract
            setMinting(true)
            const tx = await nftContract.withdraw() 
            await tx.wait()
            console.log('withdrew Funds!')
            setMinting(false) 
          } catch (error) {
            alert("Error in txn")
            console.log(error)
          }
    }

    const transferItems = () => {
        transferTokens()
    }

    const allowCreatures = () => {
        allowCreatureContracts();
    }

    return (
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}>
            <div style={{width: '95vw', height: '89vh'}}>
                <div style={{margin: 'auto', position: 'sticky', top: 'calc(50% - 270px)'}} className="Minter">
                    <h1 style={{textAlign: 'center'}} className='minter-h'>Start Your Adventure</h1>
                    <div style={{justifyContent: 'center', display: 'grid'}}>
                        <img style={{margin: 'auto', width: '300px'}} src={nftImage} alt='nftImage' ></img>
                        <p className='minter-h'>Price: {cost} ETH</p>
                        <p className='minter-h'>Supply: {supply}/10000</p>
                        <p className='minter-h'>Mint Amount: {count} <span><button onClick={handleNegate}>-</button><button onClick={handlePlus} >+</button></span></p>
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
