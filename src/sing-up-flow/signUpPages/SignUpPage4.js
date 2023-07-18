import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getVoices } from "../formValidations";

const SignUpPage4 = ({
  handleTypeHeadBlur,
  handleTypeHeadChange,
  renderErrors,
}) => {
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

  return (
    <Form>
      <Form.Group className="mb-3" controlId="voice">
        <Typeahead
          onInputChange={(selected) => handleTypeHeadChange(selected, "voice")}
          onChange={(selected) => handleTypeHeadChange(selected, "voice")}
          onBlur={() => handleTypeHeadBlur("voice")}
          id="voice"
          options={voices}
          placeholder="Preferred voice"
          labelKey="name"
        />
        <Form.Text className="text-center">{renderErrors("voice")}</Form.Text>
      </Form.Group>
    </Form>
  );
};

export default SignUpPage4;
