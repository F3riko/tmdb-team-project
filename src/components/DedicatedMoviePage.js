import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import { fetchFunction, getUrl } from '../functions/fetch-functions';
import { saveMovieInHistory } from '../local-storage/fakeDB';


function SingleMoviePage( ) {
    const { id } = useParams();
    const [ images, setImages ] = useState([]);
    const [ movieData, setMovieData ] = useState([]);
    
    saveMovieInHistory(id)

    useEffect(
        () => {
            let movieDataUrl = getUrl(null, null, null, null, id);
            fetchFunction(movieDataUrl, true)
                .then(moviedata => setMovieData(moviedata))
                .catch(error => console.log('Error during fetching movie data: ', error))
        }, [id]
    );

    return (
        <>
            <div className='modal show' style={{ display: 'block', position: 'initial' }} >
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title><strong>{movieData.original_title}</strong></Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className='row'>
                            <div className='col'>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
                                    style={{ maxWidth: '100%', maxHeight: '700px' }}
                                />
                            </div>
                            <div className='col'>
                                <div className='d-flex justify-content-start mb-4'>
                                    <p><strong>Score: </strong> {movieData.vote_average} </p>
                                </div>
                                <p>{movieData.overview}</p>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </>
    )

};

export default SingleMoviePage;