import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { fetchFunction, getUrl } from "../functions/fetch-functions";
import {
  getLoggedInUser,
  saveMovieInHistory,
  setViewMoviesData,
  getViewMoviesData,
} from "../local-storage/fakeDB";
import { Row, Col, Container } from "react-bootstrap";
import ViewHistoryGallery from "../components/user-page/ViewHistoryGallery";
import { nanoid } from "nanoid";

function SingleMoviePage() {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [movieData, setMovieData] = useState([]);

  // Get movie history from the currently logged in user if any
  const [moviesFromHistory, setMoviesFromHistory] = useState([]);
  useEffect(() => {
    const fetchMoviesFromHistory = async (user) => {
      try {
        if (!getViewMoviesData()) {
          const moviePromises = user.viewHistory.map((movieId) => {
            let movieDataUrl = getUrl(null, null, null, null, movieId);
            return fetchFunction(movieDataUrl, true);
          });

          const moviesFromHistoryData = await Promise.all(moviePromises);
          setMoviesFromHistory(moviesFromHistoryData);
          setViewMoviesData(moviesFromHistoryData);
        } else {
          setMoviesFromHistory(getViewMoviesData());
        }
      } catch (error) {
        console.log("Error during fetching movies from history: ", error);
      }
    };

    const userData = getLoggedInUser();
    if (userData && userData.viewHistory) {
      fetchMoviesFromHistory(userData);
    }
  }, []);
  //   Save movie in view history
  saveMovieInHistory(id);

  useEffect(() => {
    let movieDataUrl = getUrl(null, null, null, null, id);
    fetchFunction(movieDataUrl, true)
      .then((moviedata) => setMovieData(moviedata))
      .catch((error) =>
        console.log("Error during fetching movie data: ", error)
      );

    let movieImageUrl = getUrl(null, null, null, null, id, true);
    fetchFunction(movieImageUrl, false, true)
      .then((movieimage) => setImages(movieimage))
      .catch((error) => console.log("Error during fetching movie data", error));
    console.log(images);
  }, [id]);

  /*

    */
  return (
    <>
      <div className="dedicated-body">
        <Row>
          <Container className="details-body row p-5">
            <div className="col-md-4">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
                style={{ maxWidth: "100%", maxHeight: "400px" }}
              />
            </div>
            <div className="col overview-container">
              <div className="movie-title">
                <strong>{movieData.original_title}</strong>
                <button
                  onClick={() =>
                    window.responsiveVoice.speak(
                      movieData.original_title,
                      "UK English Female"
                    )
                  }
                ></button>
              </div>
              <div>
                <p>
                  <strong>Score:</strong> {movieData.vote_average}{" "}
                </p>
                <p>
                  <strong>Relase date:</strong> {movieData.release_date}{" "}
                </p>
                <button
                  onClick={() =>
                    window.responsiveVoice.speak(
                      movieData.release_date,
                      "UK English Female"
                    )
                  }
                ></button>
                <p>
                  <strong>Watched: </strong>{" "}
                </p>
                <p>{movieData.overview}</p>
                <button
                  onClick={() =>
                    window.responsiveVoice.speak(
                      movieData.overview,
                      "UK English Female"
                    )
                  }
                ></button>
              </div>
            </div>
          </Container>
        </Row>
        {moviesFromHistory && (
          <Row>
            <ViewHistoryGallery movies={moviesFromHistory} />
          </Row>
        )}
        <Row>
          <Container className="galery-container">
            <div className="col gallery-container">
              {images &&
                images.map((image) => (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      margin: "10px",
                    }}
                    key={nanoid()}
                  />
                ))}
            </div>
          </Container>
        </Row>
      </div>
    </>
  );
}

export default SingleMoviePage;
