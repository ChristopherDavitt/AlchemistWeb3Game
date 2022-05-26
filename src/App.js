import React, { useState } from 'react'
import { ethers } from 'ethers';
import { useAppDispatch, useAppSelector } from './components/store/hooks';
import { store } from './components/store/store';

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
                dispatch({type: 'UPDATE', payload: 0})
                setConnButtonText('Connect Wallet'); 
            }
        } else {
            setConnected(false);
            setDefaultAccount('');
            setUserBalance(0.0);
            dispatch({type: 'UPDATE', payload: 0})
            setConnButtonText('Connect Wallet'); 
        }
    }

    const getUserBalance = (address) => {
        window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
        .then(balance => {
            setUserBalance(ethers.utils.formatEther(balance));
            dispatch({type: 'UPDATE', payload: ethers.utils.formatEther(balance)})
            console.log('Retrieving Wallet Contents')
            console.log(count)
        })
    }

    
    store.subscribe(() => {
        console.log("current state", store.getState());
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
