// components/Contact.tsx
import { useState, useEffect } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after delay
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const handleFocus = (name: string) => {
    setFocused(name);
  };

  const handleBlur = () => {
    setFocused(null);
  };

  const contactInfo = [
    { icon: "📍", title: "Address", content: "Rruga Myslym Shyri, Tirana, Albania" },
    { icon: "📞", title: "Phone", content: "+355 69 123 4567" },
    { icon: "✉️", title: "Email", content: "info@solidal-web.al" },
    { icon: "⏰", title: "Working Hours", content: "Monday - Friday: 9:00 - 17:00" }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/5 rounded-l-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-blue-600/5 rounded-tr-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-400 text-sm font-medium mb-4">GET IN TOUCH</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Contact Us</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Ready to start your project? Get in touch with our team</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            {contactInfo.map((item, index) => (
              <div 
                className="flex items-start space-x-6 transform transition-all duration-300 hover:-translate-y-1" 
                key={index}
              >
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg text-white text-2xl flex items-center justify-center min-w-max">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.content}</p>
                </div>
              </div>
            ))}
            
            {/* Social media links */}
            <div className="pt-6 mt-8 border-t border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {["facebook", "twitter", "instagram", "linkedin"].map((social, index) => (
                  <a 
                    href="#" 
                    className="bg-gray-800 hover:bg-blue-600 transition-colors duration-300 w-10 h-10 rounded-full flex items-center justify-center text-gray-300 hover:text-white"
                    key={index}
                    aria-label={social}
                  >
                    <i className={`fab fa-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gray-800/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-xl relative overflow-hidden group">
            {/* Form success message */}
            {submitted && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/95 z-20 animate-fade-in">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-gray-300">Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
              </div>
            )}
            
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10"></div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">Your Name</label>
                <input 
                  id="name"
                  type="text" 
                  name="name" 
                  placeholder="Enter your name" 
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  required 
                  className={`w-full p-4 bg-gray-700/80 border rounded-lg focus:outline-none transition-all duration-300 text-white ${
                    focused === 'name' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-600 hover:border-gray-500'
                  }`}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">Your Email</label>
                <input 
                  id="email"
                  type="email" 
                  name="email" 
                  placeholder="Enter your email" 
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  required 
                  className={`w-full p-4 bg-gray-700/80 border rounded-lg focus:outline-none transition-all duration-300 text-white ${
                    focused === 'email' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-600 hover:border-gray-500'
                  }`}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-gray-300 mb-2 text-sm">Phone Number</label>
                  <input 
                    id="phone"
                    type="tel" 
                    name="phone" 
                    placeholder="Your phone number" 
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={handleBlur}
                    className={`w-full p-4 bg-gray-700/80 border rounded-lg focus:outline-none transition-all duration-300 text-white ${
                      focused === 'phone' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-600 hover:border-gray-500'
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-300 mb-2 text-sm">Subject</label>
                  <select 
                    id="subject"
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus('subject')}
                    onBlur={handleBlur}
                    required
                    className={`w-full p-4 bg-gray-700/80 border rounded-lg focus:outline-none transition-all duration-300 text-white ${
                      focused === 'subject' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <option value="">Select Subject</option>
                    <option value="Website Development">Website Development</option>
                    <option value="E-Commerce Solution">E-Commerce Solution</option>
                    <option value="Web Application">Web Application</option>
                    <option value="Maintenance & Support">Maintenance & Support</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2 text-sm">Your Message</label>
                <textarea 
                  id="message"
                  name="message" 
                  placeholder="How can we help you?" 
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  required
                  rows={4}
                  className={`w-full p-4 bg-gray-700/80 border rounded-lg focus:outline-none transition-all duration-300 text-white ${
                    focused === 'message' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-600 hover:border-gray-500'
                  }`}
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-6 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 ${
                  isSubmitting ? 'opacity-75 cursor-wait' : 'hover:shadow-lg hover:shadow-blue-600/20'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;