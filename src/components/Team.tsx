export default function Team() {
    return (
        <section id="team" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Náš Tím</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Skúsení odborníci pripravení realizovať vaše projekty.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((member) => (
                        <div key={member} className="text-center">
                            <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200">
                                <img
                                    src={`https://placehold.co/400x400?text=Member+${member}`}
                                    alt={`Team Member ${member}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Meno Priezvisko</h3>
                            <p className="text-primary font-medium">Pozícia</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
