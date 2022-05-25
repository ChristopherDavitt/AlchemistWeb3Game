import React, { Component } from 'react'
import { ethers } from 'ethers';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            connected: false,
            defaultAccount: null,
            userBalance: 0.0,
            connButtonText: 'Connect Wallet'
        }
    }
  
    chainChangedHandler = () => {
        window.location.reload()
    }

    connectWalletHandler = () => {
        if (this.state.connected === false){
            if (window.ethereum) {
                window.ethereum.request({method: 'eth_requestAccounts'})
                .then(result => {
                    this.accountChangeHandler(result[0]);
                    this.setState({connected: true})
                }) 
            } else {
                this.setState({connButtonText: 'Install Metamask'}) 
            }
        } else {
            this.setState({connected: false});
            this.setState({defaultAccount: ''});
            this.setState({userBalance: 0.0});
            this.setState({connButtonText: 'Connect Wallet'});
        }
    }

    getUserBalance = (address) => {
        window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
        .then(balance => {
            this.setState({userBalance: ethers.utils.formatEther(balance)});
        })
    }

    accountChangeHandler = (newAccount) => {
        this.setState({defaultAccount: newAccount});
        this.getUserBalance(newAccount);
        this.setState({connButtonText: newAccount.slice(0,6)+ '...'})
    }

    
    
    render(){
        window.ethereum.on('accountsChanged', this.accountChangeHandler)
        window.ethereum.on('chainChanged', this.chainChangedHandler)
        return (
            <div style={{display: 'flex', justifyContent: 'right', padding: '0.2em'}}>
                <button style={{
                    width: '140px',
                    height: '40px',
                    fontSize: '12px',
                    border: 'solid 3px black',
                    borderRadius: '10px'
                    }} onClick={this.connectWalletHandler}>
                    {this.state.connButtonText}
                </button>
            </div>
        )
    }
}
