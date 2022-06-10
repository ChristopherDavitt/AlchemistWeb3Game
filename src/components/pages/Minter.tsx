import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { alchemistABI } from '../assets/abis/tokenABI';
import { AlchemistNFTAddress } from '../assets/contractAddresses/contractAddresses';



export const Minter = () => {
    
    const [supply, setSupply] = useState<number>()
    const [count, setCount] = useState(1)
    const [minting, setMinting] = useState(false)

    const cost = 0.1

    function handleNegate () {
        if (count > 1) {
            setCount(count - 1)
        }
    }
    function handlePlus () {
        if (count < 5) {
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

    return (
        <div style={{padding: '1rem'}} className="Minter">
            <h1 style={{justifyContent: 'center', display: 'grid'}} className='minter-h'>Start Your Adventure Here</h1>
            <div style={{justifyContent: 'center', display: 'grid'}}>
                <img src={'#'}></img>
                <h2 className='minter-h'>Price: {cost} FTM</h2>
                <h2 className='minter-h'>Supply: {supply}/10000</h2>
                <h2 className='minter-h'>Mint Amount: {count} <span><button onClick={handleNegate}>-</button><button onClick={handlePlus} >+</button></span></h2>
            </div>
            <br></br>
            <div style={{justifyContent: 'center', display:'flex', alignItems: 'center'}}>
                <button style={{width: '200px', height: '50px'}} onClick={() => mint(count)} >Mint</button>
                <button style={{width: '200px', height: '50px'}} onClick={() => changeCost()} >Change Cost</button>
            </div>
            <br></br>
            <br></br>
            <Link style={{justifyContent: 'center', display:'grid'}} to={'/'}>Back to Home</Link>
        </div>
    );
}
