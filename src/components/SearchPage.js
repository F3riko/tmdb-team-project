import Reacth, { useState } from 'react';
import { Form, Container, Row } from 'react-bootstrap';
import MovieGallery from './MovieGallery'
import { Col } from 'react-bootstrap';
import FilterBar from './searchComponents/filter';


function SearchPage( { searchResults } ){

    /* search filters: */
    const genres = [
        { label: 'Horror', value: '27' },
        { label: 'Mistery', value: '9648'},
        { label: 'Comedy', value: '35' },
    ];

    const language = [
        { label: 'Hungarian', value: 'hu' }, 
        { label: 'English', value: 'en' },
        { label: 'French', value: 'fr' }
    ]

    return (
        <>
         <Container className='row'>
            <Col>
                <FilterBar/>
            </Col>
            <Col>
                <MovieGallery movieList={searchResults} listType={"Results: "} ></MovieGallery>
            </Col>
         </Container>
        </>
    )
};

export default SearchPage;