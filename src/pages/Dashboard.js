import BoardForm from "../components/BoardForm";
import BoardList from "../components/BoardList";
import "../styles/pages/dashboard.css";
import BoardSearch from "../components/BoardSearch";
import { useEffect, useState } from "react";

const Dashboard = ({
  boards,
  setBoards,
  boardSearchResults,
  setBoardSearchResults,
}) => {
  const [boardSearch, setBoardSearch] = useState("");

  useEffect(() => {
    const filteredResults = boards.filter((i) =>
      i.label.toLowerCase().includes(boardSearch.toLowerCase())
    );

    setBoardSearchResults(filteredResults);
  }, [boards, boardSearch, setBoardSearchResults]);

  return (
    <main className="dashboard page-wrapper">
      <BoardSearch boardSearch={boardSearch} setBoardSearch={setBoardSearch} />
      <BoardForm boards={boards} setBoards={setBoards} />
      <BoardList boards={boardSearchResults} setBoards={setBoards} />
    </main>
  );
};

export default Dashboard;
