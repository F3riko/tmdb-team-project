import React from 'react'
import Container from 'react-bootstrap/Container'
import PreviewCard from "./PreviewCard";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../bootstrap.min.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const movieGallery = ({ moviesList, listType }) => {
  return(
    <>
      <Container style={{
        border: '1px solid lightGray'
      }}>
        <h3>{`${listType} Movies`}</h3>
        <Row>
          {moviesList.slice(0,4).map(movie => 
          <Col className='preview'>
            <PreviewCard key={movie.id} movie={movie} />
          </Col>)}
        </Row>
      </Container>
    </>
  )
}

export default movieGallery;