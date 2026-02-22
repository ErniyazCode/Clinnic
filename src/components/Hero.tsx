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
            className="relative flex flex-col items-center justify-center min-h-[100svh] pt-32 pb-16 bg-[#fafcff] overflow-hidden"
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
                className="container mx-auto px-4 relative z-10 w-full flex-1 flex flex-col justify-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ y, opacity }}
            >
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto w-full">

                    {/* Clean Badge */}
                    <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6 md:mb-10 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-700">{badgeTR}</span>
                        </div>
                        <div className="w-[1px] h-3 bg-slate-300"></div>
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c2e0] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00c2e0]"></span>
                            </span>
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-700">{badgeKZ}</span>
                        </div>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-[clamp(2rem,7vw,4.5rem)] font-extrabold text-[#0a1e2b] tracking-tight leading-[1.1] mb-6 max-w-4xl text-balance whitespace-pre-line"
                    >
                        <HighlightedText text={title} />
                    </motion.h1>

                    {/* Subtext and Description */}
                    <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 mb-10 max-w-2xl px-4">
                        <h2 className="text-sm md:text-base font-bold text-[#007f94] tracking-widest uppercase text-balance">
                            {subtitle}
                        </h2>
                        <p className="text-slate-500 text-base md:text-xl leading-relaxed text-balance font-medium">
                            {description}
                        </p>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full px-6 sm:px-0 mb-16 shrink-0">
                        <Magnetic>
                            <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-[#007f94] hover:bg-[#00c2e0] text-white font-bold rounded-2xl shadow-lg shadow-[#007f94]/20 transition-all flex items-center justify-center gap-2 text-base">
                                {buttonPrimary} <ArrowUpRight className="w-5 h-5 opacity-90" />
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a href="#about" className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-[#0a1e2b] hover:border-[#007f94] hover:bg-slate-50 rounded-2xl transition-all flex items-center justify-center text-base font-bold shadow-sm">
                                {buttonSecondary}
                            </a>
                        </Magnetic>
                    </motion.div>

                </div>
            </motion.div>

            {/* Clean Benefit Bar */}
            <motion.div
                className="w-full relative z-20 container mx-auto px-4 mt-auto border-t border-slate-200/50 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
            >
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-12">
                    {(benefits || []).map((item: any, i: number) => {
                        const Icon = ICON_POOL[item.icon] || ICON_POOL.Activity;
                        return (
                            <div key={i} className="flex items-center gap-2 md:gap-3 group">
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#007f94]/5 flex items-center justify-center text-[#007f94]">
                                    <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[2.5]" />
                                </div>
                                <span className="text-xs md:text-sm font-bold text-slate-600 tracking-wide">{item.text}</span>
                            </div>
                        );
                    })}
                </div>
            </motion.div>

        </section>
    );
};

export default Hero;
