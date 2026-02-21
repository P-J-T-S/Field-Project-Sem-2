import { AppProvider, useApp } from './context/AppContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';

const AppContent = () => {
  const { currentPage } = useApp();

  return (
    <div className="min-h-screen smooth-scroll bg-medical-white">
      <Navigation />
      <main>
        {(currentPage === 'home' || currentPage === 'about' || currentPage === 'contact') && <HomePage />}
        {currentPage === 'services' && <ServicesPage />}
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
