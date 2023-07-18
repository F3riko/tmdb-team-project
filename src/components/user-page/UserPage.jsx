import React, { useState, useEffect } from "react";
import { Container, Row, Col, Figure } from "react-bootstrap";
import UpdateInfoForm from "./UpdateInfoForm";
import { fetchFunction, getUrl } from "../../functions/fetch-functions";
import Spinner from "react-bootstrap/Spinner";
import { getLoggedInUser } from "../../local-storage/fakeDB";
import ViewHistoryGallery from "./ViewHistoryGallery";
import FilterViewHistoryBar from "./FilterViewHistoryBar";

const UserPage = ({homeListType, setHomeListType, user, setUser}) => {
  const [moviesFromHistory, setMoviesFromHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoviesFromHistory = async () => {
      setTimeout(() => {}, 10000);
      try {
        if (user.viewHistory) {
          const moviePromises = user.viewHistory.map((movieId) => {
            let movieDataUrl = getUrl(null, null, null, null, movieId);
            return fetchFunction(movieDataUrl, true);
          });

          const moviesFromHistoryData = await Promise.all(moviePromises);
          setMoviesFromHistory(moviesFromHistoryData);
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
            <Col xs={4} md={10} className="p-5">
              <h5 className="text-center mb-3">Edit profile info</h5>
              <UpdateInfoForm
                setUser={setUser}
                user={user}
                homeListType={homeListType}
                setHomeListType={setHomeListType}/>
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
