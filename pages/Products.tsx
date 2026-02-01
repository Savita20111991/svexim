
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, INITIAL_PRODUCTS } from '../constants';

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isGeneratingCatalog, setIsGeneratingCatalog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    // Load Products
    const storedProducts = localStorage.getItem('savita_products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleDownloadCatalog = () => {
    setIsGeneratingCatalog(true);
    setTimeout(() => {
      alert("AI Catalog Generated! Exporting high-resolution PDF with SEO-optimized technical specifications.");
      setIsGeneratingCatalog(false);
    }, 2000);
  };

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Export-Grade Product Catalog</h1>
            <p className="text-slate-600">Explore our comprehensive range of 60+ precision-manufactured industrial solutions.</p>
          </div>
          <button 
            onClick={handleDownloadCatalog}
            disabled={isGeneratingCatalog}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-3 active:scale-95 disabled:opacity-50"
          >
            {isGeneratingCatalog ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                AI Generating...
              </span>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Download Full Catalog
              </>
            )}
          </button>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 sticky top-24 z-30 py-4 bg-slate-50/80 backdrop-blur-md rounded-2xl">
          <button 
            onClick={() => setActiveCategory('All')}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${activeCategory === 'All' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 shadow-sm'}`}
          >
            All Products
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${activeCategory === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 shadow-sm'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden group flex flex-col hover:shadow-2xl transition-all duration-300">
              <div className="relative h-72 overflow-hidden bg-slate-100 flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={`w-full h-full ${product.category === 'Machinery' ? 'object-contain p-4' : 'object-cover'} transition-transform duration-700 group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-xl">
                    Industrial Series
                  </div>
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                  </button>
                </div>

                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <div className="bg-blue-900 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest self-start">
                    Made in India
                  </div>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1">{product.category}</div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">{product.name}</h3>
                  </div>
                </div>
                
                <p className="text-sm text-slate-500 mb-6 flex-grow leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 mb-8 transform group-hover:scale-[1.02] transition-transform">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-600 text-lg">⚙️</span>
                    <div className="text-[10px] uppercase font-black text-blue-900 tracking-widest">Industrial Application</div>
                  </div>
                  <div className="text-xs text-slate-700 font-semibold leading-relaxed">
                    {product.application}
                  </div>
                </div>

                <button className="w-full py-4 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-slate-200">
                  Request Technical Quote
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Product Modal for "Complete Image" View */}
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-4 md:p-12 animate-fade-in">
            <div className="bg-white w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative max-h-[90vh]">
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-10 bg-slate-900 text-white p-3 rounded-full hover:bg-red-500 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              <div className="md:w-1/2 bg-slate-100 p-8 flex items-center justify-center">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="max-h-[60vh] w-full object-contain drop-shadow-2xl" 
                />
              </div>

              <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center overflow-y-auto">
                <div className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">{selectedProduct.category}</div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{selectedProduct.name}</h2>
                <div className="h-1 w-20 bg-blue-600 mb-8 rounded-full"></div>
                
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  {selectedProduct.description}
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">🚀</div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Key Application</div>
                      <div className="text-slate-800 font-bold leading-relaxed">{selectedProduct.application}</div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">🌏</div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Export Availability</div>
                      <div className="text-slate-800 font-bold leading-relaxed">Global Shipping - ISO 9001:2015 Compliant Packaging</div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                   <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-2xl">
                     Request Price List & Specs
                   </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
