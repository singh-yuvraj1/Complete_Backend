function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="mt-16 border-t border-gray-800 bg-black px-5 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Top row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center bg-green-500 font-bold text-black text-sm">
                P
              </div>
              <span className="text-lg font-bold text-white">Postz</span>
            </div>
            <p className="mt-2 text-sm text-gray-400 max-w-xs">
              A simple image sharing platform.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex gap-6 text-sm">
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
          </nav>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-gray-800" />

        {/* Bottom row */}
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            Built with React &bull; Node.js &bull; Express &bull; MongoDB
          </p>
          <p className="text-xs text-gray-600">
            &copy; 2026 Postz
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
