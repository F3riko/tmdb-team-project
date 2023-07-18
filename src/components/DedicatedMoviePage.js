import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import { fetchFunction, getUrl } from '../functions/fetch-functions';
import { saveMovieInHistory } from '../local-storage/fakeDB';
import { Row, Col, Container } from 'react-bootstrap';

function SingleMoviePage( ) {
    const { id } = useParams();
    const [ images, setImages ] = useState([]);
    const [ movieData, setMovieData ] = useState([]);
<<<<<<< Updated upstream
    saveMovieInHistory(id)

    const [ reviews, setReviews ] = useState([]);

=======
    const [ reviews, setReviews ] = useState([]);
>>>>>>> Stashed changes

    useEffect(
        () => {
            let movieDataUrl = getUrl(null, null, null, null, id);
            fetchFunction(movieDataUrl, true)
                .then(moviedata => setMovieData(moviedata))
                .catch(error => console.log('Error during fetching movie data: ', error))

            let movieImageUrl = getUrl(null, null, null, null, id, true);
            fetchFunction(movieImageUrl, false, true)
                .then(movieimage => setImages(movieimage))
                .catch(error => console.log('Error during fetching movie images', error))
            console.log(images)

            let movieReviewsUrl = `https://api.themoviedb.org/3/movie/${id}/reviews`;
            fetchFunction(movieReviewsUrl, true, false)
                .then(moviereviews => setReviews(moviereviews.results))
                .catch(error => console.log('Error during fetching moview reviews.', error))
                console.log(reviews)
        }, [id]
    );

    return (
        <>
            <div className='dedicated-body'>
                <Row>
                    <Container className='details-body row p-5'>
                        <div className='col-md-4'>
                            <img
                                key={movieData.id}
                                src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
                                style={{ maxWidth: '100%', maxHeight: '400px' }}
                            />
                        </div>
                        <div className='col overview-container'>
                            <div className='movie-title'>
                                <strong>{movieData.original_title}</strong>
                                <button onClick={() => window.responsiveVoice.speak(movieData.original_title, 'UK English Female')} ></button>
                            </div>
                            <div>
                                <p><strong>Score:</strong> {movieData.vote_average} </p>
                                <p><strong>Relase date:</strong> {movieData.release_date} </p>
                                <button onClick={() => window.responsiveVoice.speak(movieData.release_date, 'UK English Female')} ></button>
                                <p><strong>Watched: </strong> </p>
                                <p>{movieData.overview}</p>
                                <button onClick={() => window.responsiveVoice.speak(movieData.overview, 'UK English Female')} ></button>
                            </div>
                        </div>
                    </Container>
                </Row>
                <Row>
                    <Container className='galery-container'>
                        <div className='col gallery-container'>
                            {images && images.map(image  => (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                    style={{ maxWidth: '100%', maxHeight: '200px', margin: '10px' }}
                                />
                            ))}
                        </div>
                    </Container>
                </Row>
                <Row>
                    <Container className='reviews-container'>
                                <div className='col reviews-container'>
                                    {
                                        reviews && reviews.map(review => ( 
                                            <div key={review.id} className='review-container p-5'>
                                                <p><strong> user: </strong> {review.author}</p>
                                                <p>{review.content}</p>
                                                <p><strong>created: </strong>{review.created_at}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                    </Container>
                </Row>
            </div>
        </>
    )

};

export default SingleMoviePage;