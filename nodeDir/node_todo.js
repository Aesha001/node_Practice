const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/todo_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Task = mongoose.model("Task", taskSchema);

app.use(bodyParser.json());

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ title, description });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/tasks/:taskId", async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      { title, description },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/tasks/:taskId", async (req, res) => {
  try {
    await Task.findByIdAndRemove(req.params.taskId);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
