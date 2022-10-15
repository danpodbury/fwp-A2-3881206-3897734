//This is the theme of the site
//Sourced from https://bootswatch.com/darkly/
import "bootswatch/dist/darkly/bootstrap.min.css";
import './App.css';
import React from 'react';
import NavBar from './components/NavBar';

import {Outlet} from "react-router-dom";
import Footer from './components/Footer';

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
