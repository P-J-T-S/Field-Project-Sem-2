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
      title: '24-Hour Clinical care',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      items: [
        '24-hour trained clinical caregivers',
        'Regular doctor check-ups and monitoring',
        'Professional medication management',
        'Continuous supervision for safety'
      ]
    },
    {
      title: 'Expert Medical Oversight',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      ),
      items: [
        'Direct guidance from Dr. Ravindra Jadhav',
        'Primary life-saving clinical treatments',
        'Advanced BP and glucose monitoring',
        'Rapid specialized referral systems'
      ]
    },
    {
      title: 'Dignified Living',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      ),
      items: [
        'Clean, healing, and airy environment',
        'Spacious hall-type shared arrangements',
        'Premium orthopedic beds',
        'Strict hygiene and maintenance standards'
      ]
    },
    {
      title: 'Nutritional Excellence',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      ),
      items: [
        'Healthy, nutritionist-approved meals',
        'Professional feeding assistance',
        'Daily laundry and hygiene services',
        'Access to essential personal care items'
      ]
    },
    {
      title: 'Emotional Sanctuary',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      items: [
        'Daily gentle yoga and movement',
        'Empathetic counseling support',
        'Social connection and laughter clubs',
        'Calm reading and social retreats'
      ]
    },
    {
      title: 'Specialized Elder Care',
      icon: (
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      ),
      items: [
        'Care for semi-dependent residents',
        'Integration for lonely elders',
        'Support for needy and abandoned citizens'
      ]
    }
  ];

  const values = [
    {
      title: 'Love and compassion',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      )
    },
    {
      title: 'Respect and dignity',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      )
    },
    {
      title: 'Family atmosphere',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      )
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 sm:pt-48 sm:pb-40 bg-bg-paper text-center lg:text-left">
        {/* Organic Background Blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-secondary-sage/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-gold/10 rounded-full blur-3xl opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl space-y-10 slide-up">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.05]">
              Compassion <br />
              <span className="serif italic font-normal text-secondary-sage">In Every Act</span>
            </h1>
            <div className="w-16 h-1 bg-accent-gold hidden lg:block"></div>
            <p className="text-xl sm:text-2xl text-text-main/70 leading-relaxed font-light font-display max-w-2xl">
              Our comprehensive services are designed to ensure and safeguard the dignity, comfort, and clinical well-being of every resident.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className={`card-premium slide-up stagger-${Math.min(index + 1, 4)}`}
              >
                <div className="text-secondary-sage mb-8">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {service.icon}
                  </svg>
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
        </div>
      </section>

      {/* Pillars of Care Section */}
      <section className="section-padding bg-bg-paper relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary-sage/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12 slide-up text-center lg:text-left">
              <div className="space-y-6">
                <h2 className="text-5xl sm:text-6xl font-bold leading-tight">Living with <br /><span className="serif italic font-normal text-secondary-sage">Dignity</span></h2>
                <div className="w-16 h-1 bg-accent-gold mx-auto lg:mx-0"></div>
                <p className="text-xl text-text-main/70 leading-relaxed font-display">
                  Our foundation is built on core pillars designed to provide a seamless transition into a life of peace and professional care.
                </p>
              </div>

              <div className="grid gap-10">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-center sm:items-start gap-6 group"
                  >
                    <div className="w-14 h-14 bg-white border border-secondary-sage/20 rounded-full flex items-center justify-center text-secondary-sage flex-shrink-0 shadow-sm group-hover:border-accent-gold/50 transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {value.icon}
                      </svg>
                    </div>
                    <div className="space-y-2 text-center sm:text-left">
                      <h3 className="text-2xl font-bold">{value.title}</h3>
                      <p className="text-text-main/60 font-medium">Providing the essential warmth and professional oversight required for a serene life.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative reveal mt-12 lg:mt-0">
              <div className="aspect-[4/5] rounded-[8px] overflow-hidden shadow-2xl relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1200"
                  alt="Pillars of care"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary-forest/10"></div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-full h-full border-b-2 border-r-2 border-accent-gold/10 rounded-br-[40px] -z-10 hidden sm:block"></div>
            </div>
          </div>

          <div className="mt-24 p-12 lg:p-16 bg-white border border-secondary-sage/10 rounded-[8px] slide-up">
            <p className="text-2xl sm:text-3xl text-primary-forest text-center leading-relaxed font-light font-display">
              "Our dedicated team is committed to providing <span className="font-bold text-accent-gold">clinical excellence</span> and <span className="font-bold text-secondary-sage">emotional warmth</span> to every single soul staying with us."
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden bg-primary-forest">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-12 slide-up">
          <h2 className="text-5xl sm:text-6xl font-bold text-white leading-tight">Let Us Provide <br />The Best Care</h2>
          <p className="text-2xl text-white/80 leading-relaxed font-light font-display">
            We are available round-the-clock to answer your questions regarding admissions, facilities, or support opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <a
              href="tel:7977211807"
              className="inline-flex items-center justify-center px-12 py-6 bg-accent-gold text-primary-forest rounded-[8px] font-bold text-xl shadow-2xl hover:bg-white transition-all hover:scale-105"
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Standard Line
            </a>
            <a
              href="tel:7400439760"
              className="inline-flex items-center justify-center px-12 py-6 bg-white/10 text-white rounded-[8px] font-bold text-xl border-2 border-white/20 hover:bg-white/20 transition-all hover:scale-105"
            >
              Secondary Line
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-forest text-white py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-bold tracking-[0.3em] uppercase text-accent-gold">24/7 Professional Supervision</span>
          </div>
          <p className="text-2xl font-bold font-display tracking-widest uppercase">DMCT Hospital & Old Age Home</p>
          <p className="text-white/30 font-medium pt-4">© {new Date().getFullYear()} All rights reserved. Dr. Mitra Charitable Trust.</p>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;
