
import React, { useState, useEffect, useRef } from 'react';
import { chatWithAI, complexIndustrialReasoning, getMarketInsights } from '../services/gemini';
import { COMPANY_NAME } from '../constants';

type ChatRole = 'user' | 'bot' | 'system';

interface Message {
  role: ChatRole;
  text: string;
  sources?: any[];
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: `Welcome to ${COMPANY_NAME}. I am your Industrial AI Assistant. How can I help you with machinery specifications, pricing, or export inquiries today?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Lead Generation Pipeline
  const [leadStage, setLeadStage] = useState<'idle' | 'name' | 'email' | 'requirement' | 'done'>('idle');
  const [leadData, setLeadData] = useState({ name: '', email: '', requirement: '' });
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const saveLead = (finalData: typeof leadData) => {
    const existingInquiries = JSON.parse(localStorage.getItem('savita_inquiries') || '[]');
    const newInquiry = {
      id: `ai-lead-${Date.now()}`,
      name: finalData.name,
      email: finalData.email,
      message: `[AI CHATBOT LEAD] Requirement: ${finalData.requirement}`,
      status: 'Pending',
      timestamp: new Date().toLocaleString(),
      source: 'AI Chatbot'
    };
    localStorage.setItem('savita_inquiries', JSON.stringify([newInquiry, ...existingInquiries]));
  };

  const handleSend = async (customText?: string) => {
    const text = customText || input;
    if (!text.trim()) return;
    
    if (customText === undefined) setInput('');
    setMessages(prev => [...prev, { role: 'user', text }]);

    // Lead Capture Logic
    if (leadStage === 'name') {
      setLeadData(prev => ({ ...prev, name: text }));
      setMessages(prev => [...prev, { role: 'bot', text: `Pleasure to meet you, ${text}. Please provide your business email address so we can send a formal technical proposal.` }]);
      setLeadStage('email');
      return;
    }
    
    if (leadStage === 'email') {
      setLeadData(prev => ({ ...prev, email: text }));
      setMessages(prev => [...prev, { role: 'bot', text: `Thank you. Finally, please briefly describe your industrial requirement (e.g., machine type, volume, or specific parts).` }]);
      setLeadStage('requirement');
      return;
    }
    
    if (leadStage === 'requirement') {
      const finalData = { ...leadData, requirement: text };
      setLeadData(finalData);
      saveLead(finalData);
      setMessages(prev => [...prev, { role: 'bot', text: `Requirement logged. Our export manager will review your details and contact you at ${finalData.email} within 24 hours. Anything else I can assist with?` }]);
      setLeadStage('done');
      return;
    }

    setIsTyping(true);
    
    // Heuristic for lead detection
    const isInquiry = /price|quote|buy|order|export|catalog|interest|shipping|cost|available/i.test(text);

    try {
      if (isInquiry && leadStage === 'idle') {
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, { 
            role: 'bot', 
            text: "I'd be happy to assist with a quotation. To provide accurate technical and shipping estimates, may I have your full name?" 
          }]);
          setLeadStage('name');
        }, 1000);
        return;
      }

      // Advanced AI Processing
      const isComplex = text.length > 50 || /technical|parameter|tolerance|efficiency/i.test(text);
      const isSearchNeeded = /market|latest|current|global|trend/i.test(text);

      let responseText = "";
      let sources: any[] = [];

      if (isSearchNeeded) {
        const result = await getMarketInsights(text);
        responseText = result.text;
        sources = result.sources;
      } else if (isComplex) {
        responseText = await complexIndustrialReasoning(text);
      } else {
        responseText = await chatWithAI(text, "Savita Global specializes in Machinery, Brass Components, and Precision SS parts for global export.");
      }

      setMessages(prev => [...prev, { role: 'bot', text: responseText, sources }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Technical error connecting to core. Please call our export desk directly at +91 9506943134." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white w-[350px] md:w-[420px] h-[600px] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-slide-up">
          {/* Header */}
          <div className="bg-slate-900 p-6 text-white flex justify-between items-center border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black shadow-lg">SV</div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-bold leading-none">Export AI Agent</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Connected</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-slate-800 p-2.5 rounded-xl transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          
          {/* Conversation */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {m.sources.map((s: any, idx) => (
                      <a 
                        key={idx} 
                        href={s.web?.uri || s.maps?.uri} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[10px] bg-blue-50 text-blue-700 px-3 py-1 rounded-md border border-blue-100 font-bold hover:bg-blue-100 transition-colors"
                      >
                        {s.web?.title || 'Ref'}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2.5 rounded-2xl text-[10px] text-slate-400 font-bold uppercase tracking-widest border border-slate-100 flex gap-2 items-center">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-200"></span>
                  </div>
                  System processing...
                </div>
              </div>
            )}
          </div>
          
          {/* Input */}
          <div className="p-5 border-t bg-white">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={leadStage === 'idle' ? "Ask about machinery, brass..." : "Type details here..."}
                className="flex-1 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              />
              <button 
                onClick={() => handleSend()} 
                className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-blue-600 transition-all shadow-xl active:scale-95"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative bg-slate-900 text-white p-5 rounded-[2.2rem] shadow-2xl hover:bg-blue-600 transition-all hover:scale-105 flex items-center justify-center border-4 border-white/20"
        >
          <div className="absolute -top-14 right-0 bg-blue-600 text-white text-[11px] font-black py-2.5 px-6 rounded-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl border border-white/20 uppercase tracking-[0.15em]">
            Expert Technical Support
          </div>
          <svg className="w-10 h-10 transition-transform group-hover:rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-[11px] font-black border-2 border-white animate-bounce shadow-lg">1</div>
        </button>
      )}
    </div>
  );
};

export default Chatbot;
