import logo from '../images/pizza-slice.svg';
import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../App.css'; 

function Home() {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  const nav = useNavigate();

  // Redirect logged in users to their profile page
  useEffect(() => {
    if (isLoggedIn){
      nav("/profile");
    }
  }, [isLoggedIn, nav]);
  
  return (
    <div className="App">
    <div style={{"display": "flex", "flexDirection": "column", "width": "100%", "height": "calc(100vh - 50px)", "justifyContent": "center"}} >

      <div style={{"display": "flex", "flexDirection": "row", "width": "100%", "height": "400px", "justifyContent": "center"}}>
        <div style={{"width":"50%", "maxWidth":"500px","minWidth":"100px", "padding":"50px"}}>    
          <div>
            <h1 style={{"color": "orange"}}>Loop Agile Now</h1>
            <p>When you're here, you're here.</p>
            <div style={{"fontSize":"12pt"}}>
            <p>
              So youve decided to work for our cutting edge tech business and you're prepared to handle the fame that comes with it?<br/>
              You've come to the right place.<br/>
            </p>
            <p>
              Sign up for an account if you don't have one and start sharing your thoughts with everyone at the company.
            </p>
            </div>
          </div>
          <div>
            {/**/}
          </div>
          
        </div>
        <div className='form-container' style={{"width":"25%", "maxWidth":"300px","display":"flex","flexDirection":"column","alignItems":"center", "justifyContent":"space-around"}}>
          
          <div style={{"width":"200px","height":"200px","overflow":"hidden","display":"flex","justifyContent":"center"}}>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div style={{"width":"200px"}}>
          <Link to="/signin" >
            <button type="button" className='btn btn-warning' style={{"width":"100%"}}>Sign In</button>
          </Link>
          </div>
          <div style={{"width":"200px"}}>
          <Link to="/signup" >
            <button type="button" className='btn btn-warning' style={{"width":"100%"}}>Create Account</button>
          </Link>
          </div>
        </div>

      </div>

    </div>
    </div>
  );
}


export default Home;
