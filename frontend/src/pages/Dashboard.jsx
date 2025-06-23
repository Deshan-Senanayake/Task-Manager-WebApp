// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all'); // 'all' | 'completed' | 'pending'
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user]);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:5000/api/tasks', {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setTasks(res.data);
        } catch (err) {
            console.error('Failed to load tasks', err);
        } finally {
            setLoading(false);
        }
    };

    const createTask = async () => {
        if (!newTask.trim()) return;

        try {
            const res = await axios.post(
                'http://localhost:5000/api/tasks',
                { description: newTask },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            setTasks([...tasks, res.data]);
            setNewTask('');
        } catch (err) {
            console.error('Failed to create task', err);
        }
    };

    const toggleTaskStatus = async (id, currentStatus) => {
        try {
            await axios.put(
                `http://localhost:5000/api/tasks/${id}`,
                { completed: !currentStatus },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );

            setTasks((prev) =>
                prev.map((task) =>
                    task._id === id ? { ...task, completed: !currentStatus } : task
                )
            );
        } catch (err) {
            console.error('Failed to update task status', err);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setTasks(tasks.filter((t) => t._id !== id));
        } catch (err) {
            console.error('Failed to delete task', err);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        const matchesStatus =
            filter === 'all' ||
            (filter === 'completed' && task.completed) ||
            (filter === 'pending' && !task.completed);

        const matchesSearch =
            task.description.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesStatus && matchesSearch;
    });

    return (
        <div className="max-w-2xl mx-auto mt-12 p-6 bg-white shadow-lg rounded">
            <h2 className="text-2xl font-bold mb-4">📝 Your Tasks</h2>

            {/* Task Input */}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="New task..."
                    className="flex-grow border px-3 py-2 rounded"
                />
                <button
                    onClick={createTask}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add
                </button>
            </div>

            {/* Filter & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div className="flex gap-2">
                    {['all', 'completed', 'pending'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-3 py-1 rounded border ${
                                filter === type
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-800'
                            }`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>

                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border px-3 py-2 rounded w-full sm:w-64"
                />
            </div>

            {/* Task List */}
            {loading ? (
                <p>Loading tasks...</p>
            ) : (
                <ul className="space-y-3">
                    {filteredTasks.length === 0 ? (
                        <p className="text-gray-500 text-center">No tasks found.</p>
                    ) : (
                        filteredTasks.map((task) => (
                            <li
                                key={task._id}
                                className="flex justify-between items-center border p-2 rounded"
                            >
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() =>
                                            toggleTaskStatus(task._id, task.completed)
                                        }
                                    />
                                    <span
                                        className={
                                            task.completed
                                                ? 'line-through text-gray-500'
                                                : ''
                                        }
                                    >
                                        {task.description}
                                    </span>
                                </div>
                                <button
                                    onClick={() => deleteTask(task._id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    🗑️
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;
