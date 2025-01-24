import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://todo-app-96yo.onrender.com/tasks");
      console.log("API Response:", response.data); 
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskForm fetchTasks={fetchTasks} />
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />
    </div>
  );
};

export default App;