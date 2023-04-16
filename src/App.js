import React from 'react';
import SearchPage from './pages/Search.js';
import Login from './pages/Login.js';
import Artists from './pages/Artists.js';
import Spotify from './pages/Spotify.js';
import Home from './pages/Home.js';
import LogOut from './pages/Logout.js';
const { BrowserRouter, Routes, Route } = require('react-router-dom');

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/:loggedIn' element={<Home/>} />
        <Route path="/login/:loggedIn" element={<Login/>} />
        <Route path="/search/:loggedIn" element={<SearchPage/>} />
        <Route path="/artists/:loggedIn" element={<Artists/>} />
        <Route path="/spotify/:loggedIn" element={<Spotify/>} />
        <Route path="/logout/:loggedIn" element={<LogOut/>} />
        <Route path='/' element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/artists" element={<Artists/>} />
        <Route path="/spotify" element={<Spotify/>} />
        <Route path="/logout" element={<LogOut/>} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;


/*

import React from 'react';
import Button from 'react-bootstrap/Button';

function App() {

  const handleLoginClick = async () => { 
    try {
      const response = await fetch('http://localhost:8001/login', {
        method: 'GET',
        credentials: 'include',

      });
      const responseData = await response.json();
      window.location.href = responseData.redirectUrl;
    } catch(error) {
      console.error(error);
    }
    
  };
  

  return (
    <div className="container">
      <h1>Welcome to my App</h1>
      <p>Click the button below to login with Spotify:</p>
      <Button variant="primary" onClick={handleLoginClick}>
        Login with Spotify
      </Button>
    </div>
  );
}

export default App;
*/


