import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";

const SignUpPage1 = ({ handleFieldChange, handleFieldBlur, formData, renderErrors }) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="username">
        <FloatingLabel controlId="username" label="Username" className="mb-3">
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
        <FloatingLabel controlId="passwordRepeat" label="Repeat password">
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
  );
};

export default SignUpPage1;
