import path from "path";
import express from "express";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(process.cwd(), "dist")));
app.use(express.json());

let tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Description 1",
    deadline: "2025-01-31",
    priority: "high",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description 2",
    deadline: "2025-02-15",
    priority: "medium",
    completed: true,
  },
];

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const newTask = { id: Date.now(), ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== id);
  res.status(200).json({ message: "Task deleted successfully" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});