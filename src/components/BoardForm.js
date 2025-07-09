import { useState } from "react";
import "../styles/components/boardform.css";
import apiRequest from "../api/apiRequest";

const BoardForm = ({ boards, setBoards }) => {
  const [newboard, setNewBoard] = useState("");

  const handleBoard = async (e) => {
    e.preventDefault();
    if (!newboard.trim()) return;
    try {
      const date = Date();
      const response = await apiRequest.post("/boards", {
        date,
        label: newboard,
      });
      // const newBoard = { id, date, label: newboard };
      // setBoards([...boards, newBoard]);
      setBoards([...boards, response.data]);
      setNewBoard("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <form className="board-form" onSubmit={handleBoard}>
        <input
          type="text"
          placeholder="Enter board name..."
          value={newboard}
          onChange={(e) => setNewBoard(e.target.value)}
        />
        <button type="submit" disabled={!newboard.trim()}>
          Create
        </button>
      </form>
    </div>
  );
};

export default BoardForm;
