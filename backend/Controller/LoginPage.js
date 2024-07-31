const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserSignup = require('../SignupSchema');

//Login Routing
const LoginPage = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log(email, password);
        if (!email || !password) {

            console.log('Email / Password are Empty ')
            return res.status(400).json({ message: "Username and password are required." });
        }
        // Find user by username
        const user = await UserSignup.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'user not match' });
        }
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'password not match' });
        }
        // Generate JWT token
        const payload = {
            userid: user._id,
            name: user.name,
            email: user.email, 
            phonenumber: user.phonenumber
        };
        const token = jwt.sign(payload, 'this-can-be-any-random-key');
        // Respond with token
        res.status(200).json({ token ,userid: user._id  });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(400).json({ error: 'Login failed. Please try again later.' });
    }
}

// // Protect a route with JWT authentication
// Router.route('/').get(authenticateToken, (req, res) => {
//     res.json({ message: "Protected route accessed", user: req.user });
//   });

module.exports = {
    LoginPage 
};