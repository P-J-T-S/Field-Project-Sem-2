import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const DonationPage = () => {
    const { navigateTo } = useContext(AppContext);
    const [formData, setFormData] = useState({ name: '', number: '', email: '', amount: '' });
    const [donationStep, setDonationStep] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleDonateSubmit = (e) => {
        e.preventDefault();
        if (donationStep === 1) {
            setDonationStep(2);
        } else {
            // Mock payment redirection
            alert(`Redirecting to payment gateway for amount: ₹${formData.amount}`);
            navigateTo('home');
            setDonationStep(1);
        }
    };

    return (
        <div className="pt-24 min-h-screen bg-medical-white font-body page-fade-in">
            {/* Header Section */}
            <section className="bg-hospital-navy text-white hero-padding text-center">
                <div className="max-w-7xl mx-auto px-6 lg:px-24">
                    <div className="max-w-3xl mx-auto reveal-on-scroll">
                        <span className="clinical-label !text-surgical-blue block mb-4">Philanthropic Mission</span>
                        <h1 className="text-white mb-8 leading-tight">Support Our Service</h1>
                        <p className="text-xl text-white/70 font-light leading-relaxed">
                            Your contribution directly supports the medical care, nutritious food, and safe shelter for needy and abandoned senior citizens.
                        </p>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="section-padding">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white p-10 md:p-16 border border-silver/30 shadow-premium relative reveal-on-scroll">
                        <div className="mb-12 text-center">
                            <div className="w-16 h-16 bg-medical-white text-surgical-blue flex items-center justify-center mx-auto mb-6 rounded-full border border-silver/20 shadow-sm">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354l1.107 3.122h3.307l-2.675 1.93 1.022 3.122L12 10.697l-2.76 1.931 1.022-3.122-2.675-1.93h3.307L12 4.354z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl mb-4 text-hospital-navy italic font-header">Make a Donation</h2>
                            <div className="flex items-center justify-center space-x-4">
                                <div className={`h-1 w-12 rounded-full transition-all duration-500 ${donationStep === 1 ? 'bg-surgical-blue' : 'bg-silver'}`} />
                                <p className="text-[10px] uppercase font-bold tracking-widest text-surgical-charcoal/40">Step {donationStep} of 2</p>
                                <div className={`h-1 w-12 rounded-full transition-all duration-500 ${donationStep === 2 ? 'bg-surgical-blue' : 'bg-silver'}`} />
                            </div>
                        </div>

                        <form onSubmit={handleDonateSubmit} className="space-y-8">
                            {donationStep === 1 ? (
                                <div className="space-y-6 animate-fadeIn">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="clinical-label mb-3 block">Full Name</label>
                                            <input
                                                type="text" required
                                                placeholder="John Doe"
                                                className="w-full bg-medical-white border border-silver/50 p-5 font-body text-sm outline-none focus:border-surgical-blue focus:bg-white transition-all shadow-input"
                                                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="clinical-label mb-3 block">Contact Number</label>
                                            <input
                                                type="tel" required
                                                placeholder="+91 00000 00000"
                                                className="w-full bg-medical-white border border-silver/50 p-5 font-body text-sm outline-none focus:border-surgical-blue focus:bg-white transition-all shadow-input"
                                                value={formData.number} onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="clinical-label mb-3 block">Email Address</label>
                                        <input
                                            type="email" required
                                            placeholder="john@example.com"
                                            className="w-full bg-medical-white border border-silver/50 p-5 font-body text-sm outline-none focus:border-surgical-blue focus:bg-white transition-all shadow-input"
                                            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-8 animate-fadeIn">
                                    <div>
                                        <label className="clinical-label mb-6 block">Select Contribution Amount (₹)</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                                            {['500', '1000', '2000', '5000'].map(amt => (
                                                <button
                                                    type="button" key={amt}
                                                    onClick={() => setFormData({ ...formData, amount: amt })}
                                                    className={`py-5 border-2 text-sm font-bold tracking-widest transition-all rounded-[2px] ${formData.amount === amt ? 'bg-surgical-blue border-surgical-blue text-white shadow-lift' : 'bg-medical-white border-medical-white text-hospital-navy hover:border-silver'}`}
                                                >
                                                    ₹{amt}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="relative">
                                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-surgical-charcoal/40 font-bold">₹</span>
                                            <input
                                                type="number" placeholder="Enter Custom Amount"
                                                className="w-full bg-medical-white border border-silver/50 p-5 pl-10 font-body text-sm outline-none focus:border-surgical-blue focus:bg-white transition-all shadow-input"
                                                value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="pt-6 flex flex-col md:flex-row gap-4">
                                {donationStep === 2 && (
                                    <button
                                        type="button"
                                        onClick={() => setDonationStep(1)}
                                        className="flex-1 btn-secondary"
                                    >
                                        Go Back
                                    </button>
                                )}
                                <button type="submit" className="flex-[2] btn-primary py-5 text-base shadow-xl group">
                                    <span className="flex items-center justify-center space-x-3">
                                        <span>{donationStep === 1 ? 'Proceed to Amount' : 'Proceed to Payment'}</span>
                                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </form>

                        <div className="mt-12 pt-8 border-t border-silver/20 text-center">
                            <button
                                onClick={() => navigateTo('home')}
                                className="text-xs uppercase tracking-widest font-bold text-surgical-charcoal/40 hover:text-surgical-blue transition-colors"
                            >
                                ← Return to Home Page
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="section-padding bg-white overflow-hidden relative">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="reveal-on-scroll">
                        <h2 className="mb-12 italic">Your Impact</h2>
                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="space-y-4 p-8 bg-medical-white rounded-[2px]">
                                <h4 className="text-4xl text-surgical-blue">1 meal</h4>
                                <p className="text-sm text-surgical-charcoal/60 leading-relaxed">Full day of nutritious food for one resident</p>
                            </div>
                            <div className="space-y-4 p-8 bg-medical-white rounded-[2px]">
                                <h4 className="text-4xl text-surgical-blue">Medical</h4>
                                <p className="text-sm text-surgical-charcoal/60 leading-relaxed">Regular checkups and daily medication</p>
                            </div>
                            <div className="space-y-4 p-8 bg-medical-white rounded-[2px]">
                                <h4 className="text-4xl text-surgical-blue">Shelter</h4>
                                <p className="text-sm text-surgical-charcoal/60 leading-relaxed">Safe, clean, and compassionate housing</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* In-Kind Donations Section */}
            <section className="section-padding bg-medical-white border-t border-silver/30">
                <div className="max-w-4xl mx-auto">
                    <div className="reveal-on-scroll text-center mb-16">
                        <span className="clinical-label block mb-4">In-Kind Contributions</span>
                        <h2 className="font-header italic text-hospital-navy mb-6">Donate More Than Money</h2>
                        <p className="text-surgical-charcoal/60 font-body leading-relaxed max-w-2xl mx-auto">
                            We gratefully accept donations of essential goods. Every item you give reaches a resident
                            directly — nothing goes to waste.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        {[
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                ),
                                label: "Food & Nutrition",
                                title: "Grains & Dry Goods",
                                items: ["Rice, wheat, dal, and pulses", "Packaged and sealed food items", "Cooking oil, spices, and staples", "Ready-to-eat nutritious food packs"]
                            },
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                ),
                                label: "Pharmaceutical Aid",
                                title: "Medicines",
                                items: ["Unopened, non-expired medicines only", "Common medications — paracetamol, antacids, vitamins", "Branded or generic — all accepted", "Please check expiry before donating"]
                            },
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                ),
                                label: "Clothing",
                                title: "Clothes & Wearables",
                                items: ["Clean, gently used clothing for seniors", "Warm wear — sweaters, shawls, socks", "Undergarments (new only)", "Comfortable footwear in good condition"]
                            },
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                ),
                                label: "Furnishings",
                                title: "Furniture & Bedding",
                                items: ["Single beds, mattresses, and cots in good condition", "Pillows, blankets, and bed sheets", "Chairs, wheelchairs, and walking aids", "Almirahs, storage units, and side tables"]
                            }
                        ].map((card, i) => (
                            <div key={i} className="bg-white border border-silver/40 p-8 reveal-on-scroll">
                                <div className="flex items-start gap-5 mb-6">
                                    <div className="w-12 h-12 bg-medical-white text-surgical-blue flex items-center justify-center flex-shrink-0">
                                        {card.icon}
                                    </div>
                                    <div>
                                        <p className="clinical-label mb-1">{card.label}</p>
                                        <h3 className="text-xl text-hospital-navy font-header">{card.title}</h3>
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    {card.items.map((item, j) => (
                                        <li key={j} className="flex items-start text-surgical-charcoal/70 text-sm">
                                            <span className="w-1.5 h-1.5 bg-surgical-blue rounded-full mt-1.5 mr-3 flex-shrink-0" />
                                            <span className="leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Drop-off Notice */}
                    <div className="bg-hospital-navy text-white p-10 reveal-on-scroll">
                        <div className="flex flex-col md:flex-row items-start gap-8">
                            <div className="w-12 h-12 border border-white/20 flex items-center justify-center flex-shrink-0 text-surgical-blue">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="clinical-label !text-surgical-blue mb-3">Drop-Off Address</p>
                                <p className="font-header text-xl mb-2">DMCT Hospital & Old Age Home</p>
                                <p className="text-white/60 text-sm leading-relaxed font-body">
                                    New Rachna Park Shopping Centre, Near Saint Mary's School,<br />
                                    Chakki Naka, Kalyan East, District Thane, Maharashtra – 421306
                                </p>
                            </div>
                            <div className="flex-1">
                                <p className="clinical-label !text-surgical-blue mb-3">Call Before Dropping</p>
                                <div className="space-y-1">
                                    {["7977 211 807", "7400 439 760"].map((num, i) => (
                                        <a key={i} href={`tel:${num.replace(/\s/g, '')}`} className="block text-xl font-header hover:text-surgical-blue transition-colors">
                                            {num}
                                        </a>
                                    ))}
                                </div>
                                <p className="text-[10px] uppercase tracking-widest text-white/40 mt-3">Visiting hours: 10 AM – 6 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DonationPage;
