// Update src/pages/HomePage.tsx
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portofolio';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contacts';
import ClientAccessSection from '../components/ClientAccessSection'; // Add this import

const HomePage = () => {
  return (
    <main>
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <ClientAccessSection /> {/* Add this component */}
      <Testimonials />
      <Contact />
    </main>
  );
};

export default HomePage;