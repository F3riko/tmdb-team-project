import { useState, useEffect } from "react";
import { getLoggedInUser, updateUserInfo } from "../../local-storage/fakeDB";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import {
  languages,
  genres,
  validateInput,
  defaultFormData,
  arePasswordsSame,
} from "../../sing-up-flow/formValidations";
import { nanoid } from "nanoid";
import shortHash from "short-hash";
import { getVoices } from "../../sing-up-flow/formValidations";

const UpdateInfoForm = ({ user, setUser, homeListType, setHomeListType }) => {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const retrievedVoices = await getVoices();
        setVoices(retrievedVoices);
      } catch (error) {
        console.error("Error retrieving voices:", error);
      }
    };

    fetchVoices();
  }, []);

  const [formData, setFormData] = useState(defaultFormData);

  const handleFieldChange = (event) => {
    let { id, value } = event.target;
    const updatedId = event.target.name.includes("homepage") ? "homepage" : id;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [updatedId]: { ...prevFormData[updatedId], value: value, errors: [] },
      };
    });
  };

  const handleFieldBlur = (event) => {
    const { id } = event.target;
    if (formData[id].value) {
      const errors = validateInput(id, formData);
      if (errors) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [id]: { ...prevFormData[id], errors: errors },
        }));
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

  const validateField = (fieldId) => {
    const errors =
      fieldId === "passwordRepeat"
        ? [arePasswordsSame(formData[fieldId].value, formData.password.value)]
        : validateInput(fieldId, formData);
    if (errors && errors[0]) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldId]: { ...prevFormData[fieldId], errors: errors },
      }));
      console.log(formData[fieldId].errors);
      return true;
    }
  };

  const handleSubmit = () => {
    let hasErrors = false;
    for (const fieldId in formData) {
      const fieldValue = formData[fieldId].value;
      if (fieldValue) {
        if (validateField(fieldId)) {
          hasErrors = true;
          break;
        }
      }
    }
    
    if (!hasErrors) {
      // Create new user
      const updatedUserData = {
        ...user,
      };

      // Populate updatedUserData object with form data
      for (const key in formData) {
        if (formData[key].value && key !== "repeatPassword") {
          updatedUserData[key] =
            key === "password"
              ? shortHash(formData[key].value || "")
              : formData[key].value;
        }
      }

      // Send data to server and reset form
      updateUserInfo(updatedUserData);
      setUser(getLoggedInUser());
      setFormData(defaultFormData);
    }
  };

  const ButtonReset = (fieldId) => {
    return (
      <Button
        variant="primary"
        onClick={() => {
          console.log(fieldId);
          setUser((prevData) => ({
            ...prevData,
            [fieldId]: { ...prevData[fieldId], value: "" },
          }));
          console.log(user);
        }}
      >
        Reset
      </Button>
    );
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="username">
        <FloatingLabel controlId="username" label="Username" className="mb-3">
          <Form.Control
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            type="text"
            placeholder="Username"
            value={formData.username.value}
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
            value={formData.password.value}
          />
          <Form.Text className="text-center">
            {renderErrors("password")}
          </Form.Text>
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3" controlId="passwordRepeat">
        <FloatingLabel controlId="passwordRepeat" label="Repeat password">
          <Form.Control
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            type="password"
            placeholder="Repeat password"
            value={formData.passwordRepeat.value}
          />
          <Form.Text className="text-center">
            {renderErrors("passwordRepeat")}
          </Form.Text>
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3" controlId="language">
        <Typeahead
          onChange={(selected) => handleTypeHeadChange(selected, "language")}
          onInputChange={(selected) =>
            handleTypeHeadChange(selected, "language")
          }
          onBlur={() => handleTypeHeadBlur("language")}
          id="language"
          options={languages}
          placeholder="Preferred language (optional)"
          defaultInputValue={user.language}
        />
        <Form.Text className="text-center">
          {renderErrors("language")}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="genre">
        <Typeahead
          onInputChange={(selected) => handleTypeHeadChange(selected, "genre")}
          onChange={(selected) => handleTypeHeadChange(selected, "genre")}
          onBlur={() => handleTypeHeadBlur("genre")}
          id="genre"
          options={genres}
          placeholder="Favorite genre (optional)"
          defaultInputValue={user.genre}
        />
        <Form.Text className="text-center">{renderErrors("genre")}</Form.Text>
        {/* <ButtonReset fieldId={"genre"} /> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="homepage">
        <Form.Label>
          What movies would you like to see on your homepage?
        </Form.Label>
        {["Most Popular", "Top Rated", "Upcoming"].map((option) => {
          return (
            <Form.Check
              checked={formData.homepage.value === option}
              onChange={(e) => handleFieldChange(e)}
              value={option}
              key={nanoid()}
              type="radio"
              label={option}
              name={"homepage"}
              id={nanoid()}
            />
          );
        })}
      </Form.Group>

      <Form.Group className="mb-3" controlId="voice">
        <Typeahead
          onInputChange={(selected) => handleTypeHeadChange(selected, "voice")}
          onChange={(selected) => handleTypeHeadChange(selected, "voice")}
          onBlur={() => handleTypeHeadBlur("voice")}
          id="voice"
          options={voices}
          placeholder="Preferred voice"
          labelKey="name"
          defaultInputValue={user.voice.name ? user.voice.name : "French Female"}
        />
        <Form.Text className="text-center">{renderErrors("voice")}</Form.Text>
      </Form.Group>

      <Button variant="primary" onClick={handleSubmit} className="w-100">
        Submit
      </Button>
    </Form>
  );
};

export default UpdateInfoForm;
