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
    const titleWords = titleClean.split(/\s+/);
    const mid = 4; // Split after "из Турции"
    const resolvedTitleText = (titleWords.slice(0, mid).join(' ') + '\n' + titleWords.slice(mid).join(' ')).toUpperCase();

    const subtitleText = String(subtitle || '').replace(/,\s+как/g, ',\nкак').toUpperCase();
    const descriptionText = String(description || '');

    return (
        <section
            id="hero"
            style={{
                paddingTop: `clamp(130px, 18vh, ${padding + 40}px)`,
                paddingBottom: `clamp(60px, 10vh, ${padding}px)`
            }}
            className="relative z-10 bg-white"
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

            <div className="relative z-10 mx-auto grid w-full max-w-[1550px] items-stretch gap-8 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
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
            <div className="absolute right-0 bottom-0 pointer-events-none z-10 hidden md:block w-full md:w-1/2 h-full max-w-[850px] overflow-visible">
                <div className="relative h-full w-full flex items-end justify-center md:block">
                    <div className="absolute left-[5%] md:left-[-12%] bottom-[-2px] z-20 h-[60%] md:h-[105%] w-[60%] md:w-[70%] lg:left-[-10%] lg:h-[125%] lg:w-[82%] -rotate-[2deg] origin-bottom">
                        <img
                            src="/d2.png?v=3"
                            alt="Doctor woman"
                            className="h-full w-full object-contain object-bottom brightness-110 drop-shadow-[0_20px_40px_rgba(15,23,42,0.15)]"
                        />
                    </div>

                    <div className="absolute right-[5%] md:right-[-5%] bottom-[-2px] z-10 h-[55%] md:h-[85%] w-[55%] md:w-[63%] lg:right-[-2%] lg:h-[100%] lg:w-[70%] rotate-[4deg] origin-bottom">
                        <img
                            src="/d1.png"
                            alt="Doctor man"
                            className="h-full w-full object-contain object-bottom -scale-x-100 brightness-110 drop-shadow-[0_24px_46px_rgba(15,23,42,0.22)]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
