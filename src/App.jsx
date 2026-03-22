import { lazy, Suspense } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navigation from './components/Navigation.jsx';
import Footer from './components/Footer.jsx';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'));
const DonationPage = lazy(() => import('./pages/DonationPage'));
const Hospital_Services = lazy(() => import('./pages/HospitalServices.jsx'));
const OldAgeHomeServices = lazy(() => import('./pages/OldAgeHomeServices.jsx'));
const FreeClinic = lazy(() => import('./pages/FreeClinic.jsx'));

const Loader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-silver border-t-surgical-blue rounded-full animate-spin" />
  </div>
);

const AppContent = () => {
  const { currentPage } = useApp();

  return (
    <div className="min-h-screen smooth-scroll bg-medical-white">
      <Navigation />
      <main>
        <Suspense fallback={<Loader />}>
          {(currentPage === 'home' || currentPage === 'about' || currentPage === 'contact') && <HomePage />}
          {currentPage === 'services' && <ServicesPage />}
          {currentPage === 'donate' && <DonationPage />}
          {currentPage === 'hospital-services' && <Hospital_Services />}
          {currentPage === 'old-age-home-services' && <OldAgeHomeServices />}
          {currentPage === 'free-clinic' && <FreeClinic />}
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
