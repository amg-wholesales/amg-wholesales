"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Mail, Phone, ChevronRight, Check, ArrowRight } from "lucide-react";

export default function FranchisePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Refs for scroll animations
  const benefitsRef = useRef(null);
  const offeringsRef = useRef(null);
  const investmentRef = useRef(null);
  const contactRef = useRef(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
    issues: {
      franchiseInformation: true,
      investmentDetails: false,
      locationAvailability: false,
      trainingSupport: false,
      other: false
    }
  });
  const [formStatus, setFormStatus] = useState({ status: "idle", message: "" });
  
  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
      
      // Check if elements are visible for fade-in effect
      const isVisible = (element) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight * 0.85;
      };
      
      // Apply fade-in animation to sections
      if (isVisible(benefitsRef.current)) {
        benefitsRef.current.classList.add('fade-in');
      }
      
      if (isVisible(offeringsRef.current)) {
        offeringsRef.current.classList.add('fade-in');
      }
      
      if (isVisible(investmentRef.current)) {
        investmentRef.current.classList.add('fade-in');
      }
      
      if (isVisible(contactRef.current)) {
        contactRef.current.classList.add('fade-in');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setFormStatus({ status: "loading", message: "" });
    
    try {
      // Prepare the request payload
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        message: formData.message,
        interests: formData.issues // We use the issues object for interests
      };
      
      // Send data to our franchise inquiry API endpoint
      const response = await fetch('/api/franchise-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        const data = await response.json();
        setFormStatus({ 
          status: "success", 
          message: data.message || "Thank you for your interest! Our franchise team will contact you within 24-48 hours." 
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          location: "",
          message: "",
          issues: {
            franchiseInformation: true,
            investmentDetails: false,
            locationAvailability: false,
            trainingSupport: false,
            other: false
          }
        });
      } else {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to submit the form. Please try again.');
      }
    } catch (error) {
      setFormStatus({ 
        status: "error", 
        message: error.message || "Something went wrong. Please try again later."
      });
    }
  };
  
  // Benefits data
  const benefits = [
    {
      title: "Established Brand",
      description: "Partner with a name known for quality and reliability in the wholesale market",
      icon: "home/grinders.jpeg"
    },
    {
      title: "Diverse Portfolio",
      description: "Access to premium products including Cigar, Hookah, Kratom, Glass & more",
      icon: "home/cigar.jpeg"
    },
    {
      title: "High Profit Potential",
      description: "Fast-moving inventory with strong margins and multiple revenue streams",
      icon: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Comprehensive Support",
      description: "From store setup to day-to-day operations, we provide end-to-end assistance",
      icon: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&h=120&q=80"
    }
  ];
  
  // Offerings data
  const offerings = [
    "Exclusive territory rights",
    "Complete store design & setup guidance",
    "Inventory management systems",
    "Staff training & operational manuals",
    "Marketing & branding support",
    "E-commerce integration options",
    "Ongoing product innovation access",
    "Multi-channel sales optimization"
  ];
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&h=980&q=80"
          alt="AMG Wholesale Franchise Opportunity"
          className="h-full w-full object-cover object-center"
        />
        
        {/* Hero content */}
        <div className="absolute inset-0 flex items-center z-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-wide">
              Franchise With AMG Wholesale
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
              Partner With a Trusted Name in Wholesale Excellence
            </p>
            <a 
              href="#contact"
              className="inline-block bg-white text-black px-8 py-3 text-sm uppercase tracking-wider border border-white hover:bg-transparent hover:text-white transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>
      
      {/* Why Choose AMG Section */}
      <section ref={benefitsRef} className="py-24 opacity-0 transition-opacity duration-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-4">
              Why Choose AMG Wholesale?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join a network of successful retailers and entrepreneurs who have transformed their business with our premium franchise model.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white border border-gray-100 p-6 transition-all duration-300 hover:shadow-lg group">
                <div className="mb-4 bg-black/5 p-4 rounded-full inline-block group-hover:bg-black/10 transition-colors">
                  <img src={benefit.icon} alt={benefit.title} className="w-20 h-20 object-cover rounded-full" />
                </div>
                <h3 className="text-xl font-medium mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* What We Offer Section */}
      <section ref={offeringsRef} className="py-24 bg-gray-50 opacity-0 transition-opacity duration-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center gap-16">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-6">
                What We Offer
              </h2>
              <p className="text-gray-600 mb-8">
                Our comprehensive franchise package is designed to set you up for success. We provide everything you need to launch and grow your AMG Wholesale franchise.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {offerings.map((offering, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="text-black mr-2 mt-1 flex-shrink-0" size={18} />
                    <span className="text-gray-700">{offering}</span>
                  </div>
                ))}
              </div>
              
              <a
                href="#contact"
                className="inline-block mt-8 border border-black px-8 py-3 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
              >
                Apply
              </a>
            </div>
            
            <div className="md:w-1/2 relative h-96 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1574966390692-5140d4310743?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="AMG Wholesale Products"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Full width banner */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1579532536935-619928decd08?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="AMG Wholesale Products"
          className="absolute inset-0 h-full w-full object-cover"
        />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Join the AMG Wholesale family and elevate your retail experience with our premium franchise opportunity.
          </p>
          <a
            href="#contact"
            className="inline-block bg-white text-black px-8 py-3 text-sm uppercase tracking-wider border border-white hover:bg-transparent hover:text-white transition-colors"
          >
            Apply Now
          </a>
        </div>
      </section>
      
      {/* Investment Details */}
      <section ref={investmentRef} className="py-24 opacity-0 transition-opacity duration-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center gap-16">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src="https://plus.unsplash.com/premium_photo-1726862702421-deae8b4d75f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="AMG Wholesale Store"
                className="w-full h-auto rounded shadow-lg"
              />
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-6">
                Franchise Investment Details
              </h2>
              <p className="text-gray-600 mb-6">
                Costs and setup requirements vary by location, market conditions, and store size. Our flexible investment structure is designed to accommodate different financial capabilities.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="bg-gray-50 p-5 border-l-4 border-black">
                  <h3 className="text-lg font-medium mb-1">Initial Investment</h3>
                  <p className="text-gray-600">Tailored to your location and market potential</p>
                </div>
                <div className="bg-gray-50 p-5 border-l-4 border-black">
                  <h3 className="text-lg font-medium mb-1">Royalty Fees</h3>
                  <p className="text-gray-600">Competitive and performance-based structure</p>
                </div>
                <div className="bg-gray-50 p-5 border-l-4 border-black">
                  <h3 className="text-lg font-medium mb-1">Territory Rights</h3>
                  <p className="text-gray-600">Exclusive rights to your operational area</p>
                </div>
              </div>
              
              <p className="text-gray-700 italic">
                For personalized information and a detailed investment breakdown, please contact our franchise development team.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Who Can Apply */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-4">
              Who Can Apply?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're looking for passionate entrepreneurs ready to grow with our brand.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-100 p-8 text-center transition-all duration-300 hover:shadow-lg">
              <div className="mb-4 bg-black/5 p-4 rounded-full inline-flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&h=120&q=80" alt="Entrepreneurs" className="w-10 h-10 rounded-full" />
              </div>
              <h3 className="text-xl font-medium mb-2">Entrepreneurs</h3>
              <p className="text-gray-600">
                Visionary individuals looking to establish or expand their business portfolio with a proven model.
              </p>
            </div>
            
            <div className="bg-white border border-gray-100 p-8 text-center transition-all duration-300 hover:shadow-lg">
              <div className="mb-4 bg-black/5 p-4 rounded-full inline-flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&h=120&q=80" alt="Store Owners" className="w-10 h-10 rounded-full" />
              </div>
              <h3 className="text-xl font-medium mb-2">Store Owners</h3>
              <p className="text-gray-600">
                Existing retailers seeking to transform their store with premium products and enhanced profit margins.
              </p>
            </div>
            
            <div className="bg-white border border-gray-100 p-8 text-center transition-all duration-300 hover:shadow-lg">
              <div className="mb-4 bg-black/5 p-4 rounded-full inline-flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Business Groups" className="w-10 h-10 rounded-full" />
              </div>
              <h3 className="text-xl font-medium mb-2">Business Groups</h3>
              <p className="text-gray-600">
                Investment groups and business partnerships looking for a reliable franchise opportunity in a growing market.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-24 opacity-0 transition-opacity duration-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-start gap-16">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-6">
                Let's Get Started
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below to express your interest in our franchise opportunity. Our team will provide you with a comprehensive franchise starter guide and schedule a consultation.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Mail className="text-black mr-3 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <a href="mailto:amgwholesales01@gmail.com" className="text-gray-600 hover:text-black transition-colors">
                      amgwholesales01@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-black mr-3 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium">Call Us</h3>
                    <a href="tel:+15168822888" className="text-gray-600 hover:text-black transition-colors">
                      (+1) 516 882 2888
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-medium mb-4">Our Franchise Process</h3>
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3 flex-shrink-0">1</span>
                    <div>
                      <h4 className="font-medium">Initial Inquiry</h4>
                      <p className="text-gray-600">Submit your information to express interest</p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3 flex-shrink-0">2</span>
                    <div>
                      <h4 className="font-medium">Consultation</h4>
                      <p className="text-gray-600">Detailed discussion about the opportunity</p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3 flex-shrink-0">3</span>
                    <div>
                      <h4 className="font-medium">Qualification & Approval</h4>
                      <p className="text-gray-600">Review of your application and market analysis</p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3 flex-shrink-0">4</span>
                    <div>
                      <h4 className="font-medium">Onboarding & Launch</h4>
                      <p className="text-gray-600">Training, setup and grand opening support</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
            
            <div className="md:w-1/2 bg-white border border-gray-100 p-8 shadow-lg">
              <h3 className="text-xl font-medium mb-6">Franchise Inquiry Form</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Desired Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                      placeholder="City, State or Region"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interested In (select all that apply) *
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.issues.franchiseInformation}
                          onChange={() => setFormData({
                            ...formData,
                            issues: {
                              ...formData.issues,
                              franchiseInformation: !formData.issues.franchiseInformation
                            }
                          })}
                          className="mr-2"
                        />
                        <span>Franchise Information</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.issues.investmentDetails}
                          onChange={() => setFormData({
                            ...formData,
                            issues: {
                              ...formData.issues,
                              investmentDetails: !formData.issues.investmentDetails
                            }
                          })}
                          className="mr-2"
                        />
                        <span>Investment Details</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.issues.locationAvailability}
                          onChange={() => setFormData({
                            ...formData,
                            issues: {
                              ...formData.issues,
                              locationAvailability: !formData.issues.locationAvailability
                            }
                          })}
                          className="mr-2"
                        />
                        <span>Location Availability</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.issues.trainingSupport}
                          onChange={() => setFormData({
                            ...formData,
                            issues: {
                              ...formData.issues,
                              trainingSupport: !formData.issues.trainingSupport
                            }
                          })}
                          className="mr-2"
                        />
                        <span>Training & Support</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.issues.other}
                          onChange={() => setFormData({
                            ...formData,
                            issues: {
                              ...formData.issues,
                              other: !formData.issues.other
                            }
                          })}
                          className="mr-2"
                        />
                        <span>Other</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Information
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                      placeholder="Tell us about your business experience and why you're interested in our franchise"
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={formStatus.status === "loading"}
                      className={`w-full bg-black text-white px-6 py-3 text-sm uppercase tracking-wider hover:bg-gray-900 transition-colors ${
                        formStatus.status === "loading" ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {formStatus.status === "loading" ? "Submitting..." : "Submit Inquiry"}
                    </button>
                  </div>
                </div>
              </form>
              
              {formStatus.status === "success" && (
                <div className="mt-6 p-4 bg-green-50 border border-green-100 text-green-800 rounded">
                  {formStatus.message}
                </div>
              )}
              
              {formStatus.status === "error" && (
                <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-800 rounded">
                  {formStatus.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      {/* <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Find answers to common questions about our franchise opportunity.
            </p>
          </div>
          
          <div className="space-y-6">
            <details className="group bg-white border border-gray-100 rounded">
              <summary className="flex justify-between items-center p-6 cursor-pointer">
                <h3 className="text-lg font-medium">What is the typical investment range?</h3>
                <span className="transition group-open:rotate-180">
                  <ChevronRight size={16} />
                </span>
              </summary>
              <div className="px-6 pb-6">
                <p className="text-gray-600">
                  Investment ranges vary by location, store size, and market. Our franchises typically start from $150,000, which includes initial inventory, store setup, and franchise fee. We offer flexible financing options and can provide detailed breakdowns during your consultation.
                </p>
              </div>
            </details>
            
            <details className="group bg-white border border-gray-100 rounded">
              <summary className="flex justify-between items-center p-6 cursor-pointer">
                <h3 className="text-lg font-medium">How long does it take to open a store?</h3>
                <span className="transition group-open:rotate-180">
                  <ChevronRight size={16} />
                </span>
              </summary>
              <div className="px-6 pb-6">
                <p className="text-gray-600">
                  The timeline from signing to grand opening typically ranges from 3-6 months. This includes location selection, lease negotiation, store build-out, staff training, and inventory stocking. Our experienced team works closely with you through each step of the process.
                </p>
              </div>
            </details>
            
            <details className="group bg-white border border-gray-100 rounded">
              <summary className="flex justify-between items-center p-6 cursor-pointer">
                <h3 className="text-lg font-medium">What training and support do you provide?</h3>
                <span className="transition group-open:rotate-180">
                  <ChevronRight size={16} />
                </span>
              </summary>
              <div className="px-6 pb-6">
                <p className="text-gray-600">
                  Our comprehensive support includes initial training at our headquarters, on-site training during your launch, ongoing operational guidance, marketing support, and regular business development consultations. We also provide proprietary software systems for inventory and customer management.
                </p>
              </div>
            </details>
            
            <details className="group bg-white border border-gray-100 rounded">
              <summary className="flex justify-between items-center p-6 cursor-pointer">
                <h3 className="text-lg font-medium">Do I need industry experience?</h3>
                <span className="transition group-open:rotate-180">
                  <ChevronRight size={16} />
                </span>
              </summary>
              <div className="px-6 pb-6">
                <p className="text-gray-600">
                  While retail or business experience is beneficial, it's not required. We're looking for dedicated entrepreneurs who are passionate about the industry and committed to following our proven system. Our training program is designed to provide all the knowledge needed for success.
                </p>
              </div>
            </details>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Have more questions? Don't hesitate to reach out to our franchise development team.
            </p>
            <a 
              href="#contact"
              className="inline-block border border-black px-8 py-3 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
       */}
      {/* Custom CSS */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}