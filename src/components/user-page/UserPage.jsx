import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import Image from "react-bootstrap/Image";
import { getLoggedInUser } from "../../local-storage/fakeDB";
import UpdateInfoForm from "./UpdateInfoForm";

const UserPage = () => {
  const [user, setUser] = useState(getLoggedInUser());

  return (
    <Container fluid>
      <Row>
        <Col xs={2}>
          <Image
            src="/user.png"
            roundedCircle
            className="profile-placeholder-image"
          />
          <p className="text-center">{user.username}</p>
        </Col>
        <Col xs={10}>
          <p className="text-center">Edit profile info</p>
          <Row>
            <Col xs={4}>
              <UpdateInfoForm setUser={setUser} user={user} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
