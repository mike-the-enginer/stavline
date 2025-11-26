export default function Contact() {
    return (
        <section id="contact" className="py-20 bg-secondary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Kontaktujte Nás</h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Máte otázky alebo záujem o cenovú ponuku? Neváhajte nás kontaktovať.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    {/* Icon placeholder */}
                                    <div className="w-6 h-6 bg-primary rounded-full" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Adresa</h3>
                                    <p className="text-gray-300">Ulica 123, 811 01 Bratislava</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="w-6 h-6 bg-primary rounded-full" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Email</h3>
                                    <p className="text-gray-300">info@stavline.sk</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="w-6 h-6 bg-primary rounded-full" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Telefón</h3>
                                    <p className="text-gray-300">+421 900 000 000</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-lg text-gray-900">
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Meno</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
                                    placeholder="Vaše meno"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
                                    placeholder="vas@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Správa</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border"
                                    placeholder="Ako vám môžeme pomôcť?"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-orange-600 transition-colors font-semibold"
                            >
                                Odoslať správu
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
