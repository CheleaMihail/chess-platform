import React from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { useAppDispatch } from "../redux";
import { fetchAuthLogin } from "../redux/auth/asyncActions";

const Login = () => {
  const dispatch = useAppDispatch();

  const handleLogIn = () => {
    dispatch(fetchAuthLogin({ email: "ion@emap", password: "12345" }));
  };

  return (
    <Container className="signin-container h-100">
      <Stack
        className="signin-box p-4"
        gap={5}
        style={{ width: "50%", margin: "0 auto" }}
      >
        <h2 className="text-center">SIGN IN</h2>

        <Form>
          <Form.Group className="mb-3">
            <Form.Control type="email" placeholder="User name or email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button
            variant="primary"
            className="w-100 mb-2"
            onClick={handleLogIn}
          >
            SIGN IN
          </Button>

          <Form.Check type="checkbox" label="Keep logged in" className="mt-3" />

          <hr />

          <Stack direction="horizontal" gap={3}>
            <a href="/" className="text-light">
              Registration
            </a>

            <a href="/" className="text-light">
              Forgot password
            </a>
          </Stack>
        </Form>
      </Stack>
    </Container>
  );
};

export default Login;
