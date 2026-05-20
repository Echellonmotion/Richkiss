/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/layout/FloatingWhatsApp';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import PrintDepartment from './pages/PrintDepartment';
import Events from './pages/Events';
import OurClients from './pages/OurClients';
import Contact from './pages/Contact';
import Catalogue from './pages/Catalogue';
import Admin from './pages/Admin';
import { AuthProvider } from './context/AuthContext';
import { useLocation } from 'react-router-dom';
import { useContent } from './hooks/useContent';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { settings } = useContent();

  useEffect(() => {
    if (settings?.logoUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = settings.logoUrl;
    }
    
    if (settings?.companyName) {
      document.title = settings.companyName;
    }
  }, [settings?.logoUrl, settings?.companyName]);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/about/print" element={<PrintDepartment />} />
              <Route path="/events" element={<Events />} />
              <Route path="/clients" element={<OurClients />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shop" element={<Catalogue />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <FloatingWhatsApp />
        </div>
      </Router>
    </AuthProvider>
  );
}

