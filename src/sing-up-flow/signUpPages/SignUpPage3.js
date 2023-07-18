import Form from "react-bootstrap/Form";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { nanoid } from "nanoid";

const SignUpPage3 = ({ handleFieldChange, formData }) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="homepage">
        <Form.Label>
          What movies would you like to see on your homepage?
        </Form.Label>
        {["Most Popular", "Top Rater", "Upcoming"].map((option) => {
          return (
            <Form.Check
              checked={formData.homepage.value === option ? true : false}
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
  );
};

export default SignUpPage3;
