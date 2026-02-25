import React from 'react';
import { ArrowUpRight, MapPin, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import HighlightedText from './common/HighlightedText';

const Doctors = ({ data, ui }: { data: any, ui?: any }) => {
    const [showAll, setShowAll] = React.useState(false);

    const {
        badge = 'Команда',
        title = 'Ведущие врачи из Турции \n теперь в Алматы.',
        desc = 'Приём ведут специалисты с клиническим опытом работы в лучших госпиталях Стамбула.',
        titleSize = 48,
        descSize = 18,
        padding = 80,
        doctorsList,
        cardTitleSize = 24,
        cardDescSize = 14
    } = data || {};

    const items = doctorsList || [
        {
            name: 'Д-р Ахмет Кая',
            role: 'Кардиолог-хирург',
            years: '18 лет опыта',
            practice: 'Стамбульский университет',
            image: '/doctors/doctor-1.jpg'
        },
        {
            name: 'Д-р Мехмет Оз',
            role: 'Невролог',
            years: '15 лет опыта',
            practice: 'Клиника Acıbadem',
            image: '/doctors/doctor-2.jpg'
        },
        {
            name: 'Д-р Айше Демир',
            role: 'Эндокринолог',
            years: '20 лет опыта',
            practice: 'Американский госпиталь',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800'
        },
        {
            name: 'Д-р Фатих Террим',
            role: 'Гастроэнтеролог',
            years: '12 лет опыта',
            practice: 'Medical Park',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800'
        }
    ];

    const visibleItems = showAll ? items : items.slice(0, 3);

    return (
        <section
            id="doctors"
            style={{
                paddingTop: `clamp(${padding * 0.4}px, 10vh, ${padding}px)`,
                paddingBottom: `clamp(${padding * 0.4}px, 10vh, ${padding}px)`
            }}
            className="bg-slate-50 overflow-hidden relative"
        >
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Centered Header */}
                <div className="text-center max-w-4xl mx-auto mb-10 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="text-[#007f94] font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">{badge}</span>
                        <h2
                            style={{ fontSize: `clamp(${Math.max(24, titleSize * 0.6)}px, 8vw, ${titleSize}px)` }}
                            className="font-bold text-[#0a1e2b] leading-[1.1] tracking-tighter mb-8 whitespace-pre-line text-[clamp(1.75rem,5vw,1000px)]"
                        >
                            <HighlightedText text={title} />
                        </h2>
                        <p
                            style={{ fontSize: `clamp(${Math.max(14, descSize * 0.85)}px, 4vw, ${descSize}px)` }}
                            className="text-slate-500 max-w-2xl mx-auto leading-relaxed px-4 whitespace-pre-line"
                        >
                            {desc}
                        </p>
                    </motion.div>
                </div>

                {/* Doctors Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 mb-10 md:mb-16">
                    {visibleItems.map((doc: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-20px" }}
                            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.21, 1, 0.36, 1] }}
                            className="group flex flex-col items-center text-center w-full"
                        >
                            {/* Image Container */}
                            <div className="w-full aspect-[4/5] md:aspect-[3/4] mb-3 md:mb-8 overflow-hidden rounded-[1.2rem] md:rounded-[2.5rem] bg-slate-200 relative shadow-sm md:shadow-md group-hover:shadow-2xl transition-all duration-500">
                                <img
                                    src={doc.image}
                                    alt={doc.name}
                                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                                    onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800'}
                                />
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-[#007f94]/0 group-hover:bg-[#007f94]/10 transition-colors duration-300" />
                                <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/90 backdrop-blur-md px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[7px] md:text-xs font-bold uppercase tracking-wider text-slate-900 shadow-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-300">
                                    {doc.years}
                                </div>
                            </div>

                            <h3
                                style={{ fontSize: `clamp(14px, 4.5vw, ${cardTitleSize}px)` }}
                                className="font-bold text-slate-900 mb-0.5 md:mb-2 leading-tight"
                            >
                                {doc.name}
                            </h3>
                            <p
                                style={{ fontSize: `clamp(10px, 3.5vw, ${cardDescSize}px)` }}
                                className="text-[#007f94] font-medium mb-1 md:mb-4 leading-tight"
                            >
                                {doc.role}
                            </p>

                            <div className="flex flex-col items-center justify-center gap-1 text-[8px] md:text-sm text-slate-400 mb-4 px-4">
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={12} className="text-[#007f94]/60" />
                                    <span className="font-medium tracking-tight uppercase text-[9px] md:text-[11px]">{doc.practice}</span>
                                </div>
                            </div>

                            {doc.bio && (
                                <div className="relative mb-6 px-6 group/bio">
                                    {/* Quote Decor */}
                                    <div className="absolute left-4 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-[#007f94]/40 via-[#007f94]/10 to-transparent rounded-full" />
                                    <p className="text-[11px] md:text-[13px] text-slate-600 leading-relaxed text-left pl-2 italic font-light opacity-90 transition-opacity group-hover:opacity-100 whitespace-pre-line">
                                        {doc.bio}
                                    </p>
                                </div>
                            )}

                            <div className="mt-auto pt-2 pb-2">
                                <a
                                    href="#contact"
                                    className="group/btn relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] md:text-sm font-bold text-[#007f94] transition-all duration-300 hover:bg-[#007f94] hover:text-white border border-[#007f94]/20 hover:border-[#007f94] overflow-hidden"
                                >
                                    <span className="relative z-10">{ui?.navbar?.cta || 'Записаться'}</span>
                                    <ArrowUpRight size={14} className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-full border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all w-full md:w-auto justify-center"
                    >
                        {showAll ? (ui?.doctors?.showLess || 'Скрыть лишних') : (ui?.doctors?.showAll || 'Посмотреть всех врачей')} <ArrowUpRight size={18} className={showAll ? 'rotate-180' : ''} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Doctors;
