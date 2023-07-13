import React from "react";
import { Accordion, Form } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import SearchBar from "./searchBar";


function FilterBar( { handleSearch, setSearchResults, query, setQuery, selectedGenre, setSelectedGenre, selectedLanguages, setSelectedLanguages } ) {

    /* Genre filters:  */
    const genres = [
        { label: 'Horror', value: '27' },
        { label: 'Mystery', value: '9648' },
        { label: 'Comedy', value: '35'},
      ];
      
      /* Language filter values:  */
      const languages = [
        { label: 'Hungarian', value: 'hu' },
        { label: 'English', value: 'en' },
        { label: 'French', value: 'fr'},
      ];

    return (
        <>
            <Row>
                <p className="d-flex align-items-start m-2" >
                    <strong>Search: </strong>
                </p>
                <div>
                    <SearchBar handleSearch={handleSearch} setQuery={setQuery} query={query} setSearchResults={setSearchResults} />
                </div>
            </Row>
            <Row>
                <p className='d-flex align-items-start m-2'>
                    <strong>Filter: </strong>
                </p>
            </Row>
            <Row>
                <Accordion defaultActiveKey="">
                    <Accordion.Item eventKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header className="d-flex align-items-start m-2" > Select Genre: </Accordion.Header>
                            <Accordion.Body>
                                <Form>
                                    <div key={'default'} className='mb-3'>

                                        {
                                            genres.map(
                                                (genre, index) => (
                                                    <Form.Check
                                                        key={index}
                                                        type="checkbox"
                                                        id={genre.value}
                                                        label={genre.label}
                                                        value={genre.value}
                                                        onChange={
                                                            (event) => {
                                                                if (event.target.checked) {
                                                                    setSelectedGenre(prevGenres => [...prevGenres, event.target.value]);
                                                                } else {
                                                                    setSelectedGenre(prevGenres => prevGenres.filter(genre => genre !== event.target.value));
                                                                }
                                                            }
                                                        }
                                                    />
                                                )
                                            )
                                        }

                                    </div>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Item eventKey="1">
                            <Accordion.Header className="d-flex align-items-start m-2" > Select Language: </Accordion.Header>
                            <Accordion.Body>
                                <Form>
                                    <div key={'default'} className='mb-3'>

                                        {
                                            languages.map(
                                                (language, index) => (
                                                    <Form.Check
                                                        key={index}
                                                        type="checkbox"
                                                        id={language.value}
                                                        label={language.label}
                                                        value={language.value}
                                                        onChange={
                                                            (event) => {
                                                                if (event.target.checked) {
                                                                    setSelectedGenre(prevLanguages => [...prevLanguages, event.target.value]);
                                                                } else {
                                                                    setSelectedGenre(prevLanguages => prevLanguages.filter(language => language !== event.target.value));
                                                                }
                                                            }
                                                        }
                                                    />
                                                )
                                            )
                                        }

                                    </div>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion.Item>
                </Accordion>
            </Row>
        </>
    )
};

export default FilterBar;