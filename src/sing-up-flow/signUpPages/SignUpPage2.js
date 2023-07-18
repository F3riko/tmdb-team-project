import Form from "react-bootstrap/Form";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { languages, genres } from "../formValidations";

const SignUpPage2 = ({
  handleTypeHeadBlur,
  handleTypeHeadChange,
  renderErrors,
}) => {
  return (
    <Form>
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
        />
        <Form.Text className="text-center">{renderErrors("genre")}</Form.Text>
      </Form.Group>
    </Form>
  );
};

export default SignUpPage2;
