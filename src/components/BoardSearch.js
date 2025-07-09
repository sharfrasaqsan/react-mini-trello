import "../styles/components/boardsearch.css";

const BoardSearch = ({ boardSearch, setBoardSearch }) => {
  return (
    <div>
      <form className="board-search">
        <input
          type="text"
          placeholder="Search boards here."
          value={boardSearch}
          onChange={(e) => setBoardSearch(e.target.value)}
        />
      </form>
    </div>
  );
};

export default BoardSearch;
