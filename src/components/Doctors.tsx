import React from 'react';
import { ArrowUpRight, MapPin, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';



const Doctors = () => {
    const doctors = [
        {
            name: 'Д-р Ахмет Кая',
            role: 'Кардиолог-хирург',
            years: '18 лет опыта',
            practice: 'Стамбульский университет',
            bio: 'Эксперт по диагностике и лечению сложных случаев. Медународные протоколы.',
            image: '/doctor.png'
        },
        {
            name: 'Д-р Мехмет Оз',
            role: 'Невролог',
            years: '15 лет опыта',
            practice: 'Клиника Acıbadem',
            bio: 'Специализируется на нейродегенеративных заболеваниях.',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800'
        },
        {
            name: 'Д-р Айше Демир',
            role: 'Эндокринолог',
            years: '20 лет опыта',
            practice: 'Американский госпиталь',
            bio: 'Ведущий специалист по гормональной терапии.',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800'
        }
    ];

    return (
        <section id="doctors" className="section-padding bg-slate-50 overflow-hidden relative">
            <div className="section-container relative z-10">
                {/* APEX: Centered Header */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-[#007f94] font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">Команда</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-[#0a1e2b] mb-6 leading-tight">
                            Ведущие врачи из Турции <br /> <span className="text-[#007f94]">теперь в Алматы.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed px-4">
                            Приём ведут специалисты с клиническим опытом работы в лучших госпиталях Стамбула.
                        </p>
                    </motion.div>
                </div>

                {/* BASE: Doctors Grid */}
                <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 mb-16 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 scrollbar-hide px-4 -mx-4 md:px-0 md:mx-0 snap-x snap-mandatory">
                    {doctors.map((doc, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            className="group flex flex-col items-center text-center min-w-[280px] md:min-w-0 snap-center"
                        >
                            {/* Image Container - Large & Rounded like PDF */}
                            <div className="w-full aspect-[3/4] mb-6 md:mb-8 overflow-hidden rounded-3xl md:rounded-[2.5rem] bg-slate-200 relative shadow-md group-hover:shadow-2xl transition-all duration-500">
                                <img
                                    src={doc.image}
                                    alt={doc.name}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-[#007f94]/0 group-hover:bg-[#007f94]/10 transition-colors duration-300" />

                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-900 shadow-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-300">
                                    {doc.years}
                                </div>
                            </div>

                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1 md:mb-2">{doc.name}</h3>
                            <p className="text-[#007f94] text-sm md:text-base font-medium mb-3 md:mb-4">{doc.role}</p>

                            <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-slate-400 mb-4 md:mb-6">
                                <MapPin size={12} className="md:w-[14px] md:h-[14px]" />
                                <span>{doc.practice}</span>
                            </div>

                            <a href="#contact" className="inline-flex items-center gap-2 text-sm md:text-base text-slate-900 font-bold border-b border-slate-200 pb-0.5 hover:border-[#007f94] hover:text-[#007f94] transition-colors">
                                Записаться <ArrowUpRight size={16} />
                            </a>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-full border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all">
                        Посмотреть всех врачей <ArrowUpRight size={18} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Doctors;
