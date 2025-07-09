import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/register.css";
import apiRequest from "../api/apiRequest";

const Register = ({
  userName,
  setUserName,
  email,
  setEmail,
  password,
  setPassword,
  users,
  setUsers,
}) => {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!userName || !email || !password) return;
    if (password.length < 8) {
      alert("Password must be upto 8 characters.");
      return;
    }
    try {
      const newUser = {
        username: userName,
        email,
        password,
      };
      const response = await apiRequest.post("/users", newUser);
      const addNewUser = [...users, response.data];
      setUsers(addNewUser);
      alert("Account created successfuly!");
      setUserName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main className="register-container ">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="Enter your name"
            required
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

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
          <p>* Password must be upto 8 characters.</p>
        </div>

        <button type="submit">Register</button>
        <p className="login-here">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
};

export default Register;
