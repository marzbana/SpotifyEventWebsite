import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { checkCookie } from "./Cookie.js";
import "../CSS/Artist.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Artists = () => {
  const [likedArtists, setLikedArtists] = useState([]);
  const [state, setState] = useState("");

  useEffect(() => {
    if (checkCookie()) {
      try {
        console.log("fetching liked artists");
        fetch("http://localhost:8000/liked-artists", {
          method: "GET",
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            setLikedArtists(data);
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      Navigate("/?loggedIn=false");
    }
  }, []);

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  return (
    <div className="container">
      <div className="home-button">
        <Link to="/">
          <Button variant="primary">Home</Button>
        </Link>
      </div>
      <h1>Click to See Concerts in Your State</h1>
      <div>
        <label htmlFor="state">State Code:</label>
        <input
          type="text"
          id="state"
          value={state}
          onChange={handleStateChange}
        />
      </div>
      {!likedArtists || likedArtists.length === 0 ? (
        <p>No liked artists found.</p>
      ) : (
        <ul>
          {likedArtists.map((artist) => (
            <li key={artist.id}>
              <Link to={`/concerts?artist=${artist.name}&state=${state}`}>
                {artist.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Artists;
