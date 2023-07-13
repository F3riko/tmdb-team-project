import SignUp from "./sing-up-flow/SignUp";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useParams,
} from "react-router-dom";
import "./App.css";
import { fetchFunction } from "./functions/fetch-functions";
import { useEffect, useState } from "react";
import MovieGallery from "./components/MovieGallery.jsx";
import SearchPage from "./components/SearchPage";
import { loadingState } from "./functions/fetch-functions";
import { handleSearch } from "./functions/fetch-functions";

// The following components are placeholder for testing and demo purposes,
// when the specified components are ready the placeholder should have been replaced
// wian an actual ones

const Layout = () => {
  return (
    <>
      <nav>
        <h1>Navigation component placeholder</h1>
      </nav>
      <Outlet />
    </>
  );
};

const MainPage = ({ moviesList }) => {
  return (
    <>
      <h1>Main page</h1>
      <MovieGallery movieList={moviesList} listType={"Upcoming"}></MovieGallery>
    </>
  );
};

const MoviePage = () => {
  const { id } = useParams();
  return <h1>Movie with id {id}</h1>;
};

const AuthRequired = () => {
  // AuthFunc(id) goes in this layout component
  const isLoggedIn = true;
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

const UserPage = () => {
  const { id } = useParams();

  return <h1>This page is protected by the Auth func. The user id is {id}</h1>;
};

// End of testing section

function App() {
  /* Upcoming movies state :  */
  const [ upComingMovies, setUpComingMovies ] = useState([]);
  /* Loading state: */
  const [isLoading, setIsLoading] = useState(true);
  /* Search query state:  */
  const [ query, setQuery] = useState('');
  /* Search results state */
  const [ searchResults, setSearchResults ] = useState([]);
  /* Genre states */
  const [ selectedGenre, setSelectedGenres ] = useState([]);
  /* Language states */
  const [ selectedLanguages, setSelectedLanguages ] = useState([]);


  /* Fetch the movie details, using the function from fetch-functions.js */
  useEffect(() => {
    let upComingMoviesURL =
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
    fetchFunction(upComingMoviesURL)
      .then((movies) => {
        setUpComingMovies(movies);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching the movies", error);
        setIsLoading(false);
      });
  }, []);

  /* check the loadin state: */
  loadingState(isLoading);

  /* handle Search: */
  handleSearch(query,setSearchResults);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage moviesList={upComingMovies} listType='Upcoming' />} />
          <Route path="movie/:id" element={<MoviePage />} />
          <Route element={<AuthRequired />}>
            <Route path="user/:id" element={<UserPage />} />
          </Route>
          <Route path="searchResults" element={<SearchPage searchResults={searchResults} upComingMovies={upComingMovies} query={query} setQuery={setQuery} handleSearch={handleSearch} setSearchResults={setSearchResults} />} />
          <Route path="*" element={<h1>404 - Page not found goes here</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
