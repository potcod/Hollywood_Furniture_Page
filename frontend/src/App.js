import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css_styles/App.css';

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from "../../frontend-vite/src/pages/home";
import { About } from "../../frontend-vite/src/pages/about";
import { Contact } from "../../frontend-vite/src/pages/contact";
import { Shop } from "../../frontend-vite/src/pages/shop";
import { Product } from "../../frontend-vite/src/pages/product";
import NavBar from "../../frontend-vite/src/components/navBar.js";

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/shop" element={<Shop/>} />
          <Route path="/shop/:productName" element={<Product/>} />
        

      </Routes>
    </Router>
  );
}

export default App;
