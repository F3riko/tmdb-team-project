import React from 'react'
import Container from 'react-bootstrap/Container'
import PreviewCard from "./PreviewCard";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../bootstrap.min.css'
import styles from './MovieGallery.module.css'

const movieGallery = ({ moviesList, listType }) => {
  return(
    <Container className={styles.gallery}>
      <h3>{`${listType} Movies`}</h3>
      <Row>
        {moviesList.slice(0,4).map(movie => 
        <Col className='preview'>
          <PreviewCard key={movie.id} movie={movie} />
        </Col>)}
      </Row>
    </Container>
  )
}

export default movieGallery;