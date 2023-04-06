import React, { useState, useEffect } from 'react';

function Artists() {
  const [likedArtists, setLikedArtists] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/liked-artists')
      .then(response => response.json())
      .then(data => {
        setLikedArtists(data);
      })
      .catch(error => console.error(error));
  }, []);

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
}

export default Artists;
