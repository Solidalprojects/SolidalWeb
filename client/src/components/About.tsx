// components/About.tsx
import heroimage from '../assets/heroimage.png';
const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-image">
            <img src={heroimage} alt="Solidal Web Development Team" />
          </div>
          <div className="about-content">
            <h2>About Solidal Web Development</h2>
            <p>
              Founded in Albania with a passion for creating exceptional web experiences, 
              Solidal Web Development has grown into a trusted partner for businesses 
              seeking to establish a powerful online presence.
            </p>
            <p>
              Our team of skilled developers, designers, and digital strategists work 
              together to deliver websites and applications that not only look stunning 
              but also drive real business results.
            </p>
            <h3>Why Choose Us?</h3>
            <ul>
              <li>Local expertise with global standards</li>
              <li>Transparent communication and processes</li>
              <li>Tailored solutions for your specific needs</li>
              <li>Long-term support and partnership</li>
              <li>Affordable pricing without compromising quality</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;