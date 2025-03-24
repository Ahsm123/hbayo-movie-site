import { useState } from "react";
import NavbarBrand from "./NavbarBrand";
import NavbarSearch from "./NavbarSearch";
import NavbarLinks from "./NavbarLinks";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar bg-zinc-900 text-white border-b border-zinc-800 px-6 py-4 shadow-md">
      <NavbarBrand isOpen={isOpen} setIsOpen={setIsOpen} />

      <div
        className={`md:flex md:items-center gap-6 mt-4 md:mt-0 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <NavbarSearch />
        <NavbarLinks setIsOpen={setIsOpen} />
      </div>
    </nav>
  );
}
