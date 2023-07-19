import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { fetchFunction, getUrl } from "../functions/fetch-functions";
import { getLoggedInUser, saveMovieInHistory } from "../local-storage/fakeDB";
import { Row, Col, Container, Button, ButtonGroup } from "react-bootstrap";
import ViewHistoryGallery from "../components/user-page/ViewHistoryGallery";
import { getViewMoviesData, setViewMoviesData } from "../local-storage/fakeDB";
import '../styles/DedicatedMoviePage.css'

function SingleMoviePage({ user }) {
    const { id } = useParams();
    const [images, setImages] = useState([]);
    const [movieData, setMovieData] = useState([]);
    saveMovieInHistory(id);
    const [reviews, setReviews] = useState([]);
    const selectedVoice = user ? (user.voice.name ? user.voice.name : "French Female") : "French Female";


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
            .catch((error) =>
                console.log("Error during fetching movie images", error)
            );
        console.log(images);

        let movieReviewsUrl = `https://api.themoviedb.org/3/movie/${id}/reviews`;
        fetchFunction(movieReviewsUrl, true, false)
            .then((moviereviews) => setReviews(moviereviews.results))
            .catch((error) =>
                console.log("Error during fetching moview reviews.", error)
            );
        console.log(reviews);
    }, [id]);

    const [moviesFromHistory, setMoviesFromHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMoviesFromHistory = async (user) => {
            try {
                if (user.viewHistory && !getViewMoviesData()) {
                    const moviePromises = user.viewHistory.map((movieId) => {
                        const movieDataUrl = getUrl(null, null, null, null, movieId);
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
            } finally {
                setLoading(false);
            }
        };

        const currentUser = getLoggedInUser();
        if (currentUser) {
            fetchMoviesFromHistory(currentUser);
        }
    }, [user.viewHistory]);


    return (
        <>
            <div className="dedicated-body">
                <Row>
                    <Container className="details-body row p-5">
                        <div className="col-md-4">
                            <img
                                key={movieData.id}
                                src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
                                style={{ maxWidth: "100%", maxHeight: "400px" }}
                            />
                        </div>
                        <div className="col overview-container">
                            <div className="movie-title">
                                <strong>{movieData.original_title}</strong>
                                <ButtonGroup className="">
                                    <Button
                                        className="bg-warning"
                                        onClick={() =>
                                            window.responsiveVoice.speak(
                                                movieData.original_title,
                                                selectedVoice
                                            )
                                        }
                                    >
                                        Speak
                                    </Button>
                                    <Button
                                        className="bg-warning"
                                        onClick={() => window.responsiveVoice.cancel()}
                                    >
                                        Stop
                                    </Button>
                                    <Button
                                        className="bg-warning"
                                        onClick={() => window.responsiveVoice.pause()}
                                    >
                                        Pause
                                    </Button>
                                    <Button
                                        className="bg-warning"
                                        onClick={() => window.responsiveVoice.resume()}
                                    >
                                        Resume
                                    </Button>
                                </ButtonGroup>
                            </div>
                            <div>
                                <p>
                                    <strong>Score:</strong> {movieData.vote_average}{" "}
                                </p>
                                <p>
                                    <strong>Relase date:</strong> {movieData.release_date}{" "}
                                </p>
                                <ButtonGroup className="">
                                    <Button
                                        className="bg-warning"
                                        onClick={() =>
                                            window.responsiveVoice.speak(
                                                movieData.release_date,
                                                selectedVoice
                                            )
                                        }
                                    >
                                        Speak
                                    </Button>
                                    <Button
                                        className="bg-warning"
                                        onClick={() => window.responsiveVoice.cancel()}
                                    >
                                        Stop
                                    </Button>
                                    <Button
                                        className="bg-warning"
                                        onClick={() => window.responsiveVoice.pause()}
                                    >
                                        Pause
                                    </Button>
                                    <Button
                                        className="bg-warning"
                                        onClick={() => window.responsiveVoice.resume()}
                                    >
                                        Resume
                                    </Button>
                                </ButtonGroup>
                                <p>
                                    <strong>Watched: </strong>{" "}
                                </p>
                                <p>{movieData.overview}</p>
                                <ButtonGroup className="">
                                    <Button
                                        className="bg-warning"
                                        onClick={() =>
                                            window.responsiveVoice.speak(
                                                movieData.overview,
                                                selectedVoice
                                            )
                                        }
                                    >
                                        Speak
                                    </Button>
                                    <Button
                                        className="bg-warning"
                                        onClick={() => window.responsiveVoice.cancel()}
                                    >
                                        Stop
                                    </Button>
                                    <Button
                                        className="bg-warning"
                                        onClick={() => window.responsiveVoice.pause()}
                                    >
                                        Pause
                                    </Button>
                                    <Button
                                        className="bg-warning"
                                        onClick={() => window.responsiveVoice.resume()}
                                    >
                                        Resume
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </div>
                    </Container>
                </Row>
                <Row>
                    {moviesFromHistory[0] && (
                        <ViewHistoryGallery movies={moviesFromHistory} />
                    )}
                </Row>
                <Row className="d-flex justify-content-center align-items-center">
                    <Container className="m-3 gallery-container">
                        <div className="">
                            {images &&
                                images.map((image) => (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "200px",
                                            margin: "10px",
                                        }}
                                    />
                                ))}
                        </div>
                    </Container>
                </Row>
                <Row>
                    <Container className="p-5 review-container">
                        <div className="col reviews-element">
                            {reviews &&
                                reviews.map((review) => (
                                    <div key={review.id} className="review-element p-3">
                                        <p>
                                            <strong> user: </strong> {review.author}
                                        </p>
                                        <p>{review.content}</p>
                                        <p>
                                            <strong>created: </strong>
                                            {review.created_at}
                                        </p>
                                        <ButtonGroup className="">
                                            <Button
                                                className="bg-warning"
                                                onClick={() =>
                                                    window.responsiveVoice.speak(
                                                        `Author: ${review.author} His review: ${review.content}`,
                                                        selectedVoice
                                                    )
                                                }
                                            >
                                                Speak
                                            </Button>
                                            <Button
                                                className="bg-warning"
                                                onClick={() => window.responsiveVoice.cancel()}
                                            >
                                                Stop
                                            </Button>
                                            <Button
                                                className="bg-warning"
                                                onClick={() => window.responsiveVoice.pause()}
                                            >
                                                Pause
                                            </Button>
                                            <Button
                                                className="bg-warning"
                                                onClick={() => window.responsiveVoice.resume()}
                                            >
                                                Resume
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                ))}
                        </div>
                    </Container>
                </Row>
            </div>
        </>
    );
}

export default SingleMoviePage;
