import MovieGallery from "./MovieGallery";
import {fetchFunction, getGenres} from "../functions/fetch-functions"
import { getUrl } from "../functions/fetch-functions";
import { Button } from "react-bootstrap";
import {useEffect, useState} from 'react';
import { loadingState } from "../functions/fetch-functions";


const MainPage = ({ homeList, homeType, user}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [genreList, setGenreList] = useState(false);
  const genre = user ? (user.genre ? user.genre : false) : false
  const genres = getGenres();
  useEffect(() => {
    if (genre){
      const genreURL = getUrl({selectedGenre:genre});
    fetchFunction(genreURL)
      .then((movies) => {
        setGenreList(movies);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching the movies", error);
        setIsLoading(false);
      });
    }
  }, [user]);
  loadingState(isLoading);
  return (
    <>
      <h1>Main page</h1>
      <MovieGallery moviesList={homeList} listType={homeType}></MovieGallery>
      {genreList ? 
        <MovieGallery
          moviesList={genreList}
          listType={genres[genre]}/>
        : <></>
      }
    </>
  );
};

export default MainPage;