import { useEffect } from 'react';
import Img9 from '../images/img9.png';
import Img12 from '../images/img12.jpg';
import Img11 from '../images/img11.jpg';
import Img15 from '../images/img15.jpg';

const FreeClinic = () => {
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

  const clinicServices = [
    {
      label: "Free Treatment",
      title: "Free Medical Treatment for the Poor",
      content: [
        "Full OPD consultation at zero cost for BPL and underprivileged patients",
        "Diagnosis, treatment plan, and follow-up — all provided free of charge",
        "No proof of income or documentation required to avail free care",
        "Operated by Dr. Ravindra Jadhav with a commitment to serve all",
        "Available to walk-in patients from the community — no prior appointment needed"
      ],
      img: Img9
    },
    {
      label: "Pharmaceutical Aid",
      title: "Free Medicines",
      content: [
        "Essential medicines distributed free of cost to qualifying patients",
        "Medicines sourced through donations from generous individuals and organisations",
        "Ongoing prescription support for chronic conditions like diabetes and hypertension",
        "Only non-expired, sealed, and safe medicines are distributed",
        "Stock permitting — patients are served on a first-come, first-served basis"
      ],
      img: Img12
    },
    {
      label: "Subsidised Care",
      title: "Concession-Based Treatment for the Needy",
      content: [
        "Patients who do not qualify for fully free care receive treatment at subsidised rates",
        "Concession assessed compassionately based on visible financial need",
        "Flexible payment options discussed directly with the patient or family",
        "No patient is denied care due to inability to pay — we always find a way",
        "NGO and social worker referrals are given additional consideration"
      ],
      img: Img11
    },
    {
      label: "Preventive Health",
      title: "Free Health Check-Ups",
      content: [
        "Routine check-ups open to all — poor, needy, and concession patients alike",
        "Blood pressure measurement, blood sugar testing, and general vitals",
        "Weight, BMI, and basic screening for common ailments",
        "Early detection support to prevent worsening of treatable conditions",
        "Periodic health camps organised for the surrounding community"
      ],
      img: Img15
    }
  ];

  const stats = [
    { value: 'Free', label: 'OPD consultations for the poor' },
    { value: 'Free', label: 'Medicines for qualifying patients' },
    { value: 'Open', label: 'To all — no paperwork required' },
  ];

  return (
    <div className="pt-24 min-h-screen bg-medical-white page-fade-in font-body">

      {/* Header */}
      <section className="bg-hospital-navy text-white hero-padding">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="max-w-3xl reveal-on-scroll">
            <span className="clinical-label !text-surgical-blue block mb-4">Free Clinic</span>
            <h1 className="text-white mb-8 leading-tight">Healthcare That Reaches Everyone</h1>
            <p className="text-xl text-white/70 font-light leading-relaxed">
              Our free clinic exists for one reason — so that poverty is never a reason to go without medical care.
              Free treatment, free medicines, and free check-ups for those who need it most.
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
            {clinicServices.map((service, index) => (
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

      {/* Eligibility Callout */}
      <section className="py-24 bg-white border-y border-silver/30">
        <div className="max-w-4xl mx-auto px-6 text-center reveal-on-scroll">
          <h2 className="font-header italic text-hospital-navy mb-12">Who Can Visit the Free Clinic?</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { label: 'Category I', title: 'Below Poverty Line patients' },
              { label: 'Category II', title: 'Abandoned & homeless individuals' },
              { label: 'Category III', title: 'Anyone in need of care' }
            ].map((p, i) => (
              <div key={i} className="p-8 border border-medical-white bg-medical-white/30">
                <p className="clinical-label mb-4">{p.label}</p>
                <p className="text-lg font-header">{p.title}</p>
              </div>
            ))}
          </div>

          {/* Helpline */}
          <div className="inline-block p-8 bg-hospital-navy text-white text-left mt-4">
            <p className="clinical-label !text-surgical-blue mb-4">Clinic Helpline</p>
            <div className="space-y-2">
              {["7977 211 807", "7400 439 760"].map((num, i) => (
                <a
                  key={i}
                  href={`tel:${num.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-white hover:text-surgical-blue transition-colors group"
                >
                  <svg className="w-4 h-4 text-surgical-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-2xl font-header">{num}</span>
                </a>
              ))}
            </div>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mt-4">⚠️ Please call before visiting</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FreeClinic;
