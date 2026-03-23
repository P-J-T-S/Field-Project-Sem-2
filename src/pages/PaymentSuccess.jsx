import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const PaymentSuccess = () => {
    const { navigateTo } = useContext(AppContext);
    const [txnId, setTxnId] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const params = new URLSearchParams(window.location.search);
        const id = params.get('txnId') || '';
        setTxnId(id);

        if (id) {
            fetch(`${API_BASE}/payment/status/${id}`)
                .then(r => r.json())
                .then(data => setStatus(data))
                .catch(() => setStatus({ status: 'UNKNOWN' }))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <div className="pt-24 min-h-screen bg-medical-white font-body flex items-center justify-center px-6">
            <div className="max-w-lg w-full bg-white border border-silver/30 shadow-premium p-12 text-center">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <span className="clinical-label block mb-4 text-green-600">Payment Successful</span>
                <h1 className="text-3xl font-header italic text-hospital-navy mb-4">Thank You!</h1>
                <p className="text-surgical-charcoal/60 leading-relaxed mb-8">
                    Your generous donation has been received. Every rupee you give brings warmth,
                    care, and dignity to our residents.
                </p>

                {loading ? (
                    <div className="flex justify-center mb-8">
                        <svg className="animate-spin w-6 h-6 text-surgical-blue" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                    </div>
                ) : (
                    <>
                        {txnId && (
                            <div className="bg-medical-white p-4 rounded-[2px] border border-silver/30 mb-8 text-left space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-surgical-charcoal/50">Transaction ID</span>
                                    <span className="font-mono text-xs text-hospital-navy font-semibold break-all text-right max-w-[180px]">{txnId}</span>
                                </div>
                                {status?.donation?.amountRupees && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-surgical-charcoal/50">Amount Donated</span>
                                        <span className="font-bold text-surgical-blue">₹{status.donation.amountRupees}</span>
                                    </div>
                                )}
                                {status?.status && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-surgical-charcoal/50">Status</span>
                                        <span className="text-green-600 font-semibold">{status.status}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}

                <div className="space-y-4">
                    <button onClick={() => navigateTo('home')} className="w-full btn-primary py-4">
                        Return to Home
                    </button>
                    <button onClick={() => navigateTo('donate')} className="w-full btn-secondary py-4">
                        Donate Again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
