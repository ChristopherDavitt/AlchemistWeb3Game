import React, { useState } from 'react'
import { ethers, providers, getDefaultProvider, EtherscanProvider } from 'ethers';

import {getCreatures, getItems, getNFTS, getNftsStakedForest, getPotions} from './components/assets/helpers/getTokens/getTokens'
import { useAppDispatch, useAppSelector } from './components/store/hooks';
import { store } from './components/store/store';
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
                        getUserBalance(result[0]);
                        dispatch({type: 'LOADING'});
                        dispatch({type: 'UPDATE_ADDRESS', payload: result[0]});
                    })
                } 
            } else {
                setConnected(false);
                setDefaultAccount('');
                setUserBalance(0.0);
                setConnButtonText('Connect Wallet'); 
                dispatch({type: 'DISCONNECT_WALLET'});
            }
        } else {
            setConnected(false);
            setDefaultAccount('');
            setUserBalance(0.0);
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
        console.log(forestStaked)
        dispatch({type: 'NFTS_STAKED_FOREST', payload: forestStaked})
        dispatch({type: 'CONNECT_WALLET'});
        dispatch({type: 'FINISH_LOADING'});
        console.log('Account Updated')
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
