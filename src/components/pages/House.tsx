import React, { Component } from 'react'
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import homeImage from '../assets/images/House.png'
import AlchemyStation from '../houseStuff/AlchemyStation'
import ItemInventory from '../houseStuff/ItemInventory'
import PotionInventory from '../houseStuff/PotionInventory'

export default class House extends Component <{ ethBalance:any }> {
    
  render() {

    const { ethBalance } = this.props
    return (
        
        <div style={{
            backgroundImage: `url(${homeImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100vw',
            height: 'calc(100vh - 70px)',
            zIndex: '1000'
        }}>
           
                <div style={{
                    position: 'fixed',
                    left: 'calc(50% - 575px)',
                    top: 'calc(50% + 8px)'
                }} className='house-div'>
                    <Link to="/app/house/alchemy-table" className='auth'><h4 className='map-h4'>Alchemy Table</h4></Link>
                </div>
                <div style={{
                    position: 'fixed',
                    left: 'calc(50%)',
                    top: 'calc(50% - 90px)'
                }} className='house-div'>
                    <Link to="/app/house/potion-inventory" className='auth'><h4 className='map-h4'>Potion Inventory</h4></Link>
                </div>
                <div style={{
                    position: 'fixed',
                    left: 'calc(50% + 310px)',
                    top: 'calc(50% + 50px)'
                }} className='house-div'>
                    <Link to="/app/house/item-inventory" className='auth'><h4 className='map-h4'>Item Inventory</h4></Link>
                </div>
                <div style={{
                    position: 'fixed',
                    left: 'calc(50% - 205px)',
                    top: 'calc(50% - 40px)'
                }} className='house-div'>
                    <Link to="/app" className='auth'><h4 className='map-h4'>Map</h4></Link>
                </div>
                <div style={{
                    width: '100px',
                    height: '100px',
                    position: 'fixed',
                    top: '50%',
                    left: '50%'
                }}>
            </div>
        </div>
    )
  }
}
