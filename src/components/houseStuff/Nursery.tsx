import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Nursery extends Component {
  render() {
    return (
      <div>
          <h1>Coming Soon!</h1>
          <Link to="/house">Back to house</Link>
          
      </div>
    )
  }
}
