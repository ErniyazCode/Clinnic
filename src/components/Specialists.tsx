import React from 'react';
import FadeIn from './common/FadeIn';
import HighlightedText from './common/HighlightedText';

const Specialists = ({ data }: { data: any }) => {
    const defaultData = {
        badge: 'Опыт и надежность',
        title: 'Наши *Специалисты*',
        desc: 'Команда врачей с международным опытом и доказательным подходом к лечению.\nРаботаем по современным протоколам, обеспечивая безопасность, точность и высокий уровень медицинского сервиса.',
        image: '/team.jpg',
        titleSize: 48,
        descSize: 18,
        padding: 80,
        ...data
    };

    return (
        <section
            id="specialists"
            style={{
                paddingTop: `clamp(180px, 25vh, ${defaultData.padding + 60}px)`,
                paddingBottom: `clamp(${defaultData.padding * 0.4}px, 10vh, ${defaultData.padding}px)`
            }}
            className="relative py-16 md:py-32 bg-white overflow-hidden"
        >
            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
                <FadeIn direction="up" duration={0.8} className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
                    <div className="inline-flex items-center gap-2 mb-6">
                        <span className="h-[1px] w-8 bg-[#007f94]" />
                        <span className="text-[#007f94] text-sm font-extrabold uppercase tracking-[0.2em]">{defaultData.badge}</span>
                        <span className="h-[1px] w-8 bg-[#007f94]" />
                    </div>
                    <h2
                        style={{ fontSize: `${defaultData.titleSize}px` }}
                        className="font-extrabold text-[#0a1e2b] leading-[1.1] tracking-tighter mb-6 md:mb-10 whitespace-pre-line text-[clamp(1.75rem,5vw,1000px)]"
                    >
                        <HighlightedText text={defaultData.title} />
                    </h2>
                    <p
                        style={{ fontSize: `${defaultData.descSize}px` }}
                        className="text-slate-500 leading-relaxed whitespace-pre-line text-balance mx-auto"
                    >
                        <HighlightedText text={defaultData.desc} />
                    </p>
                </FadeIn>

                <FadeIn direction="up" duration={1.2} className="relative">
                    <div className="relative rounded-3xl md:rounded-[3rem] overflow-hidden aspect-[16/9] md:aspect-[21/9] w-full">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e2b] via-transparent to-transparent z-10 opacity-70" />
                        <img
                            src={defaultData.image}
                            className="absolute inset-0 w-full h-full object-cover object-[50%_12%]"
                            alt="Наши специалисты"
                        />

                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default Specialists;
