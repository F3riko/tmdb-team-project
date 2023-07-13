import {Card, Button} from 'react-bootstrap'
import './PreviewCard.css'

const PreviewCard = ( { movie } ) => {
  return (
    <Card border="light" className='preview-card'>
      <Card.Img
        variant='top'
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        ></Card.Img>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Button variant='dark'>View details</Button>
      </Card.Body>
    </Card>
  )
}

export default PreviewCard;