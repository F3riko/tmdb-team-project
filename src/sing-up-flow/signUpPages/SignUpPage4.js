import Form from "react-bootstrap/Form";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

const SignUpPage4 = ({
  handleTypeHeadBlur,
  handleTypeHeadChange,
  renderErrors,
  voices,
}) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="voice">
        <Typeahead
          onInputChange={(selected) => handleTypeHeadChange(selected, "voice")}
          onChange={(selected) => handleTypeHeadChange(selected, "voice")}
          onBlur={() => handleTypeHeadBlur("voice")}
          id="voice"
          options={voices}
          placeholder="Preferable voice"
          labelKey="name"
        />
        <Form.Text className="text-center">{renderErrors("voice")}</Form.Text>
      </Form.Group>
    </Form>
  );
};

export default SignUpPage4;
