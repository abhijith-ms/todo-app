import path from "path";
import express from "express";
import { createRequire } from "module"; 
const require = createRequire(import.meta.url); 
const jsonServer = require("json-server"); 
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(process.cwd(), "dist")));

const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
app.use("/api", middlewares); 
app.use("/api", router);

app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});