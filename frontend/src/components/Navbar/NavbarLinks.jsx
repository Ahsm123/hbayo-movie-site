import { NavLink } from "react-router-dom";

export default function NavbarLinks({ setIsOpen }) {
  const links = [
    { path: "/", label: "Forside" },
    { path: "/wishlist", label: "Ønskeliste" },
    { path: "/about", label: "About" },
  ];

  return (
    <ul className="flex flex-col md:flex-row gap-4 md:gap-6">
      {links.map(({ path, label }) => (
        <li key={path}>
          <NavLink
            to={path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "text-yellow-400" : "hover:text-yellow-400"
              }`
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
