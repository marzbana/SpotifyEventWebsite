import { Navigate } from 'react-router-dom';
function Artists() {
  const location = window.location;
  const params = new URLSearchParams(location.search);
  const loggedIn = params.get('loggedIn');
  if(loggedIn==='true') {
  
  let likedArtists = [];
  try{
    fetch('http://localhost:8000/liked-artists')
      .then(response => response.json())
      .then(data => {
         likedArtists  = data;
      })
    }
      catch(error)
      {console.error(error);}
 

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
          else{
            Navigate('/?loggedIn=false');
}
}


export default Artists;
