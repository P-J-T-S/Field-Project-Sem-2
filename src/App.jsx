import { lazy, Suspense } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const DonationPage = lazy(() => import('./pages/DonationPage'));

const AppContent = () => {
  const { currentPage } = useApp();

  return (
    <div className="min-h-screen smooth-scroll bg-medical-white">
      <Navigation />
      <main>
        <Suspense fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-silver border-t-surgical-blue rounded-full animate-spin" />
          </div>
        }>
          {(currentPage === 'home' || currentPage === 'about' || currentPage === 'contact') && <HomePage />}
          {currentPage === 'services' && <ServicesPage />}
          {currentPage === 'donate' && <DonationPage />}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
