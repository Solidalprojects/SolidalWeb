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
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">Client Testimonials</h2>
          <p className="text-gray-300 text-lg">What our clients say about working with us</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg" key={index}>
              <div className="text-blue-400 text-5xl font-serif mb-4">"</div>
              <p className="text-gray-300 mb-6 italic">{testimonial.quote}</p>
              <div>
                <h4 className="text-white font-semibold">{testimonial.author}</h4>
                <span className="text-gray-400 text-sm">{testimonial.position}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;