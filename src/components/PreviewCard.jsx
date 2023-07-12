import {Card, Button} from 'react-bootstrap'

const PreviewCard = ( { movie } ) => {
  return (
    <Card style={{
      width: '100px',
      margin: '10px',
      textAlign: 'center'
    }}>
      <Card.Img
        variant='top'
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        width='100px'
        ></Card.Img>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Button>View details</Button>
      </Card.Body>
    </Card>
  )
}

export default PreviewCard;