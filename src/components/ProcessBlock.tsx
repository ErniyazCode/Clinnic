import React from 'react';
import { Stethoscope, Scan, ClipboardCheck, ArrowRight, Play } from 'lucide-react';
import FadeIn from './common/FadeIn';
import Magnetic from './common/Magnetic';
import { motion } from 'framer-motion';

const ProcessBlock = () => {
    const steps = [
        {
            num: '01',
            title: 'Консультация',
            desc: 'Встреча с экспертом из Турции. Мы изучаем ваши жалобы и историю болезни, чтобы понять картину целиком.',
            icon: Stethoscope,
            color: 'bg-blue-50 text-blue-600'
        },
        {
            num: '02',
            title: 'Диагностика',
            desc: 'Разбор анализов и снимков по международным протоколам. При необходимости — моментальное дообследование.',
            icon: Scan,
            color: 'bg-indigo-50 text-indigo-600'
        },
        {
            num: '03',
            title: 'План восстановления',
            desc: 'Вы получаете четкий алгоритм действий: от тактики лечения до рекомендаций по образу жизни.',
            icon: ClipboardCheck,
            color: 'bg-[#007f94]/10 text-[#007f94]'
        }
    ];

    return (
        <section className="section-padding bg-[#fcfdfe] relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#007f94]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

            <div className="section-container relative z-10">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 md:gap-8 mb-8 md:mb-24">
                    <div className="max-w-2xl text-center md:text-left">
                        <FadeIn direction="right" duration={0.6}>
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-2 md:mb-6">
                                <span className="w-6 md:w-12 h-[2px] bg-[#007f94]" />
                                <span className="text-[#007f94] font-bold uppercase tracking-widest text-xs md:text-sm">Ваш путь к здоровью</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-[#0a1e2b] leading-tight tracking-tight">
                                Как проходит <br />
                                <span className="text-[#007f94]">приём у эксперта</span>
                            </h2>
                        </FadeIn>
                    </div>
                </div>

                {/* Steps Grid */}
                <div className="grid lg:grid-cols-3 gap-4 lg:gap-10 mb-12 md:mb-28">
                    {steps.map((step, i) => (
                        <FadeIn
                            key={i}
                            delay={i * 0.15}
                            duration={0.6}
                            className="group relative bg-white rounded-2xl md:rounded-[3rem] p-5 md:p-10 shadow-sm border border-slate-100 hover:border-[#007f94]/30 hover:shadow-2xl hover:shadow-[#007f94]/5 transition-all duration-500"
                        >
                            {/* Step Number Overlay */}
                            <span className="absolute top-4 right-6 md:top-8 md:right-10 text-4xl md:text-8xl font-black text-slate-50 group-hover:text-[#007f94]/5 transition-colors duration-500 pointer-events-none">
                                {step.num}
                            </span>

                            <div className={`w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${step.color} flex items-center justify-center mb-4 md:mb-10 group-hover:scale-110 transition-transform duration-500 relative z-10`}>
                                <step.icon size={20} className="md:w-[30px] md:h-[30px]" strokeWidth={1.5} />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-base md:text-2xl font-black text-[#0a1e2b] mb-1.5 md:mb-4 group-hover:text-[#007f94] transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-slate-500 text-xs md:text-lg leading-snug md:leading-relaxed font-medium">
                                    {step.desc}
                                </p>
                            </div>

                            {/* Hover Decorative Line */}
                            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 h-[1px] bg-slate-100 group-hover:bg-[#007f94]/20 transition-colors" />
                        </FadeIn>
                    ))}
                </div>

                {/* Integrated CTA Block */}
                <FadeIn
                    direction="up"
                    delay={0.2}
                    duration={0.7}
                    className="relative bg-[#0a1e2b] rounded-2xl md:rounded-[4rem] overflow-hidden p-6 md:p-10 lg:p-20 group"
                >
                    {/* Abstract background graphics */}
                    <div className="absolute top-0 right-0 w-full h-full">
                        <div className="absolute top-[-20%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#007f94]/20 rounded-full blur-[60px] md:blur-[120px] group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute bottom-[-20%] left-[-10%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-blue-500/10 rounded-full blur-[50px] md:blur-[100px]" />
                    </div>

                    <div className="relative z-10 grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
                        <div className="text-center lg:text-left">
                            <h3 className="text-xl md:text-5xl font-black text-white mb-3 md:mb-6 leading-tight tracking-tighter">
                                Получите второе мнение <br />
                                <span className="text-[#007f94]">бесценного уровня</span>
                            </h3>
                            <p className="text-slate-400 text-xs md:text-lg mb-6 md:mb-8 max-w-md mx-auto lg:mx-0">
                                Запишитесь на консультацию сегодня и получите персональный план лечения в течение 24 часов.
                            </p>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6">
                                <Magnetic>
                                    <motion.a
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href="#contact"
                                        className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-5 bg-[#007f94] text-white font-bold text-xs md:text-lg rounded-full shadow-2xl shadow-[#007f94]/30 hover:opacity-90 transition-all"
                                    >
                                        Записаться сейчас <ArrowRight size={16} className="md:w-5 md:h-5" />
                                    </motion.a>
                                </Magnetic>
                            </div>
                        </div>

                        <div className="hidden lg:block relative">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-700">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-[#007f94] flex items-center justify-center text-white font-black">R</div>
                                    <div>
                                        <p className="text-white font-bold">Reactive Clinic</p>
                                        <p className="text-slate-500 text-xs tracking-widest uppercase">Expertise Hub</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '80%' }}
                                            transition={{ duration: 1.5, delay: 0.5 }}
                                            className="h-full bg-[#007f94]"
                                        />
                                    </div>
                                    <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                                    <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                                </div>
                            </div>

                            {/* Floating decorative elements */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-10 -right-6 w-20 h-20 bg-[#007f94]/30 rounded-full blur-2xl"
                            />
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default ProcessBlock;

