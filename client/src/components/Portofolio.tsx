// components/Portfolio.tsx
import ecommerceLogo from '../assets/ecommerce.png';
import restaurant from '../assets/restaurant.png';
import tourism from '../assets/tourism.png';
import corporate from '../assets/corporate.png';
const Portfolio = () => {
  const projects = [
    {
      image: ecommerceLogo,
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "A complete online shopping solution for a local retail business."
    },
    {
      image: tourism,
      title: "Tourism Website",
      category: "Web Design",
      description: "Showcasing Albania's beautiful destinations for a travel agency."
    },
    {
      image: restaurant,
      title: "Restaurant Ordering System",
      category: "Web Application",
      description: "Online ordering and reservation system for a popular restaurant chain."
    },
    {
      image: corporate,
      title: "Corporate Portfolio",
      category: "Web Development",
      description: "Professional web presence for a multinational corporation."
    }
  ];

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Portfolio</h2>
          <p>Explore our recent projects and success stories</p>
        </div>
        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <div className="portfolio-item" key={index}>
              <div className="portfolio-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="portfolio-info">
                <span className="category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href="#" className="portfolio-link">View Project</a>
              </div>
            </div>
          ))}
        </div>
        <div className="portfolio-cta">
          <a href="#contact" className="btn btn-primary">Start Your Project</a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;