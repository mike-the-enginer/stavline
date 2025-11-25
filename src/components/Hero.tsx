'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
    {
        image: '/images/hero.png',
        title: 'Stavline - Vaša cesta k dokonalému bývaniu',
        subtitle: 'Profesionálne stavebné práce, rekonštrukcie a zatepľovanie s dôrazom na kvalitu a detail.'
    },
    {
        image: '/images/service-facade.png',
        title: 'Moderné Fasády',
        subtitle: 'Realizácia moderných a odolných fasád podľa vašich predstáv.'
    },
    {
        image: '/images/service-renovation.png',
        title: 'Kompletné Rekonštrukcie',
        subtitle: 'Premeníme váš interiér na domov snov.'
    }
];

export default function Hero() {
    return (
        <section className="relative h-[80vh] bg-gray-900 text-white overflow-hidden">
            <Swiper
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                effect="fade"
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
                className="h-full w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative">
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 bg-black/50 z-10" />
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="relative z-20 h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
                            <div className="max-w-4xl mx-auto">
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                    {index === 0 ? (
                                        <>Stavline - Vaša cesta k <span className="text-primary">dokonalému bývaniu</span></>
                                    ) : (
                                        slide.title
                                    )}
                                </h1>
                                <p className="text-xl sm:text-2xl mb-8 text-gray-200">
                                    {slide.subtitle}
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Link
                                        href="#services"
                                        className="px-8 py-3 bg-primary hover:bg-orange-600 text-white font-semibold rounded-md transition-colors text-lg"
                                    >
                                        Naše služby
                                    </Link>
                                    <Link
                                        href="#contact"
                                        className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold rounded-md transition-colors text-lg"
                                    >
                                        Kontaktujte nás
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
