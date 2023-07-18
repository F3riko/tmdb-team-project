import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

function ViewHistoryGallery({ movies }) {
  return (
    <Container fluid className="p-3 text-center" style={{ overflowX: "auto" }}>
      <Row className="flex-nowrap overflow-auto">
        {movies.map((movie) => (
          <Col md={3} key={movie.id}>
            <Link
              to={`/movie/${movie.id}`}
              as={Card.Body}
              className="card-link"
            >
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="Card cap"
                  style={{ height: "500px" }}
                />
                <Card.Body style={{ height: "70px" }}>
                  <Card.Text className="card-description">
                    {movie.title}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ViewHistoryGallery;
