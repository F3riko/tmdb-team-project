import MovieGallery from "./MovieGallery";
import {fetchFunction, getGenres} from "../functions/fetch-functions"
import { getUrl } from "../functions/fetch-functions";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { loadingState } from "../functions/fetch-functions";
import { genresIds } from "../sing-up-flow/formValidations";

const MainPage = ({ homeList, homeType, user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [genreList, setGenreList] = useState(false);
  const genre = user
    ? user.genre
      ? [String(genresIds[user.genre])]
      : false
    : false;
  console.log(genre)
  useEffect(() => {
    if (genre){
      const genreURL = getUrl(null, genre, null, null, null, false);
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
      <MovieGallery moviesList={homeList} listType={homeType}></MovieGallery>
      {genreList ? 
        <MovieGallery
          moviesList={genreList}
          listType={user.genre}/>
        : <></>
      }
    </>
  );
};

export default MainPage;
