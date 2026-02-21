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
        </div>
    );
};

export default DonationPage;
