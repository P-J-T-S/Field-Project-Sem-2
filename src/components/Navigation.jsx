import { useApp } from '../context/AppContext';

const Navigation = () => {
  const { currentPage, navigateTo, mobileMenuOpen, setMobileMenuOpen } = useApp();

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Clinical Services' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[100]">
      <nav className="bg-white/90 backdrop-blur-xl border-b border-sage/10 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div
              onClick={() => navigateTo('home')}
              className="flex items-center cursor-pointer group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-[4px] bg-forest flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-500">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-base font-bold text-forest tracking-tight leading-none uppercase">DMCT Kalyan</h1>
                  <p className="text-[9px] text-medical-teal font-bold tracking-[0.2em] uppercase mt-1 italic">Dr. Mitra Charitable Trust</p>
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`text-xs font-bold tracking-[0.1em] uppercase transition-all relative py-2 ${currentPage === item.id
                    ? 'text-medical-teal'
                    : 'text-main/50 hover:text-medical-teal'
                    }`}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded-full" />
                  )}
                </button>
              ))}
              <a
                href="tel:7977211807"
                className="px-6 py-2.5 bg-medical-teal text-white rounded-[4px] font-bold text-xs tracking-widest uppercase hover:bg-forest transition-all"
              >
                Patient Admissions
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-forest"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-sage/10 animate-fade-in shadow-2xl">
            <div className="px-6 py-10 space-y-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { navigateTo(item.id); setMobileMenuOpen(false); }}
                  className={`block w-full text-left text-xl font-medium tracking-tight transition-colors ${currentPage === item.id
                    ? 'text-medical-teal'
                    : 'text-main/50 hover:text-medical-teal'
                    }`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href="tel:7977211807"
                className="block w-full text-center py-4 bg-medical-teal text-white rounded-[4px] font-bold text-base tracking-widest uppercase"
              >
                Patient Admissions
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
