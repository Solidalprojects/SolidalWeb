// components/Hero.tsx
import heroimage from '../assets/heroimage.png';
const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <h1>Professional Web Development in Albania</h1>
          <h2>Transform Your Business with Modern Digital Solutions</h2>
          <p>
            Solidal Web Development delivers exceptional websites and web applications
            tailored to your business needs. We combine stunning design with
            powerful functionality.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">Get Started</a>
            <a href="#portfolio" className="btn btn-secondary">View Our Work</a>
          </div>
        </div>
        <div className="hero-image">
          <img src = {heroimage}  alt="Web Development" />
        </div>
      </div>
    </section>
  );
};

export default Hero;