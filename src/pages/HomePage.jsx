import { useEffect, useRef, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const HomePage = () => {
  const observerRef = useRef(null);
  const { navigateTo } = useContext(AppContext);

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
    }
  ];

  return (
    <div className="overflow-x-hidden pt-32 sm:pt-40 animate-page-fade">
      {/* Hero Section - Institutional Warmth */}
      <section className="relative min-h-[90vh] flex items-center bg-parchment section-padding overflow-hidden">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-12 slide-up">
              <div className="space-y-6">
                <h1 className="text-6xl sm:text-7xl lg:text-9xl leading-[1.05] text-forest font-display font-medium">
                  A Place Where the Elderly <br />
                  <span className="italic font-normal text-medical-teal">Receive True Care</span>
                </h1>
                <p className="text-xl sm:text-2xl text-main font-body font-light max-w-2xl leading-relaxed">
                  A trusted medical sanctuary in Kalyan where clinical excellence meets compassionate connection. Providing dignity and specialized care for over <strong className="font-bold text-medical-teal underline decoration-gold/30">15 years</strong>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <a href="tel:7977211807" className="btn-primary shadow-lg">
                  Patient Admissions
                </a>
                <button
                  onClick={() => navigateTo('services')}
                  className="btn-secondary"
                >
                  Clinical Department
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative reveal stagger-2">
              <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[4px] overflow-hidden shadow-2xl border-8 border-white image-warm-overlay">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=1200"
                  alt="Compassionate Connection - Doctor and Elderly Resident"
                  className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-1000"
                  loading="lazy"
                />
                {/* Trust Badge Seal - Glassmorphic Polish */}
                <div className="absolute top-6 right-6 w-24 h-24 bg-white/10 backdrop-blur-[10px] rounded-full border border-white/20 flex items-center justify-center text-center p-2 shadow-xl animate-pulse">
                  <p className="micro-label text-forest font-bold leading-tight tracking-tighter">
                    Serving for <br /> <span className="text-2xl">15+</span> <br /> years
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Strip - Glassmorphic Trust Bar */}
      <section className="bg-forest py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-24 relative z-10">
          <div className="glass-trust-bar rounded-[4px] p-12 md:p-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left transition-all duration-700 hover:bg-white/15">
            <div className="space-y-4 border-r border-white/10 last:border-0 pr-8">
              <div className="impact-number text-gold">15+</div>
              <p className="micro-label text-white/60">Years of Clinical Care</p>
            </div>
            <div className="space-y-4 border-r border-white/10 last:border-0 px-8">
              <div className="impact-number text-gold">24/7</div>
              <p className="micro-label text-white/60">On-site Medical Oversight</p>
            </div>
            <div className="space-y-4 pl-8 last:border-0 border-r-0">
              <div className="impact-number text-gold">100%</div>
              <p className="micro-label text-white/60">Nutritious Meal Planning</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars of Service - Refined Bento Grid */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-24 text-center mb-24 slide-up">
          <h2 className="text-5xl sm:text-6xl font-medium text-forest mb-6 font-prestige">Our Pillars of Service</h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-8"></div>
          <p className="text-xl text-main/60 font-display max-w-3xl mx-auto italic">Transparent, doctor-led geriatric care delivered with precision and empathy.</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-24 grid md:grid-cols-12 gap-8 items-stretch">
          {/* Bento Card 1 - High Priority Clinical Care (Asymmetric Focus) */}
          <div className="md:col-span-8 card-premium bg-parchment hover-bento group relative overflow-hidden">
            <div className="max-w-xl space-y-10 relative z-10">
              <span className="micro-label text-gold">Clinical Priority</span>
              <h3 className="text-4xl sm:text-5xl font-bold text-forest leading-tight font-display">24-Hour Clinical Vigilance & Medical Excellence</h3>
              <p className="text-xl text-main font-body leading-relaxed font-light">Under the expert guidance of Dr. Ravindra Jadhav, we offer constant clinical supervision, medication management, and swift medical referrals.</p>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-6 clinical-list">
                {['Skilled Nursing', 'Medication Management', 'Restorative Care', 'Doctor Visits'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-[18px] font-medium text-main">
                    <span className="w-2.5 h-2.5 bg-gold rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:opacity-[0.07] transition-opacity">
              <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
              </svg>
            </div>
          </div>

          {/* Bento Card 2 - Expert Oversight (Medical Blue Tint) */}
          <div className="md:col-span-4 card-premium bg-[#F0F7F9] hover-bento group flex flex-col justify-between">
            <div className="space-y-8">
              <span className="micro-label text-medical-teal">Clinical Oversight</span>
              <h3 className="text-3xl font-bold text-forest leading-tight font-display">Expert Vitals Monitoring</h3>
              <ul className="space-y-6 clinical-list">
                <li className="text-main font-body leading-relaxed font-light text-[18px]">BP & Heart Rate Monitoring</li>
                <li className="text-main font-body leading-relaxed font-light text-[18px]">Glucose Tracking</li>
                <li className="text-main font-body leading-relaxed font-light text-[18px]">Specialized Geriatric Oversight</li>
              </ul>
            </div>
            <div className="pt-8 border-t border-medical-teal/10">
              <p className="text-[10px] font-bold text-medical-teal/40 uppercase tracking-widest leading-none">Institutional Protocol</p>
            </div>
          </div>

          {/* Bento Card 3 - Dignified Living (Color Therapy: Earth) */}
          <div className="md:col-span-4 card-premium bg-[#F9F6F1] hover-bento group flex flex-col justify-between">
            <div className="space-y-8">
              <span className="micro-label text-forest/60">Homely Environment</span>
              <h3 className="text-3xl font-bold text-forest leading-tight font-display">Dignified Living Spaces</h3>
              <p className="text-main font-body leading-relaxed font-light text-lg">Spacious, orthopedic beds and hygiene-first environments designed for restorative comfort and safety.</p>
            </div>
            <div className="pt-8 border-t border-forest/5">
              <p className="text-[10px] font-bold text-medical-teal uppercase tracking-widest leading-none">Restorative Design</p>
            </div>
          </div>

          {/* Bento Card 4 - Holistic Wellness (Color Therapy: Sage) */}
          <div className="md:col-span-8 card-premium bg-[#F4F7F1] hover-bento group">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-8">
                <span className="micro-label text-medical-teal/60">Holistic Care</span>
                <h3 className="text-4xl font-bold text-forest leading-tight font-display">Nutritional & Emotional Sanctuary</h3>
                <p className="text-lg text-main font-body font-light leading-relaxed">Doctor-approved personalized diets paired with emotional support systems like yoga, counseling, and reading retreats.</p>
                <button
                  onClick={() => navigateTo('services')}
                  className="text-medical-teal font-bold text-xs uppercase tracking-[0.3em] border-b-2 border-medical-teal/20 pb-2 hover:border-medical-teal transition-all"
                >
                  Explore Wellbeing
                </button>
              </div>
              <div className="w-full md:w-72 h-48 rounded-[4px] overflow-hidden image-warm-overlay shadow-lg">
                <img src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Holistic sanctuary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bedrock Vision Section - High Contrast Bedrock Art Piece */}
      <section className="bg-forest text-white py-40 lg:py-60 overflow-hidden relative">
        {/* Quote Glyph Background Art */}
        <div className="quote-glyph -top-32 -left-32 opacity-[0.02] rotate-12">“</div>
        <div className="quote-glyph -bottom-32 -right-32 opacity-[0.02] -rotate-12">”</div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_rgba(255,255,255,0.05)_0%,_transparent_50%)]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10 space-y-24 text-center slide-up">
          <div className="space-y-12">
            <div className="w-20 h-1 bg-gold mx-auto" />

            <div className="relative inline-block">
              {/* Elegant Quotation Mark - Faded Art Piece Treatment */}
              <span className="absolute -top-24 -left-28 text-white/10 text-[12rem] font-display select-none italic">“</span>
              <h2 className="text-5xl sm:text-6xl lg:text-[80px] leading-[1.2] font-display italic text-white max-w-4xl mx-auto relative z-10 px-6 tracking-tight">
                To serve with selfless love is the highest medical practice.
              </h2>
              <span className="absolute -bottom-24 -right-28 text-white/10 text-[12rem] font-display select-none italic">”</span>
            </div>

            <div className="flex items-center justify-center space-x-6 text-gold pt-12">
              <div className="w-12 h-px bg-gold/30"></div>
              <span className="micro-label !text-gold">Proprietary Clinical Philosophy</span>
              <div className="w-12 h-px bg-gold/30"></div>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-5xl font-display text-white italic tracking-wide">Dr. Ravindra Jadhav</p>
            <p className="micro-label !text-gold/60 tracking-[0.6em]">Founder & Medical Director</p>
          </div>
        </div>
      </section>

      {/* Rebranded About Section - Focus on Professionalism */}
      <section className="section-padding bg-parchment">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12 slide-up">
              <div className="space-y-6">
                <h2 className="text-5xl sm:text-6xl font-medium leading-tight text-forest font-prestige">Aging Patiently <br /><span className="italic font-normal text-medical-teal">& Professionally</span></h2>
                <div className="w-20 h-1 bg-gold"></div>
              </div>
              <div className="space-y-8 text-main/80 text-xl leading-relaxed">
                <p>
                  Founded by the <strong className="text-forest">Dr. Mitra Charitable Trust</strong>, DMCT Hospital is Kalyan's premier destination for geriatric care. We believe that aging should be a journey of dignity, not dependency.
                </p>
                <p>
                  Under the clinical guidance of Dr. Ravindra Jadhav, we offer a unique blend of 24/7 medical supervision and soul-nurturing emotional support in a homelike environment.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 reveal">
              <div className="relative rounded-[4px] overflow-hidden shadow-2xl image-warm-overlay border border-sage/10">
                <img
                  src="https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&q=80&w=1200"
                  alt="Compassionate institutional support"
                  className="w-full grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                  loading="lazy"
                />
              </div>
              <div className="p-12 bg-forest text-white rounded-[4px] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <h4 className="text-3xl font-prestige italic mb-6 text-gold">24-Hour Clinical Vigilance</h4>
                <p className="text-xl text-white/70 leading-relaxed font-light">Expert medical staff on-duty every second of the day, ensuring the safety and medical integrity for every resident.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Senior-First UX Footer Section - Redefined CTA Hub */}
      <section className="bg-medical-teal text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left slide-up">
          <div className="space-y-6">
            <h2 className="text-5xl font-prestige text-white italic">Admission Enquiries Open 24/7</h2>
            <p className="text-xl text-white/60 font-light font-display">Secure a Safe Sanctuary for Your Loved Ones with our clinical staff.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 items-center">
            <a href="tel:7977211807" className="btn-primary bg-forest hover:bg-forest/90 px-12 py-5 shadow-2xl text-lg font-bold">Patient Admissions</a>
            <div className="px-10 py-5 bg-forest/40 backdrop-blur-sm rounded-[4px] border border-white/10 group hover:bg-forest/60 transition-all">
              <p className="micro-label text-gold mb-2">Emergency Hub</p>
              <a href="tel:7400439760" className="text-4xl font-bold tracking-tight text-white">7400 439 760</a>
            </div>
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
              <p className="text-xl text-main/50 max-w-sm font-prestige italic leading-relaxed">A premier clinical destination for geriatric care, providing medical excellence and family connection since 2010.</p>
            </div>
            <div className="space-y-8">
              <h4 className="micro-label text-medical-teal">Clinical Location</h4>
              <p className="text-main/60 leading-relaxed font-light text-lg">
                New Rachna Park, Chakki Naka,<br />
                Kalyan East, Maharashtra 421306
              </p>
            </div>
            <div className="space-y-8">
              <h4 className="micro-label text-medical-teal">Institutional Hub</h4>
              <p className="text-main/60 leading-relaxed font-light text-lg">
                Operated by Dr. Mitra<br />
                Charitable Trust
              </p>
            </div>
          </div>
          <div className="pt-12 border-t border-sage/10 flex flex-col md:flex-row justify-between items-center gap-8 text-main/30 micro-label">
            <p>© {new Date().getFullYear()} DMCT Kalyan. All Rights Reserved.</p>
            <div className="flex space-x-12">
              <span className="cursor-pointer hover:text-forest transition-colors">Documentation</span>
              <span className="cursor-pointer hover:text-forest transition-colors">Transparency Policy</span>
              <span className="cursor-pointer hover:text-forest transition-colors">Medical Protocols</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
