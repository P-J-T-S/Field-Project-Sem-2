import { useEffect } from 'react';

const ServicesPage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
    window.scrollTo(0, 0);

    return () => observer.disconnect();
  }, []);

  const serviceCategories = [
    {
      title: "24-Hour Care Services",
      content: [
        "24-hour trained caregivers",
        "Regular doctor visits and monitoring",
        "Medication administration",
        "Continuous supervision and safety"
      ],
      img: "https://images.unsplash.com/photo-1586773860418-d3b97898c75c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Medical Facilities",
      content: [
        "Regular check-ups by General Physician (Dr. Ravindra Jadhav)",
        "Primary medical treatment",
        "Blood pressure and sugar monitoring",
        "Hospital referral when required"
      ],
      img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Accommodation Facilities",
      content: [
        "Clean and safe living environment",
        "Hall-type shared rooms",
        "Comfortable beds and bedding",
        "Regular cleaning and hygiene maintenance"
      ],
      img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Food & Daily Living Support",
      content: [
        "Nutritious meals served daily",
        "Feeding assistance for dependent residents",
        "Laundry services",
        "Diapers and essential care materials"
      ],
      img: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Mental & Social Well-Being",
      content: [
        "Light exercise and yoga sessions",
        "Counseling support",
        "Laughter club activities",
        "Television and newspapers",
        "Friendly, family-like environment"
      ],
      img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Special Care Support",
      content: [
        "Care for semi-dependent elderly",
        "Support for sick and lonely seniors",
        "Shelter for abandoned and homeless elderly"
      ],
      img: "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-medical-white page-fade-in font-body">
      {/* Header Section */}
      <section className="bg-hospital-navy text-white hero-padding">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="max-w-3xl reveal-on-scroll">
            <span className="clinical-label !text-surgical-blue block mb-4">Institutional Standards</span>
            <h1 className="text-white mb-8 leading-tight">Our Services & Facilities</h1>
            <p className="text-xl text-white/70 font-light leading-relaxed">
              At DMCT Hospital & Old Age Home, we provide comprehensive care to ensure that every elderly resident lives with dignity, safety, and emotional comfort.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-24">
            {serviceCategories.map((category, index) => (
              <div key={index} className="flex flex-col md:flex-row items-start gap-10 reveal-on-scroll">
                <div className="flex-1 space-y-8">
                  <h3 className="text-2xl md:text-3xl text-hospital-navy">{category.title}</h3>
                  <ul className="space-y-4">
                    {category.content.map((item, i) => (
                      <li key={i} className="flex items-start text-surgical-charcoal/70">
                        <span className="w-2 h-2 bg-surgical-blue mt-2 mr-4 flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full md:w-48 lg:w-40 aspect-square relative rounded-[2px] overflow-hidden shadow-lift border border-silver/30 flex-shrink-0">
                  <img src={category.img} alt={category.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-surgical-blue/5 mix-blend-multiply" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Callout */}
      <section className="py-24 bg-white border-y border-silver/30">
        <div className="max-w-4xl mx-auto px-6 text-center reveal-on-scroll">
          <h2 className="font-header italic text-hospital-navy mb-12">A Safe, Homely Environment</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { label: 'Principle I', title: 'Love and compassion' },
              { label: 'Principle II', title: 'Respect and dignity' },
              { label: 'Principle III', title: 'Family-like care' }
            ].map((p, i) => (
              <div key={i} className="p-8 border border-medical-white bg-medical-white/30">
                <p className="clinical-label mb-4">{p.label}</p>
                <p className="text-lg font-header">{p.title}</p>
              </div>
            ))}
          </div>
          <p className="text-surgical-charcoal/60 max-w-2xl mx-auto font-body leading-relaxed">
            Our staff is committed to ensuring comfort, safety, and emotional well-being for every elderly person staying with us.
          </p>
        </div>
      </section>

    </div>
  );
};

export default ServicesPage;
