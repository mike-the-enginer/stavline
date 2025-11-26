'use client';

import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { GalleryFolder, GalleryImage } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';
import { X } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface GalleryProps {
    folders: GalleryFolder[];
}

export default function Gallery({ folders }: GalleryProps) {
    const [selectedFolderId, setSelectedFolderId] = useState<string>(folders[0]?.id || '');
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(false);

    // Lightbox state
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [initialSlide, setInitialSlide] = useState(0);

    useEffect(() => {
        if (!selectedFolderId) return;

        const fetchImages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/gallery/images?folderId=${selectedFolderId}`);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setImages(data);
            } catch (error) {
                console.error('Failed to load images', error);
                setImages([]);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [selectedFolderId]);

    const openLightbox = (index: number) => {
        setInitialSlide(index);
        setLightboxOpen(true);
        // Prevent body scroll when lightbox is open
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        // Restore body scroll
        document.body.style.overflow = 'unset';
    };

    if (folders.length === 0) {
        return null;
    }

    return (
        <section id="gallery" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Naša Práca</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Prezrite si ukážky našich realizovaných projektov.
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {folders.map((folder) => (
                        <button
                            key={folder.id}
                            onClick={() => setSelectedFolderId(folder.id)}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${selectedFolderId === folder.id
                                ? 'bg-primary text-white shadow-lg scale-105'
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {folder.name}
                        </button>
                    ))}
                </div>

                {/* Image Grid */}
                <div className="min-h-[400px]">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            <AnimatePresence mode='popLayout'>
                                {images.map((image, index) => (
                                    <motion.div
                                        key={image.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => openLightbox(index)}
                                        className="relative group aspect-[4/3] overflow-hidden rounded-lg shadow-md bg-gray-200 cursor-pointer"
                                    >
                                        <NextImage
                                            src={image.url}
                                            alt={image.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end justify-start p-6">
                                            <p className="text-white font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                {image.name}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {!loading && images.length === 0 && (
                        <div className="text-center text-gray-500 py-12">
                            V tejto kategórii zatiaľ nie sú žiadne fotografie.
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
                    >
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 z-[110] text-white/70 hover:text-white p-2 transition-colors"
                        >
                            <X size={40} />
                        </button>

                        <div className="w-full h-full max-w-[1920px] max-h-[1080px] p-4 md:p-10">
                            <Swiper
                                modules={[Navigation, Pagination, Keyboard, A11y]}
                                initialSlide={initialSlide}
                                navigation
                                pagination={{ clickable: true }}
                                keyboard={{ enabled: true }}
                                loop={images.length > 1}
                                className="w-full h-full"
                                spaceBetween={30}
                            >
                                {images.map((img) => (
                                    <SwiperSlide key={img.id} className="flex items-center justify-center">
                                        <div className="relative w-full h-full flex items-center justify-center">
                                            <img
                                                src={img.url}
                                                alt={img.name}
                                                className="max-w-full max-h-full object-contain select-none"
                                            />
                                            <div className="absolute bottom-4 left-0 right-0 text-center text-white/90 bg-black/50 py-2 rounded-md mx-auto max-w-md backdrop-blur-sm">
                                                <p className="text-lg font-medium">{img.name}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
