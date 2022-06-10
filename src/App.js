import React, { useState } from 'react'
import { ethers, providers, getDefaultProvider, EtherscanProvider } from 'ethers';
import { useAppDispatch, useAppSelector } from './components/store/hooks';
import { store } from './components/store/store';
import { tokenABI, potionBrewABI, alchemistABI, stakingABI, creatureABI } from './components/assets/abis/tokenABI';
import { berryAddress, AlchemistNFTAddress, grapeAddress, fungusAddress, potion1Address,
     potion2Address, potion3Address, creature1Address, creature2Address, creature3Address, 
     nftStakingAddress } from './components/assets/contractAddresses/contractAddresses';
import { networks } from './components/assets/helpers/networks';

export const App = () => {
    
    const [errorMessage, setErrorMessage] = useState();
    const [connected, setConnected] = useState(false);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(0.0);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');

    const handleChainChange = () => {
        window.location.reload()
    }

    const dispatch = useAppDispatch();
    
    const handleNetworkSwitch = async (networkName) => {
        setErrorMessage();
        await changeNetwork({ networkName, setErrorMessage })
    }
    
    const changeNetwork = async ({ networkName, setErrorMessage }) => {
        try {
            if (!window.ethereum) throw new Error('No Crypto Wallet Found');
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    ...networks[networkName]
                }]
            })
        } catch (err) {
            setErrorMessage(err.message);
        }
    }

    const connectWalletHandler = () => {
        if (connected === false){
            if (window.ethereum) {
                // Trigger network switch
                if (window.ethereum.networkVersion != 4) {
                    handleNetworkSwitch('polygon')
                } else {
                    window.ethereum.request({method: 'eth_requestAccounts'})
                    .then(result => {
                        setDefaultAccount(result[0]);
                        setConnButtonText(result[0].slice(0,6)+ '...');
                        setConnected(true);
                        dispatch({type: 'CONNECT_WALLET'});
                        dispatch({type: 'UPDATE_ADDRESS', payload: result[0]});
                        getUserBalance(result[0]);
                        console.log('Account Updated')
                    })
                } 
            } else {
                setConnected(false);
                dispatch({type: 'DISCONNECT_WALLET'});
                dispatch({type: 'UPDATE_ADDRESS', payload: '0x0000000000000000000000000000000000000000'});
                setDefaultAccount('');
                setUserBalance(0.0);
                dispatch({type: 'UPDATE_ITEMS', payload: {} });
                setConnButtonText('Connect Wallet'); 
            }
        } else {
            setConnected(false);
            dispatch({type: 'DISCONNECT_WALLET'});
            dispatch({type: 'UPDATE_ADDRESS', payload: '0x0000000000000000000000000000000000000000'});
            setDefaultAccount('');
            setUserBalance(0.0);
            dispatch({type: 'UPDATE_ITEMS', payload: {} });
            setConnButtonText('Connect Wallet'); 
        }
    }

    const getUserBalance = async (address) => {
        const ethers = require('ethers')
        const network = 'rinkeby'
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const berryContract = new ethers.Contract(berryAddress, tokenABI, provider)
        const grapeContract = new ethers.Contract(grapeAddress, tokenABI, provider)
        const fungusContract = new ethers.Contract(fungusAddress, tokenABI, provider)
        const nftStakingContract = new ethers.Contract(nftStakingAddress, stakingABI, provider)
        const alchemistNFTContract = new ethers.Contract(AlchemistNFTAddress, potionBrewABI, provider)
        const creature1Contract = new ethers.Contract(creature1Address, creatureABI, provider)
        const creature2Contract = new ethers.Contract(creature2Address, creatureABI, provider)
        const creature3Contract = new ethers.Contract(creature3Address, creatureABI, provider)
        const potion1Contract = new ethers.Contract(potion1Address, potionBrewABI, provider)
        const potion2Contract = new ethers.Contract(potion2Address, potionBrewABI, provider)
        const potion3Contract = new ethers.Contract(potion3Address, potionBrewABI, provider)
        
        try {
            const berryBalance = await berryContract.balanceOf(address);
            const grapeBalance = await grapeContract.balanceOf(address);
            const fungusBalance = await fungusContract.balanceOf(address);
            const itemObject = [
                parseInt(berryBalance._hex, 16),
                parseInt(grapeBalance._hex, 16),
                parseInt(fungusBalance._hex, 16),
            ]
            dispatch({type: 'UPDATE_ITEMS', payload: itemObject})
        } catch (error) {
            console.log('Gettings Items' + error)
        }
        try {
            const creature1Balance = await creature1Contract.balanceOf(address);
            const creature2Balance = await creature2Contract.balanceOf(address);
            const creature3Balance = await creature3Contract.balanceOf(address);
            console.log('Creature 1 Balance' + creature1Balance)
            const creatureObject = [
                parseInt(creature1Balance._hex, 16),
                parseInt(creature2Balance._hex, 16),
                parseInt(creature3Balance._hex, 16),
            ]
            dispatch({type: 'UPDATE_CREATURES', payload: creatureObject})
        } catch (error) {
            console.log('Gettings Creatures' + error)
        }
        try {
            const potion1Balance = await potion1Contract.balanceOf(address);
            const potion2Balance = await potion2Contract.balanceOf(address);
            const potion3Balance = await potion3Contract.balanceOf(address);
            console.log('Potion 1 Balance' + potion1Balance)
            const potionObject = [
                parseInt(potion1Balance._hex, 16),
                parseInt(potion2Balance._hex, 16),
                parseInt(potion3Balance._hex, 16),
            ]
            dispatch({type: 'UPDATE_POTIONS', payload: potionObject})
        } catch (error) {
            console.log('Gettings Potions ' + error)
        }
        try {
            const nftStakingBalance = await nftStakingContract.getMapping(address);
            const newArray = [];
            nftStakingBalance.forEach((e) => newArray.push(parseInt(e._hex, 16)))
            console.log(newArray)
            const nftStakedObject = {
                forest: newArray,
            }
            dispatch({type: 'NFTS_STAKED', payload: nftStakedObject})
        } catch (error) {
            console.log('Gettings NFT Staked ' + error)
        }
        try {
            const nftBalance = await alchemistNFTContract.balanceOf(address);
            console.log('Getting Available NFTs: ' + nftBalance)
            
            const tokenIdArray = []
            for (let i=0; i<parseInt(nftBalance._hex, 16); i++) {
                const tokenId = await alchemistNFTContract.tokenOfOwnerByIndex(address, i)
                tokenIdArray.push(parseInt(tokenId._hex, 16))
            }

            console.log(tokenIdArray)
            dispatch({type: 'NFTS_AVAIL', payload: tokenIdArray})
        } catch (error) {
            console.log('Gettings NFTs ' + error)
        }

    }
  

    window.ethereum.on('accountsChanged', connectWalletHandler)
    window.ethereum.on('chainChanged', handleChainChange)
    

    return (
        
        <div style={{display: 'flex', justifyContent: 'right', padding: '0.2em'}} >
            <button style={{
                width: '140px',
                height: '40px',
                fontSize: '12px',
                border: 'solid 3px black',
                borderRadius: '10px'
                }} onClick={connectWalletHandler}>
                {connButtonText}
            </button>
        </div>
        
    )
    
}
