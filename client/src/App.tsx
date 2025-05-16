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
// Import the scroll indicator component
import ClockProgressIndicator from './components/ClockProgressIndicator';
// Alternatively, use the advanced version:
// import AdvancedClockProgressIndicator from './components/AdvancedClockProgressIndicator';

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
          
          {/* Add the Clock Progress Indicator */}
          <ClockProgressIndicator 
            size={100} 
            color="#3b82f6"
            secondaryColor="#10b981"
            numSections={12}
            showNumbers={true}
            glowIntensity={7}
          />
          
          {/* If you want to use the advanced version instead, uncomment this and comment out the above
          <AdvancedClockProgressIndicator 
            size={100}
            color="#3b82f6"
            secondaryColor="#10b981"
            numSections={12}
            showNumbers={true}
            glowIntensity={7}
          />
          */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;