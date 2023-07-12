import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../bootstrap.min.css'

const NavComponent = ({ isLoggedIn, onSearch, onLogin, onSignup } ) => {

  return(
    <Container>
      <Row>
        <Col>
        <Form controlID='search'>
          <Form.Group>
            <Form.Control type='search'></Form.Control>
          </Form.Group>
        </Form>
        </Col>
      </Row>
    </Container>
  )
}