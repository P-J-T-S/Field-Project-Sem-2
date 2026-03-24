import { useEffect, useState, useRef } from 'react';
import { useApp } from '../context/AppContext';

const Navigation = () => {
  const { currentPage, navigateTo, mobileMenuOpen, setMobileMenuOpen } = useApp();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);

  const servicesSections = [
    {
      id: 'old-age-home-services',
      label: 'Old Age Home Services',
      desc: 'Residential care, rescue & more'
    },
    {
      id: 'hospital-services',
      label: 'Hospital & Community',
      desc: 'Free clinic, concession care'
    },
    {
      id: 'free-clinic',
      label: 'Free Clinic',
      desc: 'Medicines, check-ups & OPD'
    }
  ];

  const topLevelItems = [
    { id: 'home', label: 'Home' },
    { id: 'contact', label: 'Contact' },
  ];

  const isServicesActive = [
    'old-age-home-services',
    'hospital-services',
    'free-clinic',
    'services'
  ].includes(currentPage);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] page-fade-in">
      <nav className="bg-white/95 backdrop-blur-md border-b border-silver shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="flex justify-between items-center h-24">

            {/* Logo */}
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
                  <h1 className="text-base font-bold text-hospital-navy tracking-tight leading-none uppercase font-body">
                    Doctor Mitra Charitable Trust
                  </h1>
                  <p className="text-[10px] text-surgical-blue font-bold tracking-[0.3em] uppercase mt-1">
                    Old Age Home • NGO
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-12">

              {/* Home */}
              <button
                onClick={() => navigateTo('home')}
                className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all relative py-2 ${
                  currentPage === 'home'
                    ? 'text-surgical-blue'
                    : 'text-surgical-charcoal/60 hover:text-hospital-navy'
                }`}
              >
                Home
                {currentPage === 'home' && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-surgical-blue rounded-full" />
                )}
              </button>

              {/* Services Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all relative py-2 flex items-center gap-2 ${
                    isServicesActive || servicesOpen
                      ? 'text-surgical-blue'
                      : 'text-surgical-charcoal/60 hover:text-hospital-navy'
                  }`}
                >
                  Our Services
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                  {isServicesActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-surgical-blue rounded-full" />
                  )}
                </button>

                {/* Dropdown Panel */}
                {servicesOpen && (
                  <div className="absolute top-full right-0 mt-3 w-72 bg-white border border-silver/50 shadow-premium rounded-[2px] overflow-hidden z-50">
                    <div className="px-5 py-4 border-b border-silver/30 bg-medical-white">
                      <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-surgical-charcoal/40">
                        Service Sectors
                      </p>
                    </div>
                    {servicesSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => {
                          navigateTo(section.id);
                          setServicesOpen(false);
                        }}
                        className={`w-full text-left px-5 py-4 border-b border-silver/20 last:border-0 hover:bg-medical-white transition-colors group ${
                          currentPage === section.id ? 'bg-medical-white' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`text-[11px] font-bold tracking-[0.15em] uppercase transition-colors ${
                              currentPage === section.id
                                ? 'text-surgical-blue'
                                : 'text-hospital-navy group-hover:text-surgical-blue'
                            }`}>
                              {section.label}
                            </p>
                            <p className="text-[10px] text-surgical-charcoal/40 mt-1">{section.desc}</p>
                          </div>
                          <svg className="w-3.5 h-3.5 text-silver group-hover:text-surgical-blue transition-colors flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact */}
              <button
                onClick={() => navigateTo('contact')}
                className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all relative py-2 ${
                  currentPage === 'contact'
                    ? 'text-surgical-blue'
                    : 'text-surgical-charcoal/60 hover:text-hospital-navy'
                }`}
              >
                Contact
                {currentPage === 'contact' && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-surgical-blue rounded-full" />
                )}
              </button>

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
            <div className="px-6 py-12 space-y-2">

              <button
                onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}
                className={`block w-full text-left text-2xl font-header tracking-tight transition-colors py-3 ${
                  currentPage === 'home' ? 'text-surgical-blue' : 'text-surgical-charcoal/60 hover:text-hospital-navy'
                }`}
              >
                Home
              </button>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={`flex items-center justify-between w-full text-left text-2xl font-header tracking-tight transition-colors py-3 ${
                    isServicesActive || mobileServicesOpen ? 'text-surgical-blue' : 'text-surgical-charcoal/60 hover:text-hospital-navy'
                  }`}
                >
                  <span>Our Services</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {mobileServicesOpen && (
                  <div className="ml-4 mt-2 space-y-1 border-l-2 border-silver/40 pl-6">
                    {servicesSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => {
                          navigateTo(section.id);
                          setMobileMenuOpen(false);
                          setMobileServicesOpen(false);
                        }}
                        className={`block w-full text-left py-3 transition-colors ${
                          currentPage === section.id
                            ? 'text-surgical-blue font-bold'
                            : 'text-surgical-charcoal/60 hover:text-hospital-navy'
                        }`}
                      >
                        <p className="text-lg font-header">{section.label}</p>
                        <p className="text-xs text-surgical-charcoal/40 mt-0.5">{section.desc}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => { navigateTo('contact'); setMobileMenuOpen(false); }}
                className={`block w-full text-left text-2xl font-header tracking-tight transition-colors py-3 ${
                  currentPage === 'contact' ? 'text-surgical-blue' : 'text-surgical-charcoal/60 hover:text-hospital-navy'
                }`}
              >
                Contact
              </button>

              <div className="pt-6">
                <button
                  onClick={() => { navigateTo('donate'); setMobileMenuOpen(false); }}
                  className="block w-full text-center py-5 bg-surgical-blue text-white rounded-[2px] font-bold text-lg tracking-widest uppercase"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
