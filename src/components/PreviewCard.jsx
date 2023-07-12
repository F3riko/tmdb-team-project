import {Card, Button} from 'react-bootstrap'

const PreviewCard = ( { movie } ) => {
  return (
    <Card style={{
      width: '150px',
      margin: '5px',
      textAlign: 'center'
    }}>
      <Card.Img
        variant='top'
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        ></Card.Img>
      <Card.Body>
        <p>{movie.title}</p>
        <Button variant='dark'>View details</Button>
      </Card.Body>
    </Card>
  )
}

export default PreviewCard;