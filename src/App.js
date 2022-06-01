import React, { useState } from 'react'
import { ethers, getDefaultProvider } from 'ethers';
import { useAppDispatch, useAppSelector } from './components/store/hooks';
import { store } from './components/store/store';
import { tokenABI } from './components/assets/helpers/tokenABI';

export const App = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [connected, setConnected] = useState(false);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(0.0);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');

    const count = store.getState()
    const dispatch = useAppDispatch();

    const chainChangedHandler = () => {
        window.location.reload()
    }
    
    const connectWalletHandler = () => {
        if (connected === false){
            if (window.ethereum) {
                window.ethereum.request({method: 'eth_requestAccounts'})
                .then(result => {
                    setDefaultAccount(result[0]);
                    getUserBalance(result[0]);
                    setConnButtonText(result[0].slice(0,6)+ '...');
                    setConnected(true);
                }) 
            } else {
                setConnected(false);
                setDefaultAccount('');
                setUserBalance(0.0);
                dispatch({type: 'UPDATE_ITEMS', payload: 0})
                setConnButtonText('Connect Wallet'); 
            }
        } else {
            setConnected(false);
            setDefaultAccount('');
            setUserBalance(0.0);
            dispatch({type: 'UPDATE_ITEMS', payload: 0})
            setConnButtonText('Connect Wallet'); 
        }
    }

    const getUserBalance = (address) => {
        const ethers = require('ethers')
        const network = 'rinkeby' // use rinkeby testnet
        const provider = ethers.getDefaultProvider(network)
        provider.getBalance(address).then((balance) => {
            // convert a currency unit from wei to ether
            const balanceInEth = ethers.utils.formatEther(balance)
            console.log(`balance: ${balanceInEth} ETH`)
        })
    }

    // This was what it was, trying to find a way to implement contract calls to get token balances of multiple coins. 

    // window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
    //     .then(balance => {
    //         setUserBalance(ethers.utils.formatEther(balance));
    //         dispatch({type: 'UPDATE_ITEMS', payload: ethers.utils.formatEther(balance)})
    //         console.log('Retrieving Wallet Contents')
    //         console.log(count)
    //     });
    
    store.subscribe(() => {
        console.log("current state", store.getState().items);
    });
  
    window.ethereum.on('accountsChanged', connectWalletHandler)
    window.ethereum.on('chainChanged', chainChangedHandler)

    return (
        
        <div style={{display: 'flex', justifyContent: 'right', padding: '0.2em'}}>
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
