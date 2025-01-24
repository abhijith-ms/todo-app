import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ fetchTasks }) => {
    const [task, setTask] = useState({
        title: "",
        description: "",
        deadline: "",
        priority: "low",
        completed: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://todo-app-backend-jl52.onrender.com", task);
            fetchTasks();
            setTask({ title: "", description: "", deadline: "", priority: "low", completed: false })
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Description"
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                required
            />
            <input
                type="date"
                value={task.deadline}
                onChange={(e) => setTask({ ...task, deadline: e.target.value })}
                required
            />
            <select
                value={task.priority}
                onChange={(e) => setTask({ ...task, priority: e.target.value })}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type="submit">Add Task</button>
        </form>
    );

}

export default TaskForm