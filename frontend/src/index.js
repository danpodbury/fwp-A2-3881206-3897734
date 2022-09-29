import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import App from './App';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import Profile from './Profile';
import Posting from './Posting';
import Sandbox from './Sandbox';
import Error from './Error';
import ErrorUser from './ErrorUser';
import PublicProfile from './PublicProfile';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>


  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/post" element={<Posting />}></Route>
        <Route path="/user/-1" element={<ErrorUser/>}></Route>
        <Route path="/user/:userId" element={<PublicProfile />}></Route>
        <Route path="/sandbox" element={<Sandbox />}></Route>
        <Route path="/*" element={<Error />}></Route>
        {/* TODO: write an error page*/}   
      </Route>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
