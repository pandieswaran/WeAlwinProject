const UserSignup = require('../SignupSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Verify OTP and update password handler
const Verify_OTP = async (req, res) => {
    const { token, otp, newPassword } = req.body;

    try {
        // Verify the JWT token to get the user's ID and OTP
        const decoded = jwt.verify(token, 'jwt_secret_key');
        const userId = decoded.id;
        const storedOTP = decoded.otp;

        // Find the user by ID
        const user = await UserSignup.findById(userId);
       
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if OTP matches the stored OTP in the user's document
        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // If OTP is correct, update the user's password
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        // Clear the OTP field in the user document after successful use
        user.otp = null; // Assuming 'otp' field is used for storing OTP

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Failed to verify OTP' });
    }
};

module.exports = {
    Verify_OTP
};
