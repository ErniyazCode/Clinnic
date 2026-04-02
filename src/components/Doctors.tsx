import React from 'react';
import { ArrowUpRight, MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HighlightedText from './common/HighlightedText';

const Doctors = ({ data, ui }: { data: any, ui?: any }) => {
    const [showAll, setShowAll] = React.useState(false);
    const [selectedDoctor, setSelectedDoctor] = React.useState<any>(null);

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

    const items = doctorsList || [];

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
                        <div className="inline-flex items-center gap-3 mb-4">
                            <span className="h-[1px] w-9 md:w-10 bg-[#007f94]/60" />
                            <span className="text-[#007f94] font-extrabold uppercase tracking-widest text-xs md:text-sm">{badge}</span>
                            <span className="h-[1px] w-9 md:w-10 bg-[#007f94]/60" />
                        </div>
                        <h2
                            style={{ fontSize: `clamp(${Math.max(24, titleSize * 0.6)}px, 8vw, ${titleSize}px)` }}
                            className="font-extrabold text-[#0a1e2b] leading-[1.1] tracking-tighter mb-8 whitespace-pre-line text-[clamp(1.75rem,5vw,1000px)]"
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
                            <div
                                onClick={() => setSelectedDoctor(doc)}
                                className="w-full aspect-[4/5] md:aspect-[3/4] mb-3 md:mb-8 overflow-hidden rounded-[1.2rem] md:rounded-[2.5rem] bg-slate-200 relative shadow-sm md:shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
                            >
                                <img
                                    src={doc.image}
                                    alt={doc.name}
                                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                                    onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800'}
                                />
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-[#007f94]/0 group-hover:bg-[#007f94]/15 transition-all duration-500 flex items-center justify-center">
                                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-widest text-[#007f94] shadow-xl opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                                          {ui.directions?.moreInfo || 'Подробнее'}
                                    </div>
                                </div>
                                <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/90 backdrop-blur-md px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[7px] md:text-xs font-semibold uppercase tracking-wider text-slate-900 shadow-sm transition-all duration-300">
                                    {doc.years}
                                </div>
                            </div>

                            <h3
                                style={{ fontSize: `clamp(14px, 4.5vw, ${cardTitleSize}px)` }}
                                className="font-semibold text-slate-900 mb-0.5 md:mb-2 leading-tight"
                            >
                                {doc.name}
                            </h3>
                            <p
                                style={{ fontSize: `clamp(10px, 3.5vw, ${cardDescSize}px)` }}
                                className="text-[#007f94] font-medium mb-2 md:mb-4 leading-tight"
                            >
                                {doc.role}
                            </p>

                            <div className="flex flex-col items-center justify-center gap-1 text-[8px] md:text-sm text-slate-400 mb-6 px-4">
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={12} className="text-[#007f94]/60" />
                                    <span className="font-medium tracking-tight uppercase text-[9px] md:text-[11px]">{doc.practice}</span>
                                </div>
                            </div>

                            <div className="mt-auto pt-2 pb-2">
                                <a
                                    href="#contact"
                                    className="group/btn relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] md:text-sm font-semibold text-[#007f94] transition-all duration-300 hover:bg-[#007f94] hover:text-white border border-[#007f94]/20 hover:border-[#007f94] overflow-hidden"
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
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-full border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all w-full md:w-auto justify-center"
                    >
                        {showAll ? (ui?.doctors?.showLess || 'Скрыть лишних') : (ui?.doctors?.showAll || 'Посмотреть всех врачей')} <ArrowUpRight size={18} className={showAll ? 'rotate-180' : ''} />
                    </button>
                </div>
            </div>

            {/* Biography Modal */}
            <AnimatePresence>
                {selectedDoctor && (
                    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8">
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedDoctor(null)}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-4xl bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row pointer-events-auto max-h-[90vh]"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedDoctor(null)}
                                className="absolute top-4 right-4 md:top-8 md:right-8 z-20 w-10 h-10 md:w-12 md:h-12 bg-slate-100 hover:bg-[#007f94] text-slate-500 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
                            >
                                <X size={20} />
                            </button>

                            {/* Image Part */}
                            <div className="w-full md:w-[40%] aspect-[4/5] md:aspect-auto relative bg-slate-100">
                                <img
                                    src={selectedDoctor.image}
                                    alt={selectedDoctor.name}
                                    className="absolute inset-0 w-full h-full object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent md:hidden" />
                            </div>

                            {/* Text Part */}
                            <div className="w-full md:w-[60%] p-6 md:p-12 overflow-y-auto custom-scrollbar bg-white">
                                <div className="mb-8">
                                    <span className="text-[#007f94] text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-2 block">{badge}</span>
                                    <h2 className="text-2xl md:text-4xl font-semibold text-slate-900 leading-tight mb-2 uppercase tracking-tighter">
                                        {selectedDoctor.name}
                                    </h2>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <p className="text-[#007f94] text-sm md:text-lg font-semibold">{selectedDoctor.role}</p>
                                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                        <p className="text-slate-400 text-xs md:text-base font-medium uppercase tracking-wider">{selectedDoctor.years}</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                                            <MapPin size={20} className="text-[#007f94]" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mb-1">Место практики</p>
                                            <p className="text-slate-900 font-semibold">{selectedDoctor.practice}</p>
                                        </div>
                                    </div>

                                    {selectedDoctor.bio && (
                                        <div className="relative">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#007f94]/20 rounded-full" />
                                            <div className="pl-6 pt-1">
                                                <p className="text-slate-600 text-sm md:text-lg leading-relaxed font-light italic whitespace-pre-line">
                                                    {selectedDoctor.bio}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-8 flex flex-col sm:flex-row gap-4">
                                        <a
                                            href="#contact"
                                            onClick={() => setSelectedDoctor(null)}
                                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#007f94] text-white rounded-2xl font-semibold hover:bg-[#005a69] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#007f94]/25"
                                        >
                                            {ui?.navbar?.cta || 'Записаться на прием'}
                                            <ArrowUpRight size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Doctors;

