import { useState } from "react";

const TaskForm = ({ onSubmit }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        onSubmit({ title, description });
        setTitle("");
        setDescription("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-lg shadow-md space-y-4"
        >
            <h2 className="text-xl font-semibold text-gray-800">Add New Task</h2>
            <input
                type="text"
                placeholder="Task title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
