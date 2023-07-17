import Reacth, { useState } from 'react';
import { Form, Container, Row } from 'react-bootstrap';
import MovieGallery from './MovieGallery'
import { Col } from 'react-bootstrap';
import FilterBar from './searchComponents/filter';

function SearchPage( { handleSearch, homeList, query, setQuery, searchResults, setSearchResults, selectedGenre, setSelectedGenre, selectedLanguages, setSelectedLanguages, selectedYear, setSelectedYear } ){

    return (
        <>
         <Container className='row'>
            <Col className='col-md-3'>
                <FilterBar 
                handleSearch={handleSearch} 
                homeList={homeList}
                query={query} 
                setQuery={setQuery} 
                setSearchResults={setSearchResults} 
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                selectedLanguages={selectedLanguages}
                setSelectedLanguages={setSelectedLanguages}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear} />
            </Col>
            <Col className='col-md-9'>
            { searchResults ?
                <MovieGallery moviesList={searchResults} listType={"Results: "} ></MovieGallery> :
                <MovieGallery moviesList={homeList} listType={"Results: "} ></MovieGallery>
            }
            </Col>
         </Container>
        </>
    )
};

export default SearchPage;
