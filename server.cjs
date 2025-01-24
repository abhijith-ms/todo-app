const jsonServer = require("json-server");
const path = require("path");
const express = require("express");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "dist")));

const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
app.use("/api", middlewares); 
app.use("/api", router);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});