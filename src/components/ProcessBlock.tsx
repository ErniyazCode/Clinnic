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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line */}
                    <div className="absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-100 hidden md:block" />

                    {(steps || []).map((step: any, index: number) => {
                        const Icon = ICONS[index % ICONS.length];
                        const color = COLORS[index % COLORS.length];

                        return (
                            <FadeIn key={index} delay={index * 0.2} direction="up" className="relative group">
                                <div className={`w-24 h-24 ${color} rounded-3xl flex items-center justify-center mb-8 mx-auto relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-blue-900/5`}>
                                    <Icon size={40} strokeWidth={1.5} />
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#0a1e2b] text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">
                                        {step.num}
                                    </div>
                                </div>
                                <div className="text-center px-4">
                                    <h3
                                        style={{ fontSize: `${stepTitleSize}px` }}
                                        className="font-bold text-[#0a1e2b] mb-4 group-hover:text-[#007f94] transition-colors"
                                    >
                                        {step.title}
                                    </h3>
                                    <p
                                        style={{ fontSize: `${stepDescSize}px` }}
                                        className="text-slate-500 leading-relaxed font-medium"
                                    >
                                        {step.desc}
                                    </p>
                                </div>
                            </FadeIn>
                        );
                    })}
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

                            <div className="grid grid-cols-2 gap-4 md:gap-6 items-center justify-items-center max-w-[260px] md:max-w-[300px] mx-auto">
                                {partnersList.map((partner, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`relative group ${partner.name === 'AXA' ? 'col-span-2 flex justify-center -my-2 md:-my-4 z-10' : ''}`}
                                    >
                                        <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white p-4 md:p-6 flex items-center justify-center shadow-xl overflow-hidden border border-white/10 transition-transform duration-500 hover:scale-105">
                                            <img
                                                src={partner.logo}
                                                alt={partner.name}
                                                className="w-full h-full object-contain"
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
