import './App.css';
import React from 'react';
import NavBar from './NavBar';

import {Outlet} from "react-router-dom";
import Footer from './Footer';

function App() {
  return (
    <div>
    <NavBar /> 
    <Outlet />
    <Footer />
    </div>
  );
}

export default App;
