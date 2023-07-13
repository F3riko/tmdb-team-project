import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  validateInput,
  defaultFormData,
  arePasswordsSame,
} from "./formValidations";
import Pagination from "react-bootstrap/Pagination";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { languages, genres } from "./formValidations";
import { nanoid } from "nanoid";
import { saveUserInLS, addTakenUsername } from "../local-storage/fakeDB";
import shortHash from "short-hash";

function SignUp({ showInitial, handleClose }) {
  // Pegination section
  const [paginationData, setPaginationData] = useState({
    activePage: 1,
    PaginationItems: [],
  });

  useEffect(() => {
    setFormData(defaultFormData);
  }, [showInitial]);

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
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

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
          <small key={nanoid()}>
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
        [id]: { ...prevFormData[id], value: value[0] },
      };
    });
  };
  const handleTypeHeadBlur = (id) => {
    if (formData[id].value) {
      const errors = validateInput(id, formData);
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
    // Create new user
    const newUser = {
      viewHistory: [],
      id: nanoid(),
      accessToken: nanoid(),
    };
    Object.keys(formData).forEach((key) => {
      if (key !== "passwordRepeat") {
        if (key === "password") {
          newUser[key] = shortHash(formData[key].value);
        } else {
          if (key === "username") {
            addTakenUsername(formData[key].value);
            newUser[key] = formData[key].value;
          } else {
            newUser[key] = formData[key].value;
          }
        }
      }
    });
    saveUserInLS(newUser);
    // Form to default and close
    setPaginationData((prevData) => ({
      ...prevData,
      activePage: 1,
    }));
    setFormData(defaultFormData);
    handleClose();
  };

  const handleNextPage = (event) => {
    event.preventDefault();
    let isError = false;
    Object.keys(formData).forEach((name) => {
      const errors = validateInput(name, formData);
      if (errors.length) {
        isError = true;
        setFormData((prevFormData) => {
          return {
            ...prevFormData,
            [name]: { ...prevFormData[name], errors: errors },
          };
        });
      }
    });
    if (paginationData.activePage === 1) {
      const error = arePasswordsSame(
        formData.password.value,
        formData.passwordRepeat.value
      );
      if (error) {
        isError = true;
        setFormData((prevFormData) => {
          return {
            ...prevFormData,
            ["password"]: {
              ...prevFormData["password"],
              errors: [...prevFormData["password"].errors, error],
            },
          };
        });
      }
    }
    if (!isError) {
      setPaginationData((prevData) => ({
        ...prevData,
        activePage: prevData.activePage + 1,
      }));
    }
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Sign Up
      </Button> */}

      <Modal show={showInitial} onHide={handleClose}>
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
                  onChange={(selected) =>
                    handleTypeHeadChange(selected, "language")
                  }
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
                  onChange={(selected) =>
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
              <Form.Group className="mb-3" controlId="homepage">
                <Form.Label>
                  What movies would you like to see on your homepage?
                </Form.Label>
                {["Most Popular", "Top Rater", "Upcoming"].map((option) => {
                  return (
                    <Form.Check
                      checked={
                        formData.homepage.value === option ? true : false
                      }
                      onChange={(e) => handleFieldChange(e)}
                      value={option}
                      key={nanoid()}
                      type="radio"
                      label={option}
                      name={"homepage"}
                    />
                  );
                })}
              </Form.Group>
            </Form>
          )}
          {paginationData.activePage === 4 && (
            <Form>
              <Form.Group className="mb-3" controlId="voice">
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => handleFieldChange(e)}
                  name="voice"
                >
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

export default SignUp;
