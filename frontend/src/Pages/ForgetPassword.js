import React, { useState } from 'react';
import { Form, FormGroup, FormLabel, FormControl, Button, Modal } from 'react-bootstrap';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../Pages/ForgetPassword.css';
import { toast } from 'react-toastify';

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showOtpModal, setShowOtpModal] = useState(false);
    const Navigate = useNavigate();

    const sendOtpHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('http://localhost:8000/forgot-password', { email });
            console.log('token', response.data);
            const token = response.data.token;
            localStorage.setItem('token', token);
            toast.success("OTP sent to your email.");
            setShowOtpModal(true);
        } catch (error) {
            console.error('Failed to send OTP:', error.response ? error.response.data.message : error.message);
            toast.error("Please check your email address.");
        }
    };

    const resetPasswordHandler = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await Axios.post('http://localhost:8000/verify-otp', { token, otp, newPassword });
            console.log('Password reset', response.data);
            toast.success("Password reset successfully.");
            setOtp(''); 
            setNewPassword('');
            setShowOtpModal(false);
            setOtp('');   // After Clear the Otp in the DB
            Navigate('/login');
        } catch (error) {
            console.error('Failed to reset password:', error.response ? error.response.data.message : error.message);
            toast.error("Failed to reset password. Please check the OTP and try again.");
        }
    };

    return (
        <>
            <div className="center-containerf">
                <Form className="formf" onSubmit={sendOtpHandler}>
                    <FormGroup className="mb-3" controlId="formBasicEmail">
                        <FormLabel>Email</FormLabel>
                        <FormControl 
                            type="email" 
                            placeholder="Enter email" 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                        />
                    </FormGroup>
                    <Button variant="primary" type="submit">
                        Send OTP
                    </Button>
                </Form>
            </div>

            <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup className="mb-3" controlId="formBasicOtp">
                            <FormLabel>OTP</FormLabel>
                            <FormControl 
                                type="text" 
                                placeholder="Enter OTP" 
                                onChange={(e) => setOtp(e.target.value)} 
                                value={otp} 
                            />
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formBasicPassword">
                            <FormLabel>New Password</FormLabel>
                            <FormControl 
                                type="password" 
                                placeholder="Enter new password" 
                                onChange={(e) => setNewPassword(e.target.value)} 
                                value={newPassword} 
                            />
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowOtpModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={resetPasswordHandler}>
                        Reset Password
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ForgetPassword;
