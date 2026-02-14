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
        <>
            <motion.div
                animate={navStyle}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                className="fixed left-0 right-0 z-50 mx-auto max-w-[1400px] flex justify-center backdrop-blur-xl bg-white/0"
            >
                <div className="w-full flex items-center justify-between h-16 md:h-20 px-6 sm:px-10 lg:px-12 bg-inherit rounded-[inherit] border border-transparent shadow-none transition-all duration-300 relative">

                    {/* Logo */}
                    <div className="flex items-center gap-3 relative z-50">
                        <img
                            src="/logo.png"
                            alt="ReActive International"
                            className="h-10 w-auto object-contain"
                        />
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-10 bg-slate-100/50 px-8 py-3 rounded-full border border-white/40 shadow-inner">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all group-hover:w-full opacity-0 group-hover:opacity-100" />
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:block">
                        <Magnetic>
                            <a
                                href="#contact"
                                className="px-6 py-2.5 bg-[#007f94] text-white font-medium text-sm rounded-full transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg shadow-[#007f94]/20 inline-block"
                            >
                                Записаться
                            </a>
                        </Magnetic>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 rounded-full bg-slate-100 relative z-50 hover:bg-slate-200 transition-colors"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-white pt-24 px-6 pb-6 lg:hidden flex flex-col"
                    >
                        <div className="flex flex-col gap-6 mt-8">
                            {links.map((link, i) => (
                                <motion.a
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-3xl font-bold text-slate-900"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-auto"
                        >
                            <a
                                href="#contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex w-full bg-slate-900 text-white items-center justify-center py-5 rounded-2xl font-bold text-lg"
                            >
                                Записаться
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
