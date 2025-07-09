import "../styles/components/tasksearch.css";

const TaskSearch = ({ tasksSearch, setTasksSearch }) => {
  return (
    <div>
      <form className="task-search">
        <input
          type="text"
          placeholder="Search tasks here."
          value={tasksSearch}
          onChange={(e) => setTasksSearch(e.target.value)}
        />
      </form>
    </div>
  );
};

export default TaskSearch;
