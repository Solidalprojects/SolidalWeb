// components/Contact.tsx
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will contact you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2>Contact Us</h2>
          <p>Ready to start your project? Get in touch with our team</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <div className="icon">📍</div>
              <div>
                <h3>Address</h3>
                <p>Rruga Myslym Shyri, Tirana, Albania</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon">📞</div>
              <div>
                <h3>Phone</h3>
                <p>+355 69 123 4567</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon">✉️</div>
              <div>
                <h3>Email</h3>
                <p>info@solidal-web.al</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon">⏰</div>
              <div>
                <h3>Working Hours</h3>
                <p>Monday - Friday: 9:00 - 17:00</p>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="Your Phone" 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <select 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="Website Development">Website Development</option>
                  <option value="E-Commerce Solution">E-Commerce Solution</option>
                  <option value="Web Application">Web Application</option>
                  <option value="Maintenance & Support">Maintenance & Support</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <textarea 
                  name="message" 
                  placeholder="Your Message" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;