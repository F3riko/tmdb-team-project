import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import '../bootstrap.min.css'
import './NavBar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const NavComponent = ({username, onSearch, onLogin, onSignup } ) => {
  
  //These functions will handle the search, login, and signup functions when passed the correct props
  const handleSearch = (event) => {
    console.log('search button pushed')
    onSearch(event.target.value)
  }

  const handleLogin = () => {
    console.log('login button pushed')
  }

  const handleSignup = () => {
    console.log('signup button pushed')
  }

  return(
    <Container id='nav-bar'>
      <Row>
        <Col md='auto'>
          <Form controlID='search'>
            <Stack direction='horizontal' gap={2}>
              <Form.Control type='search' placeholder='Search...' />
              <Button 
                id='search-button' 
                onClick={handleSearch}>
                  <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Stack>
          </Form>
        </Col>
        <Col >
          {/* This is the middle column, once I figure out how to stretch it */}
        </Col>
        {/* Here will be the conditional operator, which will check to see if username exists */}
        <Col md='auto'>
        <Form controlID="login">
            <Row className="g-2 justify-content-md-right">
              <Col md='auto'>
                <Form.Control type="username" placeholder="Username" />
              </Col>
              <Col md='auto'>
                <Form.Control type="password" placeholder="Password" />
              </Col>
              <Col md='auto'>
                <Button
                  variant="dark"
                  id="login-button"
                  className="w-auto"
                  onClick={handleLogin}>
                    Log in
                </Button>
              </Col>
              <Col md='auto'>
                <Button 
                  variant="primary" 
                  id="signup-button"
                  className="w-auto"
                  onClick={handleSignup}>
                    Sign up
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default NavComponent;