import { useApp } from '../context/AppContext';

const Navigation = () => {
  const { currentPage, navigateTo, mobileMenuOpen, setMobileMenuOpen } = useApp();

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Our Services' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 glass-morphism shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-deep-teal flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-charcoal leading-tight">DMCT Hospital</h1>
                <p className="text-xs text-primary-teal font-medium">Dr. Mitra Charitable Trust</p>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`text-base font-semibold transition-colors relative pb-1 ${
                  currentPage === item.id
                    ? 'text-deep-teal'
                    : 'text-charcoal/70 hover:text-deep-teal'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-teal rounded-full" />
                )}
              </button>
            ))}
            <a
              href="tel:7977211807"
              className="px-6 py-2.5 bg-deep-teal text-white rounded-full font-bold text-base hover:bg-primary-teal transition-all shadow-md hover:shadow-lg"
            >
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-charcoal hover:bg-warmth-100 transition-colors"
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
        <div className="md:hidden border-t border-muted-sage/20 bg-white/98 backdrop-blur-md">
          <div className="px-4 py-6 space-y-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-lg font-semibold transition-colors ${
                  currentPage === item.id
                    ? 'bg-warmth-100 text-deep-teal'
                    : 'text-charcoal hover:bg-warmth-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="tel:7977211807"
              className="block w-full text-center px-4 py-4 bg-deep-teal text-white rounded-xl font-bold text-lg"
            >
              Call Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
