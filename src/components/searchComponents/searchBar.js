import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function SearchBar( { query, setQuery,  handleSearch, setSearchResults } ) {

    function handleInputChange(event) {
        setQuery(event.target.value);
        console.log(query);
    };

    function handleOnSubmit(event) {
        event.preventDefault();
        handleSearch(event.target.value, setSearchResults)
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