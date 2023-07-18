import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import "../bootstrap.min.css";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SignUp from "../sing-up-flow/SignUp";
import shortHash from "short-hash";
import {
  logInUser,
  getLoggedInUser,
  logOutUser,
} from "../local-storage/fakeDB";
import LoginDataIncorrect from "./LoginDataIncorrect";
import { useNavigate, Link } from "react-router-dom";
import { handleSearch } from "../functions/fetch-functions";
import Image from "react-bootstrap/Image";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const NavComponent = ({
  query,
  setQuery,
  setSearchResults,
  selectedGenre,
  selectedLanguages,
}) => {
  // Sign-up-login-flow: sign up flow
  const [currentUser, setCurrentUser] = useState(getLoggedInUser());
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const HandleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    handleSearch(query, setSearchResults, selectedGenre, selectedLanguages);
    navigate("/searchResults");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    handleShow();
  };

  // Log in integration
  const defaultLoginData = {
    username: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(defaultLoginData);
  const [showError, setShowError] = useState(false);
  const handleCloseError = () => setShowError(false);
  const handleShowError = () => setShowError(true);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    if (loginData.username && loginData.password) {
      const loggedInId = logInUser(
        loginData.username,
        shortHash(loginData.password)
      );
      if (loggedInId) {
        setLoginData(defaultLoginData);
        setCurrentUser(getLoggedInUser());
      } else {
        handleShowError();
      }
    }
  };

  const UserLoggedInProfile = ({ currentUser }) => {
    return (
      <div className="d-flex justify-content-center align-items-center mt-1">
        <span className="nav-profile-text">Hello, {currentUser.username}!</span>
        <Link to={`user/${currentUser.id}`}>
          <Image className="nav-image-thumbnail" src="/user.png" />
        </Link>
        <FontAwesomeIcon
          icon={faRightFromBracket}
          size="xl"
          style={{ color: "#556080" }}
          className="nav-exit-icon"
          onClick={() => {
            logOutUser();
            setCurrentUser(getLoggedInUser());
          }}
        />
      </div>
    );
  };

  return (
    <Container id="nav-bar">
      <Row>
        <Col md="auto">
          <Form controlid="search">
            <Stack direction="horizontal" gap={2}>
              <Form.Control
                placeholder="Search..."
                name="searchQuery"
                value={query}
                onChange={HandleSearchChange}
              />
              <Button id="search-button" onClick={handleSearchClick}>
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Stack>
          </Form>
        </Col>
        <Col>{/* This is the middle column, which resizes */}</Col>
        <Col md="auto">
          {currentUser && currentUser.username ? (
            <UserLoggedInProfile currentUser={currentUser} />
          ) : (
            <Form controlid="login">
              <Row className="g-2 justify-content-md-right">
                <Col md="auto">
                  <Form.Control
                    type="username"
                    placeholder="Username"
                    name="username"
                    onChange={handleFieldChange}
                  />
                </Col>
                <Col md="auto">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleFieldChange}
                  />
                </Col>
                <Col md="auto">
                  <Button
                    variant="dark"
                    id="login-button"
                    className="w-auto"
                    onClick={handleLogin}
                  >
                    Log in
                  </Button>
                </Col>
                <Col md="auto">
                  <Button
                    variant="primary"
                    id="signup-button"
                    className="w-auto"
                    onClick={handleSignup}
                    type="submit"
                  >
                    Sign up
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Col>
      </Row>

      {/* Modals of sign-up-login flow */}
      <LoginDataIncorrect
        showInitial={showError}
        handleClose={handleCloseError}
      />
      <SignUp showInitial={show} handleClose={handleClose} />
    </Container>
  );
};

export default NavComponent;
