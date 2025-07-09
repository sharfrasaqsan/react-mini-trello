import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import "../styles/components/taskitem.css";

const TaskItem = ({
  task,
  handleCheckTask,
  handleDeleteTask,
  handleEditTask,
}) => {
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editedText.trim()) return;
    handleEditTask(task.id, editedText);
    setIsEditingTask(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsEditingTask(false);
      setEditedText(task.text);
    }
  };

  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.checked}
        onChange={() => handleCheckTask(task.id)}
      />

      {isEditingTask ? (
        <form className="task-edit-form" onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <FaArrowRight role="button" onClick={handleEditSubmit} />
        </form>
      ) : (
        <label
          onDoubleClick={() => handleCheckTask(task.id)}
          className={task.checked ? "checked" : ""}
        >
          {task.text}
        </label>
      )}

      <CiEdit role="button" onClick={() => setIsEditingTask(true)} />
      <MdDeleteOutline
        role="button"
        onClick={() => {
          if (window.confirm("Delete this task?")) {
            handleDeleteTask(task.id);
          }
        }}
      />
    </div>
  );
};

export default TaskItem;
