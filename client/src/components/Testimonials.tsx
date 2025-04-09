// components/Testimonials.tsx
const Testimonials = () => {
  const testimonials = [
    {
      quote: "Solidal transformed our outdated website into a modern, functional platform that has significantly increased our online inquiries.",
      author: "Andi Hoxha",
      position: "Marketing Director, AlbTech Solutions"
    },
    {
      quote: "The e-commerce site they built for us has been flawless. Sales have increased by 45% since launch, and customer feedback has been extremely positive.",
      author: "Elena Prifti",
      position: "Owner, Artisan Crafts Albania"
    },
    {
      quote: "Professional, responsive, and incredibly skilled. They delivered our project on time and continued to provide excellent support afterward.",
      author: "Besnik Malaj",
      position: "CEO, Tirana Financial Group"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2>Client Testimonials</h2>
          <p>What our clients say about working with us</p>
        </div>
        <div className="testimonials-slider">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="quote">"</div>
              <p>{testimonial.quote}</p>
              <div className="testimonial-author">
                <h4>{testimonial.author}</h4>
                <span>{testimonial.position}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;