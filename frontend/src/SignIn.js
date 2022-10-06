import './App.css';
import React from 'react';
import useInput from './hooks/useInput';
import { useNavigate } from "react-router-dom";
// import emailjs from '@emailjs/browser';
// import * as UserRepo from './repository/User';

function SignIn() {
  const nav = useNavigate();

  const { value:Email, bind:bindEmail, reset:resetEmail } = useInput('');
  const { value:Password, bind:bindPassword, reset:resetPassword } = useInput('');
  
  /*
  const sendEmail = (e) => {
    e.preventDefault();

    let service_id = "in-v3.mailjet.com";
    let template_id = "template_lan_code";
    let public_key = "qhOIFjspOGFIUA4nd";
    
    let user = UserRepo.getUserByEmail(Email)
    if (user != null){

      let veri_code = "ZXCVBN";

      emailjs.send(service_id, template_id, {to_address:Email, to_name:user.name, verification_code:veri_code}, public_key)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      alert('Check your emails')
      
    } else {
      alert('That email is not registered')
    }
  };
  */

  // Attempt to sign in
  const handleSubmit = (evt) => {
    evt.preventDefault();
    resetPassword();;
    resetEmail();

    var userRecords = JSON.parse(localStorage.getItem('users'));

    // check if user already exists
    var correctAuth = false;
    let currentUser = {}
    for(var i=0; i < userRecords.length; i++){
      if(userRecords[i].email === Email && userRecords[i].password === Password) { 
        correctAuth = true; 
        currentUser = userRecords[i];
        break;
      }
    }

    // prevent logging in as deleted account
    if (Email === ""){
      correctAuth = false;
    }

    if (correctAuth){
      alert("Login successful!");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      nav("/");
      window.location.reload();
    } else {
      alert("Login Failed.\nCheck your credentials");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      <div className='form-container' style={{"width":"25%", "maxWidth":"300px","display":"flex","flexDirection":"column","alignItems":"center", "justifyContent":"space-around"}}>
        <h2>Sign In</h2>
      
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input className="form-control" type="email" {...bindEmail} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" {...bindPassword} />
          </div>
          {/* TODO: didn't have time to impliment
          <button onClick={sendEmail}>sendEmail</button>*/}
          <button type="submit" className="btn" style={{"backgroundColor":"orange","width":"100%"}}>Enter</button>
        </form>
      </div>
      </header>
    </div>
  );
}

export default SignIn;
