import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Lock, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const BOT_TOKEN = '8525303930:AAGbaNFrwS2siW2OH8imPNULu4iRZABcl8c';
const CHAT_ID = '5411497762';

const AdminLogin = () => {
    const [step, setStep] = useState(1); // 1: Phone, 2: Code
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const TRUSTED_PHONE = '7 707 052 2006';

    const sendToTelegram = async (message: string) => {
        try {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'HTML'
                })
            });
            return true;
        } catch (err) {
            console.error('Telegram Error:', err);
            return false;
        }
    };

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const normalizedInput = phone.replace(/\D/g, '');
        const normalizedTrusted = TRUSTED_PHONE.replace(/\D/g, '');

        if (normalizedInput !== normalizedTrusted) {
            setError('Доступ запрещен для этого номера');
            return;
        }

        setLoading(true);
        const newCode = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedCode(newCode);

        const success = await sendToTelegram(
            `<b>🔐 Попытка входа в Админ-панель</b>\n\n` +
            `Пользователь: <code>${phone}</code>\n` +
            `Код подтверждения: <code>${newCode}</code>\n\n` +
            `<i>Код действителен 5 минут.</i>`
        );

        setLoading(false);
        if (success) {
            setStep(2);
        } else {
            setError('Ошибка отправки кода. Пожалуйста, проверьте Chat ID или настройки бота.');
        }
    };

    const handleCodeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code === generatedCode) {
            localStorage.setItem('admin_session', 'true');
            // GitHub token is now handled via VITE_GITHUB_TOKEN in Vercel
            window.location.href = '/';
        } else {
            setError('Неверный код подтверждения');
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-['Outfit']">
            <div className="absolute inset-0 bg-[radial-gradient(#007f94_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-8 md:p-12 relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-[#007f94]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#007f94]">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-2xl font-black text-[#0a1e2b] mb-2">Админ-панель</h1>
                    <p className="text-slate-500 text-sm font-medium">Введите данные для авторизации</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold"
                    >
                        <AlertCircle size={16} />
                        {error}
                    </motion.div>
                )}

                {step === 1 ? (
                    <form onSubmit={handlePhoneSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Зарегистрированный номер</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <input
                                    type="text"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-[#007f94] focus:ring-4 focus:ring-[#007f94]/5 outline-none transition-all text-sm font-bold"
                                    placeholder="7 707 052 2006"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-[#0a1e2b] text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition-all shadow-xl shadow-slate-900/10 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <>Получить код <ArrowRight size={18} /></>}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleCodeSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Код из Telegram</label>
                            <div className="relative">
                                <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <input
                                    type="text"
                                    maxLength={6}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-[#007f94] focus:ring-4 focus:ring-[#007f94]/5 outline-none transition-all text-center text-xl font-black tracking-[0.5em]"
                                    placeholder="000000"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                />
                            </div>
                            <p className="text-[10px] text-center text-slate-400 mt-2">Мы отправили 6-значный код вашему боту</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="px-6 py-4 bg-slate-50 text-slate-500 font-bold rounded-2xl hover:bg-slate-100 transition-all border border-slate-100"
                            >
                                Назад
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-4 bg-[#007f94] text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-[#006070] active:scale-95 transition-all shadow-xl shadow-[#007f94]/10"
                            >
                                Войти в систему
                            </button>
                        </div>
                    </form>
                )}

                <p className="mt-8 text-[10px] text-center text-slate-400 leading-relaxed">
                    Данный доступ предназначен только для уполномоченных администраторов клиники ReActive.
                </p>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
