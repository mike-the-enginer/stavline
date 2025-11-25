import { Home, PaintBucket, Hammer, Ruler } from 'lucide-react';

const services = [
    {
        title: 'Zatepľovanie',
        description: 'Kompletné zatepľovanie rodinných domov a budov pre úsporu energií.',
        icon: Home,
        image: '/images/service-insulation.png',
    },
    {
        title: 'Fasády',
        description: 'Realizácia moderných a odolných fasád podľa vašich predstáv.',
        icon: PaintBucket,
        image: '/images/service-facade.png',
    },
    {
        title: 'Rekonštrukcie',
        description: 'Rekonštrukcie bytov, jadier a interiérov na kľúč.',
        icon: Hammer,
        image: '/images/service-renovation.png',
    },
    {
        title: 'Obklady a dlažby',
        description: 'Profesionálna pokládka obkladov a dlažieb v kúpeľniach a interiéroch.',
        icon: Ruler,
        image: '/images/service-tiling.png',
    },
];

export default function Services() {
    return (
        <section id="services" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Naše Služby</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Poskytujeme široké spektrum stavebných prác s garanciou kvality.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
                            <div className="relative h-64 md:h-48 overflow-hidden">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-lg shadow-sm z-20 text-primary">
                                    <service.icon size={24} />
                                </div>
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
