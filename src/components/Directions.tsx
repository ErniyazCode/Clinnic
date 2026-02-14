import React from 'react';
import {
    Bone,
    Zap,
    Activity,
    Search,
    Beaker,
    Sparkles,
    Pizza,
    ArrowRight,
    Star,
    CheckCircle2
} from 'lucide-react';
import FadeIn from './common/FadeIn';
import Magnetic from './common/Magnetic';

const Directions = () => {
    const specialties = [
        {
            title: 'Ортопедия',
            icon: Bone,
            stats: '15+ лет практики',
            features: ['Лечение суставов', 'Позвоночник'],
            color: 'blue'
        },
        {
            title: 'Физиотерапия',
            icon: Zap,
            stats: 'Индивидуально',
            features: ['Реабилитация', 'Мануальная терапия'],
            color: 'teal'
        },
        {
            title: 'IV-терапия',
            icon: Activity,
            stats: 'Премиум составы',
            features: ['Детокс', 'Энергия & Иммунитет'],
            color: 'indigo'
        },
        {
            title: 'Чек-ап',
            icon: Search,
            stats: 'За 1 рабочий день',
            features: ['80 направлений', 'Полный отчет'],
            color: 'brand'
        },
        {
            title: 'Лаборатория',
            icon: Beaker,
            stats: 'Точность 99.9%',
            features: ['Генетика', 'Биохимия'],
            color: 'cyan'
        },
        {
            title: 'Косметология',
            icon: Sparkles,
            stats: 'Топ-аппараты',
            features: ['Омоложение', 'Уход'],
            color: 'rose'
        },
        {
            title: 'Диетология',
            icon: Pizza,
            stats: 'Биохакинг',
            features: ['План питания', 'Метаболизм'],
            color: 'orange'
        }
    ];

    const colorMap: any = {
        blue: 'hover:border-blue-500/50 bg-blue-50/30',
        teal: 'hover:border-[#007f94]/50 bg-[#007f94]/5',
        indigo: 'hover:border-indigo-500/50 bg-indigo-50/30',
        brand: 'hover:border-[#007f94]/50 bg-[#007f94]/5',
        cyan: 'hover:border-cyan-500/50 bg-cyan-50/30',
        rose: 'hover:border-rose-500/50 bg-rose-50/30',
        orange: 'hover:border-orange-500/50 bg-orange-50/30',
    };

    return (
        <section id="expertise" className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                    <FadeIn
                        direction="right"
                        duration={0.8}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-12 h-[2px] bg-[#007f94]" />
                            <span className="text-[#007f94] font-bold uppercase tracking-widest text-xs md:text-sm">Medical Hub</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-[#0a1e2b] leading-tight tracking-tight mb-8">
                            Медицинская <br />
                            <span className="text-[#007f94]">экспертиза</span>
                            <span className="text-slate-400 font-light italic ml-2 md:ml-3 text-2xl md:text-3xl tracking-normal block md:inline">— по ключевым направлениям</span>
                        </h2>
                    </FadeIn>

                    <FadeIn
                        direction="left"
                        duration={0.8}
                        className="hidden lg:block pb-2"
                    >
                        <p className="text-slate-400 font-medium max-w-[240px] text-sm leading-relaxed text-right">
                            Совмещаем турецкий опыт и международные золотые стандарты диагностики.
                        </p>
                    </FadeIn>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {specialties.map((item, i) => (
                        <FadeIn
                            key={i}
                            delay={i * 0.05}
                            duration={0.5}
                            className={`group relative p-4 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 h-full flex flex-col justify-between ${colorMap[item.color]}`}
                        >
                            {/* Decorative elements */}
                            <div className="absolute top-4 right-4 md:top-6 md:right-6 opacity-5 group-hover:opacity-20 transition-opacity">
                                <item.icon size={50} className="md:w-[80px] md:h-[80px]" strokeWidth={1} />
                            </div>

                            <div className="relative z-10">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 md:mb-8">
                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#0a1e2b] group-hover:scale-110 group-hover:bg-[#007f94] group-hover:text-white transition-all duration-500">
                                        <item.icon size={20} className="md:w-[28px] md:h-[28px]" strokeWidth={1.5} />
                                    </div>
                                    <div className="self-start md:self-auto flex items-center gap-1.5 px-2 py-1 md:px-3 md:py-1 bg-white/60 backdrop-blur-sm rounded-full border border-slate-100 shadow-sm">
                                        <Star size={10} className="md:w-[10px] md:h-[10px] text-yellow-500 fill-yellow-500" />
                                        <span className="text-[10px] md:text-xs font-black text-slate-600 uppercase tracking-tighter">{item.stats}</span>
                                    </div>
                                </div>

                                <h3 className="text-sm md:text-2xl font-black text-slate-900 mb-2 md:mb-6 group-hover:translate-x-1 transition-transform leading-tight break-words">{item.title}</h3>

                                <ul className="space-y-2 md:space-y-3 mb-4 md:mb-8">
                                    {item.features.map((feat, idx) => (
                                        <li key={idx} className="flex items-start gap-1.5 md:gap-2 text-slate-600 text-xs md:text-sm font-medium">
                                            <CheckCircle2 size={14} className="min-w-[14px] md:w-[14px] md:h-[14px] text-[#007f94] mt-0.5" />
                                            <span className="leading-snug">{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="relative z-10 pt-3 md:pt-4 border-t border-slate-200/50 flex items-center justify-between">
                                <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] hidden md:block">Подробнее</span>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest md:hidden">Детали</span>
                                <Magnetic>
                                    <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#0a1e2b] group-hover:text-white transition-all duration-300">
                                        <ArrowRight size={14} className="md:w-[18px] md:h-[18px]" />
                                    </button>
                                </Magnetic>
                            </div>
                        </FadeIn>
                    ))}

                    {/* Final CTA Card */}
                    <FadeIn
                        delay={0.4}
                        className="bg-[#0a1e2b] rounded-3xl md:rounded-[2.5rem] p-5 md:p-10 flex flex-col justify-between text-white relative overflow-hidden group shadow-2xl h-full col-span-2 md:col-span-1"
                    >
                        {/* Decorative background circle */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#007f94]/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10">
                            <p className="text-[#007f94]/70 font-bold text-[10px] uppercase tracking-[0.3em] mb-2 md:mb-4">Клиентский сервис</p>
                            <h3 className="text-xl md:text-3xl font-black text-white mb-3 md:mb-6 leading-tight">Не нашли <br /> решение?</h3>
                            <p className="text-slate-400 text-xs md:text-sm font-medium leading-relaxed">Наши эксперты помогут подобрать программу под ваш запрос.</p>
                        </div>

                        <div className="relative z-10 mt-6 md:mt-12 flex items-center justify-between">
                            <Magnetic>
                                <a href="#contact" className="px-6 md:px-8 py-2 md:py-3 bg-[#007f94] text-white font-black text-[10px] md:text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-all shadow-xl shadow-[#007f94]/20">
                                    Консультация
                                </a>
                            </Magnetic>
                            <ArrowRight size={18} className="md:w-[24px] md:h-[24px] text-white/20 group-hover:text-white transition-colors" />
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default Directions;
