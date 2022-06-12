import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './components/store/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import './index.css';

import {Map} from './components/pages/Map';
import Home from './components/landingPage/Home';
import {Mountains} from './components/map/Mountains';
import {Forest} from './components/map/Forest';
import {Ocean} from './components/map/Ocean';
import {Swamp} from './components/map/Swamp';
import {Tundra} from './components/map/Tundra';
import { Caves } from './components/map/Caves';
import House from './components/pages/House';
import { App } from './App';
import { Nursery } from './components/pages/Nursery';
import { AlchemyStation } from './components/houseStuff/AlchemyStation';
import { Minter } from './components/pages/Minter';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/minter' element={<Minter />} />
          <Route path='/app' element={<Map />} />
          <Route path='/app/mountains' element={<Mountains />} />
          <Route path='/app/ocean' element={<Ocean />} />
          <Route path='/app/tundra' element={<Tundra />} />
          <Route path='/app/swamp' element={<Swamp />} />
          <Route path='/app/forest' element={<Forest />} />
          <Route path='/app/caves' element={<Caves />} />
          <Route path='/app/house' element={<House />} />
          <Route path='/app/nursery' element={<Nursery />} />
          <Route path='/app/house/alchemy-table' element={<AlchemyStation />} />
        </Routes>
      </Router>
    </Provider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
