const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    otp: {
        type: String,
    },
    otpExpiresAt: {
        type: Date,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
