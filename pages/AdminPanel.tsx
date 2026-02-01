
import React, { useState, useEffect } from 'react';
import { CATEGORIES, INITIAL_PRODUCTS, INITIAL_LEADERSHIP } from '../constants';
import { generateProductDescription, generateQuotationReply, generateIndustrialImage } from '../services/gemini';

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [leadership, setLeadership] = useState(INITIAL_LEADERSHIP);
  const [activeTab, setActiveTab] = useState<'products' | 'leadership' | 'inquiries' | 'analytics'>('products');
  const [aiReply, setAiReply] = useState<string | null>(null);
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState<Record<string, boolean>>({});
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>({});
  const [isGeneratingImg, setIsGeneratingImg] = useState<Record<string, boolean>>({});

  const [inquiries, setInquiries] = useState<any[]>([]);

  useEffect(() => {
    const loadData = () => {
      // Load Inquiries
      const storedInq = JSON.parse(localStorage.getItem('savita_inquiries') || '[]');
      setInquiries(storedInq);

      // Load Products
      const storedProducts = localStorage.getItem('savita_products');
      if (storedProducts) setProducts(JSON.parse(storedProducts));

      // Load Leadership
      const storedLeadership = localStorage.getItem('savita_leadership');
      if (storedLeadership) setLeadership(JSON.parse(storedLeadership));

      // Load Category Images
      const storedImages = JSON.parse(localStorage.getItem('savita_category_images') || '{}');
      setCategoryImages(storedImages);
    };
    
    if (isAuthenticated) loadData();
  }, [isAuthenticated]);

  const saveProducts = (updated: typeof products) => {
    setProducts(updated);
    localStorage.setItem('savita_products', JSON.stringify(updated));
  };

  const saveLeadership = (updated: typeof leadership) => {
    setLeadership(updated);
    localStorage.setItem('savita_leadership', JSON.stringify(updated));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else alert('Invalid Credentials');
  };

  const handleGenerateReply = async (inquiry: any) => {
    setIsGeneratingReply(true);
    const reply = await generateQuotationReply(inquiry);
    setAiReply(reply);
    setIsGeneratingReply(false);
  };

  const handleGenerateCategoryImage = async (category: string) => {
    setIsGeneratingImg(prev => ({ ...prev, [category]: true }));
    try {
      const imageUrl = await generateIndustrialImage(category);
      if (imageUrl) {
        const updatedImages = { ...categoryImages, [category]: imageUrl };
        setCategoryImages(updatedImages);
        localStorage.setItem('savita_category_images', JSON.stringify(updatedImages));
      }
    } catch (error) {
      alert("Failed to generate category image.");
    } finally {
      setIsGeneratingImg(prev => ({ ...prev, [category]: false }));
    }
  };

  const handleRegenerateDescription = async (id: string, name: string, category: string) => {
    setIsRegenerating(prev => ({ ...prev, [id]: true }));
    try {
      const newDesc = await generateProductDescription(name, category);
      const updated = products.map(p => p.id === id ? { ...p, description: newDesc } : p);
      saveProducts(updated);
    } catch (error) {
      alert("Failed to regenerate description.");
    } finally {
      setIsRegenerating(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleUpdateCEO = (field: string, value: string) => {
    const updated = { ...leadership, ceo: { ...leadership.ceo, [field]: value } };
    saveLeadership(updated);
  };

  const handleUpdateOps = (field: string, value: string) => {
    const updated = { ...leadership, opsHead: { ...leadership.opsHead, [field]: value } };
    saveLeadership(updated);
  };

  const markReplied = (id: string) => {
    const updated = inquiries.map(i => i.id === id ? { ...i, status: 'Replied' } : i);
    setInquiries(updated);
    localStorage.setItem('savita_inquiries', JSON.stringify(updated));
    setAiReply(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-3xl">SV</div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Gateway</h1>
            <p className="text-slate-500 text-sm mt-2">Savita Global Management System</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Access Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-xl">
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col sticky top-0 h-screen shadow-2xl">
        <div className="p-8 border-b border-slate-800">
          <div className="font-bold text-xl tracking-tighter">SAVITA ADMIN</div>
          <p className="text-[9px] text-blue-400 font-bold uppercase tracking-[0.2em] mt-1">Global Operations</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: 'products', label: 'Inventory', icon: '📦' },
            { id: 'inquiries', label: 'Leads & Inquiries', icon: '✉️' },
            { id: 'leadership', label: 'Leadership', icon: '👥' },
            { id: 'analytics', label: 'Metrics', icon: '📊' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full text-left px-5 py-4 rounded-xl flex items-center gap-4 transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-bold">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-8 border-t border-slate-800">
          <button onClick={() => setIsAuthenticated(false)} className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest">
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        {activeTab === 'products' && (
          <div className="space-y-10">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-900">Dynamic Inventory</h2>
                <p className="text-slate-500 mt-2">Update product details instantly across the public site.</p>
              </div>
              <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-xl">
                + Add SKU
              </button>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-8">AI-Generated Category Visuals</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {CATEGORIES.map((cat) => (
                  <div key={cat} className="group flex flex-col items-center">
                    <div className="w-full aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 relative mb-3">
                      {categoryImages[cat] ? (
                        <img src={categoryImages[cat]} alt={cat} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                          <span className="text-2xl mb-1">🖼️</span>
                          <span className="text-[9px] font-bold uppercase">No Image</span>
                        </div>
                      )}
                      {isGeneratingImg[cat] && (
                        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
                          <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] font-bold text-slate-700 uppercase mb-2 truncate w-full text-center">{cat}</p>
                    <button 
                      onClick={() => handleGenerateCategoryImage(cat)}
                      disabled={isGeneratingImg[cat]}
                      className="w-full py-2 bg-slate-50 text-blue-600 text-[9px] font-bold uppercase tracking-widest rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-200 transition-all disabled:opacity-50"
                    >
                      Regenerate
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 tracking-widest border-b">
                  <tr>
                    <th className="p-6">Product & Image</th>
                    <th className="p-6">Category</th>
                    <th className="p-6">Description</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors border-b last:border-0">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <img src={p.image} className="w-12 h-12 rounded-xl object-cover border" alt="" />
                          <span className="font-bold text-slate-800">{p.name}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{p.category}</span>
                      </td>
                      <td className="p-6">
                        <p className="text-xs text-slate-500 max-w-sm line-clamp-2">{p.description}</p>
                      </td>
                      <td className="p-6 text-right">
                        <button 
                          onClick={() => handleRegenerateDescription(p.id, p.name, p.category)}
                          disabled={isRegenerating[p.id]}
                          className="text-blue-600 hover:text-blue-800 font-bold text-xs flex items-center gap-2 ml-auto"
                        >
                          {isRegenerating[p.id] ? <span className="animate-pulse">AI Writing...</span> : 'Regen AI Desc'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="space-y-10">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-900">Leads & Quotations</h2>
                <p className="text-slate-500 mt-2">Manage inquiries captured via website forms and AI Chatbot.</p>
              </div>
              <div className="bg-blue-900 text-white px-6 py-2 rounded-xl text-xs font-bold shadow-lg">
                Active Leads: {inquiries.filter(i => i.status !== 'Replied').length}
              </div>
            </div>
            <div className="space-y-6">
              {inquiries.length === 0 ? (
                <div className="bg-white py-24 text-center rounded-3xl border-2 border-dashed border-slate-200">
                   <div className="text-4xl mb-4">📥</div>
                   <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No inquiries logged yet</p>
                </div>
              ) : inquiries.map((inq) => (
                <div key={inq.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 animate-slide-up">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-slate-900">{inq.name}</h4>
                        {inq.source === 'AI Chatbot' && (
                          <span className="bg-indigo-600 text-white text-[8px] px-2 py-0.5 rounded font-black uppercase tracking-widest">AI BOT LEAD</span>
                        )}
                        <span className={`text-[8px] px-2 py-0.5 rounded font-black uppercase tracking-widest ${inq.status === 'Replied' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>{inq.status}</span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mb-4">{inq.email} • {inq.timestamp}</p>
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-xs text-slate-600 italic leading-relaxed">
                        "{inq.message}"
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-3 shrink-0">
                       <button 
                        onClick={() => handleGenerateReply(inq)} 
                        disabled={isGeneratingReply}
                        className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                       >
                         {isGeneratingReply ? 'Crafting...' : 'AI Draft Reply'}
                       </button>
                       <button 
                        onClick={() => markReplied(inq.id)}
                        className="bg-white text-slate-400 border border-slate-200 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:text-green-600 hover:border-green-100 transition-all"
                       >
                         Mark Resolved
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {aiReply && (
              <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-6">
                <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up">
                  <div className="bg-slate-900 p-8 text-white flex justify-between items-center border-b border-white/10">
                    <div>
                      <h3 className="font-bold text-xl">AI-Generated Quotation Proposal</h3>
                      <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">Ready for review</p>
                    </div>
                    <button onClick={() => setAiReply(null)} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  </div>
                  <div className="p-10">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 leading-relaxed bg-slate-50 p-8 rounded-3xl border border-slate-200 h-[350px] overflow-y-auto custom-scrollbar">
                      {aiReply}
                    </pre>
                    <div className="mt-10 flex gap-4">
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(aiReply);
                          alert("Draft copied to clipboard.");
                        }}
                        className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
                      >
                        Copy Draft
                      </button>
                      <button 
                        onClick={() => setAiReply(null)} 
                        className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'leadership' && (
          <div className="space-y-10">
             <h2 className="text-4xl font-bold text-slate-900">Authority Control</h2>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
                  <div className="flex items-center gap-4 mb-8">
                    <img src={leadership.ceo.image} className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-100" alt="" />
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">CEO Management</h3>
                      <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Public Authority Profile</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Full Name</label>
                      <input 
                        type="text" 
                        value={leadership.ceo.name}
                        onChange={(e) => handleUpdateCEO('name', e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Corporate Message</label>
                      <textarea 
                        value={leadership.ceo.message}
                        onChange={(e) => handleUpdateCEO('message', e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm h-32 focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
                  <div className="flex items-center gap-4 mb-8">
                    <img src={leadership.opsHead.image} className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-100" alt="" />
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Head of Operations</h3>
                      <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Technical Authority Profile</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Full Name</label>
                      <input 
                        type="text" 
                        value={leadership.opsHead.name}
                        onChange={(e) => handleUpdateOps('name', e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Production Ethics Message</label>
                      <textarea 
                        value={leadership.opsHead.message}
                        onChange={(e) => handleUpdateOps('message', e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm h-32 focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                    </div>
                  </div>
                </div>
             </div>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-slate-900">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Inquiries', value: inquiries.length, icon: '📥', color: 'blue' },
                { label: 'Leads Captured', value: inquiries.filter(i => i.source === 'AI Chatbot').length, icon: '⚡', color: 'indigo' },
                { label: 'Responded', value: inquiries.filter(i => i.status === 'Replied').length, icon: '✅', color: 'green' },
                { label: 'Active SKUs', value: products.length, icon: '📦', color: 'slate' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <div className="text-2xl mb-4">{stat.icon}</div>
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-slate-900 text-white p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>
               <h3 className="text-xl font-bold mb-6">Global Lead Distribution</h3>
               <div className="space-y-4">
                 {[
                  { region: 'UAE/Middle East', perc: 45 },
                  { region: 'European Union', perc: 28 },
                  { region: 'North America', perc: 15 },
                  { region: 'South East Asia', perc: 12 },
                 ].map((reg, i) => (
                   <div key={i} className="space-y-2">
                     <div className="flex justify-between text-xs font-bold">
                       <span className="text-slate-400">{reg.region}</span>
                       <span className="text-blue-400">{reg.perc}%</span>
                     </div>
                     <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                       <div className="bg-blue-600 h-full" style={{ width: `${reg.perc}%` }}></div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
