import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

const HomePage = () => {
  const { navigateTo } = useApp();
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.slide-up, .reveal').forEach(el => {
      observerRef.current.observe(el);
    });

    return () => observerRef.current.disconnect();
  }, []);

  const services = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '24-Hour Medical Care',
      items: [
        'Trained caregivers on duty',
        'Regular clinical check-ups',
        'Professional medication management'
      ]
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: 'Dignified Living Spaces',
      items: [
        'Clean, safe, and airy environment',
        'Homely hall-type arrangements',
        'Premium orthopedic beds'
      ]
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332-0.477-4.5-1.253" />
        </svg>
      ),
      title: 'Nutritional Support',
      items: [
        'Balanced, nutritious meals',
        'Full laundry and hygiene services',
        'Essential daily living assistance'
      ]
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Holistic Enrichment',
      items: [
        'Gentle yoga and movement',
        'Compassionate counseling',
        'Social clubs and leisure media'
      ]
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 sm:pt-48 sm:pb-40 bg-bg-paper">
        {/* Organic Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-secondary-sage/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-gold/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12 slide-up">
              <div className="inline-flex items-center space-x-3 px-4 py-2 border border-secondary-sage/20 rounded-full bg-white/50 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse"></span>
                <span className="text-sm font-bold tracking-[0.2em] text-secondary-sage uppercase">Established 2010</span>
              </div>

              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.05]">
                Dignity and <br />
                <span className="italic font-normal serif text-secondary-sage">Compassion</span> <br />
                in Every Heartbeat
              </h1>

              <p className="text-xl sm:text-2xl text-text-main/70 leading-relaxed max-w-xl">
                A premium sanctuary in Kalyan East where the elderly receive the unconditional love, safety, and medical attention they deserve.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <a href="tel:7977211807" className="btn-primary">
                  Speak with a Caregiver
                </a>
                <button
                  onClick={() => navigateTo('services')}
                  className="btn-secondary"
                >
                  Explore Our Services
                </button>
              </div>
            </div>

            <div className="relative slide-up stagger-2">
              <div className="relative z-10 aspect-[4/5] rounded-[8px] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1200"
                  alt="Caregiver holding elderly hand"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-forest/20 to-transparent"></div>
              </div>

              {/* Floating Badge - Seal of Trust */}
              <div className="absolute -bottom-10 -left-10 z-20 bg-white p-8 rounded-[8px] shadow-2xl border border-accent-gold/10 hidden sm:block">
                <div className="seal-of-trust text-center">
                  <div className="relative z-10">
                    <span className="block text-4xl font-bold text-primary-forest">15+</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-gold">Years of Legacy</span>
                  </div>
                </div>
              </div>

              {/* Decorative Accents */}
              <div className="absolute -top-12 -right-12 w-32 h-32 border-t-2 border-r-2 border-accent-gold/20 rounded-tr-[40px] -z-10"></div>
              <div className="absolute -bottom-12 -left-12 w-32 h-32 border-b-2 border-l-2 border-secondary-sage/20 rounded-bl-[40px] -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 slide-up">
              <div className="relative">
                <div className="aspect-[4/5] rounded-[8px] overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1581056399312-6030fe52d45d?auto=format&fit=crop&q=80&w=1200"
                    alt="Elderly smiling"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-12 -right-12 bg-primary-forest text-white p-10 rounded-[8px] shadow-2xl hidden md:block">
                  <div className="space-y-2">
                    <p className="text-5xl font-bold font-display">15+</p>
                    <p className="text-xs font-bold tracking-[0.3em] uppercase text-accent-gold">Years of Legacy</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10 slide-up">
              <div className="space-y-6">
                <h2 className="text-5xl sm:text-6xl font-bold leading-tight">Dedicated to <br />Serving the Elderly</h2>
                <div className="w-16 h-1 bg-accent-gold"></div>
              </div>

              <div className="space-y-6 text-xl text-text-main/80 leading-relaxed">
                <p>
                  DMCT Hospital & Old Age Home has been a trusted sanctuary for the needy, sick, and abandoned elderly for over 15 years in <strong>Kalyan East</strong>.
                </p>

                <p>
                  Our mission is to ensure every senior citizen receives the love, respect, and medical attention they deserve in a safe and dignifed environment.
                </p>
              </div>

              <div className="relative p-10 border-l-4 border-accent-gold bg-secondary-sage/5 rounded-[8px]">
                <p className="text-xl text-primary-forest/90 leading-relaxed italic font-medium">
                  "Founded by <strong className="text-primary-forest">Dr. Ravindra Jadhav</strong>, our commitment to humanity and social service continues to inspire every action we take."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-bg-paper">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-24 slide-up">
            <h2 className="text-5xl sm:text-6xl font-bold mb-8">Comprehensive Care</h2>
            <p className="text-xl text-text-main/70 leading-relaxed">
              We provide a holistic environment designed to ensure dignity, comfort, and clinical well-being for every resident.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className={`card-premium slide-up stagger-${index + 1}`}
              >
                <div className="text-secondary-sage mb-10">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold mb-6 leading-tight">{service.title}</h3>

                <ul className="space-y-5">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start space-x-4 text-text-main/70">
                      <svg className="w-5 h-5 text-accent-gold mt-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-base font-medium leading-normal">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-24 reveal">
            <button
              onClick={() => navigateTo('services')}
              className="group inline-flex items-center text-xl font-bold text-primary-forest hover:text-secondary-sage transition-colors"
            >
              Explore All Services
              <svg className="w-6 h-6 ml-3 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Mission Section - Storytelling Layout */}
      <section className="bg-primary-forest text-white overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-16 sm:p-24 lg:p-32 space-y-16 flex flex-col justify-center slide-up">
            <div className="space-y-6">
              <h2 className="text-5xl sm:text-6xl font-bold text-white leading-tight">Our Noble <br /><span className="text-accent-gold serif italic font-normal">Mission</span></h2>
              <div className="w-16 h-1 bg-accent-gold"></div>
            </div>

            <div className="space-y-16">
              {[
                {
                  title: 'Dignified Life',
                  text: 'To provide a dignified and respectful life to needy and abandoned elderly people through dedicated personal attention.'
                },
                {
                  title: 'Loving Care',
                  text: 'To offer unconditional love and clinical care in a safe environment that feels like a true home.'
                },
                {
                  title: 'Compassionate Society',
                  text: 'To build a society based on core values of humanity, building a bridge between generations.'
                }
              ].map((mission, index) => (
                <div key={index} className="flex gap-8 group">
                  <span className="text-4xl font-display text-accent-gold font-bold opacity-30 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">{mission.title}</h3>
                    <p className="text-lg text-white/70 leading-relaxed">{mission.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative min-h-[500px] lg:min-h-full reveal">
            <img
              src="https://images.unsplash.com/photo-1516733968668-dbdce39c46ef?auto=format&fit=crop&q=80&w=1200"
              alt="Elderly care"
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </div>
      </section>

      {/* Donation CTA Section */}
      <section className="section-padding relative overflow-hidden bg-primary-forest">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-sage/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-12 slide-up">
          <h2 className="text-5xl sm:text-6xl font-bold text-white leading-tight">Support Our cause</h2>
          <p className="text-2xl text-white/80 leading-relaxed font-light font-display">
            "Your contribution provides life-saving medicine, nutritious food, and a safe sanctuary for those who once cared for us."
          </p>
          <div className="pt-8">
            <a
              href="tel:7977211807"
              className="inline-flex items-center justify-center px-12 py-6 bg-accent-gold text-primary-forest rounded-[8px] font-bold text-xl shadow-2xl hover:bg-white transition-all hover:scale-105"
            >
              Become a Donor
              <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Hub Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-32 items-stretch">
            <div className="space-y-16 slide-up">
              <div className="space-y-6">
                <h2 className="text-5xl sm:text-6xl font-bold leading-tight">Connect With Us</h2>
                <div className="w-16 h-1 bg-accent-gold"></div>
                <p className="text-xl text-text-main/70 font-medium">Available 24/7 for admissions and inquiries.</p>
              </div>

              <div className="space-y-12">
                <div className="flex items-start space-x-8 group">
                  <div className="w-12 h-12 flex items-center justify-center text-secondary-sage flex-shrink-0">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold">Physical Sanctuary</h3>
                    <p className="text-lg text-text-main/70 leading-relaxed font-medium">
                      New Rachna Park Shopping Centre,<br />
                      Near Saint Mary's School, Chakki Naka,<br />
                      Kalyan East, Maharashtra – 421306
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-8">
                  <div className="w-12 h-12 flex items-center justify-center text-secondary-sage flex-shrink-0">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold">Direct Assistance</h3>
                    <div className="flex flex-col gap-4">
                      <a href="tel:7977211807" className="text-3xl font-display text-primary-forest hover:text-accent-gold transition-colors">7977211807</a>
                      <a href="tel:7400439760" className="text-3xl font-display text-primary-forest hover:text-accent-gold transition-colors">7400439760</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative reveal h-full">
              {/* This would be the Google Map area, using a placeholder image for now */}
              <div className="w-full h-full min-h-[400px] bg-secondary-sage/5 rounded-[8px] overflow-hidden border border-secondary-sage/10 relative">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200"
                  alt="Location concept"
                  className="w-full h-full object-cover opacity-50 grayscale"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 p-8 rounded-[8px] shadow-2xl text-center max-w-sm">
                    <div className="w-12 h-12 bg-primary-forest text-white rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <p className="font-bold text-primary-forest mb-2">Visit Our Facility</p>
                    <p className="text-sm text-text-main/70">Our doors are always open for those seeking care or wishing to support our mission.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-forest text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-start pb-24 border-b border-white/10">
            <div className="space-y-10">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 rounded-full bg-accent-gold/20 flex items-center justify-center border border-accent-gold/30">
                  <svg className="w-8 h-8 text-accent-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl font-bold font-display leading-tight">DMCT Hospital & <br />Old Age Home</h3>
                  <p className="text-accent-gold/60 text-sm font-bold tracking-[0.2em] uppercase mt-2">Operated by Dr. Mitra Charitable Trust</p>
                </div>
              </div>
              <p className="text-xl text-white/60 leading-relaxed font-light font-display max-w-md">
                Dedicated to providing selfless service, medical excellence, and a family environment for our elders since 2010.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-accent-gold">24/7 Support</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-sm font-bold text-white/80">Caregivers on Duty</span>
                  </div>
                  <a href="tel:7977211807" className="block text-2xl font-display hover:text-accent-gold transition-colors">7977211807</a>
                </div>
              </div>
              <div className="space-y-8">
                <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-accent-gold">Inspiration</h4>
                <p className="text-white/60 font-medium">Under the visionary guidance of <br /><strong className="text-white">Dr. Ravindra Jadhav</strong></p>
              </div>
            </div>
          </div>

          <div className="pt-16 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-white/30 text-sm">© {new Date().getFullYear()} DMCT Hospital & Old Age Home. All rights reserved.</p>
            <div className="flex space-x-12 text-white/30 text-xs font-bold tracking-widest uppercase">
              <span className="hover:text-accent-gold cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-accent-gold cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-accent-gold cursor-pointer transition-colors">Transparency</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
