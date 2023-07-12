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
import MovieGallery from './components/MovieGallery.jsx'
import PreviewCard from "./components/PreviewCard.jsx"
import upcomingList from "./functions/upcomingList";

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

const MainPage = ({ moviesList} ) => {
  return (
    <>
      <h1>Main page</h1>
      <PreviewCard
        movie={moviesList[0]}></PreviewCard>
    </>
  )
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

const SearchResults = () => {
  // useSearchParams hook goes here
  return <h1>Search Results</h1>;
};

// End of testing section

function App() {
  /* create a state for the upcoming movies:  */
  const [ upComingMovies, setUpComingMovies ] = useState([]);

  /* Fetch the movie details, using the function from fetch-functions.js */
  useEffect(
    () => {
      let upComingMoviesURL = 'https://api.themoviedb.org/3/movie/upcoming';
      fetchFunction(upComingMoviesURL)
        .then(movies => setUpComingMovies(movies))
        .catch(error => console.log('Error fetching the movies', error))
    }, []
  );


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage moviesList={upComingMovies}/>} />
          <Route path="movie/:id" element={<MoviePage />} />
          <Route element={<AuthRequired />}>
            <Route path="user/:id" element={<UserPage />} />
          </Route>
          <Route path="searchResults" element={<SearchResults />} />
          <Route path="*" element={<h1>404 - Page not found goes here</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
