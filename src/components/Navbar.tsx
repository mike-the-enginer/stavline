import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold text-primary">
                            STAVLINE
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="#services" className="text-gray-700 hover:text-primary transition-colors">
                            Služby
                        </Link>
                        <Link href="#gallery" className="text-gray-700 hover:text-primary transition-colors">
                            Galéria
                        </Link>
                        <Link href="#team" className="text-gray-700 hover:text-primary transition-colors">
                            Náš Tím
                        </Link>
                        <Link href="#contact" className="text-gray-700 hover:text-primary transition-colors">
                            Kontakt
                        </Link>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button className="text-gray-700 hover:text-primary">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
