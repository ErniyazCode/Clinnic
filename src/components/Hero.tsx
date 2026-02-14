import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Check, ShieldCheck, MapPin, Sparkles, Clock, Users, Search, Activity, FileText, Stethoscope } from 'lucide-react';
import Magnetic from './common/Magnetic';

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

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
        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { type: "spring", damping: 25, stiffness: 100 } as any
        }
    };

    const portalVariants = {
        hidden: { scale: 1.2, clipPath: 'inset(10% 10% 10% 10%)', opacity: 0 },
        visible: {
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] } as any
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center bg-white pt-32 md:pt-24 pb-12 overflow-hidden"
        >
            {/* 1. LAYERED BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#007f94]/5 rounded-full blur-[140px]"
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
                        className="inline-flex items-center gap-3 mb-6 md:mb-10 px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full"
                    >
                        <div className="flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded-full overflow-hidden border border-slate-200 flex items-center justify-center bg-white">
                                <img
                                    src="https://flagcdn.com/w80/tr.png"
                                    className="w-[150%] h-[150%] max-w-none object-cover object-[30%_center]"
                                    alt="TR"
                                />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Turkiye</span>
                        </div>
                        <span className="text-slate-300 text-[10px]">/</span>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Kazakhstan</span>
                            <div className="w-4 h-4 rounded-full overflow-hidden border border-slate-200 flex items-center justify-center bg-white">
                                <img
                                    src="https://flagcdn.com/w80/kz.png"
                                    className="w-[150%] h-[150%] max-w-none object-cover"
                                    alt="KZ"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-[3rem] xs:text-[3.6rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold text-[#0a1e2b] tracking-tighter leading-[0.9] md:leading-[1.1] mb-6 px-1"
                    >
                        Ведущие врачи <br /> <span className="text-[#007f94]">из Турции теперь</span> <br /> принимают в Алматы
                    </motion.h1>

                    {/* Detailed Subtext */}
                    <motion.div
                        variants={itemVariants}
                        className="max-w-4xl mx-auto space-y-3 mb-8 md:mb-10 px-0"
                    >
                        <h2 className="text-[14px] xs:text-[14px] md:text-3xl font-black text-[#007f94]/70 tracking-tighter leading-tight uppercase whitespace-nowrap">
                            Узнайте риски до того, <span className="text-[#007f94]">как они станут диагнозами</span>
                        </h2>

                        <p className="text-[11px] md:text-lg text-slate-500 font-medium max-w-[320px] md:max-w-2xl mx-auto leading-relaxed opacity-80">
                            Консультации, диагностика и планы медицинской реабилитации <br className="hidden xs:block md:hidden" /> экспертного уровня без выезда за границу.
                        </p>
                    </motion.div>

                    {/* Main CTA Section */}
                    {/* Main CTA Section */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-row items-center justify-center gap-4 mb-10 w-full mx-auto px-4"
                    >
                        <Magnetic>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="#contact"
                                className="flex-1 sm:flex-none px-6 sm:px-10 md:px-12 py-5 bg-[#007f94] text-white font-bold rounded-2xl shadow-xl shadow-[#007f94]/20 flex items-center justify-center gap-3 text-sm sm:text-base md:text-xl whitespace-nowrap"
                            >
                                Записаться <ArrowUpRight size={20} className="shrink-0" />
                            </motion.a>
                        </Magnetic>
                        <Magnetic>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="#cost"
                                className="flex-1 sm:flex-none px-6 sm:px-10 md:px-12 py-5 bg-white text-slate-900 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all text-sm sm:text-base md:text-xl flex justify-center whitespace-nowrap"
                            >
                                Стоимость
                            </motion.a>
                        </Magnetic>
                    </motion.div>

                    {/* Benefit Bar */}
                    <div className="w-full border-t border-slate-100 pt-6 md:pt-8 mb-12 px-2 md:px-0">
                        {/* Desktop: All in one row */}
                        <motion.div
                            variants={itemVariants}
                            className="hidden md:flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
                        >
                            {[
                                { icon: ShieldCheck, text: "Протоколы JCI" },
                                { icon: Search, text: "Чекап: 80 направлений" },
                                { icon: Clock, text: "Без очередей" },
                                { icon: Users, text: "Персональный менеджер" },
                                { icon: Sparkles, text: "Всё за 1 визит" }
                            ].map((item, i) => (
                                <span key={i} className="flex items-center gap-2 whitespace-nowrap text-[#007f94] font-bold tracking-tight text-sm">
                                    <item.icon size={14} className="text-[#007f94] shrink-0" />
                                    {item.text}
                                </span>
                            ))}
                        </motion.div>

                        {/* Mobile: 3 top, 2 bottom */}
                        <motion.div
                            variants={itemVariants}
                            className="flex md:hidden flex-col gap-y-4"
                        >
                            <div className="flex justify-center gap-x-4">
                                {[
                                    { icon: ShieldCheck, text: "Протоколы JCI" },
                                    { icon: Search, text: "Чекап: 80" },
                                    { icon: Clock, text: "Без очередей" }
                                ].map((item, i) => (
                                    <span key={i} className="flex items-center gap-1.5 whitespace-nowrap text-[#007f94] font-bold tracking-tight text-[10px]">
                                        <item.icon size={12} className="text-[#007f94] shrink-0" />
                                        {item.text}
                                    </span>
                                ))}
                            </div>
                            <div className="flex justify-center gap-x-6">
                                {[
                                    { icon: Users, text: "Персональный менеджер" },
                                    { icon: Sparkles, text: "Всё за 1 визит" }
                                ].map((item, i) => (
                                    <span key={i} className="flex items-center gap-1.5 whitespace-nowrap text-[#007f94] font-bold tracking-tight text-[10px]">
                                        <item.icon size={12} className="text-[#007f94] shrink-0" />
                                        {item.text}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Action Portal */}
                    <div className="relative w-full max-w-6xl mx-auto mb-14 px-4 sm:px-0">
                        <motion.div
                            style={{ scale }}
                            variants={portalVariants}
                            className="aspect-[21/9] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl relative"
                        >
                            <motion.img
                                style={{ scale: imageScale }}
                                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000"
                                className="w-full h-full object-cover"
                                alt="Modern Clinic Excellence"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                        </motion.div>

                        {/* Floating Action Cards */}
                        {/* Card 1: Dr. Mustafa Demir */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="absolute -left-2 sm:-left-6 lg:-left-12 top-[-10%] sm:top-1/4 z-20"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="bg-white/90 backdrop-blur-xl p-3 sm:p-6 rounded-2xl sm:rounded-[2.5rem] shadow-2xl border border-white/50 max-w-[160px] sm:max-w-[260px] text-left"
                            >
                                <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
                                    <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-full border-2 border-[#007f94] overflow-hidden shadow-lg shrink-0">
                                        <img src="/ChatGPT Image Feb 14, 2026 at 09_19_23 PM.png" className="w-full h-auto" alt="Doctor" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] sm:text-sm font-bold text-slate-900 leading-tight">Д-р Мустафа Демир</p>
                                        <p className="text-[7px] sm:text-[9px] text-[#007f94] font-bold uppercase mt-0.5 sm:mt-1">Acıbadem Surgeon</p>
                                    </div>
                                </div>
                                <p className="text-[8px] sm:text-[11px] text-slate-500 font-medium leading-tight sm:leading-relaxed">Действующий профессор медицинских наук из Стамбула.</p>
                            </motion.div>
                        </motion.div>

                        {/* Card 2: Expertise Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2, duration: 1 }}
                            className="absolute -right-2 sm:-right-6 lg:-right-12 bottom-[5%] sm:bottom-1/4 z-20"
                        >
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="bg-[#007f94]/90 backdrop-blur-xl p-3 sm:p-6 rounded-2xl sm:rounded-[2.5rem] shadow-2xl border border-white/20 max-w-[140px] sm:max-w-[240px] text-left text-white"
                            >
                                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                        <ShieldCheck size={20} className="sm:w-6 sm:h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] sm:text-sm font-bold leading-tight">Expert Opinion</p>
                                        <p className="text-[7px] sm:text-[9px] text-white/70 font-bold uppercase">International Status</p>
                                    </div>
                                </div>
                                <p className="text-[8px] sm:text-[11px] text-white/80 font-medium leading-tight sm:leading-relaxed">Второе мнение от ведущих специалистов мира.</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
