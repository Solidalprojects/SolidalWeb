// src/App.tsx with the scroll indicator component added
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortofolioPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ClientLoginPage from './pages/ClientLoginPage';
import Footer from './components/Footer';


import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/client-login" element={<ClientLoginPage />} />
          </Routes>
          <Footer />
          
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;