require("dotenv").config();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// Generate 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,       // your Gmail
        pass: process.env.GMAIL_APP_PASS,   // app password (not Gmail login)
    },
});

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = generateOTP();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

        // Send OTP email
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Task Manager App – OTP Verification",
            html: `<h2>Your OTP is: ${otp}</h2><p>Expires in 10 minutes.</p>`,
        });

        // Create user (unverified)
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpiresAt,
            isVerified: false,
        });

        await newUser.save();

        res.status(201).json({ message: "OTP sent to email. Please verify to complete registration." });

    } catch (err) {
        console.error("❌ Full Registration Error:", err.message);
        res.status(500).json({ message: "Registration failed", error: err.message });
    }

};

exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.isVerified) return res.status(400).json({ message: "User already verified" });
        if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

        if (new Date() > user.otpExpiresAt) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        // Update user
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiresAt = undefined;
        await user.save();

        res.status(200).json({ message: "Email successfully verified. You can now log in." });

    } catch (err) {
        console.error("❌ OTP Verification Error:", err.message);
        res.status(500).json({ message: "OTP verification failed", error: err.message });
    }
};
