import React from 'react';
import { Globe, BookOpen, ShieldCheck, Microscope, CheckCircle2 } from 'lucide-react';
import FadeIn from './common/FadeIn';
import Magnetic from './common/Magnetic';
import HighlightedText from './common/HighlightedText';

const WhyDifferent = ({ data, ui }: { data: any, ui?: any }) => {
    const {
        badge = 'Стандарты качества',
        title = 'Почему это \n другой уровень консультации',
        quote = '«Мы привезли в Алматы концепцию второго мнения, которая спасает жизни».',
        verdictTitle = 'Это не формальный приём. \n Это экспертное решение.',
        image = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000',
        titleSize = 48,
        descSize = 18,
        padding = 80
    } = data || {};

    const ICONS = [Globe, BookOpen, ShieldCheck, Microscope];

    const facts = data?.facts || [
        {
            text: 'врачи с международным клиническим опытом',
            desc: 'Наши специалисты прошли практику в ведущих центрах мира и говорят на языке глобальной медицины.'
        },
        {
            text: 'подход, основанный на доказательной медицине',
            desc: 'Никаких догадок. Только решения, эффективность которых подтверждена научными исследованиями.'
        },
        {
            text: 'протоколы лечения (Турция, Европа, США)',
            desc: 'Мы используем те же стандарты, по которым работают топовые клиники Стамбула, Лондона и Нью-Йорка.'
        },
        {
            text: 'практический опыт в сложных случаях',
            desc: 'Специализируемся на диагностике, когда другие разводят руками. Глубокий анализ каждой детали.'
        }
    ];

    return (
        <section
            id="why-different"
            style={{
                paddingTop: `clamp(${padding * 0.4}px, 10vh, ${padding}px)`,
                paddingBottom: `clamp(${padding * 0.4}px, 10vh, ${padding}px)`
            }}
            className="py-12 md:py-24 bg-[#f8fafc] overflow-hidden"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 lg:items-stretch">

                    {/* Visual Side */}
                    <FadeIn
                        direction="right"
                        duration={1}
                        className="w-full lg:w-1/2 relative order-1 lg:order-1 flex flex-col"
                    >
                        {/* Decorative Offset Border */}
                        <div className="absolute top-4 left-4 w-full h-full rounded-2xl md:rounded-[3rem] border-2 border-[#007f94]/10 z-0 lg:translate-x-4 lg:translate-y-4" />

                        <div className="relative z-10 rounded-2xl md:rounded-[3rem] overflow-hidden aspect-[3/4] lg:aspect-auto lg:h-full lg:absolute lg:inset-0 shadow-xl md:shadow-2xl">
                            <img
                                src={image}
                                className="w-full h-full object-cover object-center"
                                alt="Expert Medical Analysis"
                                onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000'}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e2b]/90 via-transparent to-transparent" />

                            {/* Floating Quote/Statement */}
                            <FadeIn
                                direction="up"
                                delay={0.5}
                                duration={0.8}
                                className="absolute bottom-3 left-3 right-3 md:bottom-10 md:left-10 md:right-10 p-4 md:p-8 bg-white/10 backdrop-blur-md rounded-xl md:rounded-3xl border border-white/20"
                            >
                                <p className="text-white text-xs md:text-2xl font-semibold leading-tight whitespace-pre-line">
                                    <HighlightedText text={quote} />
                                </p>
                            </FadeIn>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#007f94]/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl" />
                    </FadeIn>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 order-2 lg:order-2">
                        <FadeIn direction="left" duration={0.8}>
                            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-8">
                                <div className="h-[1px] w-8 md:w-12 bg-[#007f94]" />
                                <span className="text-[#007f94] font-extrabold uppercase tracking-widest text-xs md:text-sm">{badge}</span>
                            </div>

                            <h2
                                style={{ fontSize: `clamp(${Math.max(24, titleSize * 0.6)}px, 8vw, ${titleSize}px)` }}
                                className="font-extrabold text-[#0a1e2b] leading-[1.1] tracking-tighter mb-6 md:mb-10 whitespace-pre-line text-[clamp(1.75rem,5vw,1000px)]"
                            >
                                <HighlightedText text={title} />
                            </h2>

                            <div className="space-y-6 md:space-y-8 mb-8 md:mb-12">
                                {facts.map((fact: any, i: number) => {
                                    const Icon = ICONS[i % ICONS.length];
                                    return (
                                        <FadeIn
                                            key={i}
                                            direction="left"
                                            delay={i * 0.1}
                                            style={{}}
                                            className="flex gap-4 md:gap-6 group"
                                        >
                                            <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-lg md:rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-[#007f94] group-hover:bg-[#007f94] group-hover:text-white transition-all duration-300">
                                                <Icon size={20} className="md:w-6 md:h-6" strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <h3 className="text-sm md:text-lg font-semibold text-slate-900 mb-1 md:mb-1 group-hover:text-[#007f94] transition-colors uppercase tracking-tight">
                                                    <HighlightedText text={fact.text} />
                                                </h3>
                                                <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-md">
                                                    <HighlightedText text={fact.desc} />
                                                </p>
                                            </div>
                                        </FadeIn>
                                    );
                                })}
                            </div>

                            <FadeIn
                                direction="up"
                                delay={0.3}
                                className="p-6 md:p-8 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl md:rounded-[2.5rem] relative overflow-hidden group"
                            >
                                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                                    <div>
                                        <h4
                                            className="text-white font-bold text-[clamp(1.05rem,1.85vw,1.55rem)] leading-[1.22] tracking-[-0.01em] whitespace-pre-line max-w-3xl"
                                        >
                                            <HighlightedText text={verdictTitle} />
                                        </h4>
                                    </div>
                                    <Magnetic>
                                        <a href="#contact" className="px-6 md:px-8 py-3 md:py-4 text-center bg-white text-red-700 font-semibold text-sm md:text-base rounded-xl md:rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-red-900/20 whitespace-nowrap w-full md:w-auto">
                                            {ui?.navbar?.cta || 'Записаться'}
                                        </a>
                                    </Magnetic>
                                </div>

                                {/* Background detail */}
                                <CheckCircle2 className="absolute top-1/2 right-4 md:right-10 -translate-y-1/2 text-white/5 w-20 h-20 md:w-32 md:h-32 rotate-12" />
                            </FadeIn>
                        </FadeIn>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyDifferent;
