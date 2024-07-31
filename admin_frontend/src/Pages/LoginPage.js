import React, { useState } from 'react';
import { Form, FormGroup, FormControl, Button, FormLabel } from 'react-bootstrap';
import Axios from 'axios';
import '../Pages/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function LoginPage() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const LoginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://localhost:8000/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      toast.success("Login Successfully");
      Navigate('/home')
      window.location.reload()
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data.message : error.message);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="lcenter-container">
      <Form className="lform" onSubmit={LoginHandler}>
        <div className="text-center mb-3">
          <h4>Admin Login</h4>
        </div>
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
      </Form>
    </div>
  );
}

export default LoginPage;
