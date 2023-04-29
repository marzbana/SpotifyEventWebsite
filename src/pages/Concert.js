import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Concert = () => {
  const { artistId } = useParams();
  const [latestConcert, setLatestConcert] = useState(null);

  useEffect(() => {
    try {
      const callbackParams = new URLSearchParams(window.location.search);
      const location = callbackParams.get("state");
      console.log(location);
      const artistId = callbackParams.get("artist");
      console.log(artistId);
      console.log(`fetching latest concert for artist ${artistId}`);
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
          setLatestConcert(data);
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (!latestConcert) {
    return <p>Loading...</p>;
  }

  const { artist, location, date } = latestConcert;

  return (
    <div>
      <h1>Latest Concert for {artist}</h1>
      <p>{location}</p>
      <p>{date}</p>
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
