import { createContext, useContext, useState } from 'react';

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

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);

    // Only scroll to top if we're not navigating to a section on the same page
    // Note: section scrolling is handled by observers/effects in the page components
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
