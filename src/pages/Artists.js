import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Artists = () => {
  const location = window.location;
  const params = new URLSearchParams(location.search);
  const loggedIn = params.get('loggedIn');

  const [likedArtists, setLikedArtists] = useState([]);

  useEffect(() => {
    if (loggedIn === 'true') {
      try {
        console.log('fetching liked artists');
        fetch('http://localhost:8000/liked-artists', {
          method: 'GET',
          credentials: 'include'
        })
          .then(response => response.json())
          .then(data => {
            setLikedArtists(data);
            console.log(data);
          })
          .catch(error => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      Navigate('/?loggedIn=false');
    }
  }, [loggedIn]);

  return (
    <div className="container">
      <h1>My Liked Artists</h1>
      {!likedArtists || likedArtists.length === 0 ? (
        <p>No liked artists found.</p>
      ) : (
        <ul>
          {likedArtists.map(artist => (
            <li key={artist.id}>{artist.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Artists;
