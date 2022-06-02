import React, { useState } from 'react'
import { ethers, providers, getDefaultProvider, EtherscanProvider } from 'ethers';
import { useAppDispatch, useAppSelector } from './components/store/hooks';
import { store } from './components/store/store';
import { tokenABI } from './components/assets/helpers/tokenABI';


export const App = () => {
    
    const [errorMessage, setErrorMessage] = useState();
    const [connected, setConnected] = useState(false);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(0.0);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    
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

    const handleChainChange = () => {
        window.location.reload()
    }

    const count = store.getState()
    const dispatch = useAppDispatch();

    const networks = {
        polygon: {
          chainId: `0x${Number(137).toString(16)}`,
          chainName: "Polygon Mainnet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
          },
          rpcUrls: ["https://polygon-rpc.com/"],
          blockExplorerUrls: ["https://polygonscan.com/"]
        },
        mumbai: {
          chainId: `0x${Number(80001).toString(16)}`,
          chainName: "Polygon Testnet Mumbai",
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
          },
          rpcUrls: [
            "https://matic-mumbai.chainstacklabs.com",
            "https://rpc-mumbai.maticvigil.com",
            "https://matic-testnet-archive-rpc.bwarelabs.com"
            ],
          blockExplorerUrls: ["https://mumbai.polygonscan.com"]
        }
      };

    const handleNetworkSwitch = async (networkName) => {
        setErrorMessage();
        await changeNetwork({ networkName, setErrorMessage })
    }

    const connectWalletHandler = () => {
        if (connected === false){
            if (window.ethereum) {
                if (window.ethereum.networkVersion != 137) {
                    handleNetworkSwitch('polygon')
                } else {
                    window.ethereum.request({method: 'eth_requestAccounts'})
                    .then(result => {
                        setDefaultAccount(result[0]);
                        getUserBalance(result[0]);
                        setConnButtonText(result[0].slice(0,6)+ '...');
                        setConnected(true);
                        console.log('Account Updated')
                    })
                } 
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
        const network = 'matic'
        const provider = new ethers.providers.InfuraProvider(network)
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
  
    window.ethereum.on('accountsChanged', connectWalletHandler)
    window.ethereum.on('chainChanged', handleChainChange)

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
