import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';

// ── Config ─────────────────────────────────────────────────────────────────
// In production, replace with your deployed backend URL, e.g.:
// const API_BASE = 'https://your-backend-domain.com/api';
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const DonationPage = () => {
    const { navigateTo } = useContext(AppContext);
    const [formData, setFormData] = useState({ name: '', number: '', email: '', amount: '' });
    const [donationStep, setDonationStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleNextStep = (e) => {
        e.preventDefault();
        setError(null);
        setDonationStep(2);
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setError(null);
        const amount = parseFloat(formData.amount);
        if (!formData.amount || isNaN(amount) || amount < 1) {
            setError('Please enter a valid donation amount (minimum ₹1).');
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE}/payment/initiate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.number,
                    amount: formData.amount,
                }),
            });
            const data = await response.json();
            if (data.success && data.redirectUrl) {
                window.location.href = data.redirectUrl;
            } else {
                setError(data.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error('[DonationPage] Payment initiation error:', err);
            setError('Unable to connect to the payment server. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
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

            {/* Donation Form */}
            <section className="section-padding">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white p-10 md:p-16 border border-silver/30 shadow-premium relative reveal-on-scroll">
                        <div className="mb-12 text-center">
                            <div className="w-16 h-16 bg-medical-white text-surgical-blue flex items-center justify-center mx-auto mb-6 rounded-full border border-silver/20 shadow-sm">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl mb-4 text-hospital-navy italic font-header">Make a Donation</h2>
                            <div className="flex items-center justify-center space-x-4">
                                <div className={`h-1 w-12 rounded-full transition-all duration-500 ${donationStep === 1 ? 'bg-surgical-blue' : 'bg-silver'}`} />
                                <p className="text-[10px] uppercase font-bold tracking-widest text-surgical-charcoal/40">Step {donationStep} of 2</p>
                                <div className={`h-1 w-12 rounded-full transition-all duration-500 ${donationStep === 2 ? 'bg-surgical-blue' : 'bg-silver'}`} />
                            </div>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded flex items-start gap-3">
                                <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        {/* Step 1 */}
                        {donationStep === 1 && (
                            <form onSubmit={handleNextStep} className="space-y-8">
                                <div className="space-y-6 animate-fadeIn">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="clinical-label mb-3 block">Full Name</label>
                                            <input type="text" required placeholder="John Doe"
                                                className="w-full bg-medical-white border border-silver/50 p-5 font-body text-sm outline-none focus:border-surgical-blue focus:bg-white transition-all shadow-input"
                                                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="clinical-label mb-3 block">Contact Number</label>
                                            <input type="tel" required placeholder="+91 00000 00000" pattern="[0-9+\s\-]{10,15}"
                                                className="w-full bg-medical-white border border-silver/50 p-5 font-body text-sm outline-none focus:border-surgical-blue focus:bg-white transition-all shadow-input"
                                                value={formData.number} onChange={(e) => setFormData({ ...formData, number: e.target.value })} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="clinical-label mb-3 block">Email Address</label>
                                        <input type="email" required placeholder="john@example.com"
                                            className="w-full bg-medical-white border border-silver/50 p-5 font-body text-sm outline-none focus:border-surgical-blue focus:bg-white transition-all shadow-input"
                                            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                    </div>
                                </div>
                                <div className="pt-6">
                                    <button type="submit" className="w-full btn-primary py-5 text-base shadow-xl group">
                                        <span className="flex items-center justify-center space-x-3">
                                            <span>Proceed to Amount</span>
                                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Step 2 */}
                        {donationStep === 2 && (
                            <form onSubmit={handlePayment} className="space-y-8">
                                <div className="space-y-8 animate-fadeIn">
                                    <div>
                                        <label className="clinical-label mb-6 block">Select Contribution Amount (₹)</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                                            {['500', '1000', '2000', '5000'].map(amt => (
                                                <button type="button" key={amt}
                                                    onClick={() => setFormData({ ...formData, amount: amt })}
                                                    className={`py-5 border-2 text-sm font-bold tracking-widest transition-all rounded-[2px] ${formData.amount === amt ? 'bg-surgical-blue border-surgical-blue text-white shadow-lift' : 'bg-medical-white border-medical-white text-hospital-navy hover:border-silver'}`}>
                                                    ₹{amt}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="relative">
                                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-surgical-charcoal/40 font-bold">₹</span>
                                            <input type="number" placeholder="Enter Custom Amount" min="1"
                                                className="w-full bg-medical-white border border-silver/50 p-5 pl-10 font-body text-sm outline-none focus:border-surgical-blue focus:bg-white transition-all shadow-input"
                                                value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className="bg-medical-white p-5 border border-silver/30 rounded-[2px] space-y-2">
                                        <p className="clinical-label mb-3">Donation Summary</p>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-surgical-charcoal/60">Donor</span>
                                            <span className="font-semibold text-hospital-navy">{formData.name}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-surgical-charcoal/60">Email</span>
                                            <span className="font-semibold text-hospital-navy">{formData.email}</span>
                                        </div>
                                        {formData.amount && (
                                            <div className="flex justify-between text-sm pt-2 border-t border-silver/30 mt-2">
                                                <span className="text-surgical-charcoal/60">Amount</span>
                                                <span className="font-bold text-surgical-blue text-base">₹{formData.amount}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-center gap-3 py-3 border border-silver/30 rounded-[2px] bg-medical-white">
                                        <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.5 17.5h-2V11h2v6.5zm0-8h-2V7h2v2.5z"/>
                                        </svg>
                                        <span className="text-xs text-surgical-charcoal/60 font-semibold uppercase tracking-widest">Secured by PhonePe</span>
                                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold uppercase">256-bit SSL</span>
                                    </div>
                                </div>

                                <div className="pt-6 flex flex-col md:flex-row gap-4">
                                    <button type="button" onClick={() => { setDonationStep(1); setError(null); }}
                                        className="flex-1 btn-secondary" disabled={isLoading}>Go Back</button>
                                    <button type="submit"
                                        className="flex-[2] btn-primary py-5 text-base shadow-xl group disabled:opacity-60 disabled:cursor-not-allowed"
                                        disabled={isLoading || !formData.amount}>
                                        {isLoading ? (
                                            <span className="flex items-center justify-center space-x-3">
                                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                                </svg>
                                                <span>Redirecting to PhonePe…</span>
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center space-x-3">
                                                <span>Pay ₹{formData.amount || '—'} via PhonePe</span>
                                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                                </svg>
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="mt-12 pt-8 border-t border-silver/20 text-center">
                            <button onClick={() => navigateTo('home')}
                                className="text-xs uppercase tracking-widest font-bold text-surgical-charcoal/40 hover:text-surgical-blue transition-colors">
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
                            {[
                                { value: '1 meal', desc: 'Full day of nutritious food for one resident' },
                                { value: 'Medical', desc: 'Regular checkups and daily medication' },
                                { value: 'Shelter', desc: 'Safe, clean, and compassionate housing' },
                            ].map((item, i) => (
                                <div key={i} className="space-y-4 p-8 bg-medical-white rounded-[2px]">
                                    <h4 className="text-4xl text-surgical-blue">{item.value}</h4>
                                    <p className="text-sm text-surgical-charcoal/60 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* In-Kind Donations */}
            <section className="section-padding bg-medical-white border-t border-silver/30">
                <div className="max-w-4xl mx-auto">
                    <div className="reveal-on-scroll text-center mb-16">
                        <span className="clinical-label block mb-4">In-Kind Contributions</span>
                        <h2 className="font-header italic text-hospital-navy mb-6">Donate More Than Money</h2>
                        <p className="text-surgical-charcoal/60 font-body leading-relaxed max-w-2xl mx-auto">
                            We gratefully accept donations of essential goods. Every item you give reaches a resident directly — nothing goes to waste.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        {[
                            { label: "Food & Nutrition", title: "Grains & Dry Goods", items: ["Rice, wheat, dal, and pulses", "Packaged and sealed food items", "Cooking oil, spices, and staples", "Ready-to-eat nutritious food packs"] },
                            { label: "Pharmaceutical Aid", title: "Medicines", items: ["Unopened, non-expired medicines only", "Common medications — paracetamol, antacids, vitamins", "Branded or generic — all accepted", "Please check expiry before donating"] },
                            { label: "Clothing", title: "Clothes & Wearables", items: ["Clean, gently used clothing for seniors", "Warm wear — sweaters, shawls, socks", "Undergarments (new only)", "Comfortable footwear in good condition"] },
                            { label: "Furnishings", title: "Furniture & Bedding", items: ["Single beds, mattresses, and cots in good condition", "Pillows, blankets, and bed sheets", "Chairs, wheelchairs, and walking aids", "Almirahs, storage units, and side tables"] },
                        ].map((card, i) => (
                            <div key={i} className="bg-white border border-silver/40 p-8 reveal-on-scroll">
                                <div className="mb-4">
                                    <p className="clinical-label mb-1">{card.label}</p>
                                    <h3 className="text-xl text-hospital-navy font-header">{card.title}</h3>
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

                    <div className="bg-hospital-navy text-white p-10 reveal-on-scroll">
                        <div className="flex flex-col md:flex-row items-start gap-8">
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
                                        <a key={i} href={`tel:${num.replace(/\s/g, '')}`} className="block text-xl font-header hover:text-surgical-blue transition-colors">{num}</a>
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
