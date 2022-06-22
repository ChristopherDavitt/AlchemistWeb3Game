import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import {Map} from './components/pages/Map';
import Home from './components/pages/Home';
import {QuestLocation} from './components/pages/QuestLocation';
import House from './components/pages/House';
import { WalletConnect } from './components/pages/WalletConnect';
import { Nursery } from './components/pages/Nursery';
import { AlchemyStation } from './components/pages/AlchemyStation';
import { Minter } from './components/pages/Minter';
import { forestStaking, oceanStaking, swampStaking } from './components/assets/helpers/contractAddresses';

import './index.css';

export default function App() {
    const location = useLocation()
  return (
    <>
        <WalletConnect/>
        <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/minter' element={<Minter />} />
        <Route path='/app' element={<Map />} />
        {/* <Route path='/app/mountains' element={<QuestLocation loc='mountains'  />} /> */}
        <Route path='/app/ocean' element={<QuestLocation loc='ocean' stakingAddress={oceanStaking} type='NFT_STAKED_OCEAN'  />} />
        {/* <Route path='/app/tundra' element={<QuestLocation loc='tundra'  />} /> */}
        <Route path='/app/swamp' element={<QuestLocation loc='swamp' stakingAddress={swampStaking} type='NFT_STAKED_SWAMP' />} />
        <Route path='/app/forest' element={<QuestLocation loc='forest' stakingAddress={forestStaking} type='NFT_STAKED_FOREST'  />} />
        {/* <Route path='/app/caves' element={<QuestLocation loc='caves'  />} /> */}
        <Route path='/app/house' element={<House />} />
        <Route path='/app/nursery' element={<Nursery />} />
        <Route path='/app/house/alchemy-table' element={<AlchemyStation />} />
        </Routes> 
    </>
  )
}
