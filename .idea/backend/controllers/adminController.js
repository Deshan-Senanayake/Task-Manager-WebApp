const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password -otp -otpExpiresAt"); // exclude sensitive fields
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
};

exports.editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, role },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User updated", user: updatedUser });

    } catch (err) {
        res.status(500).json({ message: "Failed to update user" });
    }
};

exports.deactivateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deactivated", user });

    } catch (err) {
        res.status(500).json({ message: "Failed to deactivate user" });
    }
};
