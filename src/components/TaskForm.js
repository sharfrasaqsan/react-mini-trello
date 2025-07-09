import { useState } from "react";
import "../styles/components/taskform.css";
import apiRequest from "../api/apiRequest";

const TaskForm = ({ tasks, setTasks, boardId }) => {
  const [newTask, setNewTask] = useState("");

  const handleTasks = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const date = Date();
    const addNewTask = {
      boardId,
      date,
      checked: false,
      text: newTask,
    };

    try {
      const response = await apiRequest.post("/tasks", addNewTask);
      setTasks([...tasks, response.data]);
      setNewTask("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleTasks} className="task-form">
      <input
        type="text"
        placeholder="Enter task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button type="submit" disabled={!newTask.trim()}>
        Create
      </button>
    </form>
  );
};

export default TaskForm;
