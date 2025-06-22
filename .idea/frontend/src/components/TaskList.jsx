const TaskList = ({ tasks, onDelete, onToggle }) => {
    if (tasks.length === 0) {
        return (
            <p className="text-center text-gray-500 mt-4">
                No tasks added yet. Add a task to get started.
            </p>
        );
    }

    return (
        <ul className="space-y-4 mt-4">
            {tasks.map((task) => (
                <li
                    key={task.id}
                    className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                    <div>
                        <h3
                            className={`text-lg font-semibold ${
                                task.completed ? "line-through text-gray-500" : "text-gray-800"
                            }`}
                        >
                            {task.title}
                        </h3>
                        {task.description && (
                            <p className="text-sm text-gray-600">{task.description}</p>
                        )}
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onToggle(task.id)}
                            className={`px-3 py-1 text-sm rounded ${
                                task.completed
                                    ? "bg-yellow-400 hover:bg-yellow-500 text-white"
                                    : "bg-green-500 hover:bg-green-600 text-white"
                            }`}
                        >
                            {task.completed ? "Undo" : "Done"}
                        </button>
                        <button
                            onClick={() => onDelete(task.id)}
                            className="px-3 py-1 text-sm rounded bg-red-500 hover:bg-red-600 text-white"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
