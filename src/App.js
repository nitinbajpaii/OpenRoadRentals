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
        <div className="App">

          {/* Header */}
          <Header />

          {/* Main Content FIX */}
          <main>
            <Routes>

              <Route path="/" element={<Home />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="/booking" element={<Booking />} />
              <Route path="/confirmation" element={<Confirmation />} />

              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* fallback */}
              <Route path="*" element={<Home />} />

            </Routes>
          </main>

          {/* Footer */}
          <Footer />

        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;