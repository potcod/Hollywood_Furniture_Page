import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./css_styles/App.css";


import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.tsx";
import About from "./pages/about.tsx";
import Contact from "./pages/contact.tsx";
import Shop from "./pages/shop.tsx";
import Admin from "./pages/admin.tsx";
import { Product } from "./pages/product.tsx";
import NavBar from "./components/navBar.tsx";
import AdminEdit from "./pages/adminEdit.tsx";

export default function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:productName" element={<Product />} />
        <Route path = "/admin" element ={<Admin/>}/>
        <Route path = "/admin/:productID" element ={<AdminEdit/>}/>

      </Routes>
      <footer className="flex flex-col items-center justify-center bg-gray-300 gap-1 py-2 mt-5">
        <p className="m-0 block text-slate-800 font-semibold text-sm">
          Hollywood Furniture Gallery
        </p>
        <p className="m-0 block text-slate-800 font-semibold text-sm">
          559 N Western Ave, Los Angeles, CA 90004, USA
        </p>
        <p className="m-0 block text-slate-800 font-semibold text-sm">
          (626) 662-9469
        </p>
        

        
      </footer>
    </Router>
  );
}
