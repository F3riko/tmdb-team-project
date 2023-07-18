import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  validateInput,
  defaultFormData,
  arePasswordsSame,
} from "./formValidations";
import Pagination from "react-bootstrap/Pagination";
import { nanoid } from "nanoid";
import { saveUserInLS, addTakenUsername } from "../local-storage/fakeDB";
import shortHash from "short-hash";
import SignUpPage1 from "./signUpPages/SignUpPage1";
import SignUpPage2 from "./signUpPages/SignUpPage2";
import SignUpPage3 from "./signUpPages/SignUpPage3";
import SignUpPage4 from "./signUpPages/SignUpPage4";

function SignUp({ showInitial, handleClose }) {
  // Set form data to default
  const [formData, setFormData] = useState(defaultFormData);
  // Pegination section
  const [paginationData, setPaginationData] = useState({
    activePage: 1,
    PaginationItems: [],
  });
  useEffect(() => {
    setFormData(defaultFormData);
    setPaginationData((prevData) => ({ ...prevData, activePage: 1 }));
  }, [showInitial]);
  // Rerender pagination items when active page is changed
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

  const handleFieldChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [id]: { ...prevFormData[id], value: value, errors: [] },
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
        if (!formData["password"].errors.includes(error)) {
          setFormData((prevFormData) => {
            return {
              ...prevFormData,
              password: {
                ...prevFormData["password"],
                errors: [...prevFormData["password"].errors, error],
              },
            };
          });
        }
      }
    }
    if (!isError) {
      setPaginationData((prevData) => ({
        ...prevData,
        activePage: prevData.activePage + 1,
      }));
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
          }
          newUser[key] = formData[key].value;
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

  const renderSignUpPage = (activePage) => {
    switch (activePage) {
      case 1:
        return (
          <SignUpPage1
            formData={formData}
            handleFieldBlur={handleFieldBlur}
            handleFieldChange={handleFieldChange}
            renderErrors={renderErrors}
          />
        );
      case 2:
        return (
          <SignUpPage2
            handleTypeHeadBlur={handleTypeHeadBlur}
            handleTypeHeadChange={handleTypeHeadChange}
            renderErrors={renderErrors}
          />
        );
      case 3:
        return (
          <SignUpPage3
            formData={formData}
            handleFieldChange={handleFieldChange}
          />
        );
      case 4:
        return (
          <SignUpPage4
            handleTypeHeadBlur={handleTypeHeadBlur}
            handleTypeHeadChange={handleTypeHeadChange}
            renderErrors={renderErrors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Modal show={showInitial} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registration</Modal.Title>
        </Modal.Header>

        <Modal.Body>{renderSignUpPage(paginationData.activePage)}</Modal.Body>

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
