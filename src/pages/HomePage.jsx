import { useApp } from '../context/AppContext';

const HomePage = () => {
  const { navigateTo } = useApp();

  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '24-Hour Care',
      items: [
        '24-hour trained caregivers',
        'Regular doctor check-ups',
        'Medication management'
      ]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: 'Comfortable Accommodation',
      items: [
        'Clean and safe environment',
        'Hall-type room arrangement',
        'Comfortable beds'
      ]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Food & Daily Support',
      items: [
        'Nutritious meals',
        'Laundry service',
        'Essential daily care items'
      ]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Mental & Social Activities',
      items: [
        'Yoga sessions',
        'Counseling support',
        'Laughter club',
        'Television and newspapers'
      ]
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-48 sm:pb-32 bg-warm-cream">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-muted-sage/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary-teal/10 rounded-full blur-3xl opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 slide-up">
              <div className="inline-flex items-center space-x-3 bg-white px-5 py-2.5 rounded-full shadow-sm border border-muted-sage/30">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-teal opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-deep-teal"></span>
                </span>
                <span className="text-base font-bold text-deep-teal tracking-wide">15+ YEARS OF COMPASSIONATE SERVICE</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-charcoal leading-[1.1]">
                DMCT Hospital & <br />
                <span className="text-deep-teal">Old Age Home</span>
              </h1>

              <p className="text-2xl text-charcoal/80 leading-relaxed font-medium max-w-xl">
                “A place where the elderly receive true care and compassion.”
              </p>

              <p className="text-xl text-charcoal/70 leading-relaxed max-w-xl">
                Providing specialized 24-hour medical care and a homely environment for the needy, sick, and abandoned senior citizens in Kalyan East.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <a
                  href="tel:7977211807"
                  className="btn-primary text-xl px-10 py-5"
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>

                <button
                  onClick={() => navigateTo('services')}
                  className="btn-secondary text-xl px-10 py-5"
                >
                  Our Services
                  <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-wrap gap-8 pt-8">
                <div className="flex items-center space-x-3 text-charcoal/80">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-muted-sage/20">
                    <svg className="w-5 h-5 text-deep-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-bold text-lg">24/7 Care</span>
                </div>
                <div className="flex items-center space-x-3 text-charcoal/80">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-muted-sage/20">
                    <svg className="w-5 h-5 text-deep-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="font-bold text-lg">Medical Support</span>
                </div>
              </div>
            </div>

            <div className="relative slide-up stagger-2 lg:block">
              <div className="relative z-10 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                <div className="w-full h-full bg-muted-sage/10 flex items-center justify-center">
                  {/* Image placeholder with nice SVG if actual image fails */}
                  <svg className="w-32 h-32 text-deep-teal/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {/* Once I have actual images, I'll put them here */}
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary-teal rounded-3xl opacity-20 blur-2xl -z-10"></div>
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-muted-sage rounded-full opacity-30 blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 slide-up">
              <div className="relative">
                <div className="aspect-square rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-muted-sage/20">
                  <div className="w-full h-full bg-warmth-100 flex items-center justify-center">
                    <svg className="w-24 h-24 text-primary-teal/30" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute -bottom-8 -right-8 bg-deep-teal text-white p-8 rounded-3xl shadow-2xl">
                  <p className="text-4xl font-bold mb-1">15+</p>
                  <p className="text-sm font-semibold tracking-wider uppercase">Years of Care</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 slide-up">
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl font-bold text-charcoal">Dedicated to Serving the Elderly</h2>
                <div className="w-24 h-1.5 bg-primary-teal rounded-full"></div>
              </div>

              <p className="text-xl text-charcoal/80 leading-relaxed">
                DMCT Hospital & Old Age Home, located in <strong>Kalyan East</strong>, has been a trusted sanctuary for the needy, sick, and abandoned elderly for over 15 years.
              </p>

              <p className="text-xl text-charcoal/70 leading-relaxed">
                Our mission is to ensure every senior citizen receives the love, respect, and medical attention they deserve in a safe and dignifed environment.
              </p>

              <div className="bg-warmth-100 p-8 rounded-[2rem] border border-muted-sage/30">
                <p className="text-xl text-charcoal/80 leading-relaxed italic">
                  "The institution is founded by <strong className="text-deep-teal">Dr. Ravindra Jadhav</strong>, whose lifelong commitment to humanity and social service continues to inspire our every action."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 sm:py-32 bg-warm-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-20 slide-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-charcoal mb-6">Our Comprehensive Care</h2>
            <div className="w-24 h-1.5 bg-primary-teal rounded-full mb-8"></div>
            <p className="text-xl text-charcoal/70 leading-relaxed">
              We provide a holistic environment designed to ensure dignity, comfort, and clinical well-being for every resident.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`card-soft slide-up stagger-${index + 1}`}
              >
                <div className="w-16 h-16 bg-warmth-100 rounded-2xl flex items-center justify-center text-deep-teal mb-8 shadow-inner">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold text-charcoal mb-4">{service.title}</h3>

                <ul className="space-y-4">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start space-x-3 text-charcoal/70">
                      <svg className="w-6 h-6 text-primary-teal mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-base font-medium leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <button
              onClick={() => navigateTo('services')}
              className="btn-primary text-xl px-12"
            >
              Explore All Services
              <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 slide-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-charcoal mb-6">Our Noble Mission</h2>
            <div className="w-24 h-1.5 bg-primary-teal rounded-full mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                ),
                title: 'Dignified Life',
                text: 'To provide a dignified and respectful life to needy and abandoned elderly people.'
              },
              {
                icon: (
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                ),
                title: 'Loving Care',
                text: 'To offer unconditional love and clinical care in a safe and homely environment.'
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: 'Compassionate Society',
                text: 'To build a society based on the core values of humanity, compassion, and selfless service.'
              }
            ].map((mission, index) => (
              <div key={index} className={`text-center space-y-6 slide-up stagger-${index + 1}`}>
                <div className="w-20 h-20 bg-warmth-100 rounded-3xl flex items-center justify-center text-deep-teal mx-auto shadow-sm border border-muted-sage/30">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {mission.icon}
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-charcoal">{mission.title}</h3>
                <p className="text-lg text-charcoal/70 leading-relaxed font-medium">{mission.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation CTA Section */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-deep-teal"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-teal/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-muted-sage/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="space-y-10 slide-up">
            <h2 className="text-4xl sm:text-6xl font-bold text-white leading-tight">Support Our Elderly Cause</h2>
            <p className="text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto font-medium">
              "Your small contribution can provide life-saving medicine, nutritious food, and a safe shelter to a helpless elderly person."
            </p>
            <div className="pt-6">
              <a
                href="tel:7977211807"
                className="inline-flex items-center justify-center px-12 py-5 bg-white text-deep-teal rounded-full font-bold text-2xl shadow-2xl hover:bg-warm-cream transition-all hover:scale-105"
              >
                Become a Donor
                <svg className="w-7 h-7 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </a>
            </div>
            <p className="text-white/70 text-lg font-medium">
              Every donation matters. Reach out to us today to make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12 slide-up">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold text-charcoal mb-6">Get in Touch</h2>
                <div className="w-24 h-1.5 bg-primary-teal rounded-full mb-8"></div>
                <p className="text-xl text-charcoal/70 font-medium italic">Please call us to schedule a visit or for inquiries.</p>
              </div>

              <div className="space-y-10">
                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 bg-warmth-100 rounded-2xl flex items-center justify-center text-deep-teal flex-shrink-0 shadow-sm">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-charcoal mb-3">Visit Us</h3>
                    <p className="text-xl text-charcoal/70 leading-relaxed font-medium">
                      New Rachna Park Shopping Centre,<br />
                      Near Saint Mary's School, Chakki Naka,<br />
                      Kalyan East, Maharashtra – 421306, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 bg-warmth-100 rounded-2xl flex items-center justify-center text-deep-teal flex-shrink-0 shadow-sm">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-charcoal mb-3">Call Support</h3>
                    <div className="space-y-2">
                      <a href="tel:7977211807" className="block text-2xl font-bold text-deep-teal underline decoration-primary-teal underline-offset-8">7977211807</a>
                      <a href="tel:7400439760" className="block text-2xl font-bold text-deep-teal underline decoration-primary-teal underline-offset-8">7400439760</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-soft bg-warm-cream p-12 space-y-10 slide-up stagger-2">
              <h3 className="text-3xl font-bold text-charcoal">We are here for you</h3>
              <p className="text-xl text-charcoal/70 leading-relaxed font-medium">
                For inquiries regarding admissions, donations, or volunteering, please reach out. Our dedicated team is available 24/7.
              </p>
              <div className="space-y-6 pt-4">
                <a
                  href="tel:7977211807"
                  className="btn-primary w-full text-xl py-5"
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now: 7977211807
                </a>
                <p className="text-center text-charcoal/50 font-bold uppercase tracking-widest text-sm">Or</p>
                <div className="flex items-center justify-center space-x-2 text-deep-teal">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                  <span className="text-lg font-bold">Inspiration: Dr. Ravindra Jadhav</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center text-center md:text-left">
            <div className="space-y-6">
              <div className="flex items-center justify-center md:justify-start space-x-4">
                <div className="w-14 h-14 rounded-full bg-deep-teal flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">DMCT Hospital & Old Age Home</h3>
              </div>
              <p className="text-xl text-white/70 font-medium">
                Operated by Dr. Mitra Charitable Trust. Dedicated to providing love, care, and dignity to our elderly.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-white/60">© {new Date().getFullYear()} DMCT Hospital & Old Age Home. All rights reserved.</p>
              <p className="text-base text-white/40">Serving humanity with compassion for 15+ years in Kalyan East.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
