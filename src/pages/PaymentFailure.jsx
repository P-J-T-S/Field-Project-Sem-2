import { useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const PaymentFailure = () => {
    const { navigateTo } = useContext(AppContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const params = new URLSearchParams(window.location.search);
    const txnId = params.get('txnId') || '';
    const reason = params.get('reason') || 'UNKNOWN';

    const reasonMessages = {
        PAYMENT_ERROR: 'A payment error occurred. Your bank may have declined the transaction.',
        PAYMENT_CANCELLED: 'The payment was cancelled by the user.',
        TIMED_OUT: 'The payment session timed out. Please try again.',
        empty_callback: 'We did not receive a response from PhonePe. Please check your bank statement before retrying.',
        server_error: 'An unexpected server error occurred. Please try again.',
        UNKNOWN: 'An unexpected error occurred during payment.',
    };

    const displayReason = reasonMessages[reason] || reasonMessages['UNKNOWN'];

    return (
        <div className="pt-24 min-h-screen bg-medical-white font-body flex items-center justify-center px-6">
            <div className="max-w-lg w-full bg-white border border-silver/30 shadow-premium p-12 text-center">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <span className="clinical-label block mb-4 text-red-500">Payment Failed</span>
                <h1 className="text-3xl font-header italic text-hospital-navy mb-4">Oops, Something Went Wrong</h1>
                <p className="text-surgical-charcoal/60 leading-relaxed mb-6">{displayReason}</p>

                {txnId && (
                    <div className="bg-medical-white p-4 rounded-[2px] border border-silver/30 mb-8 text-left">
                        <div className="flex justify-between text-sm">
                            <span className="text-surgical-charcoal/50">Transaction Reference</span>
                            <span className="font-mono text-xs text-hospital-navy font-semibold break-all text-right max-w-[180px]">{txnId}</span>
                        </div>
                    </div>
                )}

                <p className="text-xs text-surgical-charcoal/40 mb-8">
                    No amount has been deducted. If you believe this is an error,
                    please contact us with the transaction reference above.
                </p>

                <div className="space-y-4">
                    <button onClick={() => navigateTo('donate')} className="w-full btn-primary py-4">
                        Try Again
                    </button>
                    <button onClick={() => navigateTo('home')} className="w-full btn-secondary py-4">
                        Return to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailure;
