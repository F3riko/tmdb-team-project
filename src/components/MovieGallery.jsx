import React from 'react'
import Container from 'react-bootstrap/Container'
import PreviewCard from "./PreviewCard";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../bootstrap.min.css'

const movieGallery = ({ movieList, listType }) => {
  return(
    <>
      <Container style={{
        border: '1px solid lightGray'
      }}>
        <h3>{listType}</h3>
        <Row>
          {movieList.slice(0,4).map(movie => 
          <Col>
            <PreviewCard key={movie.id} movie={movie} />
          </Col>)}
        </Row>
      </Container>
    </>
  )
}

export default movieGallery;