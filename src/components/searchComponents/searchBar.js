import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function SearchBar( { query, setQuery,  handleSearch, setSearchResults } ) {

    function handleInputChange(event) {
        const tempQuery = event.target.value
        setQuery(tempQuery);
        handleSearch(tempQuery, setSearchResults);
    };

    function handleOnSubmit(event) {
        event.preventDefault();
    }

    return (
        <div>
            <Form onSubmit={handleOnSubmit}>
                <Form.Control type="text" placeholder='Search...' className='mr-sm-2' value={query} onSubmit={handleInputChange} />
            </Form>
        </div>
    )
};

export default SearchBar;