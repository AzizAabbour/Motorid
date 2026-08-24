import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MobileDrawer from './components/layout/MobileDrawer';
import ToastContainer from './components/common/ToastContainer';
import useScrollToTop from './hooks/useScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import MotorcyclesPage from './pages/MotorcyclesPage';
import MotorcycleDetailsPage from './pages/MotorcycleDetailsPage';
import BrandsPage from './pages/BrandsPage';
import FavoritesPage from './pages/FavoritesPage';
import SellMotorcyclePage from './pages/SellMotorcyclePage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MessagesPage from './pages/MessagesPage';

export default function App() {
  useScrollToTop();

  return (
    <>
      <Navbar />
      <MobileDrawer />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/motorcycles" element={<MotorcyclesPage />} />
          <Route path="/motorcycles/:id" element={<MotorcycleDetailsPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/brands/:brandName" element={<BrandsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/sell" element={<SellMotorcyclePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/messages" element={<MessagesPage />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}
