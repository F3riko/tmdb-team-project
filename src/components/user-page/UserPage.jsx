import React, { useState, useEffect } from "react";
import { Container, Row, Col, Figure, Spinner } from "react-bootstrap";
import UpdateInfoForm from "./UpdateInfoForm";
import ViewHistoryGallery from "./ViewHistoryGallery";
import { fetchFunction, getUrl } from "../../functions/fetch-functions";
import {
  getViewMoviesData,
  setViewMoviesData,
} from "../../local-storage/fakeDB";

const UserPage = ({ user, setUser }) => {
  const [moviesFromHistory, setMoviesFromHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoviesFromHistory = async () => {
      try {
        if (user.viewHistory && !getViewMoviesData()) {
          const moviePromises = user.viewHistory.map((movieId) => {
            const movieDataUrl = getUrl(null, null, null, null, movieId);
            return fetchFunction(movieDataUrl, true);
          });

          const moviesFromHistoryData = await Promise.all(moviePromises);
          setMoviesFromHistory(moviesFromHistoryData);
          setViewMoviesData(moviesFromHistoryData);
        } else {
          setMoviesFromHistory(getViewMoviesData());
        }
      } catch (error) {
        console.log("Error during fetching movies from history: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesFromHistory();
  }, [user.viewHistory]);

  return (
    <Container fluid>
      <Row>
        <Col md={3} xs={12} className="d-flex justify-content-center">
          <Figure>
            <Figure.Image
              src="/user.png"
              roundedCircle
              className="profile-placeholder-image"
            />
            <Figure.Caption className="text-center profile-placeholder-image-caption">
              {user.username}
            </Figure.Caption>
          </Figure>
        </Col>
        <Col md={9} xs={12} className="profile-from-editor">
          <Row>
            <Col xs={12} md={10} className="p-5">
              <h5 className="text-center mb-3">Edit profile info</h5>
              <UpdateInfoForm setUser={setUser} user={user} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Row>
            <h3 className="text-center my-5">My movie history</h3>
          </Row>
          {loading ? (
            <Spinner animation="grow" />
          ) : moviesFromHistory.length > 0 ? (
            <ViewHistoryGallery movies={moviesFromHistory} />
          ) : (
            <p className="text-center">No movies found in history.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
