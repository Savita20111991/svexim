
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ExportMarkets from './pages/ExportMarkets';
import Contact from './pages/Contact';
import AdminPanel from './pages/AdminPanel';
import Quality from './pages/Quality';
import Chatbot from './components/Chatbot';
import { LanguageProvider } from './contexts/LanguageContext';
import { INITIAL_PRODUCTS, INITIAL_LEADERSHIP } from './constants';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <Chatbot />}
    </div>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    // Fast seeding of dynamic content
    // We update both products and leadership to ensure the new catalog and "exact image" profiles take effect
    localStorage.setItem('savita_products', JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem('savita_leadership', JSON.stringify(INITIAL_LEADERSHIP));
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/export" element={<ExportMarkets />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/quality" element={<Quality />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  );
};

export default App;
