import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Concert = () => {
  const [concerts, setConcerts] = useState([]);
  const callbackParams = new URLSearchParams(window.location.search);
  const location = callbackParams.get("state");
  console.log(location);
  const artistId = callbackParams.get("artist");
  console.log(artistId);
  useEffect(() => {
    try {
      console.log(`fetching concerts for artist ${artistId}`);
      fetch(
        `http://localhost:8000/concerts?artist=${artistId}&state=${location}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setConcerts(data._embedded.events);
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }, [artistId, location]);

  return (
    <div>
      <h1>Concerts for {artistId}</h1>
      {concerts == null || (concerts.length === 0 && <p>No concerts found</p>)}
      {
        <ul>
          {concerts.map((concert) => (
            <li key={concert.id}>
              <p>{concert.name}</p>
              <p>{concert.dates.start.localDate}</p>
              <a href={concert.url} target="_blank" rel="noopener noreferrer">
                Buy tickets
              </a>
            </li>
          ))}
        </ul>
      }
      <div>
        <Link to={"/artists/loggedIn=true"}>
          <button>Back to Artist Page</button>
        </Link>
        <Link to="/">
          <button>Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Concert;
