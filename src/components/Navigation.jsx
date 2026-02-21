import { useApp } from '../context/AppContext';

const Navigation = () => {
  const { currentPage, navigateTo, mobileMenuOpen, setMobileMenuOpen } = useApp();

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Our Services' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] page-fade-in">
      <nav className="bg-white/95 backdrop-blur-md border-b border-silver shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="flex justify-between items-center h-24">
            {/* Logo - Clinical & Authoritative */}
            <div
              onClick={() => navigateTo('home')}
              className="flex items-center cursor-pointer group"
            >
              <div className="flex items-center space-x-5">
                <div className="w-12 h-12 rounded-[2px] bg-hospital-navy flex items-center justify-center shadow-lg group-hover:bg-surgical-blue transition-colors duration-500">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-hospital-navy tracking-tight leading-none uppercase font-body">DMCT Hospital</h1>
                  <p className="text-[10px] text-surgical-blue font-bold tracking-[0.3em] uppercase mt-1">Old Age Home • NGO</p>
                </div>
              </div>
            </div>

            {/* Desktop Menu - Institutional Minimalism */}
            <div className="hidden md:flex items-center space-x-12">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all relative py-2 ${currentPage === item.id
                    ? 'text-surgical-blue'
                    : 'text-surgical-charcoal/60 hover:text-hospital-navy'
                    }`}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-surgical-blue rounded-full" />
                  )}
                </button>
              ))}
              <button
                onClick={() => navigateTo('donate')}
                className="btn-primary flex items-center space-x-2"
              >
                <span>Donate Now</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-hospital-navy"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-silver animate-fade-in shadow-2xl">
            <div className="px-6 py-12 space-y-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { navigateTo(item.id); setMobileMenuOpen(false); }}
                  className={`block w-full text-left text-2xl font-header tracking-tight transition-colors ${currentPage === item.id
                    ? 'text-surgical-blue'
                    : 'text-surgical-charcoal/60 hover:text-hospital-navy'
                    }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => { navigateTo('donate'); setMobileMenuOpen(false); }}
                className="block w-full text-center py-5 bg-surgical-blue text-white rounded-[2px] font-bold text-lg tracking-widest uppercase"
              >
                Donate Now
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
