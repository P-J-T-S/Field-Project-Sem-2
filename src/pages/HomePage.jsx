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
      <section className="gradient-warmth py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 slide-up">
              <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <div className="w-2 h-2 bg-sage-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-sage-800">Serving for 15+ Years</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-earth-900 leading-tight">
                DMCT Hospital & <br />
                <span className="text-gradient">Old Age Home</span>
              </h1>
              
              <p className="text-xl text-earth-700 leading-relaxed">
                A place where the elderly receive true care and compassion.
              </p>
              
              <p className="text-lg text-earth-600">
                24-hour care, medical support, and a homely environment for needy, sick, and abandoned senior citizens.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="tel:7977211807"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-sage-600 to-earth-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
                
                <button
                  onClick={() => navigateTo('services')}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-sage-700 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Our Services
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-4 text-earth-700">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-medium">7977211807</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-medium">7400439760</span>
                </div>
              </div>
            </div>

            <div className="relative slide-up stagger-2">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-sage-200 via-warmth-200 to-earth-200 flex items-center justify-center">
                  <svg className="w-64 h-64 text-sage-600/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sage-600 rounded-3xl opacity-20 blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-earth-600 rounded-3xl opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-earth-900">About Us</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-sage-600 to-earth-600 mx-auto rounded-full"></div>
            
            <p className="text-lg text-earth-700 leading-relaxed">
              DMCT Hospital & Old Age Home, located in <strong>Kalyan East</strong>, is a trusted elder care center dedicated to serving the needy, sick, and abandoned elderly for more than <strong>15 years</strong>.
            </p>
            
            <p className="text-lg text-earth-700 leading-relaxed">
              Here, senior citizens receive love, respect, medical attention, and a safe environment at an affordable cost.
            </p>
            
            <div className="bg-gradient-to-br from-warmth-50 to-sage-50 p-8 rounded-2xl shadow-sm">
              <p className="text-lg text-earth-800 leading-relaxed">
                The institution is founded by <strong className="text-sage-700">Dr. Ravindra Jadhav</strong>, a socially committed doctor inspired by the ideals of humanity and social service. He has devoted his life to the service of the elderly and the underprivileged.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 gradient-warmth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16 slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-earth-900">Our Key Services</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-sage-600 to-earth-600 mx-auto rounded-full"></div>
            <p className="text-lg text-earth-600 max-w-2xl mx-auto">
              Comprehensive care designed to ensure dignity, comfort, and well-being for every resident
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg card-hover slide-up stagger-${index + 1}`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-sage-100 to-earth-100 rounded-2xl flex items-center justify-center text-sage-700 mb-6">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold text-earth-900 mb-4">{service.title}</h3>
                
                <ul className="space-y-3">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start space-x-3 text-earth-700">
                      <svg className="w-5 h-5 text-sage-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigateTo('services')}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-sage-600 to-earth-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              View All Services
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12 slide-up">
              <h2 className="text-3xl sm:text-4xl font-bold text-earth-900">Our Mission</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-sage-600 to-earth-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ),
                  text: 'To provide a dignified life to needy and abandoned elderly people'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  ),
                  text: 'To offer loving care in a safe environment'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  text: 'To build a society based on humanity, compassion, and service'
                }
              ].map((mission, index) => (
                <div key={index} className={`text-center space-y-4 slide-up stagger-${index + 1}`}>
                  <div className="w-16 h-16 bg-gradient-to-br from-sage-100 to-earth-100 rounded-2xl flex items-center justify-center text-sage-700 mx-auto">
                    {mission.icon}
                  </div>
                  <p className="text-earth-700 leading-relaxed">{mission.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-gradient-to-br from-sage-700 to-earth-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8 slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold">Support Our Cause</h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Your small contribution can provide food, medicine, and shelter to a helpless elderly person.
            </p>
            <p className="text-lg text-white/80">
              Contact us to donate and support our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="tel:7977211807"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-sage-700 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Contact to Donate
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16 slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-earth-900">Contact Us</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-sage-600 to-earth-600 mx-auto rounded-full"></div>
            <p className="text-lg text-earth-600">Please call before visiting</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-6 slide-up">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-sage-100 to-earth-100 rounded-xl flex items-center justify-center text-sage-700 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-earth-900 mb-2">Address</h3>
                  <p className="text-earth-700 leading-relaxed">
                    New Rachna Park Shopping Centre<br />
                    Near Saint Mary's School<br />
                    Chakki Naka, Kalyan East<br />
                    District Thane, Maharashtra – 421306, India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-sage-100 to-earth-100 rounded-xl flex items-center justify-center text-sage-700 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-earth-900 mb-2">Phone</h3>
                  <div className="space-y-1">
                    <a href="tel:7977211807" className="block text-sage-700 hover:text-sage-800 font-medium">
                      7977211807
                    </a>
                    <a href="tel:7400439760" className="block text-sage-700 hover:text-sage-800 font-medium">
                      7400439760
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-warmth-50 to-sage-50 rounded-2xl p-8 shadow-lg slide-up stagger-2">
              <h3 className="text-xl font-bold text-earth-900 mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <p className="text-earth-700">
                  For inquiries about admissions, donations, or volunteering opportunities, please contact us.
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:7977211807"
                    className="flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-sage-600 to-earth-600 text-white rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call 7977211807
                  </a>
                  <a
                    href="tel:7400439760"
                    className="flex items-center justify-center w-full px-6 py-3 bg-white text-sage-700 rounded-xl font-medium border-2 border-sage-200 hover:border-sage-300 hover:shadow-md transition-all"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call 7400439760
                  </a>
                </div>
              </div>
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

export default HomePage;
