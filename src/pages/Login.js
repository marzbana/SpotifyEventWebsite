import React from 'react';
import Button from 'react-bootstrap/Button';

function loginWithSpotify(x) {
    // Set up the OAuth credentials
    const clientId = '0a572a2bcee3498cafdd358cd91b3236';
    const redirectUri = 'http://localhost:3000/spotify';
  
    // Generate a random string for the state parameter
    const state = x;
  
    // Encode the redirect URI to use as a query parameter
    const encodedRedirectUri = encodeURIComponent(redirectUri);
  
    // Build the authorization URL
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodedRedirectUri}&state=${state}&scope=user-library-read%20user-follow-read`;
  
    // Redirect the user to the authorization URL

    return authUrl;
  }

  const handleLoginClick = async () => {
    try {
      const response = await fetch('http://localhost:8000/state');
      const data = await response.json();
      const state = data.state;
      const authUrl = loginWithSpotify(state);
      window.location.href = authUrl;
    } catch (error) {
      console.error(error);
    }
  };
  

const Login = () => {
  return (
    <div className="container">
      <h1>Welcome to my App</h1>
      <p>Click the button below to login with Spotify:</p>
      <Button variant="primary" onClick={handleLoginClick}>
        Login with Spotify
      </Button>
    </div>
  );
};

export default Login;
