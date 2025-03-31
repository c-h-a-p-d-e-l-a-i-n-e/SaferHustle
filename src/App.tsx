import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageTitle } from './components/PageTitle';
import { Home } from './pages/Home';
import { Report } from './pages/Report';
import { Reports } from './pages/Reports';
import { ReportDetail } from './pages/ReportDetail';
import { Donate } from './pages/Donate';
import { Admin } from './pages/Admin';
import { FAQ } from './pages/FAQ';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#ffddb9] relative overflow-hidden">
        <Header />
        <main className="flex-grow container mx-auto py-8 max-w-[1152px]">
          <PageTitle />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<Report />} />
            <Route path="/reports/:id" element={<ReportDetail />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </main>
        <Footer />
        <div 
          className="fixed bottom-0 pointer-events-none"
          style={{
            width: '266.67px',
            height: 'auto',
            left: 'calc(50% + 720px)',
            transform: 'translateX(-50%)'
          }}
        >
          <img
            src="/images/saferhustle-logo.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
