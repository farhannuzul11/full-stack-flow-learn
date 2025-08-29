const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

let tasks = [{ id: 1, text: "Learn CI/CD" }];

app.get("/tasks", (req, res) => res.json(tasks));
app.post("/tasks", (req, res) => {
  const newTask = { id: Date.now(), text: req.body.text };
  tasks.push(newTask);
  res.json(tasks);
});
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter((t) => t.id != req.params.id);
  res.json(tasks);
});

app.listen(3001, () => console.log("✅ Backend running on port 3001"));
