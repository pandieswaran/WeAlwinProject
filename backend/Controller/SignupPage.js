const User = require('../SignupSchema');
const bcrypt = require('bcrypt');

// User Signup Function and Routing
const SignupPage = async (req, res) => {
    try {
        const { name, email, password, phonenumber, role } = req.body;

        // Validation
        if (!name || !email || !password || !phonenumber || !role) {
            return res.status(400).json({ message: "Name, Email, Password, Phone number, and Role are required." });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword, phonenumber, role });
        await newUser.save();
        console.log("User registered:", newUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ message: 'User registration failed' });
    }
};

module.exports = {
    SignupPage
};
