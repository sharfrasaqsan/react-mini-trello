import { Link } from "react-router-dom";
import "../styles/pages/error.css";

const Error = () => {
  return (
    <main className="error-page">
      <div className="error-box">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/">
          <button>Go Back Home</button>
        </Link>
      </div>
    </main>
  );
};

export default Error;
