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
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const NavComponent = ({ isLoggedIn, onSearch, onLogin, onSignup } ) => {
  
  const handleClick = () => {
    console.log('search button pushed')
  }

  return(
    <Container id='nav-bar'>
      <Row>
        <Col xs={3}>
          <Form controlID='search'>
            <Stack direction='horizontal' gap={2}>
              <Form.Control type='search' placeholder='Search...' />
              <Button 
                id='search-button' 
                onClick={handleClick}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            </Stack>
          </Form>
        </Col>
        <Col>
          {/* This is the middle column, once I figure out how to stretch it */}
        </Col>
        <Col xs={7}>
          <Form controlID='login'>
            <Stack direction='horizontal' gap={2}>
              <Form.Control type='username' placeholder='Username' />
              <Form.Control type='password' placeholder='Password' />
              <Button variant='dark' id='login-button'>Log in</Button>
              <Button variant='primary' id='signup-button'>Sign up</Button>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default NavComponent;