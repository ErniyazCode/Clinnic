import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Quote, Star, X } from 'lucide-react';
import FadeIn from './common/FadeIn';
import HighlightedText from './common/HighlightedText';

const getCardsPerView = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1280) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
};

const getInitials = (author: string) => {
    const parts = String(author || '')
        .trim()
        .split(/\s+/)
        .filter(Boolean);
    if (parts.length === 0) return '•';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

const Reviews = ({ data }: { data: any }) => {
    const [cardsPerView, setCardsPerView] = useState<number>(getCardsPerView());
    const [current, setCurrent] = useState(0);
    const [withTransition, setWithTransition] = useState(true);
    const [openedReview, setOpenedReview] = useState<any>(null);
    const touchStartX = useRef<number | null>(null);
    const wheelLockUntil = useRef<number>(0);

    const d = {
        badge: 'Отзывы пациентов',
        title: 'Отзывы о *ReActive Clinic*',
        desc: 'Истории наших пациентов о лечении, сервисе и результате. Нажмите на карточку, чтобы прочитать полный отзыв.',
        buttonText: 'Посмотреть отзыв на 2ГИС',
        readFullText: 'Читать полностью',
        sourceLabel: 'Проверенный отзыв',
        titleSize: 48,
        descSize: 18,
        padding: 80,
        reviewsList: [],
        ...data
    };

    const REPEAT_BLOCKS = 9;
    const items = useMemo(() => (Array.isArray(d.reviewsList) ? d.reviewsList : []), [d.reviewsList]);
    const baseOffset = items.length * Math.floor(REPEAT_BLOCKS / 2);

    const virtualItems = useMemo(() => {
        if (items.length <= 1) return items;
        return Array.from({ length: REPEAT_BLOCKS }, (_, blockIdx) =>
            items.map((review: any, idx: number) => ({
                ...review,
                __virtualKey: `${blockIdx}-${review.id || idx}`
            }))
        ).flat();
    }, [items]);

    useEffect(() => {
        const onResize = () => setCardsPerView(getCardsPerView());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        if (items.length > 1) {
            setWithTransition(false);
            setCurrent(baseOffset);
            requestAnimationFrame(() => setWithTransition(true));
        } else {
            setCurrent(0);
        }
    }, [items.length, baseOffset]);

    useEffect(() => {
        if (items.length <= 1) return;

        const safeMin = items.length * 2;
        const safeMax = items.length * (REPEAT_BLOCKS - 3);
        if (current < safeMin || current > safeMax) {
            const normalized = ((current % items.length) + items.length) % items.length;
            setWithTransition(false);
            setCurrent(baseOffset + normalized);
            requestAnimationFrame(() => setWithTransition(true));
        }
    }, [baseOffset, current, items.length]);

    const goNext = () => {
        if (items.length <= 1) return;
        setCurrent((v) => v + 1);
    };

    const goPrev = () => {
        if (items.length <= 1) return;
        setCurrent((v) => v - 1);
    };

    const onWheelMove = (e: React.WheelEvent<HTMLDivElement>) => {
        if (items.length <= 1) return;

        const now = Date.now();
        if (now < wheelLockUntil.current) return;

        const primaryDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        if (Math.abs(primaryDelta) < 8) return;

        e.preventDefault();
        wheelLockUntil.current = now + 350;

        if (primaryDelta > 0) goNext();
        else goPrev();
    };

    const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
    };

    const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (touchStartX.current === null || items.length <= 1) return;
        const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
        const diff = touchStartX.current - endX;
        if (Math.abs(diff) > 45) {
            if (diff > 0) goNext();
            else goPrev();
        }
        touchStartX.current = null;
    };

    const canMove = items.length > 1;
    const activeDot = items.length > 0 ? ((current % items.length) + items.length) % items.length : 0;

    return (
        <section
            id="reviews"
            style={{
                paddingTop: `clamp(${d.padding * 0.4}px, 10vh, ${d.padding}px)`,
                paddingBottom: `clamp(${d.padding * 0.4}px, 10vh, ${d.padding}px)`
            }}
            className="relative bg-[#f3f8fa] overflow-hidden"
        >
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-[#007f94]/10 blur-3xl" />
                <div className="absolute -bottom-16 -right-12 w-80 h-80 rounded-full bg-[#0ea5b9]/10 blur-3xl" />
            </div>
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <FadeIn direction="up" duration={0.8} className="text-center max-w-4xl mx-auto mb-10 md:mb-14">
                    <div className="inline-flex items-center gap-2 mb-6">
                        <span className="h-[1px] w-8 bg-[#007f94]" />
                        <span className="text-[#007f94] text-sm font-extrabold uppercase tracking-[0.2em]">{d.badge}</span>
                        <span className="h-[1px] w-8 bg-[#007f94]" />
                    </div>
                    <h2
                        style={{ fontSize: `${d.titleSize}px` }}
                        className="font-extrabold text-[#0a1e2b] leading-[1.1] tracking-tighter mb-6 whitespace-pre-line text-[clamp(1.75rem,5vw,1000px)]"
                    >
                        <HighlightedText text={d.title} />
                    </h2>
                    <p
                        style={{ fontSize: `${d.descSize}px` }}
                        className="text-slate-500 leading-relaxed whitespace-pre-line text-balance mx-auto"
                    >
                        {d.desc}
                    </p>
                </FadeIn>

                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 -left-1 md:-left-5 z-20 hidden md:flex items-center">
                        <button
                            onClick={goPrev}
                            disabled={!canMove}
                            className="pointer-events-auto w-14 h-14 rounded-full border border-[#007f94]/20 bg-white/95 backdrop-blur-sm text-[#0a1e2b] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#007f94] hover:bg-[#007f94] hover:text-white transition-all shadow-xl"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="mx-auto" size={24} />
                        </button>
                    </div>

                    <div className="pointer-events-none absolute inset-y-0 -right-1 md:-right-5 z-20 hidden md:flex items-center">
                        <button
                            onClick={goNext}
                            disabled={!canMove}
                            className="pointer-events-auto w-14 h-14 rounded-full border border-[#007f94]/20 bg-white/95 backdrop-blur-sm text-[#0a1e2b] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#007f94] hover:bg-[#007f94] hover:text-white transition-all shadow-xl"
                            aria-label="Next"
                        >
                            <ChevronRight className="mx-auto" size={24} />
                        </button>
                    </div>

                    <div
                        className="overflow-hidden cursor-grab active:cursor-grabbing pb-5"
                        onWheel={onWheelMove}
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                    >
                        <div
                            className={`flex ${withTransition ? 'transition-transform duration-500 ease-out' : ''}`}
                            style={{ transform: `translateX(-${(current * 100) / cardsPerView}%)` }}
                        >
                            {virtualItems.map((review: any, idx: number) => {
                                const text = String(review.text || '');
                                const isLong = text.length > 320;
                                const preview = isLong ? `${text.slice(0, 320).trim()}...` : text;
                                const initials = getInitials(review.author);

                                return (
                                    <div
                                        key={review.__virtualKey || `${review.id || 'review'}-${idx}`}
                                        className="shrink-0 px-2 md:px-3 pt-1 pb-2"
                                        style={{ width: `${100 / cardsPerView}%` }}
                                    >
                                        <motion.article
                                            initial={{ opacity: 0, y: 18 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: '-20px' }}
                                            transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.2) }}
                                            className="h-full min-h-[465px] rounded-3xl border border-[#007f94]/15 bg-gradient-to-b from-white via-[#f9fdff] to-[#f2f8fb] shadow-[0_10px_30px_-20px_rgba(2,31,44,0.7)] hover:shadow-[0_18px_44px_-20px_rgba(2,31,44,0.7)] hover:-translate-y-1 transition-all p-6 md:p-7 flex flex-col relative overflow-hidden"
                                        >
                                            <div className="absolute -right-6 -top-8 w-24 h-24 rounded-full bg-[#007f94]/5" />
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="inline-flex items-center gap-1 text-[#f59e0b]">
                                                    {Array.from({ length: Number(review.rating || 5) }).map((_, i) => (
                                                        <Star key={i} size={16} fill="currentColor" />
                                                    ))}
                                                </div>
                                                <Quote size={20} className="text-[#007f94]/30" />
                                            </div>

                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-12 h-12 rounded-full bg-[#007f94]/10 text-[#007f94] border border-[#007f94]/20 font-bold text-base flex items-center justify-center shrink-0">
                                                    {initials}
                                                </div>
                                                <div>
                                                    <h3 className="text-slate-900 font-semibold text-[1.1rem] leading-tight">{review.author}</h3>
                                                    <p className="text-slate-400 text-sm mt-1">{review.date}</p>
                                                </div>
                                            </div>

                                            <div className="rounded-2xl bg-white/80 border border-slate-100 p-4 mb-5 h-[170px] overflow-hidden backdrop-blur-sm">
                                                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{preview}</p>
                                            </div>

                                            <div className="mt-auto space-y-3">
                                                <div className="h-[42px]">
                                                    {isLong && (
                                                        <button
                                                            onClick={() => setOpenedReview(review)}
                                                            className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-slate-700 text-sm font-semibold hover:border-[#007f94] hover:text-[#007f94] transition"
                                                        >
                                                            {d.readFullText}
                                                        </button>
                                                    )}
                                                </div>

                                                <a
                                                    href={review.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#007f94] text-white text-sm font-semibold hover:bg-[#005a69] transition"
                                                >
                                                    {d.buttonText}
                                                    <ArrowUpRight size={16} />
                                                </a>

                                                <p className="text-[11px] text-slate-400 text-center">{d.sourceLabel}</p>
                                            </div>
                                        </motion.article>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {items.length > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-6">
                        {items.map((_: any, idx: number) => (
                            <button
                                key={`dot-${idx}`}
                                onClick={() => setCurrent(baseOffset + idx)}
                                className={`h-2.5 rounded-full transition-all ${activeDot === idx ? 'w-8 bg-[#007f94]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`}
                                aria-label={`Go to review ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {openedReview && (
                    <div className="fixed inset-0 z-[99999] p-4 md:p-8 flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpenedReview(null)}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.97 }}
                            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenedReview(null)}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-[#007f94] hover:text-white transition flex items-center justify-center"
                            >
                                <X size={18} />
                            </button>

                            <div className="p-6 md:p-8">
                                <div className="mb-4">
                                    <div className="inline-flex items-center gap-1 text-[#f59e0b] mb-2">
                                        {Array.from({ length: Number(openedReview.rating || 5) }).map((_: any, i: number) => (
                                            <Star key={i} size={16} fill="currentColor" />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-[#007f94]/10 text-[#007f94] border border-[#007f94]/20 font-bold text-base flex items-center justify-center shrink-0">
                                            {getInitials(openedReview.author)}
                                        </div>
                                        <div>
                                            <h3 className="text-xl md:text-2xl font-bold text-slate-900">{openedReview.author}</h3>
                                            <p className="text-slate-400 text-base mt-1">{openedReview.date}</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-slate-700 leading-relaxed whitespace-pre-line mb-6">{openedReview.text}</p>

                                <a
                                    href={openedReview.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#007f94] text-white font-semibold hover:bg-[#005a69] transition"
                                >
                                    {d.buttonText}
                                    <ArrowUpRight size={16} />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Reviews;