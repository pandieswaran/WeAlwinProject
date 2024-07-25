const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phonenumber: { type: String, required: true },
    otp:{type: String},
    role: { type: String, default: 'user' }
}, {
    timestamps: true
});

const UserSignup = mongoose.model('UserDetails', UserDetailsSchema);

module.exports = UserSignup;
