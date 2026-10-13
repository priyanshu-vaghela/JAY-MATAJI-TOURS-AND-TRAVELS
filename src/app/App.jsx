import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import SiteFooter from '../components/layout/SiteFooter.jsx';
import SiteHeader from '../components/layout/SiteHeader.jsx';
import DestinationDetailPage from '../pages/DestinationDetailPage.jsx';
import HomePage from '../pages/HomePage.jsx';
import BookingPage from '../pages/BookingPage.jsx';
import AdminLoginPage from '../pages/AdminLoginPage.jsx';
import AdminBookingsPage from '../pages/AdminBookingsPage.jsx';
import { appPath } from './paths.js';

function NotFoundPage() {
  return (
    <main className="not-found page-shell">
      <p className="eyebrow">Wrong turn?</p>
      <h1>That page isn’t on this map.</h1>
      <a className="button button-dark" href={appPath('/')}>
        Back to the beginning
      </a>
    </main>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      document.title = 'Jay Mataji Tours & Travels | Car and driver in Gujarat';
    }

    if (location.hash) {
      const sectionId = decodeURIComponent(location.hash.slice(1));
      requestAnimationFrame(() => document.getElementById(sectionId)?.scrollIntoView());
      return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);

  return (
    <>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/bookings" element={<AdminBookingsPage />} />
        <Route path="/destinations/:id" element={<DestinationDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <SiteFooter />
    </>
  );
}
