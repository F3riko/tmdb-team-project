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
import { logInUser } from "../local-storage/fakeDB";
import LoginDataIncorrect from "./LoginDataIncorrect";

const NavComponent = ({ username, onSearch, onLogin, onSignup }) => {
  // Sign-up-flow integration
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

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
      setLoginData();
      // Navigation to the user page here
    } else {
      handleShowError();
    }
  };

  //These functions will handle the search, login, and signup functions when passed the correct props
  const handleSearch = () => {
    console.log("search button pushed");
  };

  return (
    <Container id="nav-bar">
      <Row>
        <Col md="auto">
          <Form controlID="search">
            <Stack direction="horizontal" gap={2}>
              <Form.Control type="search" placeholder="Search..." />
              <Button id="search-button" onClick={handleSearch}>
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Stack>
          </Form>
        </Col>
        <Col>
          {/* This is the middle column, once I figure out how to stretch it */}
        </Col>
        {/* Here will be the conditional operator, which will check to see if username exists */}
        <Col xs={7}>
          <Form controlId="login">
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
        </Col>
      </Row>
      <LoginDataIncorrect
        showInitial={showError}
        handleClose={handleCloseError}
      />
      <SignUp showInitial={show} handleClose={handleClose} />
    </Container>
  );
};

export default NavComponent;
