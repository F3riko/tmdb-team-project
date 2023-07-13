import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function LoginDataIncorrect({ showInitial, handleClose }) {
  return (
    <Modal show={showInitial} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Oh, something went wrong!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        It seems that your login or/and password is incorrect
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginDataIncorrect;
