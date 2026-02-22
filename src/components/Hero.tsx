import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Magnetic from './common/Magnetic';
import HighlightedText from './common/HighlightedText';
import { ICON_POOL } from '../lib/icons';

const Hero = ({ data }: { data: any }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const {
        badgeTR = 'Turkiye',
        badgeKZ = 'Kazakhstan',
        title = 'Ведущие врачи из *Турции* теперь принимают в Алматы',
        subtitle = 'Узнайте риски до того, как они станут диагнозами',
        description = 'Консультации, диагностика и планы медицинской реабилитации экспертного уровня без выезда за границу.',
        buttonPrimary = 'Записаться на приём',
        buttonSecondary = 'Подробнее о клинике',
        titleSize = 64,
        subtitleSize = 14,
        descSize = 18,
        benefits = []
    } = data || {};

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
        }
    };

    const padding = 120; // Base padding in px

    return (
        <section
            ref={containerRef}
            id="hero"
            style={{
                paddingTop: `clamp(180px, 22vh, ${padding + 40}px)`,
                paddingBottom: `clamp(${padding * 0.4}px, 10vh, ${padding}px)`
            }}
            className="relative flex flex-col items-center justify-center min-h-[100svh] overflow-hidden bg-gradient-to-b from-[#fafcff] to-white"
        >
            {/* Soft Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.3]" />
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-1/4 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-br from-[#00c2e0]/20 to-[#007f94]/5 blur-[100px]"
                />
            </div>

            <motion.div
                className="container mx-auto px-4 relative z-10 w-full mb-6 md:mb-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ y, opacity }}
            >
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto w-full">

                    {/* Clean Badge */}
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-4 mb-6 md:mb-8 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-slate-200/60 shadow-sm mx-auto">
                        <div className="flex items-center gap-1.5">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                            </span>
                            <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-slate-700">{badgeTR}</span>
                        </div>
                        <div className="w-[1px] h-2.5 bg-slate-300"></div>
                        <div className="flex items-center gap-1.5">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c2e0] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00c2e0]"></span>
                            </span>
                            <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-slate-700">{badgeKZ}</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="font-bold text-[#0a1e2b] tracking-tighter leading-[1.1] mb-6 md:mb-10 max-w-4xl whitespace-pre-line mx-auto px-4"
                        style={{ fontSize: `clamp(28px, 9vw, ${titleSize}px)` }}
                    >
                        <HighlightedText text={title} />
                    </motion.h1>

                    {/* Subtext and Description */}
                    <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 mb-10 md:mb-14 max-w-2xl px-4 mx-auto">
                        <h2
                            className="font-black text-[#007f94] tracking-[0.18em] uppercase leading-tight"
                            style={{ fontSize: `clamp(15px, 4.5vw, 18px)` }}
                        >
                            {subtitle}
                        </h2>
                        <p
                            className="text-slate-500 font-medium leading-relaxed max-w-[90%]"
                            style={{ fontSize: `clamp(12px, 3.5vw, 16px)` }}
                        >
                            {description}
                        </p>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div variants={itemVariants} className="flex justify-center w-full px-4 mb-14">
                        <Magnetic>
                            <a
                                href="#contact"
                                className="group relative overflow-hidden px-10 py-5 bg-[#007f94] text-white font-bold rounded-full shadow-[0_15px_35px_rgba(0,127,148,0.3)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,127,148,0.45)] hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-3 text-base md:text-xl w-full max-w-[340px] md:max-w-none"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
                                <span className="relative z-10">{buttonPrimary}</span>
                                <ArrowUpRight className="w-5 h-5 opacity-90 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
                            </a>
                        </Magnetic>
                    </motion.div>

                </div>
            </motion.div>

            <motion.div
                className="w-full relative z-20 container mx-auto px-4 mt-auto border-t border-slate-200/60 pt-4 md:pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
            >
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-x-12 pb-6 md:pb-0">
                    {(benefits || []).map((item: any, i: number) => {
                        const Icon = ICON_POOL[item.icon] || ICON_POOL.Activity;
                        return (
                            <div key={i} className="flex items-center gap-2.5 group whitespace-nowrap">
                                <div className="w-8 h-8 rounded-full bg-[#007f94]/5 flex items-center justify-center text-[#007f94] transition-colors group-hover:bg-[#007f94]/10 border border-[#007f94]/10">
                                    <Icon className="w-4 h-4 stroke-[2.5]" />
                                </div>
                                <span className="text-[11px] md:text-xs font-bold text-slate-600 tracking-wide group-hover:text-slate-800 transition-colors uppercase">{item.text}</span>
                            </div>
                        );
                    })}
                </div>
            </motion.div>

        </section>
    );
};

export default Hero;
