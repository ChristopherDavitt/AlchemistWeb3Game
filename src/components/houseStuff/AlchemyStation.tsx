import React, { useState } from 'react'
import App from '../../App'
import { Link } from 'react-router-dom'

export default class AlchemyStation extends App {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div style={{backgroundColor: 'black', color: 'white'}}>
          <h1 style={{color: 'white'}}>{this.state.userBalance}</h1>
          <Link to="/house">
            <button>X</button>
          </Link>
      </div>
    )
  }
}
