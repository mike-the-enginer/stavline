export default function Footer() {
    return (
        <footer className="bg-secondary text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">STAVLINE</h3>
                        <p className="text-gray-300">
                            Kvalitné stavebné práce, rekonštrukcie a zatepľovanie.
                            Vaša spokojnosť je našou prioritou.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
                        <p className="text-gray-300">Email: info@stavline.sk</p>
                        <p className="text-gray-300">Tel: +421 900 000 000</p>
                        <p className="text-gray-300">Adresa: Bratislava, Slovensko</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Rýchle odkazy</h3>
                        <ul className="space-y-2">
                            <li><a href="#services" className="text-gray-300 hover:text-white">Služby</a></li>
                            <li><a href="#gallery" className="text-gray-300 hover:text-white">Galéria</a></li>
                            <li><a href="#contact" className="text-gray-300 hover:text-white">Kontakt</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Stavline. Všetky práva vyhradené.</p>
                </div>
            </div>
        </footer>
    );
}
