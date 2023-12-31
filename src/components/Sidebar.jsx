"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiX, FiMenu } from 'react-icons/fi';

export default function Sidebar() {
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const pathname = usePathname();

    const toggleMobileSidebar = () => {
        setMobileSidebarOpen(!isMobileSidebarOpen);
    };

    const closeSidebar = () => {
        setMobileSidebarOpen(false);
    };

    const links = [
        { text: 'Home', href: '/' },
        { text: 'Services', href: '/services' },
        { text: 'About', href: '/about' },
        { text: 'Contact', href: '/contact' },
    ];

    // Function to handle link click and update the active link
    const handleLinkClick = () => {
        closeSidebar();
    };

    return (
        <>
            {/* Mobile Sidebar Toggle Button */}
            <button
                className={`${isMobileSidebarOpen
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                    } fixed bottom-4 right-4 z-10 p-4 text-white lg:hidden rounded-full shadow-lg transition-transform transform hover:scale-110 ease-in-out`}
                onClick={toggleMobileSidebar}
            >
                {isMobileSidebarOpen ? (
                    <FiX size={24} className="animate-spin-slow" />
                ) : (
                    <FiMenu size={24} />
                )}
            </button>

            {/* Conditional Sidebar */}
            <aside
                className={`${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 h-screen w-full p-6 bg-gray-800 lg:w-80 transition-transform duration-300 ease-in-out transform fixed lg:relative flex flex-col justify-start`}
            >
                {/* Logo */}
                <span className="text-4xl font-bold text-yellow-700">Logo</span>

                {/* Sidebar Items */}
                <ul className="mt-8 text-center md:text-start rounded-2xl">
                    {links.map((link, index) => (
                        <Link key={index} href={link.href}>
                            <li
                                className={`p-4 mb-4 transition-colors duration-300 rounded-2xl text-white hover:bg-gray-400 hover:text-white ${
                                    pathname === link.href ? 'bg-yellow-700' : '' // Add the background color for the active link
                                }`}
                                onClick={handleLinkClick}
                            >
                                {link.text}
                            </li>
                        </Link>
                    ))}
                </ul>
            </aside>
        </>
    );
}
