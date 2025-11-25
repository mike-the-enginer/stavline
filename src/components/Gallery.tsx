'use client';

import { useState, useEffect } from 'react';
import { GalleryFolder, GalleryImage } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryProps {
    folders: GalleryFolder[];
}

export default function Gallery({ folders }: GalleryProps) {
    const [selectedFolderId, setSelectedFolderId] = useState<string>(folders[0]?.id || '');
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(false);

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
                                {images.map((image) => (
                                    <motion.div
                                        key={image.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative group aspect-[4/3] overflow-hidden rounded-lg shadow-md bg-gray-200"
                                    >
                                        <img
                                            src={image.url}
                                            alt={image.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
        </section>
    );
}
