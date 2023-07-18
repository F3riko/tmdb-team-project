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
import { useEffect, useState } from "react";
import MovieGallery from "./components/MovieGallery.jsx";
import SearchPage from "./components/SearchPage";
import NavComponent from "./components/NavBar";
import { fetchFunction } from "./functions/fetch-functions";
import { loadingState } from "./functions/fetch-functions";
import { handleSearch } from "./functions/fetch-functions";
import UserPage from "./components/user-page/UserPage";
import AuthRequired from "./components/user-page/AuthRequired";
import MainPage from "./components/MainPage";
import SingleMoviePage from "./components/DedicatedMoviePage";
import {getLoggedInUser} from './local-storage/fakeDB'

// The following components are placeholder for testing and demo purposes,
// when the specified components are ready the placeholder should have been replaced
// wian an actual ones

function App() {
  /* Home gallery type state :  */
  const [homeListType, setHomeListType] = useState('Upcoming');
  // Home gallery state : 
  const [homeList, setHomeList] = useState([]);
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
  // Logged-in user state:
  const [user, setUser] = useState(getLoggedInUser())

  /* Fetch the movie details, using the function from fetch-functions.js */
  useEffect(() => {
    let homeListURL;
    if (user){
      switch(user.homepage){
        case '':
        case 'Upcoming':
          homeListURL = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
          break;
        case 'Most Popular':
          homeListURL = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
          break;
        case 'Top Rated':
          homeListURL = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
      }
    } else homeListURL = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
    fetchFunction(homeListURL)
      .then((movies) => {
        setHomeList(movies);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching the movies", error);
        setIsLoading(false);
      });
  }, [user]);

  /* check the loading state: */
  loadingState(isLoading);

  /* handle Search: */
  useEffect(() => {
      handleSearch(query, setSearchResults, selectedGenre, selectedLanguages, selectedYear);
  }, [query, selectedGenre, selectedLanguages, selectedYear]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout 
            query={query}
            setQuery={setQuery}
            setSearchResults={setSearchResults} 
            selectedGenre={selectedGenre}
            selectedLanguages={selectedLanguages} />}>
          <Route index element={<MainPage
                                  homeList={homeList}
                                  homeType={user ? user.homepage : "Upcoming"}/>} />
          <Route path="/movie/:id" element={<SingleMoviePage user={user}/>} />
          <Route element={<AuthRequired />}>
            <Route path="user/:id" element={<UserPage
                                              homeListType={homeListType}
                                              setHomeListType={setHomeListType}
                                              user={user}
                                              setUser={setUser}/>} />
          </Route>
          <Route path="searchResults" element={
            <SearchPage
              searchResults={searchResults}
              handleSearch={handleSearch}
              homeList = {homeList}
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
