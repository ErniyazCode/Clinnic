import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Magnetic from './common/Magnetic';

const Navbar = () => {
    const { scrollY } = useScroll();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [navStyle, setNavStyle] = useState({
        bg: 'transparent',
        width: '100%',
        padding: '0',
        top: '0',
        borderRadius: '0',
    });

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 100) {
            setNavStyle({
                bg: 'rgba(255, 255, 255, 0.85)',
                width: 'calc(100% - 32px)',
                padding: '0 10px',
                top: '16px',
                borderRadius: '9999px',
            });
        } else {
            setNavStyle({
                bg: 'transparent',
                width: '100%',
                padding: '0',
                top: '0',
                borderRadius: '0',
            });
        }
    });

    const links = [
        { name: 'Преимущества', href: '#why-us' },
        { name: 'Врачи', href: '#doctors' },
        { name: 'Услуги', href: '#expertise' },
        { name: 'Отзывы', href: '#reviews' },
    ];

    return (
        <motion.div
            animate={navStyle}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="fixed left-0 right-0 z-50 mx-auto max-w-[1400px] flex justify-center backdrop-blur-xl bg-white/0"
        >
            <div className="w-full flex items-center justify-between h-16 md:h-20 px-4 sm:px-10 lg:px-12 bg-inherit rounded-[inherit] border border-transparent shadow-none transition-all duration-300 relative gap-4">

                {/* Logo */}
                <div className="flex items-center gap-3 relative z-50 shrink-0">
                    <img
                        src="/logo.png"
                        alt="ReActive International"
                        className="h-8 md:h-10 w-auto object-contain"
                    />
                </div>

                {/* Scrollable Links (The Island Content) */}
                <div className="flex-1 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 flex justify-start md:justify-center">
                    <div className="flex items-center gap-2.5 md:gap-10 bg-slate-100/90 md:bg-slate-100/50 px-3.5 py-2 md:px-8 md:py-3 rounded-full border border-white/40 shadow-sm md:shadow-inner whitespace-nowrap backdrop-blur-md">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-[11px] md:text-sm font-bold text-slate-600 hover:text-[#007f94] transition-colors relative group px-1.5 py-0.5"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Desktop CTA */}
                <div className="hidden md:block shrink-0">
                    <Magnetic>
                        <a
                            href="#contact"
                            className="px-6 py-2.5 bg-[#007f94] text-white font-medium text-sm rounded-full transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg shadow-[#007f94]/20 inline-block"
                        >
                            Записаться
                        </a>
                    </Magnetic>
                </div>

                {/* Mobile CTA Icon */}
                <div className="md:hidden shrink-0">
                    <a
                        href="#contact"
                        className="w-10 h-10 bg-[#007f94] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#007f94]/20 active:scale-95 transition-transform"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </a>
                </div>

            </div>
        </motion.div>
    );
};

export default Navbar;
