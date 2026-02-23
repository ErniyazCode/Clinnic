import React from 'react';
import {
    Bone,
    Zap,
    Activity,
    Search,
    Beaker,
    Sparkles,
    HeartPulse,
    ArrowRight,
    Star,
    CheckCircle2
} from 'lucide-react';
import { ICON_POOL } from '../lib/icons';
import FadeIn from './common/FadeIn';
import Magnetic from './common/Magnetic';
import HighlightedText from './common/HighlightedText';

const Directions = ({ data }: { data: any }) => {
    const {
        badge = 'Medical Hub',
        title = 'Медицинская \n экспертиза',
        titleSize = 48,
        padding = 80,
        specialties,
        cardTitleSize = 20,
        cardDescSize = 14,
        subTitle = 'Совмещаем турецкий опыт и международные золотые стандарты диагностики.',
        subTitleSize = 14
    } = data || {};

    const ICONS = [Bone, Zap, Activity, Search, Beaker, Sparkles, HeartPulse];
    const COLORS = ['blue', 'teal', 'indigo', 'brand', 'cyan', 'rose', 'orange'];

    const colorMap: any = {
        blue: 'hover:border-blue-500/50 bg-blue-50/30',
        teal: 'hover:border-[#007f94]/50 bg-[#007f94]/5',
        indigo: 'hover:border-indigo-500/50 bg-indigo-50/30',
        brand: 'hover:border-[#007f94]/50 bg-[#007f94]/5',
        cyan: 'hover:border-cyan-500/50 bg-cyan-50/30',
        rose: 'hover:border-rose-500/50 bg-rose-50/30',
        orange: 'hover:border-orange-500/50 bg-orange-50/30',
    };

    const items = specialties || [];

    return (
        <section
            id="expertise"
            style={{
                paddingTop: `clamp(${padding * 0.4}px, 10vh, ${padding}px)`,
                paddingBottom: `clamp(${padding * 0.4}px, 10vh, ${padding}px)`
            }}
            className="bg-white overflow-hidden"
        >
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-20">
                    <FadeIn
                        direction="right"
                        duration={0.8}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-3 mb-2 md:mb-3">
                            <span className="w-8 md:w-12 h-[2px] bg-[#007f94]" />
                            <span className="text-[#007f94] font-bold uppercase tracking-widest text-xs md:text-sm">{badge}</span>
                        </div>
                        <h2
                            style={{ fontSize: `clamp(${Math.max(24, titleSize * 0.6)}px, 8vw, ${titleSize}px)` }}
                            className="font-bold text-[#0a1e2b] leading-[1.05] tracking-tighter mb-4 md:mb-6 whitespace-pre-line"
                        >
                            <HighlightedText text={title} />
                        </h2>
                    </FadeIn>

                    <FadeIn
                        direction="left"
                        duration={0.8}
                        className="hidden lg:block pb-2"
                    >
                        <p
                            style={{ fontSize: `clamp(${Math.max(12, subTitleSize * 0.8)}px, 3vw, ${subTitleSize}px)` }}
                            className="text-slate-400 font-medium max-w-[240px] leading-relaxed text-right"
                        >
                            <HighlightedText text={subTitle} />
                        </p>
                    </FadeIn>
                </div>

                {/* Grid - 2 columns on Mobile */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                    {items.map((item: any, i: number) => {
                        const Icon = (item.icon && ICON_POOL[item.icon]) ? ICON_POOL[item.icon] : ICONS[i % ICONS.length];
                        const colorKey = COLORS[i % COLORS.length];
                        const colorClass = colorMap[colorKey] || colorMap.blue;

                        return (
                            <FadeIn
                                key={i}
                                delay={i * 0.05}
                                duration={0.5}
                                className={`group relative p-4 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-slate-100 transition-[box-shadow,border-color,background-color] duration-500 hover:shadow-2xl hover:shadow-slate-200/50 flex flex-col justify-between ${colorClass}`}
                            >
                                {/* Decorative elements */}
                                <div className="absolute top-3 right-3 md:top-6 md:right-6 opacity-5 group-hover:opacity-20 transition-opacity">
                                    <Icon size={40} className="md:w-[80px] md:h-[80px]" strokeWidth={1} />
                                </div>

                                <div className="relative z-10">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-3 mb-3 md:mb-8">
                                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#0a1e2b] group-hover:scale-110 group-hover:bg-[#007f94] group-hover:text-white transition-all duration-500">
                                            <Icon size={20} className="md:w-[28px] md:h-[28px]" strokeWidth={1.5} />
                                        </div>
                                    </div>

                                    <h3
                                        style={{ fontSize: `clamp(${Math.max(16, cardTitleSize * 0.8)}px, 4.5vw, ${cardTitleSize}px)` }}
                                        className="font-black text-slate-900 mb-2 md:mb-6 group-hover:translate-x-1 transition-transform leading-tight break-words"
                                    >
                                        <HighlightedText text={item.title} />
                                    </h3>

                                    <div className="space-y-1 md:space-y-3 mb-2 md:mb-8">
                                        {item.desc ? (
                                            String(item.desc).split('\n').map((feat: string, idx: number) => (
                                                <div key={idx} className="flex items-start gap-1.5 md:gap-2 text-slate-600 font-medium">
                                                    <CheckCircle2 size={12} className="min-w-[12px] md:w-[14px] md:h-[14px] text-[#007f94] mt-0.5" />
                                                    <span
                                                        style={{ fontSize: `clamp(${Math.max(12, cardDescSize * 0.85)}px, 3.5vw, ${cardDescSize}px)` }}
                                                        className="leading-snug"
                                                    >
                                                        <HighlightedText text={feat} />
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-slate-400 text-xs">Нет описания</p>
                                        )}
                                    </div>
                                </div>

                                <div className="relative z-10 pt-4 md:pt-4 border-t border-slate-200/50 flex items-center justify-between">
                                    <span className="text-xs md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Подробнее</span>
                                    <Magnetic>
                                        <button className="w-10 h-10 md:w-10 md:h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#0a1e2b] group-hover:text-white transition-all duration-300">
                                            <ArrowRight size={18} className="md:w-[18px] md:h-[18px]" />
                                        </button>
                                    </Magnetic>
                                </div>
                            </FadeIn>
                        );
                    })}

                    {/* Final CTA Card - Takes full width on mobile or 2 cols on tablet */}
                    <FadeIn
                        delay={0.4}
                        className="bg-[#0a1e2b] rounded-3xl md:rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between text-white relative overflow-hidden group shadow-2xl h-full col-span-2 sm:col-span-2 md:col-span-1"
                    >
                        {/* Decorative background circle */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#007f94]/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10">
                            <p className="text-[#007f94]/70 font-bold text-[10px] uppercase tracking-[0.3em] mb-3 md:mb-4">Клиентский сервис</p>
                            <h3 className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-6 leading-tight">Не нашли <br /> решение?</h3>
                            <p className="text-slate-400 text-sm md:text-sm font-medium leading-relaxed">Наши эксперты помогут подобрать программу под ваш запрос.</p>
                        </div>

                        <div className="relative z-10 mt-8 md:mt-12 flex items-center justify-between">
                            <Magnetic>
                                <a href="#contact" className="px-6 md:px-8 py-3 md:py-3 bg-[#007f94] text-white font-black text-xs md:text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-all shadow-xl shadow-[#007f94]/20">
                                    Консультация
                                </a>
                            </Magnetic>
                            <ArrowRight size={24} className="md:w-[24px] md:h-[24px] text-white/20 group-hover:text-white transition-colors" />
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default Directions;
