// src/pages/HomePage.tsx
import MainHomeComponent from '../components/MainHomeComponent';
import ClientLogoSlider from '../components/ClientLogoSlider';
import WhyFamousSection from '../components/WhyFamousSection';
import WebsiteDesignProject from '../components/WebsiteDesignProject';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contacts';
import '../styles/MainHome.css';

const HomePage = () => {
  return (
    <main>
      <div className="flex flex-col h-screen overflow-hidden">
        <MainHomeComponent />
        <ClientLogoSlider />
      </div>
      <WhyFamousSection />
      <WebsiteDesignProject />
      <Portfolio />
      <Contact />
    </main>
  );
};

export default HomePage;