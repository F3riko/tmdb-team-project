import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { getLoggedInUser } from "../../local-storage/fakeDB";
import UpdateInfoForm from "./UpdateInfoForm";
import Figure from "react-bootstrap/Figure";

const UserPage = () => {
  const [user, setUser] = useState(getLoggedInUser());

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
          <p className="text-center">Edit profile info</p>
          <Row>
            <Col xs={4} md={7}>
              <UpdateInfoForm setUser={setUser} user={user} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
