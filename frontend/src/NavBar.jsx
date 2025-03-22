import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="text-white font-bold text-lg">
          HBayO 🏝️
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="nav-link">
            Forside
          </Link>
        </li>
        <li>
          <Link to="/wishlist" className="nav-link">
            Ønskeliste
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
