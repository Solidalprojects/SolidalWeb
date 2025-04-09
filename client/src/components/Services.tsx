// components/Services.tsx
const Services = () => {
  const services = [
    {
      icon: "💻",
      title: "Website Development",
      description: "Custom websites built from scratch with modern technologies that load fast and look great on all devices."
    },
    {
      icon: "🛒",
      title: "E-Commerce Solutions",
      description: "Online stores with secure payment processing, inventory management, and user-friendly shopping experiences."
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Mobile-first designs that ensure your website works flawlessly across all devices and screen sizes."
    },
    {
      icon: "🔍",
      title: "SEO Optimization",
      description: "Improve your visibility on search engines with our technical SEO implementation and best practices."
    },
    {
      icon: "🚀",
      title: "Web App Development",
      description: "Dynamic web applications with advanced functionality and interactive user experiences."
    },
    {
      icon: "🛠️",
      title: "Maintenance & Support",
      description: "Ongoing support, updates, and maintenance to keep your website secure and running smoothly."
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Comprehensive web solutions to grow your business online</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;