import React from 'react';
import { Stethoscope, Scan, ClipboardCheck, ArrowRight } from 'lucide-react';
import FadeIn from './common/FadeIn';
import Magnetic from './common/Magnetic';
import { motion } from 'framer-motion';
import HighlightedText from './common/HighlightedText';

const ProcessBlock = ({ data, ui }: { data: any, ui?: any }) => {
    const {
        badge = 'Ваш путь к здоровью',
        title = 'Как проходит \n приём у эксперта',
        ctaTitle = 'Получите второе мнение \n бесценного уровня',
        ctaDesc = 'Запишитесь на консультацию сегодня и получите персональный план лечения в течение 24 часов.',
        ctaButton = 'Записаться сейчас',
        image = 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=800',
        titleSize = 48,
        descSize = 18,
        padding = 80,
        steps,
        stepTitleSize = 24,
        stepDescSize = 16
    } = data || {};

    const ICONS = [Stethoscope, Scan, ClipboardCheck];
    const COLORS = ['bg-blue-50 text-blue-600', 'bg-indigo-50 text-indigo-600', 'bg-teal-50 text-teal-600'];

    const partnersList = [
        { name: 'Bupa', logo: '/partners/bupa-international-health-insurance.jpg' },
        { name: 'Cigna', logo: '/partners/cigna-global.jpg' },
        { name: 'AXA', logo: '/partners/axa_logo_solid_rgb1080.png' },
        { name: 'Aetna', logo: '/partners/logo-aetna.png' },
        { name: 'Allianz', logo: '/partners/insurancecompanies_20210209094545464_large.webp' }
    ];

    return (
        <section
            id="process"
            style={{ paddingTop: `${padding}px`, paddingBottom: `${padding}px` }}
            className="relative bg-white overflow-hidden"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto mb-16 md:mb-24 text-center">
                    <FadeIn>
                        <span className="text-[#007f94] font-bold tracking-widest uppercase text-sm mb-2 md:mb-3 block">{badge}</span>
                        <h2
                            style={{ fontSize: `${titleSize}px` }}
                            className="font-bold text-[#0a1e2b] leading-[1.1] tracking-tighter whitespace-pre-line text-[clamp(1.75rem,5vw,1000px)] mb-4 md:mb-6"
                        >
                            <HighlightedText text={title} />
                        </h2>
                    </FadeIn>
                </div>

                <div className="relative max-w-5xl mx-auto py-8 md:py-16">
                    {/* Vertical connecting line using SVG from bottom to top */}
                    <div className="absolute left-[3.5rem] md:left-1/2 top-0 bottom-0 w-1 md:-ml-0.5 z-0" style={{ transform: 'scale(1, -1)' }}>
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 4 100">
                            <motion.path
                                d="M 2 0 L 2 100"
                                stroke="url(#process-gradient)"
                                strokeWidth="4"
                                strokeDasharray="1 1"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true, margin: "-20%" }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                            <defs>
                                <linearGradient id="process-gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#007f94" />
                                    <stop offset="100%" stopColor="#3b82f6" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <div className="space-y-16 md:space-y-24 relative z-10 flex flex-col">
                        {(steps || []).map((step: any, index: number) => {
                            // Reverse color and icon assignments to match the original logical order 
                            // even though array is reversed in JSON to appear bottom-to-top.
                            const originalIndex = (steps.length - 1 - index);
                            const Icon = ICONS[originalIndex % ICONS.length];
                            const color = COLORS[originalIndex % COLORS.length];

                            const isEven = index % 2 === 0;
                            // Add delays so steps appear in sequence from bottom to top
                            const animationDelay = originalIndex * 0.3;

                            return (
                                <FadeIn key={index} delay={animationDelay} direction="up" className="relative group">
                                    <div className={`flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>

                                        <div className="flex-1 w-full pl-28 md:pl-0 md:px-12 text-left">
                                            <div className={`bg-white p-6 md:p-8 rounded-[2rem] shadow-xl shadow-blue-900/5 group-hover:shadow-[#007f94]/10 transition-all duration-300 border border-slate-100 relative ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                                                <h3
                                                    style={{ fontSize: `${stepTitleSize}px` }}
                                                    className="font-bold text-[#0a1e2b] mb-3 group-hover:text-[#007f94] transition-colors"
                                                >
                                                    {step.title}
                                                </h3>
                                                <p
                                                    style={{ fontSize: `${stepDescSize}px` }}
                                                    className="text-slate-500 leading-relaxed font-medium"
                                                >
                                                    {step.desc}
                                                </p>
                                                {/* Connecting horizontal line to icon on desktop */}
                                                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-[2px] bg-gradient-to-r from-blue-100 to-indigo-100 ${isEven ? '-left-12' : '-right-12'}`}></div>
                                            </div>
                                        </div>

                                        <div className="absolute left-6 md:static md:mx-auto md:my-0 flex-shrink-0 z-10">
                                            <div className={`w-16 h-16 md:w-24 md:h-24 ${color} rounded-full flex items-center justify-center relative transition-transform duration-500 group-hover:scale-110 shadow-lg shadow-blue-900/10 border-[6px] border-white`}>
                                                <Icon className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
                                                <div className="absolute -top-2 -right-2 md:-top-1 md:-right-2 w-7 h-7 md:w-9 md:h-9 bg-[#0a1e2b] text-white rounded-full flex items-center justify-center font-bold text-xs md:text-sm border-2 border-white shadow-md">
                                                    {step.num}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 w-full hidden md:block"></div>
                                    </div>
                                </FadeIn>
                            );
                        })}
                    </div>
                </div>

                {/* Integrated CTA Block */}
                <FadeIn
                    direction="up"
                    delay={0.2}
                    duration={0.7}
                    className="relative bg-[#0a1e2b] rounded-2xl md:rounded-[4rem] overflow-hidden p-8 md:p-10 lg:p-20 mt-20"
                >
                    {/* Background graphics */}
                    <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
                        <div className="absolute top-[-20%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#007f94]/20 rounded-full blur-[60px] md:blur-[120px]" />
                        <div className="absolute bottom-[-20%] left-[-10%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-blue-500/10 rounded-full blur-[50px] md:blur-[100px]" />
                    </div>

                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-[1.1] tracking-tighter whitespace-pre-line">
                                <HighlightedText text={ctaTitle} />
                            </h3>
                            <p className="text-slate-400 font-medium mb-10 md:mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed whitespace-pre-line">
                                {ctaDesc}
                            </p>

                            <div className="flex justify-center lg:justify-start">
                                <Magnetic>
                                    <a
                                        href="#contact"
                                        className="inline-flex items-center gap-2 px-10 py-5 bg-[#007f94] text-white font-bold rounded-full shadow-2xl hover:scale-105 transition-all text-lg"
                                    >
                                        {ctaButton} <ArrowRight size={20} />
                                    </a>
                                </Magnetic>
                            </div>
                        </div>

                        {/* Partners Display on Right */}
                        <div className="relative flex flex-col items-center">
                            <div className="mb-10 flex items-center gap-3">
                                <div className="h-[1px] w-8 bg-[#007f94]" />
                                <span className="text-[#007f94] font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">{ui?.partners?.title || 'Наши партнеры'}</span>
                                <div className="h-[1px] w-8 bg-[#007f94]" />
                            </div>

                            <div className="grid grid-cols-2 gap-6 md:gap-10 items-center justify-items-center max-w-[400px] md:max-w-[600px] mx-auto">
                                {partnersList.map((partner, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`relative group ${partner.name === 'AXA' ? 'col-span-2 flex justify-center -my-2 md:-my-4 z-10' : ''}`}
                                    >
                                        <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-white p-2 md:p-4 flex items-center justify-center shadow-xl overflow-hidden border border-white/10 transition-transform duration-500 hover:scale-105">
                                            <img
                                                src={partner.logo}
                                                alt={partner.name}
                                                className="w-full h-full object-contain scale-110 md:scale-125"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                    const parent = target.parentElement;
                                                    if (parent) {
                                                        const span = document.createElement('span');
                                                        span.innerText = partner.name;
                                                        span.className = 'text-slate-900 font-bold text-xs md:text-sm text-center';
                                                        parent.appendChild(span);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default ProcessBlock;
