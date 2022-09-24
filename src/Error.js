import './App.css';
import './Posting.css';
import logo from './pizza-slice.svg';
import Post from './models/Post';
import Reply from './Reply';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as TimelineRepo from './repository/Timeline';

function Error(props) {
    // Render
    return (
    <div className="App">
        <header className="App-header">    
        <h1>404</h1>
        This content has been lost in the tide of uncertainty.
        </header>
    </div>
    );
}

export default Error;