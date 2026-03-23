import { createContext, useContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ── Detect PhonePe callback redirects ─────────────────────────────────────
  // PhonePe redirects to /payment-success?txnId=... or /payment-failure?...
  // Since this is a SPA without a router, we detect the path on mount.
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/payment-success') {
      setCurrentPage('payment-success');
    } else if (path === '/payment-failure') {
      setCurrentPage('payment-failure');
    }
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);

    if (page !== 'about' && page !== 'contact' && page !== 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'home' && currentPage === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const value = {
    currentPage,
    navigateTo,
    mobileMenuOpen,
    setMobileMenuOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
