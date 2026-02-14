import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader, ArrowRight } from 'lucide-react';

const ContactForm = () => {
    const [status, setStatus] = useState('idle'); // idle, submitting, success

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate API call
        setTimeout(() => setStatus('success'), 1500);
    };

    return (
        <section id="contact" className="py-24 bg-[#007f94]/5 overflow-hidden">
            <div className="section-container">
                <div className="bg-white rounded-[40px] shadow-2xl p-8 lg:p-20 overflow-hidden relative">
                    {/* Content */}
                    <div className="grid lg:grid-cols-2 gap-16 relative z-10">
                        <div>
                            <span className="text-[#007f94] font-bold uppercase tracking-widest text-xs md:text-sm mb-6 block">Свяжитесь с нами</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-[#0a1e2b] mb-6 leading-tight">
                                Получите консультацию международных врачей в Алматы
                            </h2>
                            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                                Запишитесь на приём и получите профессиональное мнение по вашему диагнозу и дальнейшему лечению.
                            </p>
                            <div className="flex gap-4 items-center text-[#007f94] bg-[#007f94]/5 p-6 rounded-2xl border border-[#007f94]/10">
                                <div className="w-2 h-2 rounded-full bg-[#007f94] shrink-0" />
                                <p className="font-medium">Наш координатор свяжется с вами и подберёт удобное время приёма.</p>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-6 lg:p-12 rounded-3xl border border-slate-100 relative min-h-[400px]">
                            <AnimatePresence mode='wait'>
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-white rounded-3xl z-20 border border-[#007f94]/10 shadow-xl"
                                    >
                                        <div className="w-20 h-20 bg-[#007f94]/10 text-[#007f94] rounded-full flex items-center justify-center mb-6">
                                            <Check size={40} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Заявка отправлена!</h3>
                                        <p className="text-slate-500">Мы свяжемся с вами в ближайшее время для подтверждения записи.</p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Как вас зовут?</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Тамерлан"
                                                className="w-full px-6 py-4 rounded-xl bg-white border border-slate-200 focus:border-[#007f94] focus:ring-4 focus:ring-[#007f94]/20 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Номер телефона</label>
                                            <input
                                                type="tel"
                                                required
                                                placeholder="+7 (700) 000-00-00"
                                                className="w-full px-6 py-4 rounded-xl bg-white border border-slate-200 focus:border-[#007f94] focus:ring-4 focus:ring-[#007f94]/20 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            className="w-full py-5 bg-[#007f94] text-white font-bold text-lg rounded-xl shadow-lg shadow-[#007f94]/30 hover:opacity-90 hover:shadow-[#007f94]/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                                        >
                                            {status === 'submitting' ? (
                                                <>
                                                    <Loader className="animate-spin" size={24} /> Отправка...
                                                </>
                                            ) : (
                                                <>
                                                    Оставить заявку на консультацию <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                        <p className="text-center text-xs text-slate-400 mt-4">
                                            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                                        </p>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Background Elements */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#007f94]/5 rounded-full blur-3xl translate-x-[20%] -translate-y-[20%] -z-0 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-100 rounded-full blur-3xl -translate-x-[20%] translate-y-[20%] -z-0 pointer-events-none" />
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
