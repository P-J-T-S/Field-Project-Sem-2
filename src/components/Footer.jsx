const Footer = () => {
    return (
        <footer className="py-24 bg-white border-t border-silver/20 font-body">
            <div className="max-w-7xl mx-auto px-6 lg:px-24">
                <div className="grid md:grid-cols-4 gap-16 pb-20">
                    <div className="md:col-span-2 space-y-10">
                        <div className="flex items-center space-x-6">
                            <div className="w-16 h-16 bg-hospital-navy flex items-center justify-center rounded-[2px]">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-hospital-navy uppercase tracking-widest">DMCT Hospital</h3>
                                <p className="clinical-label !text-surgical-blue">Registration No. E-5900 (Thane)</p>
                            </div>
                        </div>
                        <p className="text-xl text-surgical-charcoal/50 max-w-sm font-header italic">
                            A premier clinical destination for geriatric care, providing medical excellence since 2010.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <h4 className="clinical-label">Hospital Location</h4>
                        <p className="text-surgical-charcoal/60 leading-relaxed font-light text-lg">
                            New Rachna Park, Chakki Naka,<br />
                            Kalyan East, Maharashtra 421306
                        </p>
                    </div>

                    <div className="space-y-8">
                        <h4 className="clinical-label">Managed By</h4>
                        <p className="text-surgical-charcoal/60 leading-relaxed font-light text-lg">
                            Dr. Mitra<br />
                            Charitable Trust
                        </p>
                    </div>
                </div>

                <div className="pt-12 border-t border-silver/20 flex flex-col md:flex-row justify-between items-center gap-8 text-surgical-charcoal/30 micro-label">
                    <p>© {new Date().getFullYear()} DMCT Hospital & Old Age Home. All Rights Reserved.</p>
                    <div className="flex space-x-12">
                        <span className="cursor-pointer hover:text-hospital-navy transition-colors">Documentation</span>
                        <span className="cursor-pointer hover:text-hospital-navy transition-colors">Medical Protocols</span>
                        <span className="cursor-pointer hover:text-hospital-navy transition-colors">Legal</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
