import path from "path";
import express from "express";
import { createRequire } from "module"; // Use createRequire to import CommonJS modules
const require = createRequire(import.meta.url); // Create a require function
const jsonServer = require("json-server"); // Use require for json-server

const app = express();
const port = process.env.PORT || 3001;

// Serve static files from the React app's build folder
app.use(express.static(path.join(process.cwd(), "dist")));

// Use JSON Server for the API
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
app.use("/api", middlewares); // Prefix API routes with /api
app.use("/api", router);

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});