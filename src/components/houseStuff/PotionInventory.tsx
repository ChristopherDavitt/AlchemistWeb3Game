import React, { Component, useState } from 'react'
import App from '../../App'
import { Link } from 'react-router-dom'

export default class PotionInventory extends Component <{ethBalance: any}> {

  render() {
    const { ethBalance } = this.props
    return (
      <div style={{backgroundColor: 'white', color: 'white'}}>
          <h1 style={{color: 'black'}}>ETH Balance{ethBalance}</h1>
          <Link to="/house">
            <button>X</button>
          </Link>
      </div>
    )
  }
}