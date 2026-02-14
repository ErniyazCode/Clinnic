import React from 'react';
import { Search, Activity, ClipboardCheck } from 'lucide-react';
import FadeIn from './common/FadeIn';

const ValueBlock = () => {
    const methods = [
        {
            title: 'Комплексная диагностика',
            desc: 'Полный скрининг систем организма с использованием передовых технологий.',
            icon: Search
        },
        {
            title: 'Анализ причин, а не симптомов',
            desc: 'Изучаем корень проблемы, рассматривая организм как целостную систему.',
            icon: Activity
        },
        {
            title: 'Персональный план восстановления',
            desc: 'Четкие рекомендации и протоколы лечения для достижения реального результата.',
            icon: ClipboardCheck
        }
    ];

    return (
        <section id="value" className="py-12 md:py-24 bg-[#f8fafc] font-['Roboto'] overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-10 md:mb-20">
                    <FadeIn direction="up" duration={0.6}>
                        {/* Visualization */}
                        <div className="flex justify-center gap-2 mb-8">
                            {[...Array(10)].map((_, i) => (
                                <FadeIn key={i} delay={i * 0.05} duration={0.3} className="inline-block">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={i < 8 ? "#007f94" : "#ef4444"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </FadeIn>
                            ))}
                        </div>

                        <h2 className="text-2xl xs:text-3xl md:text-5xl font-bold text-[#0a1e2b] mb-6 leading-tight tracking-tight max-w-4xl mx-auto">
                            80% заболеваний можно предотвратить, <br />
                            <span className="text-[#007f94]">если обнаружить их на ранней стадии</span>
                        </h2>
                        <div className="space-y-4">
                            <p className="text-sm md:text-2xl text-slate-800 font-bold leading-relaxed mb-1 md:mb-2">
                                Найдём причину ваших симптомов, а не будем лечить их годами
                            </p>
                            <p className="text-[11px] md:text-lg text-slate-500 max-w-2xl mx-auto opacity-70">
                                Персонализированная диагностика и план восстановления за 1 визит
                            </p>
                        </div>
                    </FadeIn>
                </div>

                {/* Methods Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 mb-12 md:mb-20">
                    {methods.map((method, i) => (
                        <FadeIn
                            key={i}
                            delay={i * 0.1}
                            duration={0.5}
                            className={`bg-white p-4 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-[#007f94]/5 transition-all duration-500 ${i === 2 ? 'col-span-2 md:col-span-1' : ''}`}
                        >
                            <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-[#007f94]/5 flex items-center justify-center text-[#007f94] mb-4 md:mb-8">
                                <method.icon size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-sm md:text-2xl font-bold text-slate-900 mb-1 md:mb-4">{method.title}</h3>
                            <p className="text-slate-500 text-xs md:text-base font-medium leading-snug md:leading-relaxed">{method.desc}</p>
                        </FadeIn>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="flex justify-center">
                    <FadeIn delay={0.2} duration={0.6}>
                        <div className="bg-[#0a1e2b] text-white px-5 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl shadow-xl shadow-slate-900/20 max-w-[90%] md:max-w-2xl text-center">
                            <p className="text-[11px] md:text-lg font-medium leading-tight md:leading-normal">
                                Теперь не нужно ехать в Турцию, чтобы получить консультацию врача международного уровня.
                            </p>
                        </div>
                    </FadeIn>
                </div>

            </div>
        </section>
    );
};

export default ValueBlock;
