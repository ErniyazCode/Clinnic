import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Phone, ArrowRight, Loader2, ShieldCheck, Send } from 'lucide-react';

const AdminLogin = () => {
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [step, setStep] = useState<'phone' | 'code'>('phone');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [generatedCode, setGeneratedCode] = useState<string | null>(null);

    const ALLOWED_PHONES = [
        '+7 707 052 20 06', // User's number
        '+7 707 677 86 79', // New number
        '+7 701 111 22 33', // Placeholder
    ];

    const formatPhone = (value: string) => {
        let digits = value.replace(/\D/g, '');
        if (digits.length === 0) return '';
        if (digits[0] === '8') digits = '7' + digits.substring(1);
        if (digits[0] !== '7') digits = '7' + digits;
        digits = digits.substring(0, 11);

        let formatted = '+7';
        if (digits.length > 1) formatted += ' ' + digits.substring(1, 4);
        if (digits.length > 4) formatted += ' ' + digits.substring(4, 7);
        if (digits.length > 7) formatted += ' ' + digits.substring(7, 9);
        if (digits.length > 9) formatted += ' ' + digits.substring(9, 11);

        return formatted;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val.length < phone.length) { setPhone(val); return; }
        setPhone(formatPhone(val));
        setError('');
    };

    const sendTelegramCode = async (phoneStr: string, codeStr: string) => {
        const token = '7629486303:AAFa7S-445g3qGVQ6fyGiuuizWJ9sC9Xp3U'; // Replace with env var in prod
        const chatId = '5411497762'; // User's chat ID
        const message = `🔐 *Код подтверждения входа*\n\nВход в админку с номера: \`${phoneStr}\`\nКод: *${codeStr}*`;

        try {
            await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });
            return true;
        } catch (e) {
            console.error('Failed to send TG code', e);
            return false;
        }
    };

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const cleanInput = phone.replace(/\s+/g, '');
        const cleanAllowed = ALLOWED_PHONES.map(p => p.replace(/\s+/g, ''));

        if (cleanAllowed.includes(cleanInput)) {
            // Generate 4 digit code
            const newCode = Math.floor(1000 + Math.random() * 9000).toString();
            setGeneratedCode(newCode);

            // Send via Telegram
            await sendTelegramCode(phone, newCode);

            setIsLoading(false);
            setStep('code');
        } else {
            // Fake delay for security
            setTimeout(() => {
                setError('Доступ запрещен. Номер не найден.');
                setIsLoading(false);
            }, 1000);
        }
    };

    const handleCodeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (code === generatedCode || code === '0000') { // 0000 backdoor for dev if needed, remove for prod
            localStorage.setItem('admin_session', 'true');
            window.location.href = '/';
        } else {
            setError('Неверный код');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-96 bg-[#0a1e2b] skew-y-6 origin-top-left -translate-y-20 z-0" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#007f94]/10 rounded-full blur-3xl z-0" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 sm:p-12 rounded-3xl shadow-2xl w-full max-w-md relative z-10 border border-slate-100"
            >
                <div className="mb-10 text-center">
                    <div className="w-16 h-16 bg-[#007f94]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#007f94]">
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 mb-2">
                        {step === 'phone' ? 'Вход в систему' : 'Подтверждение'}
                    </h1>
                    <p className="text-slate-500 text-sm">
                        {step === 'phone' ? 'Панель управления клиники' : `Код отправлен в Telegram`}
                    </p>
                </div>

                {step === 'phone' ? (
                    <form onSubmit={handlePhoneSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">
                                Номер телефона
                            </label>
                            <div className="relative group">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#007f94] transition-colors" size={18} />
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    placeholder="+7 777 000 00 00"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-900 outline-none focus:border-[#007f94] focus:ring-4 focus:ring-[#007f94]/10 transition-all placeholder:text-slate-300"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs font-bold text-center">
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || phone.length < 16}
                            className="w-full bg-[#0a1e2b] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#007f94] transition-all shadow-xl shadow-[#0a1e2b]/10 disabled:opacity-50 active:scale-95 group"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : <>Получить код <ArrowRight size={18} /></>}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleCodeSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">
                                Код из Telegram
                            </label>
                            <div className="flex justify-center gap-3">
                                <input
                                    autoFocus
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').substring(0, 4))}
                                    placeholder="0000"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 text-center font-black text-2xl tracking-[0.5em] text-slate-900 outline-none focus:border-[#007f94] focus:ring-4 focus:ring-[#007f94]/10 transition-all placeholder:text-slate-200"
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs font-bold text-center">
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || code.length < 4}
                            className="w-full bg-[#007f94] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#006070] transition-all shadow-xl shadow-[#007f94]/20 disabled:opacity-50 active:scale-95"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : <>Подтвердить</>}
                        </button>

                        <button
                            type="button"
                            onClick={() => { setStep('phone'); setCode(''); setError(''); }}
                            className="w-full text-slate-400 text-xs font-bold hover:text-slate-600 transition-colors"
                        >
                            Назад к вводу номера
                        </button>
                    </form>
                )}

                <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        Secure 2FA Access • v2.1
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
