import React from 'react';
import HighlightedText from './common/HighlightedText';

const Hero = ({ data }: { data: any }) => {
    const {
        title = 'Ведущие врачи из *Турции* теперь принимают в Алматы',
        subtitle = 'Узнайте риски до того,\nкак они станут диагнозами',
        description = 'Консультации, диагностика и планы лечения по\nмеждународным протоколам - без выезда за границу',
        buttonPrimary = 'Записаться на прием',
        titleSize = 64,
        subtitleSize = 22,
        descSize = 18
    } = data || {};

    const padding = Number(data?.padding) || 120;
    const titleClean = String(title || '').replace(/\s*\n\s*/g, ' ').trim();
    const resolvedTitleText = titleClean.toUpperCase();

    const subtitleText = String(subtitle || '').replace(/,\s+как/g, ',\nкак').toUpperCase();
    const descriptionText = String(description || '');

    return (
        <section
            id="hero"
            style={{
                paddingTop: `clamp(130px, 18vh, ${padding + 40}px)`,
                paddingBottom: `clamp(60px, 10vh, ${padding}px)`
            }}
            className="relative z-10 bg-white overflow-hidden"
        >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Generated Background Image */}
                <div 
                    className="absolute inset-0 opacity-70 blur-[12px] scale-105"
                    style={{
                        backgroundImage: `url('/hero-bg-gen.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                {/* Very light overlays to blend */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.75)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(130,222,235,0.04),transparent_40%)]" />
                
                {/* White blur/glow on the right side behind doctors */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.95),transparent_70%)] blur-[50px]" />
                
                {/* Concentric circles behind doctors */}
                <div className="absolute right-[10%] top-[90%] -translate-y-1/2 translate-x-1/2">
                    <div className="absolute h-[45rem] w-[45rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#8fdce8]/60" />
                    <div className="absolute h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#8fdce8]/60" />
                    <div className="absolute h-[75rem] w-[75rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#8fdce8]/60" />
                </div>
            </div>

            <div className="section-container relative z-10 grid items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div
                    className="relative flex flex-col items-center text-center lg:items-start lg:text-left lg:pl-4"
                    style={{ 
                        paddingTop: `clamp(80px, 15vh, ${padding + 80}px)`
                    }}
                >
                    <h1
                        className="max-w-3xl whitespace-pre-line font-bold leading-[1.1] md:leading-[1.02] text-[#0a9fb8] uppercase tracking-tight"
                        style={{ fontSize: `clamp(28px, 9vw, 42px)` }}
                    >
                        <HighlightedText text={resolvedTitleText} className="block w-full max-w-[90vw] lg:w-[650px] font-bold" />
                    </h1>

                    <h2
                        className="mt-5 max-w-[40ch] whitespace-pre-line font-bold leading-[1.2] tracking-tight text-[#2a3c49] uppercase"
                        style={{ fontSize: `clamp(16px, 1.8vw, 24px)` }}
                    >
                        {subtitleText}
                    </h2>

                    <p
                        className="mt-4 max-w-[560px] whitespace-pre-line font-medium leading-[1.5] text-slate-500"
                        style={{ fontSize: `clamp(12px, 0.95vw, 15px)` }}
                    >
                        {descriptionText}
                    </p>

                    <div className="mt-10">
                        <a
                            href="#contact"
                            className="inline-flex min-h-[58px] w-full max-w-[280px] md:w-auto items-center justify-center rounded-full bg-gradient-to-r from-[#089fb6] to-[#11b8cd] px-12 py-3 text-[15px] font-bold text-white tracking-tighter shadow-[0_14px_34px_rgba(17,184,205,0.28)] transition-all duration-300 hover:brightness-105 hover:shadow-[0_20px_44px_rgba(17,184,205,0.34)] active:scale-[0.98] uppercase"
                        >
                            {buttonPrimary}
                        </a>
                    </div>
                </div>

                <div className="relative mt-2 hidden md:block h-full min-h-[250px] md:min-h-[450px] lg:mt-0 lg:min-h-[650px]" />
            </div>

            {/* Doctors positioned relative to the section bottom */}
            <div className="absolute right-[5%] bottom-0 pointer-events-none z-10 hidden md:flex items-end justify-center w-[45%] h-full max-w-[850px] overflow-visible">
                <div className="relative w-full lg:w-[115%] lg:-left-[15%] flex items-end">
                    <img
                        src="/groupPhoto.webp"
                        alt="Doctors"
                        className="w-full h-auto object-contain object-bottom translate-y-[6%] lg:translate-y-[8%] scale-[1.08] lg:scale-[1.12] origin-bottom drop-shadow-[0_20px_40px_rgba(15,23,42,0.15)]"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
