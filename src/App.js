import SignUp from "./sing-up-flow/SignUp";
import Layout from "./components/Layout";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useParams,
  Link,
} from "react-router-dom";
import "./App.css";
import { fetchFunction } from "./functions/fetch-functions";
import { useEffect, useState } from "react";
import MovieGallery from "./components/MovieGallery.jsx";
import SearchPage from "./components/SearchPage";
import NavComponent from "./components/NavBar";
import { loadingState } from "./functions/fetch-functions";
import { handleSearch } from "./functions/fetch-functions";
import UserPage from "./components/user-page/UserPage";
import AuthRequired from "./components/user-page/AuthRequired";

// The following components are placeholder for testing and demo purposes,
// when the specified components are ready the placeholder should have been replaced
// wian an actual ones

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

function App() {
  /* Upcoming movies state :  */
  const [upComingMovies, setUpComingMovies] = useState([]);
  /* Loading state: */
  const [isLoading, setIsLoading] = useState(true);
  /* Search query state:  */
  const [query, setQuery] = useState("");
  /* Search results state */
  const [ searchResults, setSearchResults ] = useState([]);
  /* Genre filter states */
  const [ selectedGenre, setSelectedGenre ] = useState([]);
  /* Language filter states */
  const [ selectedLanguages, setSelectedLanguages ] = useState([]);
  /* Year filter states */
  const [ selectedYear, setSelectedYear ] = useState([]);

  /* Fetch the movie details, using the function from fetch-functions.js */
  useEffect(() => {
    let upComingMoviesURL = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
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
  useEffect(
    () => {
      handleSearch(query,setSearchResults, selectedGenre, selectedLanguages, selectedYear);

    }, [query, selectedGenre, selectedLanguages, selectedYear]
  )
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout 
            setSearchResults={setSearchResults} 
            selectedGenre={selectedGenre}
            selectedLanguages={selectedLanguages} />}>
          <Route index element={<MainPage moviesList={upComingMovies} listType='Upcoming'/>} />
          <Route path="movie/:id" element={<MoviePage />} />
          <Route element={<AuthRequired />}>
            <Route path="user/:id" element={<UserPage />} />
          </Route>
          <Route path="searchResults" element={
            <SearchPage
              searchResults={searchResults}
              upComingMovies={upComingMovies}
              handleSearch={handleSearch}
              query={query}
              setQuery={setQuery}
              setSearchResults={setSearchResults}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              selectedLanguages={selectedLanguages}
              setSelectedLanguages={setSelectedLanguages}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear} />
          } />
          <Route path="*" element={<h1>404 - Page not found goes here</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
