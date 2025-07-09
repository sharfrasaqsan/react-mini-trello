import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BoardDetails from "./pages/BoardDetails";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import apiRequest from "./api/apiRequest";
import Error from "./pages/Error";

function App() {
  const [boards, setBoards] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [boardSearchResults, setBoardSearchResults] = useState([]);
  const [taskSearchResults, setTaskSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBoardsLoading, setIsBoardsLoading] = useState(true);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await apiRequest.get("/boards");
        setBoards(response.data);
        setBoardSearchResults(response.data); // set fetch boards, because boardSearchResults is depend on board
      } catch (err) {
        alert(err.message);
      } finally {
        setIsBoardsLoading(false);
      }
    };

    fetchBoards();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiRequest.get("/tasks");
        setTasks(response.data);
      } catch (err) {
        alert(err.message);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedLogin);
    setIsLoading(false);
  }, []);

  return (
    <div className="App">
      <Header />
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {isLoading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Dashboard
                  boards={boards}
                  setBoards={setBoards}
                  boardSearchResults={boardSearchResults}
                  setBoardSearchResults={setBoardSearchResults}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/board/:id"
            element={
              isLoggedIn ? (
                <BoardDetails
                  boards={boardSearchResults}
                  tasks={tasks}
                  setTasks={setTasks}
                  taskSearchResults={taskSearchResults}
                  setTaskSearchResults={setTaskSearchResults}
                  isBoardsLoading={isBoardsLoading}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                userName={userName}
                setUserName={setUserName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                users={users}
                setUsers={setUsers}
              />
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      )}
      <Footer />
    </div>
  );
}

export default App;
