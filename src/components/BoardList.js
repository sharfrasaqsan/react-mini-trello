import apiRequest from "../api/apiRequest";
import BoardCard from "../components/BoardCard";
import "../styles/components/boardlist.css";

const BoardList = ({ boards, setBoards }) => {
  const handleDeleteBoard = async (id) => {
    try {
      await apiRequest.delete(`/boards/${id}`);
      const updated = boards.filter((i) => i.id !== id);
      setBoards(updated);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditBoard = async (id, newBoard) => {
    const date = Date();
    const updated = { id, date, label: newBoard };
    try {
      const response = await apiRequest.put(`/boards/${id}`, updated);
      const updatedBoard = boards.map((i) =>
        i.id === id ? { ...response.data } : i
      );
      setBoards(updatedBoard);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="board-list">
      {boards.length > 0 ? (
        boards.map((board) => (
          <BoardCard
            key={board.id}
            board={board}
            handleDeleteBoard={handleDeleteBoard}
            handleEditBoard={handleEditBoard}
          />
        ))
      ) : (
        <p style={{ textAlign: "center" }}>No Boards right now..!</p>
      )}
    </div>
  );
};

export default BoardList;
