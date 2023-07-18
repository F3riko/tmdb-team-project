import React from "react";
import { Accordion, Form } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import SearchBar from "./searchBar";
import { useEffect } from "react";


function FilterBar( { handleSearch, setSearchResults, query, setQuery, selectedGenre, setSelectedGenre, selectedLanguages, setSelectedLanguages, selectedYear, setSelectedYear, sortOption, setSortOption } ) {

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

      useEffect(() => {
        handleSearch(query, setSearchResults, selectedGenre, selectedLanguages, selectedYear);
    }, [query, selectedGenre, selectedLanguages, selectedYear]);

    return (
        <>
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
                                                                    setSelectedLanguages(prevLanguages => [...prevLanguages, event.target.value]);
                                                                } else {
                                                                    setSelectedLanguages(prevLanguages => prevLanguages.filter(language => language !== event.target.value));
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
                    <Accordion.Item eventKey="2">
                        <Accordion.Header className="d-flex align-items-start m-2" > Relase year: </Accordion.Header>
                        <Accordion.Body>
                            <Form.Group>
                                <Form.Control placeholder="Enter year..." type="text" onChange={(event) => setSelectedYear(event.target.value)} ></Form.Control>
                            </Form.Group>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header className="d-flex align-items-start m-2" > Sort by: </Accordion.Header>
                        <Accordion.Body>
                            <Form.Group>
                                <Form.Control as="select" onChange={(event) => setSortOption(event.target.value)}>
                                    <option value="">Select...</option>
                                    <option value="title">Title</option>
                                    <option value="year">Release Year</option>
                                </Form.Control>
                            </Form.Group>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Row>
        </>
    )
};

export default FilterBar;