import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Stack } from 'react-bootstrap';
import { useAppDispatch } from '../redux';
import { fetchAuthLogin } from '../redux/auth/asyncActions';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../redux/auth/selectors';

const Login = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('ion@example.com');
  const [password, setPassword] = useState<string>('ion');

  const auth = useSelector(selectAuthStatus);
  const navigate = useNavigate();

  const handleLogIn = () => {
    dispatch(fetchAuthLogin({ email, password }));
  };

  useEffect(() => {
    if (auth.id) navigate('/');
  }, [auth.id]);

  return (
    <Container className="signin-container h-100">
      <Stack className="signin-box p-4" gap={5} style={{ width: '50%', margin: '0 auto' }}>
        <h2 className="text-center text-white">SIGN IN</h2>

        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="User name or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" className="w-100 mb-2" onClick={handleLogIn}>
            SIGN IN
          </Button>

          <Form.Check type="checkbox" label="Keep logged in" className="mt-3" />

          <hr />

          <Stack direction="horizontal" gap={3}>
            <Link to="/register" className="text-light">
              Sig Up
            </Link>

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
