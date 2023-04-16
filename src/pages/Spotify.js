import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Spotify = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const callbackParams = new URLSearchParams(window.location.search);
    const code = callbackParams.get('code');
    const returnedState = callbackParams.get('state');

    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: code,
        state: returnedState
      })
    })
    .then(response => {
      if (response.ok) {
        navigate('/?loggedIn=true');
      } else {
        navigate('/login?loggedIn=false');
      }
    })
    .catch(error => {
      console.error(error);
      navigate('/login?loggedIn=false');
    });
  }, [navigate]);

  return (
    <div>
      <h1>Spotify Callback</h1>
    </div>
  );
};

export default Spotify;
