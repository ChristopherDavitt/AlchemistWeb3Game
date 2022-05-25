import React, { useState, Component } from 'react'
import App from '../../App'
import { Link } from 'react-router-dom'

export default class ItemInventory extends Component<{ethBalance: number}> {
  render() {

    const { ethBalance } = this.props;

    return (
      <div style={{
       
        width: 'calc(100vw - 200px)',
        height: 'calc(100vh - 200px)',
        backgroundColor: 'white',
        color: 'white'}}>
          <h1 style={{color: 'white'}}>{ethBalance}</h1>
          <Link to="/house">
            <button>X</button>
          </Link>
      </div>
    )
  }
}
