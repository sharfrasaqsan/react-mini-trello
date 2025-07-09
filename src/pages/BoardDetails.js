import { Link, useParams } from "react-router-dom";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import "../styles/pages/boardDetails.css";
import TaskSearch from "../components/TaskSearch";
import { useEffect, useState } from "react";

const BoardDetails = ({
  boards,
  tasks,
  setTasks,
  taskSearchResults,
  setTaskSearchResults,
  isBoardsLoading,
}) => {
  const [tasksSearch, setTasksSearch] = useState("");

  const { id } = useParams();
  const board = boards.find((i) => i.id.toString() === id);

  useEffect(() => {
    const filteredTasks = tasks.filter(
      (i) =>
        i.boardId.toString() === id && // Filter by board ID for the current board details
        i.text.toLowerCase().includes(tasksSearch.toLowerCase())
    );

    setTaskSearchResults(filteredTasks);
  }, [id, tasks, tasksSearch, setTaskSearchResults]);

  if (isBoardsLoading) {
    return;
  }

  return (
    <div className="board-details">
      {isBoardsLoading ? (
        <p style={{ textAlign: "center" }}>Loading board data...</p>
      ) : !board ? (
        <p style={{ textAlign: "center" }}>Board data not found!</p>
      ) : (
        <>
          <h2>{board.label} Board</h2>
          <Link to="/">
            <button>Back to Boards</button>
          </Link>
          <TaskSearch
            tasksSearch={tasksSearch}
            setTasksSearch={setTasksSearch}
          />
          <TaskForm tasks={tasks} setTasks={setTasks} boardId={id} />
          <TaskList tasks={taskSearchResults} setTasks={setTasks} />
        </>
      )}
    </div>
  );
};

export default BoardDetails;
