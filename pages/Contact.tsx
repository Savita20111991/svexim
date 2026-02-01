
import React, { useState, useRef } from 'react';
import { CONTACT_PHONE, OFFICE_ADDRESS } from '../constants';
import { generateClientThankYou } from '../services/gemini';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    country: '',
    message: ''
  });

  const [attachment, setAttachment] = useState<{ name: string; type: string; data: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Updated limit to 10MB as per requirement
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit. Please upload a smaller document.");
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachment({
          name: file.name,
          type: file.type,
          data: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Generate AI technical acknowledgment
      const response = await generateClientThankYou({
        name: formData.name,
        productDetails: formData.message,
        country: formData.country
      });
      setAiResponse(response || null);

      // 2. Save inquiry to LocalStorage for Admin Panel
      // Note: Large attachments might exceed LocalStorage quota (typically 5MB).
      // In a real production app, we would use a proper backend or IndexedDB.
      const newInquiry = {
        id: Date.now().toString(),
        ...formData,
        attachment,
        status: 'Pending',
        timestamp: new Date().toLocaleString()
      };
      
      try {
        const existingInquiries = JSON.parse(localStorage.getItem('savita_inquiries') || '[]');
        localStorage.setItem('savita_inquiries', JSON.stringify([newInquiry, ...existingInquiries]));
      } catch (storageError) {
        console.warn("LocalStorage quota exceeded. Inquiry saved without large attachment preview.");
        const simplifiedInquiry = { ...newInquiry, attachment: attachment ? { name: attachment.name, type: attachment.type, data: 'DATA_TOO_LARGE_FOR_PREVIEW' } : null };
        const existingInquiries = JSON.parse(localStorage.getItem('savita_inquiries') || '[]');
        localStorage.setItem('savita_inquiries', JSON.stringify([simplifiedInquiry, ...existingInquiries]));
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error processing your inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Get In Touch</h1>
          <p className="text-slate-600">Connect with our export division for quotations and technical queries.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-8 text-slate-900">Corporate Information</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                    📍
                  </div>
                  <div>
                    <div className="font-bold text-slate-700">Office Address</div>
                    <p className="text-sm text-slate-500 leading-relaxed mt-1">{OFFICE_ADDRESS}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                    📞
                  </div>
                  <div>
                    <div className="font-bold text-slate-700">Contact Number</div>
                    <p className="text-sm text-slate-500 leading-relaxed mt-1">{CONTACT_PHONE}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                    ✉️
                  </div>
                  <div>
                    <div className="font-bold text-slate-700">Export Inquiry</div>
                    <p className="text-sm text-slate-500 leading-relaxed mt-1">exports@savitaglobal.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900 p-8 rounded-2xl text-white">
              <h3 className="text-xl font-bold mb-4">Export Office Hours</h3>
              <p className="text-blue-100 text-sm mb-6">Our team is available to assist international clients across all time zones.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Mon - Fri</span>
                  <span className="font-bold">09:00 AM - 08:00 PM (IST)</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Saturday</span>
                  <span className="font-bold">10:00 AM - 04:00 PM (IST)</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-blue-400">Closed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
            {submitted ? (
              <div className="text-center py-10 animate-fade-in">
                <div className="text-6xl mb-6">🤝</div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Technical Inquiry Logged</h2>
                <p className="text-slate-500 mb-8 italic">Your reference: #{Date.now().toString().slice(-6)}</p>
                
                <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl text-left mb-8">
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2">Instant AI Feedback</div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {aiResponse}
                  </p>
                </div>

                <p className="text-slate-500 text-xs">Our executive will contact you shortly with the formal quote.</p>
                <button 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', company: '', email: '', country: '', message: '' });
                    setAttachment(null);
                  }}
                  className="mt-8 text-blue-600 font-bold hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative">
                {isSubmitting && (
                  <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl">
                    <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-sm font-bold text-slate-900">AI Processing Inquiry...</p>
                    <p className="text-xs text-slate-500 mt-2">Authenticating credentials & logging details</p>
                  </div>
                )}
                
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Send an Inquiry</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                    <input 
                      required 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Company Name</label>
                    <input 
                      required 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" 
                      placeholder="Acme Corp" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" 
                      placeholder="john@company.com" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Country</label>
                    <input 
                      required 
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" 
                      placeholder="United States" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Requirement Details</label>
                  <textarea 
                    required 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 h-32 focus:ring-2 focus:ring-blue-500 outline-none" 
                    placeholder="Tell us about your machinery or component requirements..."
                  ></textarea>
                </div>

                {/* File Upload Section */}
                <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Attach Specifications / Documents</label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                      {attachment ? 'Change File' : 'Upload Document'}
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    {attachment && (
                      <div className="text-[10px] text-blue-600 font-bold truncate max-w-[200px]">
                        📎 {attachment.name}
                      </div>
                    )}
                  </div>
                  <p className="text-[9px] text-slate-400 mt-2 italic">Supports PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB)</p>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
                >
                  Submit Export Inquiry
                </button>
                <p className="text-center text-[10px] text-slate-400 uppercase tracking-wider mt-4">
                  By submitting, you agree to our privacy policy and international trade terms.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
