import Reacth, { useState } from 'react';
import { Form, Container, Row } from 'react-bootstrap';
import MovieGallery from './MovieGallery'

function SearchPage( { searchResults } ){

    /* search filters: */
    const genres = [
        { label: "Horror", value: "27" },
        { label: "Mistery", value: "9648" },
        { label: "Comedy", value: "35" },
    ];
    const language = [
        { label: 'Hungarian', value: 'hu' }, 
        { label: 'English', value: 'en' },
        { label: 'French', value: 'fr' }
    ]

    /*
    1. filter bar
    2. search bar component
    3. should I refactor the fetch functions, after the search is implemented?

    3. handle search in app? and in here?
    4. query state from app.js (set by header input)
    
    The question: should we have one handleSearch function within the App.js, then handles all the searches, or... yes.   */

    return (
        <>
         <Container>
            <Row>
                <MovieGallery movieList={searchResults} listType={"Results: "} ></MovieGallery>
            </Row>
         </Container>
        </>
    )
};

export default SearchPage;
