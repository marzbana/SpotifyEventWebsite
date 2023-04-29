import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Concert = () => {
  const { artistId } = useParams();
  const [latestConcert, setLatestConcert] = useState(null);

  useEffect(() => {
    try {
      console.log(`fetching latest concert for artist ${artistId}`);
      fetch(`http://localhost:8000/artists/${artistId}/concerts/latest`, {
        method: "GET",
        credentials: "include",
      })
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
  }, [artistId]);

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
