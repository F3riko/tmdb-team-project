import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import FilterViewHistoryBar from "./FilterViewHistoryBar";

function ViewHistoryGallery({ movies }) {
  const defaultMovies = movies;
  const [filteredMovies, setFilteredMovies] = useState(defaultMovies);
  return (
    <Container fluid className="p-3 text-center" style={{ overflowX: "auto" }}>
      <Row>
        <FilterViewHistoryBar
          moviesToFilter={filteredMovies}
          setMoviesAfterFilter={setFilteredMovies}
          unsortedMovies={defaultMovies}
        />
      </Row>
      <Row className="flex-nowrap overflow-auto">
        {filteredMovies[1] ? (
          filteredMovies.map((movie) => (
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
          ))
        ) : (
          <p className="text-center">No relevant movies.</p>
        )}
      </Row>
    </Container>
  );
}

export default ViewHistoryGallery;
