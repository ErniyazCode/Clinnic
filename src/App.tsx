import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueBlock from './components/ValueBlock';
import ProcessBlock from './components/ProcessBlock';
import Doctors from './components/Doctors';
import Directions from './components/Directions';
import WhyDifferent from './components/WhyDifferent';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { useContent } from './hooks/useContent';
import AdminPanel from './components/admin/AdminPanel';
import AdminLogin from './components/admin/AdminLogin';
import Specialists from './components/Specialists';
import Partners from './components/Partners';

function App() {
    const { content, updateContent } = useContent();
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    // Check for admin session on load
    useEffect(() => {
        const session = localStorage.getItem('admin_session');
        if (session === 'true') {
            setIsAuthorized(true);
        }
    }, []);

    // Simple routing based on pathname
    const isLoginPage = window.location.pathname === '/admin-login';

    // Toggle admin panel with Option + A (⌥ + A) on Mac / Alt + A on Win
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isAuthorized) return; // Only allow if authorized

            const isInput = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
            if (isInput) return;

            if (e.altKey && e.key === 'a') {
                setIsAdminOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isAuthorized]);

    if (isLoginPage) {
        return <AdminLogin />;
    }

    const componentsMap: { [key: string]: React.FC<any> } = {
        hero: Hero,
        values: ValueBlock,
        process: ProcessBlock,
        trust: WhyDifferent,
        doctors: Doctors,
        specialists: Specialists,
        directions: Directions,
        contact: ContactForm,
        footer: Footer
    };

    return (
        <div className="min-h-screen bg-white selection:bg-[#007f94] selection:text-white">
            <Navbar />
            <main>
                {Array.isArray(content?.sectionsOrder) && content.sectionsOrder.map((sectionId: string) => {
                    const Component = componentsMap[sectionId];
                    if (!Component || sectionId === 'footer' || sectionId === 'contact') return null;
                    return <Component key={sectionId} data={content[sectionId] || {}} />;
                })}
            </main>

            <ContactForm data={content.contact} />
            <Footer data={content.footer} />

            {/* Admin Panel and Button - only visible if authorized */}
            {isAuthorized && (
                <>
                    <AdminPanel
                        isOpen={isAdminOpen}
                        setIsOpen={setIsAdminOpen}
                        content={content}
                        updateContent={updateContent}
                    />

                    {/* Administrative Access Button */}
                    <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start gap-2">
                        {!isAdminOpen && (
                            <button
                                onClick={() => setIsAdminOpen(true)}
                                className="w-12 h-12 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-full flex items-center justify-center shadow-2xl hover:bg-[#007f94] hover:text-white hover:scale-110 active:scale-95 transition-all group pointer-events-auto"
                                title="Открыть панель управления (Option + A)"
                            >
                                <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                            </button>
                        )}

                        {!isAdminOpen && (
                            <div className="pointer-events-none opacity-0 group-hover:opacity-100 md:opacity-20 transition-opacity">
                                <p className="text-[10px] text-slate-500 bg-white/50 px-2 py-1 rounded shadow-sm">Option + A (⌥ + A)</p>
                            </div>
                        )}

                        {!isAdminOpen && (
                            <button
                                onClick={() => {
                                    localStorage.removeItem('admin_session');
                                    setIsAuthorized(false);
                                    window.location.reload();
                                }}
                                className="px-3 py-1.5 bg-red-50 text-red-500 text-[10px] font-bold rounded-full border border-red-100 opacity-0 group-hover:opacity-100 md:opacity-0 hover:opacity-100 transition-opacity"
                            >
                                Выйти
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
