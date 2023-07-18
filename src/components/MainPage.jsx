import MovieGallery from "./MovieGallery";
import {fetchFunction} from "../functions/fetch-functions"
import { getUrl } from "../functions/fetch-functions";
import { Button } from "react-bootstrap";

const MainPage = ({ homeList, homeType, selectedGenre }) => {
  const playVoice = () => {
    let testVoice = setTimeout(window.responsiveVoice.speak("Hello", "UK English Female"))
  }
  return (
    <>
      <h1>Main page</h1>
      <Button onClick={playVoice}>Say hello</Button>
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