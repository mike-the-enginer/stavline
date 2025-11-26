export default function Contact() {
    return (
        <section id="contact" className="py-20 bg-secondary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Kontaktujte Nás</h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Máte otázky alebo záujem o cenovú ponuku? Neváhajte nás kontaktovať.
                        </p>
                    </div>

                    <div className="space-y-8 bg-white/10 p-8 rounded-lg backdrop-blur-sm">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Email</h3>
                                <p className="text-gray-300">info@stavline.sk</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Telefón</h3>
                                <p className="text-gray-300">+421 900 000 000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
