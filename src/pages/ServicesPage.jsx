import { useEffect, useRef } from 'react';

const ServicesPage = () => {
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
      title: '24-Hour Clinical Care',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      items: ['Skilled clinical supervision', 'Doctor visits', 'Medication management', 'Safety monitoring']
    },
    {
      title: 'Expert Medical Oversight',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      ),
      items: ['Dr. Ravindra Jadhav guidance', 'Life-saving treatments', 'Constant BP/Sugar monitoring', 'Swift referrals']
    },
    {
      title: 'Dignified Living',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      ),
      items: ['Safe, healing environment', 'Orthopedic beds', 'Hygiene protocols', 'Spacious shared halls']
    },
    {
      title: 'Nutritional Excellence',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      ),
      items: ['Doctor-approved diet', 'Feeding assistance', 'Laundry services', 'Personal care kits']
    },
    {
      title: 'Emotional Sanctuary',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      items: ['Yoga and movement', 'Counseling support', 'Laughter clubs', 'Reading retreats']
    },
    {
      title: 'Specialized Elder Care',
      icon: (
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      ),
      items: ['Semi-dependent residents', 'Lonely elders support', 'Abandoned citizens care']
    }
  ];

  return (
    <div className="overflow-x-hidden pt-32 sm:pt-40 animate-page-fade">
      {/* Hero Section - Institutional Display */}
      <section className="relative min-h-[60vh] flex items-center bg-parchment section-padding overflow-hidden">
        <div className="max-w-7xl mx-auto w-full relative">
          <div className="max-w-4xl space-y-10 slide-up">
            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-medium leading-[1.05] text-forest font-display">
              Clinical Precision <br />
              <span className="italic font-normal text-medical-teal text-5xl sm:text-6xl lg:text-8xl">Medical Excellence</span>
            </h1>
            <div className="w-20 h-1 bg-gold"></div>
            <p className="text-2xl text-main font-body font-light max-w-2xl leading-relaxed">
              Our comprehensive medical services are engineered for dignity, restorative comfort, and strict clinical oversight.
            </p>
          </div>
        </div>
      </section>

      {/* Institutional Services Grid */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group card-premium bg-white hover:border-medical-teal/30 hover-bento slide-up stagger-${index + 1}`}
              >
                <div className="flex items-center justify-between mb-10">
                  <div className="w-14 h-14 bg-parchment rounded-[4px] border border-sage/5 flex items-center justify-center text-medical-teal group-hover:text-gold transition-colors">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {service.icon}
                    </svg>
                  </div>
                  <span className="micro-label text-main group-hover:text-gold transition-colors opacity-20">Service 0{index + 1}</span>
                </div>

                <h3 className="text-2xl font-bold mb-8 text-forest leading-tight font-display">{service.title}</h3>

                <ul className="space-y-6 clinical-list">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start space-x-3 text-main text-[18px] font-medium">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2.5 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars of Care - Institutional Foundations */}
      <section className="bg-forest text-white overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-16 sm:p-24 lg:p-32 space-y-16 flex flex-col justify-center slide-up">
            <div className="space-y-6">
              <h2 className="text-5xl sm:text-6xl font-medium text-white leading-tight font-prestige">Institutional <br /><span className="text-gold italic font-normal">Foundations</span></h2>
              <div className="w-16 h-1 bg-gold"></div>
              <p className="text-xl text-white/60 font-display">Our clinical pillars ensure a seamless transition into professional care.</p>
            </div>

            <div className="grid gap-12">
              {[
                {
                  title: 'Medical Integrity',
                  desc: 'Delivering specialized oversight led by Dr. Ravindra Jadhav and our skilled clinical team.'
                },
                {
                  title: 'Emotional Sanctuary',
                  desc: 'Ensuring every resident feels the warmth and respect of a true institutional family.'
                }
              ].map((pillar, index) => (
                <div key={index} className="flex gap-8 group">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-gold font-bold font-display text-xl">0{index + 1}</div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-prestige">{pillar.title}</h3>
                    <p className="text-lg text-white/40 leading-relaxed font-light">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative min-h-[600px] reveal image-warm-overlay">
            <img
              src="https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=1200"
              alt="Clinical connection and oversight"
              className="absolute inset-0 w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-forest/30" />
          </div>
        </div>
      </section>

      {/* Professional Call To Action */}
      <section className="section-padding bg-parchment text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-paper-texture opacity-30 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto space-y-12 relative z-10 slide-up">
          <div className="w-16 h-1 bg-gold mx-auto" />
          <h2 className="text-5xl sm:text-7xl font-medium text-forest leading-tight font-prestige">A Safe Sanctuary <br /><span className="italic font-normal text-medical-teal">Awaits Your Family</span></h2>
          <p className="text-2xl text-main/70 font-display font-light max-w-2xl mx-auto leading-relaxed">
            Consult with our clinical staff 24/7 regarding patient admissions or specialized geriatric care protocols.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center pt-8">
            <a href="tel:7977211807" className="btn-primary bg-forest hover:bg-forest/90 px-12 py-5 shadow-2xl text-lg font-bold">Patient Admissions</a>
            <a href="tel:7400439760" className="btn-secondary border-medical-teal text-medical-teal hover:bg-medical-teal hover:text-white px-12 py-5 font-bold text-lg">Emergency Response</a>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Emergency Button - Artisan FAB Conversion */}
      <div className="mobile-sticky-emergency">
        <a href="tel:7400439760" className="flex items-center justify-between bg-gold text-forest p-5 rounded-[4px] shadow-2xl font-bold uppercase tracking-widest text-sm animate-bounce-subtle">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 bg-forest rounded-full animate-ping" />
            <span>Emergency: Call Now</span>
          </div>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
      </div>

      {/* Minimal Institutional Footer */}
      <footer className="py-24 bg-white border-t border-sage/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="grid md:grid-cols-4 gap-16 pb-20">
            <div className="md:col-span-2 space-y-10">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-forest flex items-center justify-center rounded-[4px]">
                  <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-forest uppercase tracking-tight">DMCT Hospital</h3>
              </div>
              <p className="text-xl text-main/50 max-w-sm font-prestige italic">A premier clinical destination for geriatric care, providing medical excellence since 2010.</p>
            </div>
            <div className="space-y-8">
              <h4 className="micro-label text-medical-teal">Location</h4>
              <p className="text-main/60 leading-relaxed font-light text-lg">
                New Rachna Park, Chakki Naka,<br />
                Kalyan East, Maharashtra 421306
              </p>
            </div>
            <div className="space-y-8">
              <h4 className="micro-label text-medical-teal">Managed By</h4>
              <p className="text-main/60 leading-relaxed font-light text-lg">
                Dr. Mitra<br />
                Charitable Trust
              </p>
            </div>
          </div>
          <div className="pt-12 border-t border-sage/10 flex flex-col md:flex-row justify-between items-center gap-8 text-main/30 micro-label">
            <p>© {new Date().getFullYear()} DMCT Kalyan. All Rights Reserved.</p>
            <div className="flex space-x-12">
              <span className="cursor-pointer hover:text-forest transition-colors">Documentation</span>
              <span className="cursor-pointer hover:text-forest transition-colors">Medical Protocols</span>
              <span className="cursor-pointer hover:text-forest transition-colors">Legal</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;
