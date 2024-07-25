import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../Pages/CreateUser.css';
import { Nav } from 'react-bootstrap';

function ProfileUpdate() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userid'); // Retrieve userId from local storage

  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    phonenumber: '',
  });

  // Fetching user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await Axios.get(`http://localhost:8000/users/${userId}`);
        const userData = response.data;
        setInitialValues({
          name: userData.name,
          email: userData.email,
          phonenumber: userData.phonenumber,
        });
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialValues({
      ...initialValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.put(`http://localhost:8000/users/${userId}`, initialValues);
      console.log('User updated successfully:', response.data);
      navigate('/home'); // Redirect to home page after successful update
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const { name, email, phonenumber } = initialValues;

  return (
    <div className='center-containerc'>
      <Form onSubmit={handleSubmit} className='containerc'>
        <Form.Group controlId="validationCustom01">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </Form.Group><br />
        <Form.Group controlId="validationCustomUsername">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="email"
              placeholder="Email"
              aria-describedby="inputGroupPrepend"
              required
              name="email"
              value={email}
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group><br />
        <Form.Group controlId="validationCustom04">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Phone Number"
            required
            name="phonenumber"
            value={phonenumber}
            onChange={handleChange}
          />
        </Form.Group><br />
        <Button className="mx-auto d-block" type="submit">Update Form</Button>
        <Nav.Link href="/home" className="mx-auto d-block text-center">
          Home
        </Nav.Link>
      </Form>
    </div>
  );
}

export default ProfileUpdate;
