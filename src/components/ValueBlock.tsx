import React from 'react';
import FadeIn from './common/FadeIn';
import HighlightedText from './common/HighlightedText';
import { ICON_POOL } from '../lib/icons';
import { Sparkles, User } from 'lucide-react';

const ValueBlock = ({ data }: { data: any }) => {
    const {
        title = '80% заболеваний можно предотвратить, если обнаружить их на ранней стадии',
        mainText = 'Найдём причину ваших симптомов, а не будем лечить их годами',
        subText = 'Персонализированная диагностика и план восстановления за 1 визит',
        titleSize = 48,
        descSize = 18,
        padding = 100,
        methods = [],
        methodTitleSize = 22,
        methodDescSize = 15,
        conclusion
    } = data || {};

    return (
        <section
            id="value"
            style={{ paddingTop: `${padding}px`, paddingBottom: `${padding}px` }}
            className="relative bg-white overflow-hidden"
        >
            {/* Subtle background detail */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,#007f94_0,transparent_25%)] opacity-[0.03]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,#007f94_0,transparent_25%)] opacity-[0.03]" />

            <div className="section-container relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
                    <FadeIn direction="up">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-xl shadow-slate-900/10">
                            <Sparkles size={14} className="text-[#007f94]" /> Эффективная профилактика
                        </div>
                        <h2
                            style={{ fontSize: `clamp(2rem, 5vw, ${titleSize}px)` }}
                            className="font-black text-[#0a1e2b] mb-8 leading-[1.05] tracking-tightest whitespace-pre-line"
                        >
                            <HighlightedText text={title} />
                        </h2>

                        {/* Infographic: 80% preventable (8 blue, 2 red) */}
                        <div className="flex justify-center gap-2 md:gap-4 mb-10 py-6 px-8 rounded-3xl bg-slate-50 border border-slate-100 max-w-fit mx-auto">
                            {[...Array(10)].map((_, i) => (
                                <User
                                    key={i}
                                    size={28}
                                    className={i < 8 ? "text-[#007f94]" : "text-red-500 opacity-60"}
                                    strokeWidth={3}
                                />
                            ))}
                        </div>

                        <div className="space-y-4 max-w-2xl mx-auto">
                            <p
                                style={{ fontSize: `${descSize + 4}px` }}
                                className="text-[#007f94] font-bold leading-relaxed whitespace-pre-line"
                            >
                                <HighlightedText text={mainText} />
                            </p>
                            <p
                                style={{ fontSize: `${descSize}px` }}
                                className="text-slate-500 font-medium leading-relaxed"
                            >
                                {subText}
                            </p>
                        </div>
                    </FadeIn>
                </div>

                {/* Methods Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {methods.map((item: any, index: number) => {
                        const Icon = ICON_POOL[item.icon] || ICON_POOL.Activity;
                        return (
                            <FadeIn key={index} delay={0.2 + index * 0.1} direction="up">
                                <div className="h-full p-8 md:p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-[#007f94]/30 hover:bg-white hover:shadow-2xl hover:shadow-[#007f94]/10 transition-all duration-500 group relative">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#007f94] mb-8 shadow-sm group-hover:scale-110 group-hover:bg-[#007f94] group-hover:text-white transition-all duration-500">
                                        <Icon size={32} strokeWidth={1.5} />
                                    </div>
                                    <h3
                                        style={{ fontSize: `${methodTitleSize}px` }}
                                        className="font-black text-[#0a1e2b] mb-4 tracking-tight group-hover:text-[#007f94] transition-colors"
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        style={{ fontSize: `${methodDescSize}px` }}
                                        className="text-slate-500 leading-relaxed font-medium"
                                    >
                                        {item.desc}
                                    </p>

                                    <span className="absolute top-8 right-8 text-slate-200/50 text-4xl font-black italic select-none">
                                        0{index + 1}
                                    </span>
                                </div>
                            </FadeIn>
                        );
                    })}
                </div>

                {conclusion && (
                    <FadeIn delay={0.5} direction="up" className="mt-16 md:mt-20 text-center">
                        <div className="inline-block px-8 py-5 rounded-[2rem] bg-[#007f94]/5 border border-[#007f94]/10">
                            <p className="text-[#007f94] font-black text-sm md:text-lg tracking-tight">
                                {conclusion}
                            </p>
                        </div>
                    </FadeIn>
                )}
            </div>
        </section>
    );
};

export default ValueBlock;
