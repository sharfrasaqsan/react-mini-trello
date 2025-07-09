import { Link, useNavigate } from "react-router-dom";
import "../styles/components/styles.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav>
      <ul className="navbar-list">
        <div className="nav-left">
          <li>
            <Link to="/">Home</Link>
          </li>

          {!isLoggedIn && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Signup</Link>
              </li>
            </>
          )}
        </div>

        {isLoggedIn && (
          <div className="nav-right">
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
