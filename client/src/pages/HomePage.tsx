// src/pages/HomePage.tsx
import MainHomeComponent from '../components/MainHomeComponent';
import ClientLogoSlider from '../components/ClientLogoSlider';
import WhyFamousSection from '../components/WhyFamousSection';
import Services from '../components/Services';
import Portfolio from '../components/Portofolio';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contacts';
import ClientAccessSection from '../components/ClientAccessSection';
import '../styles/MainHome.css';

const HomePage = () => {
  return (
    <main>
      <div className="flex flex-col h-screen overflow-hidden">
        <MainHomeComponent />
        <ClientLogoSlider />
      </div>
      <WhyFamousSection />
      <Services />
      <Portfolio />
      <About />
      <ClientAccessSection />
      <Testimonials />
      <Contact />
    </main>
  );
};

export default HomePage;