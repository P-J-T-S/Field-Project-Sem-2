import { useApp } from '../context/AppContext';

const Navigation = () => {
  const { currentPage, navigateTo, mobileMenuOpen, setMobileMenuOpen } = useApp();

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Our Services' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sage-600 to-earth-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-earth-900 leading-tight">DMCT Hospital</h1>
                <p className="text-xs text-sage-700">& Old Age Home</p>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`text-sm font-medium transition-colors relative pb-1 ${
                  currentPage === item.id
                    ? 'text-sage-700'
                    : 'text-earth-700 hover:text-sage-700'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sage-600 rounded-full" />
                )}
              </button>
            ))}
            <a
              href="tel:7977211807"
              className="px-6 py-2.5 bg-gradient-to-r from-sage-600 to-earth-600 text-white rounded-full font-medium text-sm hover:shadow-lg transition-all hover:scale-105"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-earth-700 hover:bg-warmth-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-warmth-200 bg-white/98 backdrop-blur-md">
          <div className="px-4 py-4 space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-sage-50 text-sage-700'
                    : 'text-earth-700 hover:bg-warmth-100'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="tel:7977211807"
              className="block w-full text-center px-4 py-3 bg-gradient-to-r from-sage-600 to-earth-600 text-white rounded-lg font-medium text-sm"
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
