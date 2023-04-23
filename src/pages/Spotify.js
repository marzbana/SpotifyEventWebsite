import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Spotify = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const callbackParams = new URLSearchParams(window.location.search);
    const code = callbackParams.get('code');
    const returnedState = callbackParams.get('state');

    fetch('http://localhost:8000/login', {
      //set request mode to no cors
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: code,
        state: returnedState
      }),
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        //delete cookie
        document.cookie = "state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=localhost:8000/;";
        //create cookie with response data which is res.status(200).send(encrypted_id);
        response.text().then(data => {
        document.cookie = "user_id=" + data + "; path=localhost:8000/;";
        }).then(() => {
        navigate('/?loggedIn=true')});
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
