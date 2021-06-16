import "../App.css";
import { Link } from "react-router-dom";

const Nav = () => {
  const navstyle = { color: "white" };
  return (
    <nav>
      <ul className="nav-links">
        <Link style={navstyle} to="/register">
          <li>Register</li>
        </Link>
        <Link style={navstyle} to="/login">
          <li>Login</li>
        </Link>
        {/* <Link style={navstyle} to="/books">
          <li>Books</li>
        </Link> */}
        {/* <Link style={navstyle} to="/bookadmin">
          <li>Books-Admin</li>
        </Link> */}
      </ul>
    </nav>
  );
};

export default Nav;
