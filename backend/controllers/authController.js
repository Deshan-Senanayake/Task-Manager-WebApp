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
        console.error("Register error:", err);
        res.status(500).json({ message: "Registration failed" });
    }
};
