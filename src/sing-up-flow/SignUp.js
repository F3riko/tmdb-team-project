import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import { validateInput, defaultFormData } from "./formValidations";
import Pagination from "react-bootstrap/Pagination";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { languages, genres } from "./formValidations";

function Example() {
  // Pegination section
  const [paginationData, setPaginationData] = useState({
    activePage: 3,
    PaginationItems: [],
  });

  useEffect(() => {
    const items = [];
    for (let number = 1; number <= 4; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === paginationData.activePage}
          disabled={number > paginationData.activePage}
          onClick={
            number < paginationData.activePage
              ? () => {
                  setPaginationData((prevData) => ({
                    ...prevData,
                    activePage: number,
                  }));
                }
              : null
          }
        >
          {number}
        </Pagination.Item>
      );
    }
    setPaginationData((prevData) => ({
      ...prevData,
      PaginationItems: items,
    }));
  }, [paginationData.activePage]);

  // Modal rendering
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Form data
  const [formData, setFormData] = useState(defaultFormData);

  const handleFieldChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [id]: { ...prevFormData[id], value: value },
      };
    });
  };
  const handleFieldBlur = (event) => {
    const { id } = event.target;
    if (formData[id].value) {
      const errors = validateInput(id, formData);
      console.log(id);
      if (errors) {
        setFormData((prevFormData) => {
          return {
            ...prevFormData,
            [id]: { ...prevFormData[id], errors: errors },
          };
        });
      }
    }
  };
  const renderErrors = (formDataKey) => {
    let errors;
    if (formData[formDataKey].errors) {
      errors = formData[formDataKey].errors.map((error) => {
        return (
          <small>
            {error}
            <br />
          </small>
        );
      });
    }
    return errors;
  };

  const handleTypeHeadChange = (value, id) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [id]: { ...prevFormData[id], value: value },
      };
    });
  };

  const handleTypeHeadBlur = (id) => {
    if (formData[id].value) {
      const errors = validateInput(id, formData);
      console.log(id);
      if (errors) {
        setFormData((prevFormData) => {
          return {
            ...prevFormData,
            [id]: { ...prevFormData[id], errors: errors },
          };
        });
      }
    }
  };
  const handleSubmit = () => {
    const newUser = {};
    Object.keys(formData).forEach((key) => {
      newUser[key] = formData[key].value;
    });
    console.log(newUser);
    // To local storage here
    handleClose();
  };

  const handleNextPage = (event) => {
    event.preventDefault();
    let isError = false;
    // Object.keys(formData).forEach((name) => {
    //   const errors = validateInput(name, formData);
    //   if (errors.length) {
    //     isError = true;
    //     setFormData((prevFormData) => {
    //       return {
    //         ...prevFormData,
    //         [name]: { ...prevFormData[name], errors: errors },
    //       };
    //     });
    //   }
    // });
    if (!isError) {
      console.log(paginationData.activePage);
      setPaginationData((prevData) => ({
        ...prevData,
        activePage: prevData.activePage + 1,
      }));
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Sign Up
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registration</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {paginationData.activePage === 1 && (
            <Form>
              <Form.Group className="mb-3" controlId="username">
                <FloatingLabel
                  controlId="username"
                  label="Username"
                  className="mb-3"
                >
                  <Form.Control
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    type="text"
                    placeholder="Username"
                    defaultValue={formData.username.value}
                  />
                  <Form.Text className="text-center">
                    {renderErrors("username")}
                  </Form.Text>
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <FloatingLabel controlId="password" label="Password">
                  <Form.Control
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    type="password"
                    placeholder="Password"
                    defaultValue={formData.password.value}
                  />
                  <Form.Text className="text-center">
                    {renderErrors("password")}
                  </Form.Text>
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="passwordRepeat">
                <FloatingLabel
                  controlId="passwordRepeat"
                  label="Repeat password"
                >
                  <Form.Control
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    type="password"
                    placeholder="Repeat password"
                    defaultValue={formData.passwordRepeat.value}
                  />
                  <Form.Text className="text-center">
                    {renderErrors("passwordRepeat")}
                  </Form.Text>
                </FloatingLabel>
              </Form.Group>
            </Form>
          )}
          {paginationData.activePage === 2 && (
            <Form>
              <Form.Group className="mb-3" controlId="language">
                <Typeahead
                  onInputChange={(selected) =>
                    handleTypeHeadChange(selected, "language")
                  }
                  onBlur={() => handleTypeHeadBlur("language")}
                  id="language"
                  options={languages}
                  placeholder="Preferred language (optional)"
                />
                <Form.Text className="text-center">
                  {renderErrors("language")}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="genre">
                <Typeahead
                  onInputChange={(selected) =>
                    handleTypeHeadChange(selected, "genre")
                  }
                  onBlur={() => handleTypeHeadBlur("genre")}
                  id="genre"
                  options={genres}
                  placeholder="Favorite genre (optional)"
                />
                <Form.Text className="text-center">
                  {renderErrors("genre")}
                </Form.Text>
              </Form.Group>
            </Form>
          )}
          {paginationData.activePage === 3 && (
            <Form>
              <Form.Group className="mb-3" controlId="language">
                <Form.Label>
                  What movies would you like to see on your homepage?
                </Form.Label>
                {["Most Popular", "Top Rater", "Upcoming"].map((option) => {
                  return (
                    <Form.Check type="radio" label={option} name={"homepage"} />
                  );
                })}
              </Form.Group>
            </Form>
          )}
          {paginationData.activePage === 4 && (
            <Form>
              <Form.Group className="mb-3" controlId="voice">
                <Form.Select aria-label="Default select example">
                  <option>Preferred voice</option>
                  <option value="1">Sample 1</option>
                  <option value="2">Sample 2</option>
                  <option value="3">Sample 3</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Pagination>{paginationData.PaginationItems}</Pagination>
          <Button
            variant="primary"
            onClick={
              paginationData.activePage < 4 ? handleNextPage : handleSubmit
            }
          >
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
