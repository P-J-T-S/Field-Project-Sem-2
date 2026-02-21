import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const HomePage = () => {
  const { navigateTo, currentPage } = useContext(AppContext);
  const [fabVisible, setFabVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

    const handleScroll = () => {
      setFabVisible(window.scrollY > window.innerHeight * 0.2);
    };

    window.addEventListener('scroll', handleScroll);

    // Handle initial and subsequent scroll for About and Contact routes
    if (currentPage === 'about') {
      setTimeout(() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (currentPage === 'contact') {
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);


  const services = [
    {
      title: "24-Hour Care",
      items: ["24-hour trained caregivers", "Regular doctor check-ups", "Medication management"],
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    {
      title: "Accommodation",
      items: ["Clean and safe environment", "Hall-type room arrangement", "Comfortable beds"],
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    },
    {
      title: "Food & Support",
      items: ["Nutritious meals", "Laundry service", "Essential daily care items"],
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
    },
    {
      title: "Mental Wellness",
      items: ["Yoga sessions", "Counseling support", "Laughter club"],
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    }
  ];

  return (
    <div className="overflow-x-hidden pt-24 page-fade-in">
      {/* Hero Section - The Hospital Banner */}
      <section className="relative min-h-[85vh] flex items-center bg-white hero-padding overflow-hidden animate-clinical-scan">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="layout-grid items-center">
            <div className="content-main space-y-10 reveal-on-scroll">
              <div>
                <span className="clinical-label block mb-4">Dedicated to Senior Care Since 2010</span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl leading-none text-hospital-navy font-header mb-8">
                  A place where the elderly <br />
                  <span className="text-surgical-blue italic font-normal">receive true care</span>
                </h1>
                <p className="text-xl md:text-2xl text-surgical-charcoal/80 font-body font-light max-w-2xl leading-relaxed">
                  24-hour care, medical support, and a homely environment for needy, sick, and abandoned senior citizens.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <button
                  onClick={() => navigateTo('donate')}
                  className="btn-donate text-center"
                >
                  Support Our Mission
                </button>
                <button
                  onClick={() => navigateTo('services')}
                  className="btn-secondary"
                >
                  View Medical Facilities
                </button>
              </div>
            </div>

            <div className="content-side relative reveal-on-scroll stagger-2">
              <div className="relative aspect-[4/5] rounded-[2px] overflow-hidden shadow-premium border border-silver/30">
                <img
                  src="https://images.unsplash.com/photo-1581056344415-0adb39ca6c3f?auto=format&fit=crop&q=80&w=1200"
                  alt="Professional medical care for elderly"
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-hospital-navy/5 mix-blend-multiply" />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-white/90 backdrop-blur-md border-t border-silver/20">
                  <p className="clinical-label mb-2">Institutional Stat</p>
                  <p className="text-3xl font-header text-hospital-navy">15+ Years</p>
                  <p className="text-xs text-surgical-charcoal/60 uppercase tracking-widest">of Compassionate Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us (Short Introduction) */}
      <section className="section-padding bg-medical-white" id="about">
        <div className="max-w-7xl mx-auto">
          <div className="layout-grid gap-20 items-center">
            <div className="content-main reveal-on-scroll">
              <h2 className="mb-8">About DMCT Hospital</h2>
              <div className="space-y-6 text-lg text-surgical-charcoal/80 leading-relaxed font-body">
                <p>
                  DMCT Hospital & Old Age Home, located in Kalyan East, is a trusted elder care center dedicated to serving the needy, sick, and abandoned elderly for more than 15 years.
                </p>
                <p>
                  Here, senior citizens receive love, respect, medical attention, and a safe environment at an affordable cost.
                </p>
                <div className="pt-8 border-t border-silver">
                  <p className="clinical-label mb-2">Founded & Led By</p>
                  <p className="text-2xl font-header text-hospital-navy italic">Dr. Ravindra Jadhav</p>
                  <p className="text-sm text-surgical-charcoal/60 mt-1">
                    A socially committed doctor devoted to the service of the elderly and underprivileged.
                  </p>
                </div>
              </div>
            </div>
            <div className="content-side reveal-on-scroll stagger-1">
              <div className="bg-white p-10 border border-silver/50 shadow-sm relative">
                <div className="w-12 h-1 bg-surgical-blue mb-8" />
                <h3 className="text-xl mb-6">Our Philosophy</h3>
                <p className="text-surgical-charcoal/70 italic leading-relaxed">
                  "Inspired by the ideals of humanity and social service, we strive to build a society based on compassion and dignity for those who need it most."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services Grid */}
      <section className="section-padding bg-white" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 reveal-on-scroll">
            <h2 className="mb-4">Our Key Services</h2>
            <p className="clinical-label">Clinical Care • Daily Support • Well-Being</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className={`card-hospital reveal-on-scroll stagger-${index % 4 + 1}`}>
                <div className="w-12 h-12 bg-medical-white text-surgical-blue flex items-center justify-center mb-8">
                  {service.icon}
                </div>
                <h3 className="text-xl mb-6">{service.title}</h3>
                <ul className="space-y-4">
                  {service.items.map((item, i) => (
                    <li key={i} className="text-sm text-surgical-charcoal/60 flex items-start">
                      <span className="w-1.5 h-1.5 bg-surgical-blue rounded-full mt-1.5 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-hospital-navy text-white overflow-hidden relative" id="mission">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="reveal-on-scroll">
            <h2 className="text-white mb-12">Our Mission</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-6">1</div>
                <p className="text-lg font-header italic">To provide a dignified life to needy and abandoned elderly people</p>
              </div>
              <div className="space-y-4">
                <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-6">2</div>
                <p className="text-lg font-header italic">To offer loving care in a safe environment</p>
              </div>
              <div className="space-y-4">
                <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-6">3</div>
                <p className="text-lg font-header italic">To build a society based on humanity, compassion, and service</p>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-surgical-blue/10 blur-3xl translate-y-1/2 -translate-x-1/2" />
      </section>

      {/* Support Section - The Donation CTA */}
      <section className="section-padding bg-medical-white text-center">
        <div className="max-w-3xl mx-auto space-y-10 reveal-on-scroll">
          <h2 className="text-hospital-navy font-header italic leading-tight">Support Our Cause</h2>
          <p className="text-xl text-surgical-charcoal/80 font-body leading-relaxed">
            Your small contribution can provide food, medicine, and shelter to a helpless elderly person.
          </p>
          <div className="p-8 bg-white border border-silver shadow-sm inline-block">
            <p className="text-sm font-bold tracking-widest uppercase mb-6 text-surgical-blue">Philanthropic Hub</p>
            <button
              onClick={() => navigateTo('donate')}
              className="btn-donate px-12 py-5 text-lg"
            >
              Donate Now
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white" id="contact">
        <div className="max-w-7xl mx-auto">
          <div className="layout-grid items-start gap-20">
            <div className="content-main reveal-on-scroll">
              <h2 className="mb-12">Contact Us</h2>
              <div className="space-y-10">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-medical-white text-hospital-navy flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Location</h4>
                    <p className="text-surgical-charcoal/70 leading-relaxed font-body">
                      DMCT Hospital & Old Age Home<br />
                      New Rachna Park Shopping Centre, Near Saint Mary’s School<br />
                      Chakki Naka, Kalyan East, District Thane, Maharashtra – 421306
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-medical-white text-hospital-navy flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Emergency Support</h4>
                    <p className="text-2xl font-header text-surgical-blue mb-1">7977 211 807</p>
                    <p className="text-2xl font-header text-surgical-blue">7400 439 760</p>
                    <p className="text-[10px] uppercase font-bold text-surgical-charcoal/40 mt-4">⚠️ Please call before visiting</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-side reveal-on-scroll stagger-1">
              <div className="bg-hospital-navy p-10 text-white rounded-[2px] shadow-xl">
                <h3 className="text-white mb-8">Hours of Operation</h3>
                <div className="space-y-4 text-sm font-body border-t border-white/10 pt-8">
                  <div className="flex justify-between">
                    <span className="text-white/40 uppercase tracking-widest">Medical Care</span>
                    <span className="font-bold">24/7 Service</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40 uppercase tracking-widest">Visiting Hours</span>
                    <span className="font-bold">10 AM - 6 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40 uppercase tracking-widest">Admission</span>
                    <span className="font-bold text-surgical-blue">Open Daily</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Emergency FAB */}
      <a
        href="tel:7400439760"
        className={`fixed bottom-8 right-8 z-[150] bg-surgical-blue text-white p-5 rounded-full shadow-2xl transition-all duration-500 hover:bg-hospital-navy active:scale-90 flex items-center space-x-3 group ${fabVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        aria-label="Call emergency support"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold uppercase tracking-widest text-[10px] whitespace-nowrap">Emergency Support</span>
        <svg className="w-8 h-8 animate-heartbeat" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
      </a>

    </div>
  );
};

export default HomePage;
