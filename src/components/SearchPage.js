import Reacth, { useEffect, useState } from 'react';
import { Form, Container, Row } from 'react-bootstrap';
import MovieGallery from './MovieGallery'
import { Col } from 'react-bootstrap';
import FilterBar from './searchComponents/filter';
import { useSort } from './searchComponents/search-functions';

function SearchPage( { handleSearch, homeList, query, setQuery, searchResults, setSearchResults, selectedGenre, setSelectedGenre, selectedLanguages, setSelectedLanguages, selectedYear, setSelectedYear } ){
    /* sort state */
    const [ sortOption, setSortOption ] = useState('');
    const [ displayedList, setDisplayedList] = useState([]);

    useSort(sortOption, homeList, searchResults, setSearchResults, displayedList, setDisplayedList);

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
                setSelectedYear={setSelectedYear}
                sortOption={sortOption}
                setSortOption={setSortOption} />
            </Col>
                <Col className='col-md-9'>
                    <MovieGallery moviesList={displayedList} listType={"Results: "} ></MovieGallery>
                </Col>
         </Container>
        </>
    )
};

export default SearchPage;
