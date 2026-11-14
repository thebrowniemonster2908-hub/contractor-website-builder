import React, { useState } from 'react';
import { Phone, MapPin, Clock, Star, Menu, X } from 'lucide-react';

export default function App() {
  const [page, setPage] = useState('landing');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    businessName: 'Your Business Name',
    serviceType: 'Plumbing',
    phone: '(303) 555-0147',
    email: 'contact@yourbusiness.com',
    address: 'Denver, CO & Surrounding Areas',
    tagline: 'Professional Service You Can Trust',
    ownerName: 'John Smith',
    ownerBio: 'With 15+ years of industry experience, I bring expertise, reliability, and a commitment to excellence to every project.',
    ownerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    services: [
      { name: 'Expert Installation', desc: 'Licensed professionals using premium materials for lasting results' },
      { name: 'Quality Guarantee', desc: 'Every job backed by our satisfaction guarantee and warranty' },
      { name: 'Same-Day Service', desc: '24/7 availability with emergency response times' }
    ],
    testimonials: [
      { name: 'Mike Johnson', text: 'Professional, punctual, and incredibly skilled. Highly recommend!', rating: 5 },
      { name: 'Sarah Davis', text: 'Outstanding work quality and customer service. Will definitely hire again.', rating: 5 },
      { name: 'James Wilson', text: 'Best contractor experience I\'ve had. Fair pricing and great results.', rating: 5 }
    ]
  });

  const templates = [
    {
      id: 'modern-blue',
      name: 'Modern Professional',
      desc: 'Clean blue & white',
      heroColor: '#003d82',
      accentColor: '#0066cc',
      bgColor: '#ffffff',
      textColor: '#1a1a1a'
    },
    {
      id: 'bold-authority',
      name: 'Bold Authority',
      desc: 'Dark with impact',
      heroColor: '#1a1a1a',
      accentColor: '#ff6b35',
      bgColor: '#ffffff',
      textColor: '#1a1a1a'
    },
    {
      id: 'industrial-strength',
      name: 'Industrial Strength',
      desc: 'Gray metallic',
      heroColor: '#2c3e50',
      accentColor: '#f39c12',
      bgColor: '#ffffff',
      textColor: '#1a1a1a'
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      desc: 'Ultra-clean white',
      heroColor: '#ffffff',
      accentColor: '#333333',
      bgColor: '#f9fafb',
      textColor: '#333333'
    },
    {
      id: 'trust-builder',
      name: 'Trust Builder',
      desc: 'Navy & gold',
      heroColor: '#1f4788',
      accentColor: '#d4a574',
      bgColor: '#ffffff',
      textColor: '#1a1a1a'
    }
  ];

  const currentTemplate = selectedTemplate ? templates.find(t => t.id === selectedTemplate) : templates[0];

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...formData.services];
    newServices[index][field] = value;
    setFormData(prev => ({ ...prev, services: newServices }));
  };

  const handleTestimonialChange = (index, field, value) => {
    const newTestimonials = [...formData.testimonials];
    newTestimonials[index][field] = value;
    setFormData(prev => ({ ...prev, testimonials: newTestimonials }));
  };

  // Landing Page
  if (page === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInFromLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
          .animate-slideInFromLeft { animation: slideInFromLeft 0.8s ease-out; }
        `}</style>

        <div className="max-w-6xl mx-auto px-6 py-20 animate-fadeInUp">
          <div className="text-center space-y-8">
            <h1 className="text-6xl font-light tracking-tight">
              Contractor Website.
              <br />
              Built for Conversions.
            </h1>

            <p className="text-xl font-light opacity-90 max-w-2xl mx-auto">
              Five professionally designed templates. Customize in real-time. Deploy in 5 days.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto text-left text-sm font-light">
              {[
                'Premium design template',
                'Custom copy & photos',
                '5-day delivery',
                'Mobile responsive',
                'SEO optimized'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setPage('templates')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg font-light transition-colors duration-300 rounded-sm"
            >
              Get Started
            </button>

            <div className="pt-8 text-sm font-light opacity-75">
              <p>Used by 500+ contractors. $1,999 fixed price. Zero surprises.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Template Selection Page
  if (page === 'templates') {
    return (
      <div className="min-h-screen bg-white">
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
        `}</style>

        <div className="max-w-2xl mx-auto px-6 py-16 animate-fadeInUp">
          <h1 className="text-4xl font-light tracking-tight mb-2">Choose Your Template</h1>
          <p className="text-sm font-light opacity-70 mb-12">
            All templates include full customization and owner profile section
          </p>

          <div className="space-y-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="border border-gray-200 rounded-sm p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setSelectedTemplate(template.id);
                  setPage('customize');
                }}
              >
                <div className="flex items-center space-x-6">
                  <div
                    className="w-32 h-32 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: template.heroColor }}
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-light tracking-tight mb-2">
                      {template.name}
                    </h3>
                    <p className="text-sm font-light opacity-70 mb-4">
                      {template.desc}
                    </p>
                    <button className="border border-gray-300 px-6 py-2 text-sm font-light hover:bg-gray-50 transition-colors duration-300 rounded-sm">
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setPage('landing')}
            className="mt-12 border border-gray-300 px-6 py-2 text-sm font-light hover:bg-gray-50 transition-colors duration-300 rounded-sm"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  // Customization Page
  if (page === 'customize') {
    return (
      <div className="flex h-screen bg-white overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-96 border-r border-gray-200 overflow-y-auto p-6">
          <div className="mb-8">
            <h2 className="text-xl font-light tracking-tight mb-1">Customize</h2>
            <p className="text-xs font-light opacity-70">Everything updates live</p>
          </div>

          {/* Business Info */}
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-widest font-light mb-4">Business Info</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => handleFormChange('businessName', e.target.value)}
                className="w-full border border-gray-200 rounded-sm p-2 text-sm font-light"
                placeholder="Business Name"
              />
              <select
                value={formData.serviceType}
                onChange={(e) => handleFormChange('serviceType', e.target.value)}
                className="w-full border border-gray-200 rounded-sm p-2 text-sm font-light"
              >
                {['Plumbing', 'HVAC', 'Electrical', 'Roofing', 'General Contractor'].map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleFormChange('tagline', e.target.value)}
                className="w-full border border-gray-200 rounded-sm p-2 text-sm font-light"
                placeholder="Tagline"
              />
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleFormChange('address', e.target.value)}
                className="w-full border border-gray-200 rounded-sm p-2 text-sm font-light"
                placeholder="Service Area"
              />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleFormChange('phone', e.target.value)}
                className="w-full border border-gray-200 rounded-sm p-2 text-sm font-light"
                placeholder="Phone"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleFormChange('email', e.target.value)}
                className="w-full border border-gray-200 rounded-sm p-2 text-sm font-light"
                placeholder="Email"
              />
            </div>
          </div>

          {/* Meet the Owner */}
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-widest font-light mb-4">Meet the Owner</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={formData.ownerName}
                onChange={(e) => handleFormChange('ownerName', e.target.value)}
                className="w-full border border-gray-200 rounded-sm p-2 text-sm font-light"
                placeholder="Full Name"
              />
              <textarea
                value={formData.ownerBio}
                onChange={(e) => handleFormChange('ownerBio', e.target.value)}
                rows="3"
                className="w-full border border-gray-200 rounded-sm p-2 text-sm font-light"
                placeholder="Bio"
              />
              <input
                type="text"
                value={formData.ownerImage}
                onChange={(e) => handleFormChange('ownerImage', e.target.value)}
                className="w-full border border-gray-200 rounded-sm p-2 text-sm font-light"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Services */}
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-widest font-light mb-4">Services</h3>
            <div className="space-y-4">
              {formData.services.map((service, idx) => (
                <div key={idx} className="p-2 bg-gray-50 rounded-sm space-y-2">
                  <input
                    type="text"
                    value={service.name}
                    onChange={(e) => handleServiceChange(idx, 'name', e.target.value)}
                    className="w-full border border-gray-200 rounded-sm p-2 text-sm font-light bg-white"
                    placeholder="Service name"
                  />
                  <textarea
                    value={service.desc}
                    onChange={(e) => handleServiceChange(idx, 'desc', e.target.value)}
                    rows="2"
                    className="w-full border border-gray-200 rounded-sm p-2 text-sm font-light bg-white"
                    placeholder="Description"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-widest font-light mb-4">Testimonials</h3>
            <div className="space-y-4">
              {formData.testimonials.map((testimonial, idx) => (
                <div key={idx} className="p-2 bg-gray-50 rounded-sm space-y-2">
                  <input
                    type="text"
                    value={testimonial.name}
                    onChange={(e) => handleTestimonialChange(idx, 'name', e.target.value)}
                    className="w-full border border-gray-200 rounded-sm p-2 text-sm font-light bg-white"
                    placeholder="Name"
                  />
                  <textarea
                    value={testimonial.text}
                    onChange={(e) => handleTestimonialChange(idx, 'text', e.target.value)}
                    rows="2"
                    className="w-full border border-gray-200 rounded-sm p-2 text-sm font-light bg-white"
                    placeholder="Quote"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => setPage('pricing')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm font-light rounded-sm transition-colors duration-300"
            >
              Continue to Payment
            </button>
            <button
              onClick={() => setPage('templates')}
              className="w-full border border-gray-300 px-6 py-2 text-sm font-light hover:bg-gray-50 transition-colors duration-300 rounded-sm"
            >
              Back
            </button>
          </div>
        </div>

        {/* Right Side - Live Preview */}
        <div className="flex-1 overflow-y-auto">
          <LivePreview template={currentTemplate} formData={formData} />
        </div>
      </div>
    );
  }

  // Pricing Page
  if (page === 'pricing') {
    return (
      <div className="min-h-screen bg-white">
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
        `}</style>

        <div className="max-w-2xl mx-auto px-6 py-16 animate-fadeInUp">
          <h1 className="text-4xl font-light tracking-tight mb-2">Simple Pricing</h1>
          <p className="text-sm font-light opacity-70 mb-12">
            One price. No surprises. Everything included.
          </p>

          <div className="border border-gray-200 rounded-sm p-8 max-w-md">
            <p className="text-xs uppercase tracking-widest font-light opacity-70 mb-4">
              Website Package
            </p>
            <div className="mb-8">
              <span className="text-5xl font-light">$1,999</span>
            </div>
            <p className="text-sm font-light opacity-70 mb-8">
              One-time payment. Five-day delivery.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Premium design template',
                'Full customization',
                'Owner profile section',
                '5-day delivery',
                'Mobile responsive',
                'SEO optimized',
                'Unlimited edits',
                'Lifetime support'
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center space-x-3 text-sm font-light">
                  <span className="text-green-600">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setPage('checkout')}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 text-sm font-light rounded-sm transition-colors duration-300 mb-3"
            >
              Get Started
            </button>
            <button
              onClick={() => setPage('customize')}
              className="w-full border border-gray-300 px-6 py-2 text-sm font-light hover:bg-gray-50 transition-colors duration-300 rounded-sm"
            >
              Back to Customize
            </button>
          </div>

          <p className="text-xs font-light opacity-70 mt-8">
            Questions? Contact us
          </p>
        </div>
      </div>
    );
  }

  // Checkout Page
  if (page === 'checkout') {
    return (
      <div className="min-h-screen bg-white">
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
        `}</style>

        <div className="max-w-2xl mx-auto px-6 py-16 animate-fadeInUp">
          <h1 className="text-4xl font-light tracking-tight mb-12">Order Summary</h1>

          <div className="border border-gray-200 rounded-sm p-8 max-w-md mb-8">
            <div className="space-y-4 mb-8 pb-8 border-b border-gray-200">
              <div>
                <p className="text-sm font-light mb-1">Website Package</p>
                <p className="text-lg font-light">{currentTemplate.name}</p>
              </div>
              <div>
                <p className="text-sm font-light mb-1">Business Name</p>
                <p className="text-lg font-light">{formData.businessName}</p>
              </div>
              <div>
                <p className="text-sm font-light mb-1">Contact</p>
                <p className="text-lg font-light">{formData.phone}</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-light">Total</span>
                <span className="text-2xl font-light">$1,999</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert('This is a preview. Checkout is not enabled and no payment was processed.');
                setPage('landing');
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-sm font-light rounded-sm transition-colors duration-300 mb-3"
            >
              Complete Payment $1,999
            </button>
            <button
              onClick={() => setPage('pricing')}
              className="w-full border border-gray-300 px-6 py-2 text-sm font-light hover:bg-gray-50 transition-colors duration-300 rounded-sm"
            >
              Back
            </button>
          </div>

          <p className="text-xs font-light opacity-70">
            Secure payment powered by Stripe
          </p>
        </div>
      </div>
    );
  }
}

// Live Preview Component
function LivePreview({ template, formData }) {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="bg-white rounded-sm shadow-lg overflow-hidden">
        {/* Header */}
        <div
          className="sticky top-0 z-40 px-8 py-4 border-b border-gray-200 flex items-center justify-between transition-colors duration-500"
          style={{ backgroundColor: template.bgColor }}
        >
          <h2 className="text-lg font-light" style={{ color: template.textColor }}>
            {formData.businessName}
          </h2>
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6 text-sm font-light" style={{ color: template.textColor }}>
              <a href="#" className="hover:opacity-70">Services</a>
              <a href="#" className="hover:opacity-70">About</a>
              <a href="#" className="hover:opacity-70">Reviews</a>
              <a href="#" className="hover:opacity-70">Contact</a>
            </nav>
            <button
              className="px-6 py-2 text-sm font-light rounded-sm text-white transition-colors duration-500"
              style={{ backgroundColor: template.accentColor }}
            >
              Quote
            </button>
          </div>
        </div>

        {/* Hero */}
        <div
          className="px-8 py-20 text-center transition-colors duration-500"
          style={{ backgroundColor: template.heroColor }}
        >
          <h1
            className="text-4xl font-light tracking-tight mb-2"
            style={{ color: template.bgColor }}
          >
            {formData.tagline}
          </h1>
          <p
            className="text-sm font-light opacity-90 mb-8"
            style={{ color: template.bgColor }}
          >
            {formData.serviceType} • {formData.address}
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="px-8 py-3 text-sm font-light text-white rounded-sm transition-colors duration-500"
              style={{ backgroundColor: template.accentColor }}
            >
              Schedule
            </button>
            <button
              className="px-8 py-3 text-sm font-light rounded-sm transition-colors duration-500"
              style={{ color: template.accentColor, borderColor: template.accentColor, borderWidth: '1px' }}
            >
              Call
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="px-8 py-16 bg-gray-50">
          <div className="grid grid-cols-4 gap-8 text-center">
            {[
              { label: '15+ Years', value: 'Experience' },
              { label: '5K+ Projects', value: 'Completed' },
              { label: '100% Satisfaction', value: 'Guaranteed' },
              { label: '24/7 Emergency', value: 'Service' }
            ].map((stat, idx) => (
              <div key={idx}>
                <p
                  className="text-2xl font-light transition-colors duration-500"
                  style={{ color: template.accentColor }}
                >
                  {stat.label}
                </p>
                <p className="text-xs font-light opacity-70">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="px-8 py-16">
          <h2
            className="text-3xl font-light tracking-tight mb-8 transition-colors duration-500"
            style={{ color: template.heroColor }}
          >
            Services
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {formData.services.map((service, idx) => (
              <div
                key={idx}
                className="p-5 rounded-sm border-l-4 transition-colors duration-500"
                style={{ borderColor: template.accentColor, backgroundColor: template.bgColor }}
              >
                <h3 className="font-light mb-2" style={{ color: template.textColor }}>
                  {service.name}
                </h3>
                <p className="text-xs font-light opacity-70" style={{ color: template.textColor }}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Meet the Owner */}
        <div
          className="px-8 py-16 transition-colors duration-500"
          style={{ backgroundColor: template.heroColor }}
        >
          <div className="flex items-center gap-8">
            <img
              src={formData.ownerImage}
              alt={formData.ownerName}
              className="w-32 h-32 rounded-full object-cover flex-shrink-0"
            />
            <div style={{ color: template.bgColor }}>
              <h2 className="text-2xl font-light tracking-tight mb-3">
                {formData.ownerName}
              </h2>
              <p className="text-sm font-light opacity-90">
                {formData.ownerBio}
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="px-8 py-16">
          <h2
            className="text-3xl font-light tracking-tight mb-8 transition-colors duration-500"
            style={{ color: template.heroColor }}
          >
            Testimonials
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {formData.testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="p-5 rounded-sm border border-gray-200"
                style={{ backgroundColor: template.bgColor }}
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <span
                      key={i}
                      className="transition-colors duration-500"
                      style={{ color: template.accentColor }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-xs font-light italic opacity-80 mb-4">
                  "{testimonial.text}"
                </p>
                <p
                  className="text-sm font-light transition-colors duration-500"
                  style={{ color: template.accentColor }}
                >
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="px-8 py-16 bg-gray-50">
          <h2 className="text-3xl font-light tracking-tight mb-8">Get Started</h2>
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-light mb-1">{formData.phone}</p>
                <p className="text-xs font-light opacity-70">Call anytime</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-light mb-1">{formData.address}</p>
                <p className="text-xs font-light opacity-70">Service area</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-light mb-1">24/7 Available</p>
                <p className="text-xs font-light opacity-70">Emergency response</p>
              </div>
            </div>
          </div>
          <button
            className="px-8 py-3 text-sm font-light text-white rounded-sm transition-colors duration-500"
            style={{ backgroundColor: template.accentColor }}
          >
            Request Quote
          </button>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-900 text-white">
          <p className="text-xs font-light opacity-70">
            © 2024 {formData.businessName}. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
