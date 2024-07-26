import { toast } from 'react-toastify';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import '../Pages/CreateUser.css';
import { Nav } from 'react-bootstrap';

function SignupPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phonenumber, setPhonenumber] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const role = "user"; // Set default role as 'user'
        console.log(name + " " + email + " " + password + " " + phonenumber + " " + role);
        Axios.post('http://localhost:8000/signup', { name, email, password, phonenumber, role })
            .then((res) => {
                console.log(res);
                toast("User Added Successfully");
                navigate('/login'); // Redirect to '/home' after successful submission
            })
            .catch(err => toast.error("Already User Register"));
    }

    return (
        <>
        <div className='center-containerc'>
            <Form onSubmit={handleSubmit} className='containerc'>
                <Form.Group controlId="validationCustom01" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
                </Form.Group><br />
                <Form.Group controlId="validationCustomUsername">
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            aria-describedby="inputGroupPrepend"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group><br />
                <Form.Group controlId="validationCustom03">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group><br />
                <Form.Group controlId="validationCustom04">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Phone Number"
                        required
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                    />
                </Form.Group><br />
                <Form.Group className="mb-3">
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                    />
                </Form.Group>
                <Button className="mx-auto d-block" type="submit">Submit form</Button>
                <Nav.Link href="/login" className="mx-auto d-block text-center">
                    Log In
                </Nav.Link>
            </Form>
        </div>
        </>
    );
}

export default SignupPage;
