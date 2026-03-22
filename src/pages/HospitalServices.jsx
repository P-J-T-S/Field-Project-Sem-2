import { useEffect } from 'react';
import Img8 from '../images/img8.jpg';
import Img14 from "../images/img14.jpg";
import Img6 from '../images/img6.jpg';
import Img10 from '../images/img10.jpg';

const Hospital_Services = () => {
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

  const hospitalServices = [
    {
      title: "Free Clinic for the Poor",
      content: [
        "Walk-in OPD clinic open to all BPL patients",
        "Consultations by Dr. Ravindra Jadhav at no charge",
        "Diagnostic guidance and health assessments",
        "Priority attention for elderly and critically ill patients",
        "No documentation barrier — everyone is welcome"
      ],
      img: Img8,
      label: "Community Health"
    },
    {
      title: "Concession for the Needy",
      content: [
        "Subsidised treatment for low-income families",
        "Flexible fee structure based on financial need",
        "Support for patients referred by NGOs and social workers",
        "Reduced charges for long-term care and hospitalisation",
        "Assessment-based concession — no complicated paperwork"
      ],
      img: Img14,
      label: "Subsidised Care"
    },
    {
      title: "Care for Abandoned People",
      content: [
        "Immediate shelter and medical attention for abandoned individuals",
        "Coordination with local authorities and social services",
        "Full nursing care and daily support",
        "Safe, dignified environment until long-term arrangements are made",
        "Compassionate intake — no referral required"
      ],
      img: Img6,
      label: "Humanitarian Aid"
    },
    {
      title: "Free Medicines & Medical Care",
      content: [
        "Essential medicines provided free of cost to qualifying patients",
        "Ongoing prescription support for chronic conditions",
        "Wound care, dressings, and basic procedures at no charge",
        "Blood pressure, sugar, and vitals monitoring included",
        "Donations from well-wishers help sustain this programme"
      ],
      img: Img10,
      label: "Pharmaceutical Aid"
    }
  ];

  const stats = [
    { value: '2,000+', label: 'Free consultations annually' },
    { value: '₹0', label: 'Cost for qualifying patients' },
    { value: '15+', label: 'Years of community service' },
  ];

  return (
    <div className="pt-24 min-h-screen bg-medical-white page-fade-in font-body">

      {/* Header Section */}
      <section className="bg-hospital-navy text-white hero-padding">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="max-w-3xl reveal-on-scroll">
            <span className="clinical-label !text-surgical-blue block mb-4">Hospital Services</span>
            <h1 className="text-white mb-8 leading-tight">Care Without Condition</h1>
            <p className="text-xl text-white/70 font-light leading-relaxed">
              At DMCT Hospital, we believe healthcare is a right — not a privilege. Our community-facing programmes
              ensure that poverty, abandonment, or inability to pay never stands between a person and the care they need.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/10 reveal-on-scroll">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-header text-surgical-blue mb-2">{stat.value}</p>
                <p className="text-xs uppercase tracking-widest text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-24">
            {hospitalServices.map((service, index) => (
              <div key={index} className="flex flex-col md:flex-row items-start gap-10 reveal-on-scroll">
                <div className="flex-1 space-y-8">
                  <div>
                    <span className="clinical-label block mb-3">{service.label}</span>
                    <h3 className="text-2xl md:text-3xl text-hospital-navy">{service.title}</h3>
                  </div>
                  <ul className="space-y-4">
                    {service.content.map((item, i) => (
                      <li key={i} className="flex items-start text-surgical-charcoal/70">
                        <span className="w-2 h-2 bg-surgical-blue mt-2 mr-4 flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full md:w-48 lg:w-40 aspect-square relative rounded-[2px] overflow-hidden shadow-lift border border-silver/30 flex-shrink-0">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-surgical-blue/5 mix-blend-multiply" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Sectors Notice */}
      <section className="py-16 bg-white border-y border-silver/30">
        <div className="max-w-4xl mx-auto px-6 reveal-on-scroll">
          <div className="flex flex-col md:flex-row items-center gap-8 p-10 border border-dashed border-surgical-blue/30 bg-medical-white/50">
            <div className="w-14 h-14 bg-medical-white text-surgical-blue flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <p className="clinical-label mb-2">More Services Coming</p>
              <p className="text-xl font-header text-hospital-navy mb-3">Additional Service Sectors</p>
              <p className="text-surgical-charcoal/60 font-body leading-relaxed text-sm">
                We are continuously expanding our community programmes. Additional service sectors —
                including physiotherapy, palliative care, and outreach — will be listed here as they are established.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Callout */}
      <section className="py-24 bg-medical-white">
        <div className="max-w-4xl mx-auto px-6 text-center reveal-on-scroll">
          <h2 className="font-header italic text-hospital-navy mb-12">Our Commitment to Society</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { label: 'Principle I', title: 'Healthcare for all' },
              { label: 'Principle II', title: 'No patient turned away' },
              { label: 'Principle III', title: 'Dignity in every act of care' }
            ].map((p, i) => (
              <div key={i} className="p-8 border border-silver/40 bg-white">
                <p className="clinical-label mb-4">{p.label}</p>
                <p className="text-lg font-header">{p.title}</p>
              </div>
            ))}
          </div>
          <p className="text-surgical-charcoal/60 max-w-2xl mx-auto font-body leading-relaxed">
            Funded in part through generous donations from the community. If you wish to support our free care
            programmes, every contribution directly reaches those in need.
          </p>
        </div>
      </section>

    </div>
  );
};

export default Hospital_Services;