import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import App from './App';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Posting from './pages/Posting';
import Sandbox from './pages/Sandbox';
import Error from './components/Error';
import ErrorUser from './components/ErrorUser';
import PublicProfile from './pages/PublicProfile';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Following from './pages/Following';


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
        <Route path="/profile/following" element={<Following/>}></Route>
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
