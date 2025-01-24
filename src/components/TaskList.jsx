import React from "react";
import axios from "axios";

const TaskList = ({ tasks, fetchTasks }) => {
    const handleDelete = async (id) => {
        try {
            console.log("Deleting task with ID:", id);
            await axios.delete(`http://localhost:3001/tasks/${id}`);
            fetchTasks(); 
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Deadline</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.deadline}</td>
                        <td>{task.priority}</td>
                        <td>{task.completed ? "Completed" : "Pending"}</td>
                        <td>
                            <button onClick={() => handleDelete(task.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TaskList;