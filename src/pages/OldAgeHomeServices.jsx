import { useEffect } from 'react';
import Img1 from '../images/img1.jpg';
import Img2 from '../images/img2.jpg';
import Img7 from '../images/img7.jpg';
import Img13 from '../images/img13.jpg'
import Img4 from '../images/img4.jpg';
import Img3 from '../images/img3.jpg';
import Img16 from '../images/img16.jpg';

const OldAgeHomeServices = () => {
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
      label: "Residential Care",
      title: "Care for the Needy & Lonely Elderly",
      content: [
        "Full-time shelter and care for senior citizens who have no family support",
        "Safe, clean, and homely living environment at affordable or no cost",
        "24-hour trained caregivers ensuring constant supervision",
        "Emotional and social support to combat loneliness and isolation",
        "Nutritious meals, laundry, and all daily living needs provided"
      ],
      img: Img1
    },
    {
      label: "Street Rescue",
      title: "Care for Abandoned Elderly Found on Road",
      content: [
        "Immediate shelter and medical attention for elderly found abandoned",
        "Rescue coordination with local police and social workers",
        "Emergency first aid, clothing, food, and hygiene support on arrival",
        "Humane, dignified intake — no documentation or referral required",
        "Long-term stay arranged based on health condition and family status"
      ],
      img: Img2
    },
    {
      label: "Emergency Helpline",
      title: "Ambulance & Emergency Helpline",
      content: [
        "24-hour emergency helpline for elderly in distress",
        "Ambulance assistance coordinated on urgent calls",
        "Quick response for residents and community members in need",
        "Call us immediately — we are always available"
      ],
      img: Img16,
      isHelpline: true,
      numbers: ["7977 211 807", "7400 439 760"]
    },
    {
      label: "Primary Healthcare",
      title: "Free Clinic at the Old Age Home",
      content: [
        "On-site OPD clinic run by Dr. Ravindra Jadhav",
        "Regular health check-ups, blood pressure and sugar monitoring",
        "Free medicines and basic medical care for all residents",
        "Referral to hospitals when specialised treatment is required",
        "Preventive care and seasonal health monitoring included"
      ],
      img: Img7
    },
    {
      label: "Special Care",
      title: "Support for Mentally Challenged & Critically Ill",
      content: [
        "Dedicated care for elderly with mental health conditions",
        "Support for bedridden, paralysed, and critically ill seniors",
        "Trained staff experienced in handling special needs with patience",
        "Psychiatric counselling support and emotional well-being activities",
        "Coordination with specialist doctors when advanced care is needed"
      ],
      img: Img13
    },
    {
      label: "Family Tracing",
      title: "Finding Relatives of Abandoned Residents",
      content: [
        "Active effort to trace and contact family members of abandoned seniors",
        "Coordination with police, NGOs, and community networks to locate relatives",
        "Safe return home arranged once family is found and verified",
        "Legal and social support provided throughout the reunification process",
        "Residents remain in our care until a safe arrangement is confirmed"
      ],
      img: Img4
    },
    {
      label: "Final Rites",
      title: "Last Rites for the Unclaimed Deceased",
      content: [
        "If a resident passes away with no family to claim them, we act with full responsibility",
        "Police are informed immediately as per legal procedure",
        "Final rites performed with dignity and respect according to the individual's faith",
        "No person in our care departs without a proper farewell",
        "A final act of compassion — because every life deserves a respectful end"
      ],
      img: Img3
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-medical-white page-fade-in font-body">

      {/* Header */}
      <section className="bg-hospital-navy text-white hero-padding">
        <div className="max-w-7xl mx-auto px-6 lg:px-24">
          <div className="max-w-3xl reveal-on-scroll">
            <span className="clinical-label !text-surgical-blue block mb-4">Old Age Home Services</span>
            <h1 className="text-white mb-8 leading-tight">A Home for Those Who Need One Most</h1>
            <p className="text-xl text-white/70 font-light leading-relaxed">
              From welcoming the lonely elderly to caring for those found abandoned on the road —
              DMCT Old Age Home ensures that no senior citizen is left without shelter, care, or dignity.
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
                  <div>
                    <span className="clinical-label block mb-3">{category.label}</span>
                    <h3 className="text-2xl md:text-3xl text-hospital-navy">{category.title}</h3>
                  </div>

                  <ul className="space-y-4">
                    {category.content.map((item, i) => (
                      <li key={i} className="flex items-start text-surgical-charcoal/70">
                        <span className="w-2 h-2 bg-surgical-blue mt-2 mr-4 flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {category.isHelpline && (
                    <div className="pt-2 space-y-2">
                      {category.numbers.map((num, i) => (
                        <a
                          key={i}
                          href={`tel:${num.replace(/\s/g, '')}`}
                          className="flex items-center gap-3 text-surgical-blue hover:text-hospital-navy transition-colors group"
                        >
                          <div className="w-8 h-8 bg-medical-white border border-surgical-blue/20 flex items-center justify-center flex-shrink-0 group-hover:bg-surgical-blue group-hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <span className="text-xl font-header">{num}</span>
                        </a>
                      ))}
                    </div>
                  )}
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
          <h2 className="font-header italic text-hospital-navy mb-12">Our Promise to Every Resident</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { label: 'Promise I', title: 'No one is turned away' },
              { label: 'Promise II', title: 'Every life is valued' },
              { label: 'Promise III', title: 'Dignity until the very end' }
            ].map((p, i) => (
              <div key={i} className="p-8 border border-medical-white bg-medical-white/30">
                <p className="clinical-label mb-4">{p.label}</p>
                <p className="text-lg font-header">{p.title}</p>
              </div>
            ))}
          </div>
          <p className="text-surgical-charcoal/60 max-w-2xl mx-auto font-body leading-relaxed">
            For over 15 years, DMCT Old Age Home has stood as a refuge for the elderly who have nowhere else to go. 
            We serve not out of obligation, but out of love.
          </p>
        </div>
      </section>

    </div>
  );
};

export default OldAgeHomeServices;
