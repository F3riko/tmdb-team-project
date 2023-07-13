import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../bootstrap.min.css'

const NavComponent = ({ isLoggedIn, onSearch, onLogin, onSignup } ) => {
  const handleClick = () => {
    console.log('search button pushed')
  }

  return(
    <Container>
      <Row>
        <Col>
        <Form controlID='search'>
          <Form.Group>
            <Form.Control type='search' placeholder='Search...'></Form.Control>
          </Form.Group>
        </Form>
        </Col>
        <Col>
          <Button variant='primary' onClick={handleClick}>Search</Button>
        </Col>
        <Col>

        </Col>
      </Row>
    </Container>
  )
}

export default NavComponent;