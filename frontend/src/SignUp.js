import './App.css';
import './Password.css';
import React, { useEffect } from 'react';
import useInput from './hooks/useInput';
import User from './models/User';
import { useNavigate } from 'react-router-dom';
import * as UserRepo from './repository/User';

import zxcvbn from 'zxcvbn';

function SignUp() {
  const nav = useNavigate();
  const { value:Name, bind:bindName, reset:resetName} = useInput("");
  const { value:Email, bind:bindEmail, reset:resetEmail } = useInput('');
  const { value:Password, bind:bindPassword, reset:resetPassword } = useInput('');

  const strengthStrings = {
    0:"",
    1:"Weak",
    2:"Ok",
    3:"Good",
    4:"Strong",
  }
  
  useEffect(()=>{
    let strength = zxcvbn(Password).score
    console.log(strength);
  },[Password])

  // Attempt signup
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let threshold = 0
    if (zxcvbn(Password).score < threshold){
      alert(`Your password is ${strengthStrings[zxcvbn(Password).score]}. Please use a stronger password.`);
      return;
    }

    // create new user entry
    var user = new User(-1, Name, Email, Password, Date.now());

    //todo: check if user already exists
    let newUser = UserRepo.registerUser(user);

    if (newUser !== null){
      alert(`Successfuly signed up as ${Name}`);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      localStorage.setItem("isLoggedIn", "true");
      nav("/");
      window.location.reload();
    } else {
      //alert fail if already a user
      alert(`An account is already registered with ${user.email}!`);
    }

    resetPassword();
    resetName();
    resetEmail();
  }

  // Render
  return (
    <div className="App">
      <header className="App-header">
      <div className='form-container' style={{"width":"25%", "maxWidth":"400px","display":"flex","flexDirection":"column","alignItems":"center", "justifyContent":"space-around"}}>
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit} >
          <div className="mb-8">
            <label htmlFor="exampleInputName" className="form-label" >Name</label>
            <input className="form-control" type="text" data-testid="form-name" {...bindName} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
            <input className="form-control" type="email" data-testid="form-email" {...bindEmail} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="fieldPassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="fieldPassword" data-testid="form-pw" {...bindPassword} minLength={5} required/>
            <div style={{"fontSize":"8pt","marginTop":"4px"}}>{strengthStrings[zxcvbn(Password).score]}</div>
            
            <div style={{"display":"flex","flexDirection":"row"}}>
              {/*Array(5).fill(0).forEach(()=>{return })*/}
              {Array.from({length: zxcvbn(Password).score}, (_, index) => {return <div className={"strength-bean bean-"+zxcvbn(Password).score}></div>})}
            </div>
            <label style={{"fontSize":"8pt"}}>You are required to use a sufficiently strong password. Password must be more than 5 characters.</label>

          </div>
          <button type="submit" className="btn" style={{"backgroundColor":"orange","width":"100%"}}>Create Account</button>
        </form>
      </div>
      </header>
    </div>
  );
}

export default SignUp;
