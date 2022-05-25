import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';


import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './components/landingPage/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/authentication/SignIn';
import SignUp from './components/authentication/SignUp';
import AlchemyStation from './components/houseStuff/AlchemyStation';
import ItemInventory from './components/houseStuff/ItemInventory';
import PotionInventory from './components/houseStuff/PotionInventory';
import Nursery from './components/houseStuff/Nursery';
import Mountains from './components/map/Mountains';
import Forest from './components/map/Forest';
import Ocean from './components/map/Ocean';
import Swamp from './components/map/Swamp';
import Tundra from './components/map/Tundra';
import House from './components/pages/House';
import Map from './components/pages/Map';
import Caves from './components/map/Caves';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

      <Router>
        <App />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/app' element={<Map />} />
          
          <Route path='/app/mountains' element={<Mountains />} />
          <Route path='/app/ocean' element={<Ocean />} />
          <Route path='/app/tundra' element={<Tundra />} />
          <Route path='/app/swamp' element={<Swamp />} />
          <Route path='/app/forest' element={<Forest />} />
          <Route path='/app/caves' element={<Caves />} />
          <Route path='/app/house/' element={<House />} />
        
       
        </Routes>
      </Router>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
