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
import { logInUser, getLoggedInUser } from "../local-storage/fakeDB";
import LoginDataIncorrect from "./LoginDataIncorrect";
import { useNavigate, Link } from "react-router-dom";
import { handleSearch } from "../functions/fetch-functions";
import { Link } from "react-router-dom";

const NavComponent = ({
  username,
  onLogin,
  onSignup,
  setSearchResults,
  selectedGenre,
  selectedLanguages,
}) => {
  // Sign-up-flow integration
  const [currentUser, setCurrentUser] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
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

  const handleLogin = (e) => {
    const loggedInId = logInUser(
      loginData.username,
      shortHash(loginData.password)
    );
    if (loggedInId) {
      setLoginData(defaultLoginData);
      setCurrentUser(getLoggedInUser());
      // Navigation to the user page here
    } else {
      handleShowError();
    }
  };

  return (
    <Container id="nav-bar">
      <Row>
        <Col md="auto">
          <Form controlID="search">
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
        {/* Here will be the conditional operator, which will check to see if username exists\ */}
        <Col md="auto">
          {currentUser ? (
            <>
              <span>Hello, {currentUser.username}!</span>
              <Link to={`user/${currentUser.id}`}>Profile</Link>
            </>
          ) : (
            <Form controlID="login">
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
