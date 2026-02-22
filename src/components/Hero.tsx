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
        title = 'Ведущие врачи из *Турции* \nтеперь принимают в Алматы',
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

    return (
        <section
            ref={containerRef}
            id="hero"
            className="relative flex flex-col items-center justify-center min-h-[100svh] pt-24 md:pt-32 pb-8 overflow-hidden bg-gradient-to-b from-[#fafcff] to-white"
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
                        className="font-bold text-[#0a1e2b] tracking-tighter leading-[1.1] mb-6 max-w-4xl text-balance whitespace-pre-line mx-auto text-[clamp(1.75rem,5vw,1000px)]"
                        style={{ fontSize: `${titleSize}px` }}
                    >
                        <HighlightedText text={title} />
                    </motion.h1>

                    {/* Subtext and Description */}
                    <motion.div variants={itemVariants} className="flex flex-col items-center gap-3 mb-8 max-w-2xl px-4 mx-auto">
                        <h2
                            className="font-black text-[#007f94] tracking-[0.15em] uppercase text-balance"
                            style={{ fontSize: `${subtitleSize}px` }}
                        >
                            {subtitle}
                        </h2>
                        <p
                            className="text-slate-500 leading-relaxed text-balance font-medium text-sm md:text-base"
                            style={{ fontSize: `${descSize}px` }}
                        >
                            {description}
                        </p>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full px-6 sm:px-0 mb-8 shrink-0">
                        <Magnetic>
                            <a href="#contact" className="w-full sm:w-auto px-7 py-3.5 bg-[#007f94] hover:bg-[#00c2e0] text-white font-bold rounded-xl shadow-lg shadow-[#007f94]/20 transition-all flex items-center justify-center gap-2 text-sm md:text-base">
                                {buttonPrimary} <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 opacity-90" />
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a href="#about" className="w-full sm:w-auto px-7 py-3.5 bg-white border border-slate-200 text-[#0a1e2b] hover:border-[#007f94] hover:bg-slate-50 rounded-xl transition-all flex items-center justify-center text-sm md:text-base font-bold shadow-sm">
                                {buttonSecondary}
                            </a>
                        </Magnetic>
                    </motion.div>

                </div>
            </motion.div>

            {/* Clean Benefit Bar */}
            <motion.div
                className="w-full relative z-20 container mx-auto px-4 mt-auto border-t border-slate-200/60 pt-4 md:pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
            >
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:gap-x-12">
                    {(benefits || []).map((item: any, i: number) => {
                        const Icon = ICON_POOL[item.icon] || ICON_POOL.Activity;
                        return (
                            <div key={i} className="flex items-center gap-2 group">
                                <div className="w-7 h-7 rounded-full bg-[#007f94]/5 flex items-center justify-center text-[#007f94] transition-colors group-hover:bg-[#007f94]/10">
                                    <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
                                </div>
                                <span className="text-[10px] md:text-xs font-bold text-slate-600 tracking-wide group-hover:text-slate-800 transition-colors uppercase">{item.text}</span>
                            </div>
                        );
                    })}
                </div>
            </motion.div>

        </section>
    );
};

export default Hero;
