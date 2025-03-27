import { useState } from "react";
import NavbarBrand from "./NavbarBrand";
import NavbarSearch from "./NavbarSearch";
import NavbarLinks from "./NavbarLinks";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative bg-zinc-900 text-white border-b border-zinc-800 shadow-md">
      <div className="max-w-10xl mx-auto flex items-center justify-between px-6 py-4">
        <NavbarBrand isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="hidden md:flex items-center gap-6">
          <NavbarSearch />
          <NavbarLinks />
        </div>
      </div>

      {/* mobil */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-zinc-900 border-t border-zinc-800 shadow-md z-50">
          <div className="flex flex-col px-6 py-4 gap-4">
            <NavbarLinks setIsOpen={setIsOpen} />
          </div>
        </div>
      )}
    </nav>
  );
}
