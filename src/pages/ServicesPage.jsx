const ServicesPage = () => {
  const services = [
    {
      title: '24-Hour Clinical Care',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      items: [
        '24-hour trained clinical caregivers',
        'Regular doctor check-ups and monitoring',
        'Professional medication management',
        'Continuous supervision for safety'
      ]
    },
    {
      title: 'Medical Support',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      ),
      items: [
        'Expert guidance from Dr. Ravindra Jadhav',
        'Primary life-saving treatments',
        'Advanced BP and sugar monitoring',
        'Swift hospital referral systems'
      ]
    },
    {
      title: 'Dignified Living',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      ),
      items: [
        'Clean, safe, and healing environment',
        'Spacious, hall-type shared rooms',
        'Comfortable orthopedic beds',
        'Strict hygiene and maintenance protocols'
      ]
    },
    {
      title: 'Daily Nutrition & Support',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      ),
      items: [
        'Healthy, doctor-approved meals',
        'Dedicated feeding assistance',
        'Comprehensive laundry services',
        'Essential personal care materials'
      ]
    },
    {
      title: 'Emotional Well-Being',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      items: [
        'Daily gentle yoga and exercises',
        'Professional counseling support',
        'Engaging community laughter club',
        'Reading areas and social spaces'
      ]
    },
    {
      title: 'Specialized Elder Care',
      icon: (
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      ),
      items: [
        'Care for semi-dependent seniors',
        'Integrated support for lonely elders',
        'New beginnings for abandoned citizens'
      ]
    }
  ];

  const values = [
    {
      title: 'Love and compassion',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      )
    },
    {
      title: 'Respect and dignity',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      )
    },
    {
      title: 'Family-like atmosphere',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      )
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-48 sm:pb-32 bg-warm-cream">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-muted-sage/20 rounded-full blur-3xl opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8 slide-up">
            <h1 className="text-5xl sm:text-7xl font-bold text-charcoal leading-tight">
              Our Compassionate <span className="text-deep-teal">Services</span>
            </h1>
            <div className="w-32 h-2 bg-primary-teal rounded-full mx-auto"></div>
            <p className="text-2xl text-charcoal/70 leading-relaxed font-medium">
              We provide comprehensive, professional care designed to ensure that every resident lives with the dignity and comfort they deserve.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className={`card-soft slide-up stagger-${Math.min(index + 1, 4)}`}
              >
                <div className="w-20 h-20 bg-warmth-100 rounded-3xl flex items-center justify-center text-deep-teal mb-8 shadow-sm border border-muted-sage/30">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {service.icon}
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-charcoal mb-6">{service.title}</h3>

                <ul className="space-y-4">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start space-x-3 text-charcoal/70">
                      <svg className="w-6 h-6 text-primary-teal mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-lg font-medium leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safe Environment Section */}
      <section className="py-24 sm:py-32 bg-warm-cream relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-teal/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6 mb-16 slide-up">
              <h2 className="text-4xl sm:text-5xl font-bold text-charcoal">Living with Dignity</h2>
              <div className="w-24 h-1.5 bg-primary-teal rounded-full mx-auto"></div>
              <p className="text-xl text-charcoal/70 font-medium">
                Our foundation is built on three core pillars of specialized care.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-[2rem] p-10 shadow-xl border border-muted-sage/20 text-center space-y-6 slide-up stagger-${index + 1}`}
                >
                  <div className="w-16 h-16 bg-warmth-100 rounded-2xl flex items-center justify-center text-deep-teal mx-auto">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {value.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-charcoal">{value.title}</h3>
                </div>
              ))}
            </div>

            <div className="mt-16 card-soft bg-white p-12 slide-up stagger-4">
              <p className="text-2xl text-charcoal/80 text-center leading-relaxed font-medium">
                "Our dedicated team is committed to providing <span className="text-deep-teal font-bold">clinical excellence and emotional warmth</span> to every single hero staying with us."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 relative overflow-hidden bg-deep-teal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12 slide-up">
            <h2 className="text-4xl sm:text-6xl font-bold text-white">Let Us Provide the Best Care</h2>
            <p className="text-2xl text-white/80 leading-relaxed font-medium">
              We are available round-the-clock to answer your questions regarding admissions, facilities, or support opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center pt-4">
              <a
                href="tel:7977211807"
                className="btn-primary bg-white text-deep-teal hover:bg-warm-cream text-2xl px-12 py-5"
              >
                <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Support
              </a>
              <a
                href="tel:7400439760"
                className="btn-secondary border-white text-white bg-white/10 text-2xl px-12 py-5"
              >
                Secondary Line
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-white/50 mb-4 font-bold tracking-widest uppercase">DMCT Hospital & Old Age Home</p>
          <p className="text-white/30 font-medium">© {new Date().getFullYear()} All rights reserved. Dr. Mitra Charitable Trust.</p>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;
