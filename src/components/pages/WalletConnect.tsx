import React, { useEffect, useState } from 'react'
import { ethers, providers, getDefaultProvider } from 'ethers';

import {getApproved, getCreatures, getItems, getNFTS, 
        getNftsStakedForest, getPotions, getNftsStakedSwamp, 
        getNftsStakedOcean} from '../assets/helpers/getTokens'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { networks } from '../assets/helpers/networks';
import { Link } from 'react-router-dom';

export const WalletConnect = () => {
    
    const [error, setError] = useState();
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');

    const connected = useAppSelector((state) => state.connected)

    useEffect(() => {

        window.ethereum.on('accountsChanged', connectWalletHandler)
        window.ethereum.on('chainChanged', handleChainChange)

        return () => {
            window.ethereum.removeListener('accountsChanged', connectWalletHandler)
            window.ethereum.removeListener('chainChanged', handleChainChange)
        }
    },[])

    const handleChainChange = () => {
        window.location.reload()
    }

    const dispatch = useAppDispatch();
    
    const handleNetworkSwitch = async (networkName: PropertyKey) => {
        setError(undefined);
        await changeNetwork({ networkName, setError })
    }
    
    const changeNetwork = async ({ networkName, setError }: 
                                {networkName:PropertyKey,
                                 setError:React.Dispatch<React.SetStateAction<undefined>>}) => {
        try {
            if (!window.ethereum) throw new Error('No Crypto Wallet Found');
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    ...networks[networkName]
                }]
            })
        } catch (err: any) {
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
                    .then((result: string[]) => {
                        setConnButtonText(result[0].slice(0,6)+ '...');
                        dispatch({type: 'DISCONNECT_WALLET'})
                        getUserBalance(result[0]);
                        dispatch({type: 'LOADING'});
                        dispatch({type: 'UPDATE_ADDRESS', payload: result[0]});
                        dispatch({type: 'CONNECT_WALLET'})
                    })
                } 
            } else {
                setConnButtonText('Connect Wallet'); 
                dispatch({type: 'DISCONNECT_WALLET'});
            }
        } else {
            setConnButtonText('Connect Wallet'); 
            dispatch({type: 'DISCONNECT_WALLET'});
        }
    }

    const getUserBalance = async (address: string) => {
        
        var NFTvalidator = 0

        const nfts = await getNFTS(address);
        NFTvalidator += nfts.length
        dispatch({type: 'NFTS_AVAIL', payload: nfts})

        const forestStaked = await getNftsStakedForest(address);
        NFTvalidator += forestStaked.length
        dispatch({type: 'NFTS_STAKED_FOREST', payload: forestStaked})

        const oceanStaked = await getNftsStakedOcean(address);
        NFTvalidator += oceanStaked.length
        dispatch({type: 'NFTS_STAKED_OCEAN', payload: oceanStaked});

        const swampStaked = await getNftsStakedSwamp(address);
        NFTvalidator += oceanStaked.length
        dispatch({type: 'NFTS_STAKED_SWAMP', payload: swampStaked});

        if (NFTvalidator > 0) {
            const approvals = await getApproved(address);
            dispatch({type: 'UPDATE_APPROVALS', payload: approvals});
            const creatures = await getCreatures(address);
            dispatch({type: 'UPDATE_CREATURES', payload: creatures});
            const items = await getItems(address);
            dispatch({type: 'UPDATE_ITEMS', payload: items});
            const potions = await getPotions(address);
            dispatch({type: 'UPDATE_POTIONS', payload: potions});
        
            dispatch({type: 'FINISH_LOADING'});
            dispatch({type: 'CONNECT_WALLET'});
        } else {
            dispatch({type: 'FINISH_LOADING'});
            dispatch({type: 'CONNECT_WALLET'});
        }

        console.log('Account Updated!')
    }

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
