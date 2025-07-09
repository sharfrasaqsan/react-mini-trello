import apiRequest from "../api/apiRequest";
import TaskItem from "../components/TaskItem";
import "../styles/components/tasklist.css";

const TaskList = ({ tasks, setTasks }) => {
  const handleCheckTask = async (id) => {
    const task = tasks.find((i) => i.id === id);
    const updated = { ...task, checked: !task.checked };
    try {
      await apiRequest.patch(`/tasks/${id}`, {
        checked: updated.checked,
      });
      const updatedTasks = tasks.map((i) => (i.id === id ? updated : i));
      setTasks(updatedTasks);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await apiRequest.delete(`/tasks/${id}`);
      const updated = tasks.filter((i) => i.id !== id);
      setTasks(updated);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditTask = async (id, newTask) => {
    const task = tasks.find((i) => i.id === id);
    const updated = { ...task, text: newTask };
    try {
      await apiRequest.patch(`/tasks/${id}`, {
        text: newTask,
      });
      const updatedTasks = tasks.map((i) => (i.id === id ? updated : i));
      setTasks(updatedTasks);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            handleCheckTask={handleCheckTask}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
          />
        ))
      ) : (
        <p style={{ textAlign: "center" }}>No Tasks right now..!</p>
      )}
    </div>
  );
};

export default TaskList;
