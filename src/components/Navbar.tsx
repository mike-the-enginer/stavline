import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex justify-between h-16 items-center">
                    {/* Left Menu */}
                    <div className="hidden md:flex flex-1 justify-start">
                        <Link href="/galeria" className="text-gray-700 hover:text-primary transition-colors font-medium">
                            Galéria
                        </Link>
                    </div>

                    {/* Center Logo */}
                    <div className="flex-shrink-0 flex items-center justify-center">
                        <Link href="/" className="text-2xl font-bold text-primary">
                            STAVLINE
                        </Link>
                    </div>

                    {/* Right Menu */}
                    <div className="hidden md:flex flex-1 justify-end space-x-8">
                        <Link href="/#services" className="text-gray-700 hover:text-primary transition-colors font-medium">
                            Služby
                        </Link>
                        <Link href="/#contact" className="text-gray-700 hover:text-primary transition-colors font-medium">
                            Kontakt
                        </Link>
                    </div>

                    {/* Mobile Menu Button (Absolute Right) */}
                    <div className="md:hidden absolute right-0 flex items-center">
                        <button className="text-gray-700 hover:text-primary">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
