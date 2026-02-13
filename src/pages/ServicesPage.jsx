const ServicesPage = () => {
  const services = [
    {
      title: '24-Hour Care Services',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      items: [
        '24-hour trained caregivers',
        'Regular doctor visits and monitoring',
        'Medication administration',
        'Continuous supervision and safety'
      ]
    },
    {
      title: 'Medical Facilities',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      items: [
        'Regular check-ups by General Physician (Dr. Ravindra Jadhav)',
        'Primary medical treatment',
        'Blood pressure and sugar monitoring',
        'Hospital referral when required'
      ]
    },
    {
      title: 'Accommodation Facilities',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      items: [
        'Clean and safe living environment',
        'Hall-type shared rooms',
        'Comfortable beds and bedding',
        'Regular cleaning and hygiene maintenance'
      ]
    },
    {
      title: 'Food & Daily Living Support',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      items: [
        'Nutritious meals served daily',
        'Feeding assistance for dependent residents',
        'Laundry services',
        'Diapers and essential care materials'
      ]
    },
    {
      title: 'Mental & Social Well-Being',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      items: [
        'Light exercise and yoga sessions',
        'Counseling support',
        'Laughter club activities',
        'Television and newspapers',
        'Friendly, family-like environment'
      ]
    },
    {
      title: 'Special Care Support',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      items: [
        'Care for semi-dependent elderly',
        'Support for sick and lonely seniors',
        'Shelter for abandoned and homeless elderly'
      ]
    }
  ];

  const values = [
    {
      title: 'Love and compassion',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: 'Respect and dignity',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Family-like care',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="gradient-warmth py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 slide-up">
            <h1 className="text-4xl sm:text-5xl font-bold text-earth-900">
              Our Services & <span className="text-gradient">Facilities</span>
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-sage-600 to-earth-600 mx-auto rounded-full"></div>
            <p className="text-xl text-earth-700 leading-relaxed">
              At DMCT Hospital & Old Age Home, we provide comprehensive care to ensure that every elderly resident lives with dignity, safety, and emotional comfort.
            </p>
            <p className="text-lg text-earth-600">
              Our services include medical care, daily assistance, and mental well-being support.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-warmth-50 to-sage-50 rounded-2xl p-8 shadow-lg card-hover slide-up stagger-${Math.min(index + 1, 4)}`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-sage-600 to-earth-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-earth-900 mb-4">{service.title}</h3>
                
                <ul className="space-y-3">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start space-x-3 text-earth-700">
                      <svg className="w-5 h-5 text-sage-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safe Environment Section */}
      <section className="py-20 gradient-warmth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12 slide-up">
              <h2 className="text-3xl sm:text-4xl font-bold text-earth-900">A Safe, Homely Environment</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-sage-600 to-earth-600 mx-auto rounded-full"></div>
              <p className="text-lg text-earth-600">
                We treat every resident with care and commitment
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-8 shadow-lg text-center space-y-4 slide-up stagger-${index + 1}`}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-sage-100 to-earth-100 rounded-2xl flex items-center justify-center text-sage-700 mx-auto">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-bold text-earth-900">{value.title}</h3>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg slide-up stagger-4">
              <p className="text-lg text-earth-700 text-center leading-relaxed">
                Our staff is committed to ensuring <strong className="text-sage-700">comfort, safety, and emotional well-being</strong> for every elderly person staying with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-sage-700 to-earth-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8 slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold">Ready to Learn More?</h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Contact us to discuss how we can provide the best care for your loved ones or to support our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="tel:7977211807"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-sage-700 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call 7977211807
              </a>
              <a
                href="tel:7400439760"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-sage-700 transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call 7400439760
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-earth-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-600 to-earth-600 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">DMCT Hospital & Old Age Home</h3>
              </div>
            </div>
            <p className="text-white/70">
              Operated by Dr. Mitra Charitable Trust
            </p>
            <p className="text-white/60 text-sm">
              Serving the elderly with love and care for over 15 years
            </p>
            <div className="pt-6 border-t border-white/10">
              <p className="text-white/50 text-sm">
                © {new Date().getFullYear()} DMCT Hospital & Old Age Home. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;
