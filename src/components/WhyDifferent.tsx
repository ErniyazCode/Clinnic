import React from 'react';
import { Globe, BookOpen, ShieldCheck, Microscope, CheckCircle2 } from 'lucide-react';
import FadeIn from './common/FadeIn';
import Magnetic from './common/Magnetic';

const WhyDifferent = () => {
    const facts = [
        {
            icon: Globe,
            text: 'врачи с международным клиническим опытом',
            desc: 'Наши специалисты прошли практику в ведущих центрах мира и говорят на языке глобальной медицины.'
        },
        {
            icon: BookOpen,
            text: 'подход, основанный на доказательной медицине',
            desc: 'Никаких догадок. Только решения, эффективность которых подтверждена научными исследованиями.'
        },
        {
            icon: ShieldCheck,
            text: 'протоколы лечения (Турция, Европа, США)',
            desc: 'Мы используем те же стандарты, по которым работают топовые клиники Стамбула, Лондона и Нью-Йорка.'
        },
        {
            icon: Microscope,
            text: 'практический опыт в сложных случаях',
            desc: 'Специализируемся на диагностике, когда другие разводят руками. Глубокий анализ каждой детали.'
        }
    ];

    return (
        <section id="why-different" className="py-12 md:py-24 bg-[#f8fafc] overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">

                    {/* Visual Side */}
                    <FadeIn
                        direction="right"
                        duration={1}
                        className="w-full lg:w-1/2 relative order-1 lg:order-1"
                    >
                        <div className="relative rounded-2xl md:rounded-[3rem] overflow-hidden aspect-[3/2] md:aspect-[4/5] shadow-xl md:shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000"
                                className="w-full h-full object-cover object-top md:object-center scale-110"
                                alt="Expert Medical Analysis"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e2b]/80 via-transparent to-transparent" />

                            {/* Floating Quote/Statement */}
                            <FadeIn
                                direction="up"
                                delay={0.5}
                                duration={0.8}
                                className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10 md:right-10 p-4 md:p-8 bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/20"
                            >
                                <p className="text-white text-sm md:text-2xl font-bold leading-tight">
                                    «Мы привезли в Алматы концепцию второго мнения, которая спасает жизни».
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
                                <span className="text-[#007f94] font-bold uppercase tracking-widest text-xs md:text-sm">Стандарты качества</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold text-[#0a1e2b] leading-tight tracking-tight mb-6 md:mb-10">
                                Почему это <br /> <span className="text-[#007f94]">другой уровень</span> консультации
                            </h2>

                            <div className="space-y-6 md:space-y-8 mb-8 md:mb-12">
                                {facts.map((fact, i) => (
                                    <FadeIn
                                        key={i}
                                        direction="left"
                                        delay={i * 0.1}
                                        style={{}}
                                        className="flex gap-4 md:gap-6 group"
                                    >
                                        <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-lg md:rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-[#007f94] group-hover:bg-[#007f94] group-hover:text-white transition-all duration-300">
                                            <fact.icon size={20} className="md:w-6 md:h-6" strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm md:text-lg font-bold text-slate-900 mb-1 md:mb-1 group-hover:text-[#007f94] transition-colors uppercase tracking-tight">{fact.text}</h3>
                                            <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-md">{fact.desc}</p>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>

                            <FadeIn
                                direction="up"
                                delay={0.3}
                                className="p-6 md:p-8 bg-[#0a1e2b] rounded-2xl md:rounded-[2.5rem] relative overflow-hidden group"
                            >
                                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                                    <div>
                                        <p className="text-[#007f94]/70 font-bold text-[10px] md:text-sm uppercase tracking-widest mb-1 md:mb-2">Вердикт эксперта</p>
                                        <h4 className="text-white text-lg md:text-2xl font-bold leading-tight">
                                            Это не формальный приём. <br />
                                            Это экспертное решение.
                                        </h4>
                                    </div>
                                    <Magnetic>
                                        <a href="#contact" className="px-6 md:px-8 py-3 md:py-4 text-center bg-[#007f94] text-white font-bold text-sm md:text-base rounded-xl md:rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-[#007f94]/20 whitespace-nowrap w-full md:w-auto">
                                            Записаться
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
