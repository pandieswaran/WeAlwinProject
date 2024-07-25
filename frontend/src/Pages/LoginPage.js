import React, { useState } from 'react';
import { Form, FormGroup, FormControl, Button, FormLabel} from 'react-bootstrap';
import Axios from 'axios';
import '../Pages/LoginPage.css';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const Navigation = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const LoginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://localhost:8000/login', { email, password });
      const { token, userid } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userid', userid);
      toast("Login Successfully");
      Navigation('/home')

    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data.message : error.message);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="lcenter-container">
      <Form className="lform" onSubmit={LoginHandler}>
        <FormGroup controlId="formBasicEmail">
          <FormLabel>Username</FormLabel>
          <FormControl
            type="email"
            placeholder="Enter username"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="username"
          />
        </FormGroup>

        <FormGroup controlId="formBasicPassword">
          <FormLabel>Password</FormLabel>
          <div className="password-input-container">
            <FormControl
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-password-button"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </FormGroup><br />

        <div className="text-center">
          <Button variant="primary" type="submit">
            Log In
          </Button>
        </div>
        <div className="d-flex justify-content-between">
      <Nav.Link href="/forget-password" className="mt-2">
        Forget Password
      </Nav.Link>
      <Nav.Link href="/signup"  className="mt-2">
        Sign Up
      </Nav.Link>
    </div>
      </Form>
    </div>
  );
}

export default LoginPage;
