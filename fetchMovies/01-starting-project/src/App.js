import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [retrying, setRetrying] = useState(false);
  const [cancelRetry, setCancelRetry] = useState(false);

  const fetchMoviesHandler = async () => {
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch("https://swapi.py4e.com/api/films/");
      const data = await res.json();

      let transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
      setRetrying(false);
      setError("");
    } catch (err) {
      setError("Something went wrong....Retrying");
      setRetrying(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!retrying || cancelRetry) return;
    const id = setInterval(() => {
      fetchMoviesHandler();
    }, 5000);

    return () => {
      clearInterval(id);
    };
  }, [retrying, cancelRetry]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section style={{ display: "flex", justifyContent: "center" }}>
        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <MoviesList movies={movies} />
        )}
        {error && <h3>{error}</h3>}
      </section>
      <section>
        {retrying && (
          <button
            onClick={() => {
              setCancelRetry(true);
              setRetrying(false);
              setError("Retry cancelled");
            }}
          >
            Cancel Retry
          </button>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
