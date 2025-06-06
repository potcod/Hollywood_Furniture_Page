import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from "./pages/home.js";
import { About } from "./pages/about.js";
import { Contact } from "./pages/contact.js";
import { Shop } from "./pages/shop.js";
import NavBar from "./components/navBar.js";

function App() {
  

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/shop" element={<Shop/>} />
      </Routes>
    </Router>
  );
}

export default App;
