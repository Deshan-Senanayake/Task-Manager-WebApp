import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        const newTask = {
            ...task,
            id: Date.now(),
            completed: false,
        };
        setTasks([newTask, ...tasks]);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const toggleTask = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6">
                    📝 Task Manager
                </h1>
                <TaskForm onAdd={addTask} />
                <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
            </div>
        </div>
    );
};

export default Home;
