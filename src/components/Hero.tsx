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
    const videoOverlay = {
        base: 0.50,
        center: 0.32,
        edge: 0.84
    };

    const subtitleText = String(subtitle || '').replace(/,\s+как/g, ',\nкак').toUpperCase();
    const descriptionText = String(description || '');

    return (
        <section
            id="hero"
            style={{
                paddingTop: `clamp(130px, 18vh, ${padding + 40}px)`,
                paddingBottom: `clamp(60px, 10vh, ${padding}px)`
            }}
            className="relative z-10 bg-white overflow-hidden flex items-center justify-center min-h-screen"
        >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Background Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
                >
                    <source src="/background%20video.MOV" type="video/mp4" />
                </video>
                
                {/* Light overlay to make text legible and white-ish tint */}
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: `rgba(255, 255, 255, ${videoOverlay.base})` }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, ${videoOverlay.center}), rgba(255, 255, 255, ${videoOverlay.edge}) 100%)`
                    }}
                />
            </div>

            <div className="section-container relative z-10 flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto px-4 mt-8 md:mt-16">
                <h1
                    className="max-w-4xl whitespace-pre-line font-black leading-[1.15] md:leading-[1.1] text-[#0a9fb8] uppercase tracking-tight"
                    style={{ fontSize: `clamp(32px, 8vw, 54px)` }}
                >
                    <HighlightedText text={resolvedTitleText} className="block w-full font-black" />
                </h1>

                <h2
                    className="mt-6 max-w-[45ch] whitespace-pre-line font-bold leading-[1.3] tracking-tight text-[#2a3c49] uppercase"
                    style={{ fontSize: `clamp(18px, 3vw, 26px)` }}
                >
                    {subtitleText}
                </h2>

                <p
                    className="mt-6 max-w-[700px] whitespace-pre-line font-semibold leading-[1.6] text-slate-700"
                    style={{ fontSize: `clamp(14px, 1.5vw, 18px)` }}
                >
                    {descriptionText}
                </p>

                <div className="mt-10 md:mt-14">
                    <a
                        href="#contact"
                        className="inline-flex min-h-[64px] w-auto max-w-full items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-[#089fb6] to-[#11b8cd] px-14 py-4 text-[16px] md:text-[18px] font-extrabold text-white tracking-tighter shadow-[0_14px_34px_rgba(17,184,205,0.28)] transition-all duration-300 hover:brightness-105 hover:shadow-[0_20px_44px_rgba(17,184,205,0.34)] active:scale-[0.98] uppercase"
                    >
                        {buttonPrimary}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
