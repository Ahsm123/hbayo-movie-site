import { Link } from "react-router-dom";
import "./App.css";
export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🎬 HBayO</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Forside</Link>
        </li>
        <li>
          <Link to="/wishlist">Ønskeliste</Link>
        </li>
      </ul>
    </nav>
  );
}
