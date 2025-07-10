import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/login.css";
import apiRequest from "../api/apiRequest";

const Login = ({ email, setEmail, password, setPassword, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      const response = await apiRequest.get("/users", {
        params: {
          email,
          password,
        },
      });

      // If no user found, response.data will be an empty array
      if (response.data.length === 0) { 
        alert("Invalid email or password");
        return;
      }
      //save slogging in localStorage
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      alert("successfuly Loggedin!");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          required
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          required
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p className="login-here">
          Do you want to create an account? <Link to="/register">Signup</Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
