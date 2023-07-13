import Reacth, { useState } from 'react';
import { Form, Container, Row } from 'react-bootstrap';
import MovieGallery from './MovieGallery'
import { Col } from 'react-bootstrap';
import FilterBar from './searchComponents/filter';


function SearchPage( { query,  setQuery, handleSearch, upComingMovies,  searchResults, setSearchResults } ){

    return (
        <>
         <Container className='row'>
            <Col className='col-md-5'>
                <FilterBar query={query} setQuery={setQuery} handleSearch={handleSearch} setSearchResults={setSearchResults}  />
            </Col>
            <Col className='col-md-7'>
            { searchResults ?
                <MovieGallery movieList={searchResults} listType={"Results: "} ></MovieGallery> :
                <MovieGallery movieList={upComingMovies} listType={"Results: "} ></MovieGallery>
            }
            </Col>
         </Container>
        </>
    )
};

export default SearchPage;