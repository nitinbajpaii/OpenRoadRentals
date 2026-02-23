import ScrollToTop from "./utils/ScrollToTop";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Booking from './pages/Booking';
import Confirmation from './pages/Confirmation';
import About from './pages/About';
import Contact from './pages/Contact';

import './styles/globals.css';

function App() {
  return (
    <AuthProvider>
  <Router>

    <ScrollToTop />

    <div className="App">

      <Header />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/booking" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<Home />} />

      </Routes>

      <Footer />

    </div>

  </Router>
</AuthProvider>
  );
}

export default App;