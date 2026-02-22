import React from 'react';
import { motion } from 'framer-motion';

const partners = [
    { name: 'Bupa', color: 'text-blue-600', font: 'font-sans font-bold' },
    { name: 'Cigna', color: 'text-emerald-500', font: 'font-serif font-bold' },
    { name: 'Aetna', color: 'text-purple-600', font: 'font-sans font-black' },
    { name: 'Allianz', color: 'text-blue-800', font: 'font-serif font-bold' },
    { name: 'AXA', color: 'text-blue-900', font: 'font-sans font-black tracking-tighter relative inline-block' }
];

export default function Partners() {
    return (
        <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-100 overflow-hidden relative">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-10 md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl font-extrabold text-[#0a1e2b] mb-4"
                    >
                        Наши партнеры
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 max-w-2xl mx-auto"
                    >
                        Мы сотрудничаем с ведущими международными страховыми компаниями
                    </motion.p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 lg:gap-24 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {partners.map((partner, index) => (
                        <motion.div
                            key={partner.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.1 }}
                            className={`text-3xl md:text-5xl ${partner.font} ${partner.color} flex items-center justify-center mix-blend-multiply`}
                        >
                            {partner.name === 'AXA' ? (
                                <>
                                    A<span className="relative">X
                                        <div className="absolute -bottom-1 left-0 w-full h-1 bg-red-500 rounded-full transform -rotate-6"></div>
                                    </span>A
                                </>
                            ) : partner.name === 'Cigna' ? (
                                <div className="flex items-center gap-2">
                                    <svg className="w-8 h-8 md:w-10 md:h-10 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                    {partner.name}
                                </div>
                            ) : partner.name === 'Allianz' ? (
                                <div className="flex items-center gap-2">
                                    <svg className="w-8 h-8 md:w-10 md:h-10 text-blue-800" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                                    </svg>
                                    {partner.name}
                                </div>
                            ) : (
                                partner.name
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
