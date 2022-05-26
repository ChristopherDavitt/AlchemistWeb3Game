import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export const AlchemyStation = () => {



    return (
      <div style={{backgroundColor: 'black', color: 'white'}}>
          <h1 style={{color: 'white'}}></h1>
          <Link to="/house">
            <button>X</button>
          </Link>
      </div>
    )
}
