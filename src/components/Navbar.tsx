import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Magnetic from './common/Magnetic';

interface NavbarProps {
    language: string;
    setLanguage: (lang: 'ru' | 'en' | 'kz') => void;
    data?: any;
}

const Navbar: React.FC<NavbarProps> = ({ language, setLanguage, data }) => {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <div className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`pointer-events-auto flex items-center justify-between w-full max-w-5xl transition-all duration-500 ease-in-out ${scrolled
                    ? 'bg-white/80 backdrop-blur-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-full px-5 py-3 md:px-8 md:py-4'
                    : 'bg-transparent border-transparent px-2 py-4 shadow-none'
                    }`}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 shrink-0">
                    <img
                        src="/logo.png"
                        alt="ReActive International"
                        className="h-10 md:h-14 w-auto object-contain drop-shadow-sm"
                    />
                </div>

                <div className="flex items-center gap-4">
                    {/* Language Switcher */}
                    <div className="flex items-center bg-slate-100/50 backdrop-blur-md border border-slate-200 p-1 rounded-full text-[10px] md:text-xs">
                        <button
                            onClick={() => setLanguage('ru')}
                            className={`px-3 py-1.5 rounded-full transition-all ${language === 'ru' ? 'bg-[#007f94] text-white shadow-md' : 'text-slate-600 hover:bg-white/50'}`}
                        >
                            RU
                        </button>
                        <button
                            onClick={() => setLanguage('en')}
                            className={`px-3 py-1.5 rounded-full transition-all ${language === 'en' ? 'bg-[#007f94] text-white shadow-md' : 'text-slate-600 hover:bg-white/50'}`}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => setLanguage('kz')}
                            className={`px-3 py-1.5 rounded-full transition-all ${language === 'kz' ? 'bg-[#007f94] text-white shadow-md' : 'text-slate-600 hover:bg-white/50'}`}
                        >
                            KZ
                        </button>
                    </div>

                    {/* CTA Button */}
                    <div className="shrink-0">
                        <Magnetic>
                            <a
                                href="#contact"
                                className="group relative px-6 py-2.5 md:px-8 md:py-3 bg-[#007f94] text-white font-bold text-sm md:text-base rounded-full overflow-hidden shadow-[0_8px_25px_rgba(0,127,148,0.2)] flex items-center justify-center transition-all duration-300 hover:bg-[#00c2e0] hover:shadow-[0_15px_30px_rgba(0,127,148,0.35)] hover:scale-[1.05] active:scale-[0.98]"
                            >
                                <span className="relative z-10">
                                    {data?.navbar?.cta || (language === 'ru' ? 'Записаться' : 'Book Now')}
                                </span>
                            </a>
                        </Magnetic>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Navbar;
