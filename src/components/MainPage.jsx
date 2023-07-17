import MovieGallery from "./MovieGallery";
import {fetchFunction} from "../functions/fetch-functions"
import { getUrl } from "../functions/fetch-functions";

const MainPage = ({ homeList, homeType, selectedGenre }) => {
  return (
    <>
      <h1>Main page</h1>
      <MovieGallery moviesList={homeList} listType={homeType}></MovieGallery>
      {selectedGenre ? 
        <MovieGallery
          moviesList={fetchFunction(getUrl(selectedGenre=selectedGenre))}
          listType={`${selectedGenre} Movies`}> </MovieGallery>:
        <></>
      }
    </>
  );
};

export default MainPage;