const Task = require("../models/Task");

exports.createTask = async (req, res) => {
    try {
        const { title, description, deadline, assignedTo, status } = req.body;

        const task = new Task({
            title,
            description,
            deadline,
            assignedTo,
            status,
            createdBy: req.user.id, // from JWT
        });

        await task.save();
        res.status(201).json({ message: "Task created successfully", task });

    } catch (err) {
        console.error("Create Task Error:", err.message);
        res.status(500).json({ message: "Failed to create task" });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ createdBy: req.user.id });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user.id },
            req.body,
            { new: true }
        );

        if (!task) return res.status(404).json({ message: "Task not found" });

        res.status(200).json({ message: "Task updated", task });
    } catch (err) {
        res.status(500).json({ message: "Failed to update task" });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user.id,
        });

        if (!task) return res.status(404).json({ message: "Task not found" });

        res.status(200).json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete task" });
    }
};
