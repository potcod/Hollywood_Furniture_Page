import { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [currentPage, setCurrentPage] = useState("Home");

  const handlePageChange = (page: "Home" | "Shop" | "About" | "Contact") => {
    setCurrentPage(page);
  };

  return (
    <header className="bg-white shadow-md left-0 w-full z-50">
      {/* Top brand */}
      <div className="max-w-7xl ml-50 px-4 py-3 flex items-center justify-between  ">
        <h1 className="text-2xl font-bold text-red-500">Hollywood Furniture</h1>

        {/* Right section (Yelp + Cart) */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.yelp.com/biz/hollywood-furniture-gallery-los-angeles-3"
            target="_blank"
            rel="noopener noreferrer"
            className="!text-gray-600 hover:!text-red-500 text-xl"
            aria-label="Yelp"
          >
            <i className="fab fa-yelp"></i>
          </a>
          <button
            className="relative text-gray-600 hover:text-black text-xl"
            aria-label="Shopping Cart"
          >
            <i className="fas fa-shopping-cart"></i>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              3
            </span>
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      
      <nav className="bg-gray-100 border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-2 flex gap-6 justify-center">
          {["Home", "Shop", "About", "Contact"].map((page) => (
            <Link
              key={page}
              to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
              className={`!text-gray-700 hover:!text-blue-600 !no-underline font-medium ${
                currentPage === page ? "font-bold !text-blue-600 !underline" : ""
              }`}
              onClick={() => handlePageChange(page as any)}
            >
              {page}
            </Link>
          ))}
        </div>
      </nav>
      <div className = "mb-4">

      </div>
    </header>
    
  );
}

export default NavBar;
