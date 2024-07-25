const UserSignup = require('../SignupSchema');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Generate a random OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Configure nodemailer
const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
        user: 'saravanan@wearedev.team',
        pass: 'NpBkV5jlr8-WeAlwin' // Replace with your actual password
    }
});

// Send OTP to the user's email
const sendOtpEmail = (email, otp) => {
    const mailOptions = {
        from: 'saravanan@wearedev.team',
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is ${otp}. It is valid for 30 minutes.`,
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Password Reset OTP</h2>
            <p>Your OTP for password reset is <strong>${otp}</strong>. It is valid for 30 minutes.</p>
        </div>
        `
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

// Forgot password request handler
const ForgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserSignup.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const otp = generateOTP();
        const token = jwt.sign({ id: user._id, otp }, "jwt_secret_key", { expiresIn: "30m" });

        // Save the OTP directly in the user's record
        user.otp = otp;
        await user.save();

        sendOtpEmail(email, otp);

        res.status(200).json({ message: 'OTP sent successfully', token });
    } catch (error) {
        console.error('Forgot password failed:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    ForgotPassword
};
