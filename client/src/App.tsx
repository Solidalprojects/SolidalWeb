
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portofolio';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contacts';
import Footer from './components/Footer';
import './App.css';

function App() {
  

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;