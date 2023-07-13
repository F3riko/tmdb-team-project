import Reacth, { useState } from 'react';
import { Form } from 'react-bootstrap';


function SearchPage(){

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
         <Container>
            <div className='row'>
                hello
            </div>
         </Container>
        </>
    )
};

export default SearchPage;