import React, { useState } from 'react'
import { ethers, providers, getDefaultProvider, EtherscanProvider } from 'ethers';

import {getApproved, getCreatures, getItems, getNFTS, getNftsStakedForest, getPotions} from './components/assets/helpers/getTokens'
import { useAppDispatch, useAppSelector } from './components/store/hooks';
import { store } from './components/store/store';
import { networks } from './components/assets/helpers/networks';
import { Link } from 'react-router-dom';

export const App = () => {
    
    const [error, setError] = useState();
    const [connected, setConnected] = useState(false);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');

    const handleChainChange = () => {
        window.location.reload()
    }

    const dispatch = useAppDispatch();
    
    const handleNetworkSwitch = async (networkName) => {
        setError();
        await changeNetwork({ networkName, setError })
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
            setError(err.message);
        }
    }

    const connectWalletHandler = () => {
        if (!connected){
            if (window.ethereum) {
                // Trigger network switch
                if (window.ethereum.networkVersion != 4) {
                    handleNetworkSwitch('polygon')
                } else {
                    window.ethereum.request({method: 'eth_requestAccounts'})
                    .then(result => {
                        setConnButtonText(result[0].slice(0,6)+ '...');
                        getUserBalance(result[0]);
                        dispatch({type: 'LOADING'});
                        dispatch({type: 'UPDATE_ADDRESS', payload: result[0]});
                        dispatch({type: 'CONNECT_WALLET'});
                    })
                } 
            } else {
                setConnected(false);
                setConnButtonText('Connect Wallet'); 
                dispatch({type: 'DISCONNECT_WALLET'});
            }
        } else {
            setConnected(false);
            setConnButtonText('Connect Wallet'); 
            dispatch({type: 'DISCONNECT_WALLET'});
        }
    }

    const getUserBalance = async (address) => {
        const creatures = await getCreatures(address);
        dispatch({type: 'UPDATE_CREATURES', payload: creatures})
        const items = await getItems(address);
        dispatch({type: 'UPDATE_ITEMS', payload: items})
        const potions = await getPotions(address);
        dispatch({type: 'UPDATE_POTIONS', payload: potions})
        const nfts = await getNFTS(address);
        dispatch({type: 'NFTS_AVAIL', payload: nfts})
        const forestStaked = await getNftsStakedForest(address);
        dispatch({type: 'NFTS_STAKED_FOREST', payload: forestStaked})
        const oceanStaked = await getNftsStakedForest(address);
        dispatch({type: 'NFTS_STAKED_OCEAN', payload: oceanStaked})
        const swampStaked = await getNftsStakedForest(address);
        dispatch({type: 'NFTS_STAKED_SWAMP', payload: swampStaked})
        const approvals = await getApproved(address);
        dispatch({type: 'UPDATE_APPROVALS', payload: approvals})
        dispatch({type: 'FINISH_LOADING'});
        console.log('Account Updated!')
    }
  
    window.ethereum.on('accountsChanged', connectWalletHandler)
    window.ethereum.on('chainChanged', handleChainChange)
    
    return (
        
        <div style={{display: 'flex', justifyContent: 'space-between', margin: 'auto', padding: '0.2em', maxWidth: '1150px',
                    position: 'sticky', top: 'calc(50% - 325px)' }} >
            <Link style={{justifyContent: 'center', display:'grid', textDecoration: 'none'}} to={'/'}>
                <button style={{width:'150px', height:'40px', cursor: 'pointer'}}>Start Menu</button>
            </Link>
            <button style={{width:'150px', height:'40px', cursor: 'pointer'}} 
                    onClick={connectWalletHandler}>
                {connButtonText}
            </button>
        </div>
        
    )
    
}
