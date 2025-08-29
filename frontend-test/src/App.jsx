import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Fetch tasks from backend on load
  useEffect(() => {
    fetch("http://localhost:3001/tasks")
      .then((res) => res.json())
      .then((data) => {
        // Add `done: false` to each task for checkbox functionality
        const withDone = data.map((t) => ({ ...t, done: false }));
        setTasks(withDone);
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Add new task
  const addTask = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: trimmed }),
    })
      .then((res) => res.json())
      .then((data) => {
        const withDone = data.map((t) => ({ ...t, done: false }));
        setTasks(withDone);
        setInput("");
      });
  };

  // Delete task
  const deleteTask = (id) => {
    fetch(`http://localhost:3001/tasks/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        const withDone = data.map((t) => ({ ...t, done: false }));
        setTasks(withDone);
      });
  };

  // Toggle checkbox (mark as done)
  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div className="App">
      <h1>✅ Task Manager</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task..."
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggleDone(t.id)}
            />
            <span
              style={{
                textDecoration: t.done ? "line-through" : "none",
                marginLeft: "8px",
              }}
            >
              {t.text}
            </span>
            <button
              onClick={() => deleteTask(t.id)}
              style={{ marginLeft: "10px" }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
