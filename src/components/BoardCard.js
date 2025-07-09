import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import "../styles/components/boardcard.css";
import { useState } from "react";

const BoardCard = ({ board, handleDeleteBoard, handleEditBoard }) => {
  const [isEditingBoard, setIsEditingBoard] = useState(false);
  const [editedBoard, setEditedBoard] = useState(board.label);

  const handleBoardSubmit = (e) => {
    e.preventDefault();
    if (!editedBoard.trim()) return;
    handleEditBoard(board.id, editedBoard);
    setIsEditingBoard(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsEditingBoard(false);
      setEditedBoard(board.label);
    }
  };

  return (
    <div className="board-card-container">
      {isEditingBoard ? (
        <>
          <form onSubmit={handleBoardSubmit} style={{ display: "inline" }}>
            <input
              type="text"
              value={editedBoard}
              onChange={(e) => setEditedBoard(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </form>
          <FaArrowRight type="submit" onClick={handleBoardSubmit} />
        </>
      ) : (
        <Link to={`/board/${board.id}`} className="board-card">
          <h3>{board.label}</h3>
        </Link>
      )}

      <div className="board-card-icons">
        <CiEdit onClick={() => setIsEditingBoard(true)} />
        <MdDeleteOutline
          role="button"
          title="Delete Board"
          onClick={() => {
            if (window.confirm("Delete this board?")) {
              handleDeleteBoard(board.id);
            }
          }}
        />
      </div>
    </div>
  );
};

export default BoardCard;
