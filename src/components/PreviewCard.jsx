import {Card} from 'react-bootstrap'


const PreviewCard = ( { movie } ) => {
  return (
    <Card style={{
      width: '12rem',
      margin: '10px',
      textAlign: 'center'
    }}>
      <Card.Img
        variant='top'
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        ></Card.Img>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default PreviewCard;