import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Magnetic from './common/Magnetic';
import HighlightedText from './common/HighlightedText';
import { ICON_POOL } from '../lib/icons';

const Hero = ({ data }: { data: any }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    const {
        badgeTR = 'Turkiye',
        badgeKZ = 'Kazakhstan',
        title = 'Ведущие врачи из Турции теперь принимают в Алматы',
        subtitle = 'Узнайте риски до того, как они станут диагнозами',
        subtitleSize = 20,
        description = 'Консультации, диагностика и планы медицинской реабилитации экспертного уровня без выезда за границу.',
        buttonPrimary = 'Записаться',
        buttonSecondary = 'Стоимость',
        titleSize = 72,
        descSize = 20,
        padding = 100,
        image = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000',
        benefits = [],
        floatingDoctors = []
    } = data || {};

    const [doctorLeft, doctorRight] = floatingDoctors;

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, translateZ: 0 },
        visible: {
            opacity: 1,
            y: 0,
            translateZ: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }
        }
    };

    const portalVariants = {
        hidden: { scale: 1.1, clipPath: 'inset(10% 10% 10% 10%)', opacity: 0 },
        visible: {
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as any }
        }
    };

    return (
        <section
            ref={containerRef}
            id="hero"
            style={{ paddingTop: `${padding}px`, paddingBottom: `${padding}px` }}
            className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden"
        >
            {/* 1. LAYERED BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute top-1/4 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#007f94]/5 rounded-full blur-[80px] md:blur-[140px]"
                />
            </div>

            <motion.div
                className="container mx-auto px-4 md:px-6 relative z-10 w-full"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

                    {/* Badge */}
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-4 mb-6 md:mb-10 px-5 py-2.5 bg-white/50 backdrop-blur-md border border-slate-200/50 rounded-full shadow-sm"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-3.5 h-3.5 rounded-full overflow-hidden border border-slate-200 flex items-center justify-center bg-slate-100">
                                <img
                                    src="https://flagcdn.com/w80/tr.png"
                                    className="w-full h-full object-cover scale-[1.2] object-[30%_center]"
                                    alt="TR"
                                />
                            </div>
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">{badgeTR}</span>
                        </div>
                        <span className="text-slate-300 text-[10px] font-thin">/</span>
                        <div className="flex items-center gap-2">
                            <div className="w-3.5 h-3.5 rounded-full overflow-hidden border border-slate-200 flex items-center justify-center bg-slate-100">
                                <img
                                    src="https://flagcdn.com/w80/kz.png"
                                    className="w-full h-full object-cover scale-[1.2] object-[60%_center]"
                                    alt="KZ"
                                />
                            </div>
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">{badgeKZ}</span>
                        </div>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        variants={itemVariants}
                        style={{ fontSize: `clamp(2rem, 5vw, ${titleSize}px)` }}
                        className="font-extrabold text-[#0a1e2b] tracking-tighter leading-[1.05] md:leading-[1.1] mb-6 px-1 whitespace-pre-line"
                    >
                        <HighlightedText text={title} />
                    </motion.h1>

                    {/* Detailed Subtext */}
                    <motion.div
                        variants={itemVariants}
                        className="max-w-4xl mx-auto space-y-3 mb-8 md:mb-10 px-0"
                    >
                        <h2
                            style={{ fontSize: `${subtitleSize}px` }}
                            className="font-black text-[#007f94]/70 tracking-tighter leading-tight uppercase whitespace-pre-wrap md:whitespace-nowrap"
                        >
                            <HighlightedText text={subtitle} />
                        </h2>

                        <p
                            style={{ fontSize: `${descSize}px` }}
                            className="text-slate-500 font-medium max-w-[340px] md:max-w-2xl mx-auto leading-relaxed opacity-80 whitespace-pre-line"
                        >
                            <HighlightedText text={description} />
                        </p>
                    </motion.div>

                    {/* Main CTA Section */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 w-full max-w-md sm:max-w-none mx-auto px-4"
                    >
                        <Magnetic>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="#contact"
                                className="w-full sm:w-auto px-4 md:px-12 py-4 md:py-5 bg-[#007f94] text-white font-bold rounded-2xl shadow-xl shadow-[#007f94]/20 flex items-center justify-center gap-2 md:gap-3 text-base md:text-xl whitespace-nowrap"
                            >
                                {buttonPrimary} <ArrowUpRight size={18} className="shrink-0 md:w-5 md:h-5" />
                            </motion.a>
                        </Magnetic>
                        <Magnetic>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="#cost"
                                className="w-full sm:w-auto px-4 md:px-12 py-4 md:py-5 bg-white text-slate-900 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all text-base md:text-xl flex items-center justify-center whitespace-nowrap"
                            >
                                {buttonSecondary}
                            </motion.a>
                        </Magnetic>
                    </motion.div>

                    {/* Benefit Bar - Unified for Mobile/Desktop */}
                    <div className="w-full border-t border-slate-100 pt-6 md:pt-8 mb-12 px-2 md:px-0">
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-8 gap-y-3"
                        >
                            {(benefits || []).map((item: any, i: number) => {
                                const Icon = ICON_POOL[item.icon] || ICON_POOL.Activity;
                                return (
                                    <span key={i} className="flex items-center gap-1.5 md:gap-2 whitespace-nowrap text-[#007f94] font-bold tracking-tight text-[10px] md:text-sm bg-slate-50 md:bg-transparent px-2 md:px-0 py-1 md:py-0 rounded-md md:rounded-none">
                                        <Icon size={12} className="text-[#007f94] shrink-0 md:w-[14px] md:h-[14px]" />
                                        {item.text}
                                    </span>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Action Portal */}
                    <div className="relative w-full max-w-6xl mx-auto mb-14 px-0 sm:px-0">
                        <motion.div
                            style={{ scale }}
                            variants={portalVariants}
                            className="aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl relative"
                        >
                            <motion.img
                                style={{ scale: imageScale }}
                                src={image}
                                onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000'}
                                className="w-full h-full object-cover"
                                alt="Modern Clinic Excellence"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
                        </motion.div>

                        {/* Floating Action Cards - Doctors (Desktop Only) */}
                        {/* Doctor 1: Left Floating Card */}
                        {doctorLeft && (
                            <motion.div
                                initial={{ opacity: 0, x: -30, y: 0 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="hidden md:block absolute -left-20 top-[20%] z-20"
                            >
                                <motion.div
                                    animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                                    className="bg-white/90 backdrop-blur-2xl p-4 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/60 max-w-[280px] text-left group transition-transform hover:scale-105 duration-500"
                                >
                                    <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-4 shadow-inner bg-slate-100">
                                        <img
                                            src={doctorLeft.image}
                                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                            alt={doctorLeft.name}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#007f94]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                    <div className="px-2 pb-1">
                                        <p className="text-base font-bold text-slate-900 leading-tight">{doctorLeft.name}</p>
                                        <p className="text-[10px] text-[#007f94] font-black uppercase tracking-wider mt-0.5 opacity-80">{doctorLeft.role}</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}

                        {/* Doctor 2: Right Floating Card */}
                        {doctorRight && (
                            <motion.div
                                initial={{ opacity: 0, x: 30, y: 0 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="hidden md:block absolute -right-20 bottom-[15%] z-20"
                            >
                                <motion.div
                                    animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                    className="bg-white/90 backdrop-blur-2xl p-4 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/60 max-w-[280px] text-left group transition-transform hover:scale-105 duration-500"
                                >
                                    <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-4 shadow-inner bg-slate-100">
                                        <img
                                            src={doctorRight.image}
                                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                            alt={doctorRight.name}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#007f94]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                    <div className="px-2 pb-1">
                                        <p className="text-base font-bold text-slate-900 leading-tight">{doctorRight.name}</p>
                                        <p className="text-[10px] text-[#007f94] font-black uppercase tracking-wider mt-0.5 opacity-80">{doctorRight.role}</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}

                        {/* Mobile Doctors (Grid below image) */}
                        <div className="md:hidden mt-6 grid grid-cols-2 gap-4">
                            {[doctorLeft, doctorRight].filter(Boolean).map((doc, idx) => (
                                <div key={idx} className="bg-slate-50 border border-slate-100 p-3 rounded-2xl flex items-center gap-3">
                                    <img src={doc.image} className="w-12 h-12 rounded-full object-cover" alt={doc.name} />
                                    <div className="text-left">
                                        <p className="text-xs font-bold text-slate-900 leading-tight">{doc.name}</p>
                                        <p className="text-[9px] text-[#007f94] font-black uppercase tracking-wider mt-0.5 opacity-80 leading-none">{doc.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Centered Badge - Trust Indicator */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4, duration: 0.8 }}
                            className="absolute left-1/2 -translate-x-1/2 -bottom-6 z-30 flex gap-2 md:gap-4 w-max"
                        >
                            <div className="bg-[#0a1e2b] text-white px-4 md:px-8 py-3 md:py-4 rounded-full shadow-2xl flex items-center gap-3 border border-white/10 backdrop-blur-md">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap">Международные врачи на связи</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
