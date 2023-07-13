import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function SearchBar( { query, setQuery,  handleSearch, setSearchResults } ) {

    function handleInputChange(event) {
        setQuery(event.target.value);
        handleSearch(query, setSearchResults);
    };

    function handleOnSubmit(event) {
        event.preventDefault();
    }

    return (
        <div>
            <Form onSubmit={handleOnSubmit}>
                <Form.Control type="text" placeholder='Search...' className='mr-sm-2' value={query} onChange={handleInputChange} />
            </Form>
        </div>
    )
};

export default SearchBar;