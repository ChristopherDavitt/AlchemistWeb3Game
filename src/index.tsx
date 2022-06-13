import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './components/store/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import './index.css';

import {Map} from './components/pages/Map';
import Home from './components/pages/Home';
import {QuestLocation} from './components/pages/QuestLocation';
import House from './components/pages/House';
import { App } from './App';
import { Nursery } from './components/pages/Nursery';
import { AlchemyStation } from './components/pages/AlchemyStation';
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
          <Route path='/app/mountains' element={<QuestLocation loc='mountains'  />} />
          <Route path='/app/ocean' element={<QuestLocation loc='ocean'  />} />
          <Route path='/app/tundra' element={<QuestLocation loc='tundra'  />} />
          <Route path='/app/swamp' element={<QuestLocation loc='swamp'  />} />
          <Route path='/app/forest' element={<QuestLocation loc='forest' />} />
          <Route path='/app/caves' element={<QuestLocation loc='caves'  />} />
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
