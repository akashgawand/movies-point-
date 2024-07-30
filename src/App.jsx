import { useEffect, useState } from "react";
import Card from "./components/Card";

const App = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [showMovies, setShowMovies] = useState(true);

  const Api_Url = "https://api.themoviedb.org/3/";
  const ApiKey = "aea6a675a84fa06f31c0bbd6d25a6842";

  const fetch_trending = async () => {
    setLoading(true);
    try {
      const movie_response = await fetch(
        
        `${Api_Url}trending/movie/week?api_key=${ApiKey}`
      );
      const movie_results = await movie_response.json();
      setTrendingMovies(movie_results.results);

      const series_response = await fetch(
        `${Api_Url}trending/tv/week?api_key=${ApiKey}`
      );
      const series_results = await series_response.json();
      setTrendingSeries(series_results.results);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const api_fetching = async (title) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${Api_Url}search/multi?api_key=${ApiKey}&query=${title}`
      );
      const result = await response.json();
      setResults(result.results);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (query) {
      api_fetching(query);
    }
  }, [query]);

  useEffect(() => {
    fetch_trending();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const togglebutton = () => {
    setShowMovies((prev) => !prev);
  };

  return (
    <div className="w-full min-h-screen bg-slate-200 text-center">
      <h1 className="flex justify-center p-10 text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
        Movies Point
      </h1>

      <form className="flex justify-center" onSubmit={handleSubmit}>
        <input
          className="px-36 py-3 rounded-full hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter Movie or Series title"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button type="submit">
          <i className="ri-magic-line text-3xl m-2 text-blue-500 hover:text-blue-600"></i>
        </button>
      </form>

      <div className="flex justify-center ">
        <button
          className="rounded-full bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white font-semibold my-4 transition-transform transform hover:scale-105"
          onClick={togglebutton}
        >
          {showMovies ? "Show Series" : "Show Movies"}
        </button>
      </div>

      {loading && <h3 className="text-green-500 text-xl">Loading...</h3>}
      {error && <h3 className="text-red-600 text-xl">Error: {error.message}</h3>}

      {query && results && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Search Results
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center p-4">
            {results.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </ul>
        </div>
      )}

      {!query && showMovies && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Trending Movies
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center p-4">
            {trendingMovies.map((movie) => (
              <Card key={movie.id} item={movie} />
            ))}
          </ul>
        </div>
      )}

      {!query && !showMovies && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Trending TV Shows
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center p-4">
            {trendingSeries.map((tv) => (
              <Card key={tv.id} item={tv} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
