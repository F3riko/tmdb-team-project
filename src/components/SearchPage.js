import Reacth, { useState } from 'react';
import { Form, Container, Row } from 'react-bootstrap';
import MovieGallery from './MovieGallery'
import { Col } from 'react-bootstrap';
import FilterBar from './searchComponents/filter';

function SearchPage( { handleSearch, upComingMovies, query, setQuery, searchResults, setSearchResults, selectedGenre, setSelectedGenre, selectedLanguages, setSelectedLanguages } ){

    return (
        <>
         <Container className='row'>
            <Col className='col-md-5'>
                <FilterBar handleSearch={handleSearch} 
                query={query} 
                setQuery={setQuery} 
                setSearchResults={setSearchResults} 
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                selectedLanguages={selectedLanguages}
                setSelectedLanguages={setSelectedLanguages} />
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
