import { useState } from "react";

function Navbar({ onCreateClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-black">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center bg-green-500 font-bold text-black text-sm">
            P
          </div>
          <span className="text-lg font-bold text-white">Postz</span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-7 text-sm md:flex">
          <button
            onClick={() => scrollTo("home")}
            className="text-gray-400 hover:text-green-400 transition"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo("explore")}
            className="text-gray-400 hover:text-green-400 transition"
          >
            Explore
          </button>
          <button
            onClick={() => scrollTo("about")}
            className="text-gray-400 hover:text-green-400 transition"
          >
            About
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Create button */}
          <button
            onClick={onCreateClick}
            className="bg-green-500 px-4 py-1.5 text-sm font-semibold text-black hover:bg-green-400 transition"
          >
            + Create
          </button>

          {/* Mobile hamburger */}
          <button
            className="flex h-8 w-8 items-center justify-center text-gray-400 hover:text-white transition md:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-800 bg-black md:hidden">
          <div className="flex flex-col px-5 py-3 gap-1">
            <button
              onClick={() => scrollTo("home")}
              className="py-2 text-left text-sm text-gray-400 hover:text-green-400 transition"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo("explore")}
              className="py-2 text-left text-sm text-gray-400 hover:text-green-400 transition"
            >
              Explore
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="py-2 text-left text-sm text-gray-400 hover:text-green-400 transition"
            >
              About
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;