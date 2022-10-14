import './App.css';
import React from 'react';
import NavBar from './components/NavBar';

import {Outlet} from "react-router-dom";
import Footer from './components/Footer';

function App() {
  return (
    <div className='app-wrapper'>
    <NavBar /> 
    <Outlet />
    <Footer />
    </div>
  );
}

export default App;
