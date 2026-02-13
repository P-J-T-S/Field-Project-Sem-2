import { AppProvider, useApp } from './context/AppContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';

const AppContent = () => {
  const { currentPage } = useApp();

  return (
    <div className="min-h-screen smooth-scroll">
      <Navigation />
      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'services' && <ServicesPage />}
      </main>
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
