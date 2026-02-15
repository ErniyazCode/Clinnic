import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Layout, Type, Settings, Image as ImageIcon, Plus, ShieldCheck, Sparkles, Mail, Trash2, Edit2, Upload, Activity, Stethoscope, HeartPulse, Microscope, Thermometer, Syringe, Pill, ClipboardCheck, Ambulance, Dna, BriefcaseMedical, FlaskConical, Search, UserPlus, Loader2 } from 'lucide-react';
import { AVAILABLE_ICONS, ICON_POOL, IconName } from '../../lib/icons';

interface AdminPanelProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    content: any;
    updateContent: (sectionId: string, updates: any) => void;
}

// Helper for Icon Selection
const IconPicker = ({ label, value, onChange }: any) => {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{label}</label>
            <div className="grid grid-cols-5 gap-2 p-3 bg-white border border-slate-200 rounded-xl">
                {AVAILABLE_ICONS.map((iconName) => {
                    const Icon = ICON_POOL[iconName as IconName];
                    const isActive = value === iconName;
                    const nameStr = iconName.toString();
                    return (
                        <button
                            key={nameStr}
                            type="button"
                            onClick={() => onChange(iconName)}
                            className={`p-2 rounded-lg flex items-center justify-center transition-all ${isActive
                                ? 'bg-[#007f94] text-white shadow-lg shadow-[#007f94]/20 scale-110'
                                : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-[#007f94]'
                                }`}
                            title={nameStr}
                            aria-label={`Выбрать иконку ${nameStr}`}
                        >
                            <Icon size={18} />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

// Helper for Section Layout (Padding)
const SectionLayout = ({ data, onUpdate, section }: any) => (
    <div className="mt-6 pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Layout size={12} /> Отступы секции (верх/низ)
            </p>
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    value={data.padding || 0}
                    onChange={(e) => onUpdate(section, 'padding', Number(e.target.value))}
                    className="w-16 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-center outline-none focus:border-[#007f94]"
                    title="Vertical Padding"
                    aria-label="Section Padding"
                />
                <span className="text-xs text-slate-400 font-medium">px</span>
            </div>
        </div>
    </div>
);

const ListEditor = ({
    items = [],
    onUpdate,
    label,
    itemLabel = "Элемент",
    fields = []
}: any) => {
    const updateItem = (index: number, key: string, value: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [key]: value };
        onUpdate(newItems);
    };

    const addItem = () => {
        const newItem: any = {};
        fields.forEach((f: any) => {
            newItem[f.key] = f.type === 'icon' ? 'Activity' : '';
        });
        onUpdate([...items, newItem]);
    };

    const removeItem = (index: number) => {
        if (!confirm(`Удалить ${itemLabel}?`)) return;
        const newItems = items.filter((_: any, i: number) => i !== index);
        onUpdate(newItems);
    };

    return (
        <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Plus size={12} /> {label} ({items.length})
                </p>
                <button
                    onClick={addItem}
                    type="button"
                    className="text-[10px] bg-[#007f94] text-white font-bold px-3 py-1.5 rounded-lg hover:bg-[#006070] transition-colors"
                    title={`Добавить ${itemLabel}`}
                >
                    Добавить
                </button>
            </div>

            <div className="space-y-3">
                {items.map((item: any, i: number) => (
                    <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 relative group">
                        <button
                            onClick={() => removeItem(i)}
                            type="button"
                            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors"
                            title="Удалить"
                            aria-label={`Удалить ${itemLabel}`}
                        >
                            <Trash2 size={14} />
                        </button>

                        <div className="space-y-3 pr-8">
                            {fields.map((field: any) => {
                                if (field.type === 'icon') {
                                    return (
                                        <IconPicker
                                            key={field.key}
                                            label={field.label}
                                            value={item[field.key]}
                                            onChange={(v: any) => updateItem(i, field.key, v)}
                                        />
                                    );
                                }
                                if (field.type === 'image') {
                                    return (
                                        <ImageField
                                            key={field.key}
                                            label={field.label}
                                            value={item[field.key]}
                                            onChange={(v: any) => updateItem(i, field.key, v)}
                                        />
                                    );
                                }
                                return field.multiline ? (
                                    <TextareaField
                                        key={field.key}
                                        label={field.label}
                                        value={item[field.key]}
                                        onChange={(v: any) => updateItem(i, field.key, v)}
                                    />
                                ) : (
                                    <InputField
                                        key={field.key}
                                        label={field.label}
                                        value={item[field.key]}
                                        onChange={(v: any) => updateItem(i, field.key, v)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ))}
                {items.length === 0 && (
                    <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">
                        Список пуст. Добавьте первый элемент.
                    </div>
                )}
            </div>
        </div>
    );
};

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, setIsOpen, content, updateContent }) => {
    const [activeSection, setActiveSection] = useState('hero');
    const [isDeploying, setIsDeploying] = useState(false);
    const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);

    const handleUpdate = (sectionId: string, key: string, value: any) => {
        updateContent(sectionId, { [key]: value });
    };

    const handleSave = async () => {
        setIsDeploying(true);
        try {
            const GITHUB_TOKEN = (import.meta as any).env.VITE_GITHUB_TOKEN;
            if (!GITHUB_TOKEN) throw new Error("GitHub Token не найден в VITE_GITHUB_TOKEN. Настройте его в Vercel.");
            const OWNER = 'tammat11';
            const REPO = 'clinnic';
            const PATH = 'src/data/content.json';

            // 1. Send telegram notification
            await fetch(`https://api.telegram.org/bot${'8525303930:AAGbaNFrwS2siW2OH8imPNULu4iRZABcl8c'}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: '5411497762',
                    text: `🚀 <b>Начат деплой новой версии сайта</b>\n\nОбновление контента отправлено в GitHub.`,
                    parse_mode: 'HTML'
                })
            }).catch(() => { });

            // 2. Get current file SHA
            const getRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`, {
                headers: { Authorization: `token ${GITHUB_TOKEN}` }
            });

            if (!getRes.ok) throw new Error("Не удалось получить SHA файла");

            const fileData = await getRes.json();
            const sha = fileData.sha;

            // 3. Update file
            const updateRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`, {
                method: 'PUT',
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: 'Admin: Update content',
                    content: btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2)))),
                    sha: sha
                })
            });

            if (updateRes.ok) {
                alert("🚀 Изменения успешно отправлены на GitHub!\n\nСайт обновится автоматически в течение 2-3 минут. Вы получите уведомление в Telegram.");
                setIsOpen(false);
            } else {
                const err = await updateRes.json();
                throw new Error(err.message || 'Ошибка обновления');
            }
        } catch (error: any) {
            console.error('Deployment Error:', error);
            alert("❌ Ошибка при публикации: " + error.message);
        } finally {
            setIsDeploying(false);
        }
    };

    const handleDoctorUpdate = (id: string, field: string, value: string) => {
        const doctors = content.doctors.doctorsList || [];
        const updatedDoctors = doctors.map((doc: any) =>
            doc.id === id ? { ...doc, [field]: value } : doc
        );
        updateContent('doctors', { doctorsList: updatedDoctors });
    };

    const addDoctor = () => {
        const doctors = content.doctors.doctorsList || [];
        const newDoctor = {
            id: Date.now().toString(),
            name: 'Новый Врач',
            role: 'Специальность',
            years: '10 лет опыта',
            practice: 'Клиника',
            bio: 'Описание врача...',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800'
        };
        updateContent('doctors', { doctorsList: [...doctors, newDoctor] });
        setEditingDoctorId(newDoctor.id);
    };

    const sections = [
        { id: 'hero', label: 'Главный экран', icon: Layout },
        { id: 'values', label: 'Ценности', icon: Type },
        { id: 'process', label: 'Процесс', icon: Settings },
        { id: 'trust', label: 'Доверие', icon: ShieldCheck },
        { id: 'doctors', label: 'Врачи', icon: ImageIcon },
        { id: 'directions', label: 'Услуги', icon: Sparkles },
        { id: 'contact', label: 'Контакты', icon: Mail },
        { id: 'footer', label: 'Футер', icon: Layout },
    ];

    if (!isOpen) return null;

    const renderEditor = () => {
        const data = content[activeSection as keyof typeof content] || {};

        return (
            <div className="space-y-6">
                <SectionTitle title={`Редактирование: ${sections.find(s => s.id === activeSection)?.label}`} />

                <div className="bg-[#007f94]/5 p-4 rounded-xl border border-[#007f94]/10 flex gap-3 text-xs text-slate-600 leading-relaxed mb-6">
                    <div className="w-5 h-5 bg-[#007f94] text-white rounded-full flex items-center justify-center shrink-0 font-bold">i</div>
                    <p>
                        Чтобы выделить слово цветом, оберните его звездочками: <br />
                        Например: <span className="font-mono text-[#007f94] font-bold">*Текст*</span>
                    </p>
                </div>

                {activeSection === 'hero' && (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Маленький заголовок (TR)" value={data.badgeTR} onChange={(v: string) => handleUpdate('hero', 'badgeTR', v)} placeholder="Turkiye" />
                            <InputField label="Маленький заголовок (KZ)" value={data.badgeKZ} onChange={(v: string) => handleUpdate('hero', 'badgeKZ', v)} placeholder="Kazakhstan" />
                        </div>

                        <ContentBlock
                            label="Главный заголовок"
                            value={data.title}
                            onChange={(v: string) => handleUpdate('hero', 'title', v)}
                            size={data.titleSize}
                            onSizeChange={(v: number) => handleUpdate('hero', 'titleSize', v)}
                            placeholder="Используйте \n для переноса строки"
                        />

                        <ContentBlock
                            label="Подзаголовок"
                            value={data.subtitle}
                            onChange={(v: string) => handleUpdate('hero', 'subtitle', v)}
                            size={data.subtitleSize}
                            onSizeChange={(v: number) => handleUpdate('hero', 'subtitleSize', v)}
                            placeholder="Введите подзаголовок"
                        />

                        <ContentBlock
                            label="Описание"
                            value={data.description}
                            onChange={(v: string) => handleUpdate('hero', 'description', v)}
                            size={data.descSize}
                            onSizeChange={(v: number) => handleUpdate('hero', 'descSize', v)}
                            placeholder="Введите описание"
                        />

                        <ImageField label="Основное изображение" value={data.image} onChange={(v: string) => handleUpdate('hero', 'image', v)} />

                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Кнопка 1" value={data.buttonPrimary} onChange={(v: string) => handleUpdate('hero', 'buttonPrimary', v)} />
                            <InputField label="Кнопка 2" value={data.buttonSecondary} onChange={(v: string) => handleUpdate('hero', 'buttonSecondary', v)} />
                        </div>

                        <ListEditor
                            label="Плавающие карточки врачей"
                            itemLabel="врача"
                            items={data.floatingDoctors || []}
                            onUpdate={(items: any) => handleUpdate('hero', 'floatingDoctors', items)}
                            fields={[
                                { key: 'image', label: 'Фото', type: 'image' },
                                { key: 'name', label: 'Имя' },
                                { key: 'role', label: 'Специальность' }
                            ]}
                        />
                        <SectionLayout data={data} onUpdate={handleUpdate} section="hero" />
                    </>
                )}

                {activeSection === 'values' && (
                    <>
                        <ContentBlock
                            label="Заголовок"
                            value={data.title}
                            onChange={(v: string) => handleUpdate('values', 'title', v)}
                            size={data.titleSize}
                            onSizeChange={(v: number) => handleUpdate('values', 'titleSize', v)}
                        />
                        <ContentBlock
                            label="Основной текст"
                            value={data.mainText}
                            onChange={(v: string) => handleUpdate('values', 'mainText', v)}
                            size={data.descSize}
                            onSizeChange={(v: number) => handleUpdate('values', 'descSize', v)}
                        />
                        <ContentBlock
                            label="Доп. текст"
                            value={data.subText}
                            onChange={(v: string) => handleUpdate('values', 'subText', v)}
                            size={data.subTextSize}
                            onSizeChange={(v: number) => handleUpdate('values', 'subTextSize', v)}
                        />
                        <ImageField label="Фоновое изображение / Иллюстрация" value={data.image} onChange={(v: string) => handleUpdate('values', 'image', v)} />
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <NumberField label="Заголовок карточек (px)" value={data.methodTitleSize} onChange={(v: number) => handleUpdate('values', 'methodTitleSize', v)} />
                            <NumberField label="Текст карточек (px)" value={data.methodDescSize} onChange={(v: number) => handleUpdate('values', 'methodDescSize', v)} />
                        </div>
                        <ListEditor
                            label="Карточки преимуществ"
                            itemLabel="карточку"
                            items={data.methods || []}
                            onUpdate={(items: any) => handleUpdate('values', 'methods', items)}
                            fields={[
                                { key: 'icon', label: 'Иконка', type: 'icon' },
                                { key: 'title', label: 'Заголовок карты' },
                                { key: 'desc', label: 'Описание карты', multiline: true }
                            ]}
                        />
                        <SectionLayout data={data} onUpdate={handleUpdate} section="values" />
                    </>
                )}

                {activeSection === 'process' && (
                    <>
                        <InputField label="Бейдж" value={data.badge} onChange={(v: string) => handleUpdate('process', 'badge', v)} placeholder="Путь" />
                        <ContentBlock
                            label="Заголовок"
                            value={data.title}
                            onChange={(v: string) => handleUpdate('process', 'title', v)}
                            size={data.titleSize}
                            onSizeChange={(v: number) => handleUpdate('process', 'titleSize', v)}
                            placeholder="Используйте \n для переноса строки"
                        />
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <NumberField label="Заголовок шага (px)" value={data.stepTitleSize} onChange={(v: number) => handleUpdate('process', 'stepTitleSize', v)} />
                            <NumberField label="Описание шага (px)" value={data.stepDescSize} onChange={(v: number) => handleUpdate('process', 'stepDescSize', v)} />
                        </div>
                        <ListEditor
                            label="Шаги процесса"
                            itemLabel="шаг"
                            items={data.steps || []}
                            onUpdate={(items: any) => handleUpdate('process', 'steps', items)}
                            fields={[
                                { key: 'num', label: 'Номер (01, 02...)' },
                                { key: 'title', label: 'Заголовок шага' },
                                { key: 'desc', label: 'Описание шага', multiline: true }
                            ]}
                        />
                        <div className="pt-6 border-t border-slate-100 mt-6 space-y-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Sparkles size={12} /> Блок призыва (CTA) в конце
                            </p>
                            <ContentBlock
                                label="Заголовок CTA"
                                value={data.ctaTitle}
                                onChange={(v: string) => handleUpdate('process', 'ctaTitle', v)}
                                placeholder="Введите заголовок"
                            />
                            <ContentBlock
                                label="Описание CTA"
                                value={data.ctaDesc}
                                onChange={(v: string) => handleUpdate('process', 'ctaDesc', v)}
                                placeholder="Введите описание"
                            />
                            <InputField label="Текст кнопки CTA" value={data.ctaButton} onChange={(v: string) => handleUpdate('process', 'ctaButton', v)} />
                        </div>
                        <SectionLayout data={data} onUpdate={handleUpdate} section="process" />
                    </>
                )}

                {activeSection === 'trust' && (
                    <>
                        <InputField label="Бейдж" value={data.badge} onChange={(v: string) => handleUpdate('trust', 'badge', v)} placeholder="Доверие" />
                        <ContentBlock
                            label="Заголовок"
                            value={data.title}
                            onChange={(v: string) => handleUpdate('trust', 'title', v)}
                            size={data.titleSize}
                            onSizeChange={(v: number) => handleUpdate('trust', 'titleSize', v)}
                        />
                        <ContentBlock
                            label="Цитата на фото"
                            value={data.quote}
                            onChange={(v: string) => handleUpdate('trust', 'quote', v)}
                        />
                        <ContentBlock
                            label="Вердикт"
                            value={data.verdictTitle}
                            onChange={(v: string) => handleUpdate('trust', 'verdictTitle', v)}
                            size={data.descSize}
                            onSizeChange={(v: number) => handleUpdate('trust', 'descSize', v)}
                        />
                        <ImageField label="Основное изображение" value={data.image} onChange={(v: string) => handleUpdate('trust', 'image', v)} />

                        <ListEditor
                            label="Список преимуществ (Trust Points)"
                            itemLabel="пункт"
                            items={data.facts || []}
                            onUpdate={(items: any) => handleUpdate('trust', 'facts', items)}
                            fields={[
                                { key: 'text', label: 'Заголовок пункта' },
                                { key: 'desc', label: 'Описание пункта', multiline: true }
                            ]}
                        />
                        <SectionLayout data={data} onUpdate={handleUpdate} section="trust" />
                    </>
                )}

                {activeSection === 'doctors' && (
                    <div className="space-y-6">
                        <InputField label="Бейдж" value={data.badge} onChange={(v: string) => handleUpdate('doctors', 'badge', v)} placeholder="Команда" />
                        <ContentBlock
                            label="Заголовок"
                            value={data.title}
                            onChange={(v: string) => handleUpdate('doctors', 'title', v)}
                            size={data.titleSize}
                            onSizeChange={(v: number) => handleUpdate('doctors', 'titleSize', v)}
                            placeholder="Введите текст"
                        />
                        <ContentBlock
                            label="Описание"
                            value={data.desc}
                            onChange={(v: string) => handleUpdate('doctors', 'desc', v)}
                            size={data.descSize}
                            onSizeChange={(v: number) => handleUpdate('doctors', 'descSize', v)}
                            placeholder="Введите описание"
                        />

                        {/* Doctor List Management */}
                        <div className="grid grid-cols-2 gap-4">
                            <NumberField label="Размер имени (px)" value={data.cardTitleSize} onChange={(v: number) => handleUpdate('doctors', 'cardTitleSize', v)} />
                            <NumberField label="Размер описания (px)" value={data.cardDescSize} onChange={(v: number) => handleUpdate('doctors', 'cardDescSize', v)} />
                        </div>

                        <div className="pt-6 border-t border-slate-100 mt-6">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Layout size={14} /> Список врачей ({data.doctorsList?.length || 0})
                                </p>
                                <button
                                    onClick={addDoctor}
                                    type="button"
                                    className="flex items-center gap-2 text-xs bg-[#007f94] text-white px-3 py-2 rounded-lg hover:bg-[#006070] transition-all shadow-sm font-bold active:scale-95"
                                    title="Добавить нового врача"
                                >
                                    <Plus size={14} /> Добавить врача
                                </button>
                            </div>

                            <div className="space-y-3">
                                {(data.doctorsList || []).map((doc: any) => (
                                    <div key={doc.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <div className="flex items-center gap-3">
                                                <img src={doc.image} className="w-10 h-10 rounded-full object-cover bg-slate-200" alt={doc.name} />
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{doc.name}</p>
                                                    <p className="text-xs text-slate-500">{doc.role}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => setEditingDoctorId(editingDoctorId === doc.id ? null : doc.id)}
                                                    type="button"
                                                    className="p-2 text-slate-400 hover:text-[#007f94] hover:bg-white rounded-lg transition-all"
                                                    title="Редактировать"
                                                    aria-label={`Редактировать ${doc.name}`}
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (confirm(`Удалить врача ${doc.name}?`)) {
                                                            const updated = data.doctorsList.filter((d: any) => d.id !== doc.id);
                                                            handleUpdate('doctors', 'doctorsList', updated);
                                                        }
                                                    }}
                                                    type="button"
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"
                                                    title={`Удалить ${doc.name}`}
                                                    aria-label={`Удалить ${doc.name}`}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        {editingDoctorId === doc.id && (
                                            <div className="space-y-3 mt-3 pt-3 border-t border-slate-200">
                                                <InputField label="Имя" value={doc.name} onChange={(v: string) => handleDoctorUpdate(doc.id, 'name', v)} />
                                                <InputField label="Специальность" value={doc.role} onChange={(v: string) => handleDoctorUpdate(doc.id, 'role', v)} />
                                                <InputField label="Опыт" value={doc.years} onChange={(v: string) => handleDoctorUpdate(doc.id, 'years', v)} />
                                                <InputField label="Место практики" value={doc.practice} onChange={(v: string) => handleDoctorUpdate(doc.id, 'practice', v)} />
                                                <TextareaField label="Биография" value={doc.bio} onChange={(v: string) => handleDoctorUpdate(doc.id, 'bio', v)} />
                                                <ImageField label="Фото врача" value={doc.image} onChange={(v: string) => handleDoctorUpdate(doc.id, 'image', v)} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <SectionLayout data={data} onUpdate={handleUpdate} section="doctors" />
                    </div>
                )}

                {activeSection === 'directions' && (
                    <>
                        <InputField label="Бейдж" value={data.badge} onChange={(v: string) => handleUpdate('directions', 'badge', v)} placeholder="Hub" />
                        <ContentBlock
                            label="Заголовок"
                            value={data.title}
                            onChange={(v: string) => handleUpdate('directions', 'title', v)}
                            size={data.titleSize}
                            onSizeChange={(v: number) => handleUpdate('directions', 'titleSize', v)}
                            placeholder="Введите текст"
                        />
                        <ContentBlock
                            label="Подзаголовок"
                            value={data.subTitle}
                            onChange={(v: string) => handleUpdate('directions', 'subTitle', v)}
                            size={data.subTitleSize}
                            onSizeChange={(v: number) => handleUpdate('directions', 'subTitleSize', v)}
                            placeholder="Введите текст"
                        />
                        <ImageField label="Фоновое изображение" value={data.image} onChange={(v: string) => handleUpdate('directions', 'image', v)} />
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <NumberField label="Заголовок услуги (px)" value={data.cardTitleSize} onChange={(v: number) => handleUpdate('directions', 'cardTitleSize', v)} />
                            <NumberField label="Описание услуги (px)" value={data.cardDescSize} onChange={(v: number) => handleUpdate('directions', 'cardDescSize', v)} />
                        </div>
                        <ListEditor
                            label="Список услуг"
                            itemLabel="услугу"
                            items={data.specialties || []}
                            onUpdate={(items: any) => handleUpdate('directions', 'specialties', items)}
                            fields={[
                                { key: 'title', label: 'Название услуги' },
                                { key: 'desc', label: 'Краткое описание', multiline: true }
                            ]}
                        />
                        <SectionLayout data={data} onUpdate={handleUpdate} section="directions" />
                    </>
                )}

                {activeSection === 'contact' && (
                    <>
                        <InputField label="Бейдж" value={data.badge} onChange={(v: string) => handleUpdate('contact', 'badge', v)} placeholder="Связь" />
                        <ContentBlock
                            label="Заголовок"
                            value={data.title}
                            onChange={(v: string) => handleUpdate('contact', 'title', v)}
                            size={data.titleSize}
                            onSizeChange={(v: number) => handleUpdate('contact', 'titleSize', v)}
                            placeholder="Введите текст"
                        />
                        <ContentBlock
                            label="Описание"
                            value={data.desc}
                            onChange={(v: string) => handleUpdate('contact', 'desc', v)}
                            size={data.descSize}
                            onSizeChange={(v: number) => handleUpdate('contact', 'descSize', v)}
                            placeholder="Введите описание"
                        />
                        <ImageField label="Офис / Карта (изображение)" value={data.image} onChange={(v: string) => handleUpdate('contact', 'image', v)} />
                        <SectionLayout data={data} onUpdate={handleUpdate} section="contact" />
                    </>
                )}

                {activeSection === 'footer' && (
                    <>
                        <InputField label="Адрес" value={data.address} onChange={(v: string) => handleUpdate('footer', 'address', v)} placeholder="Адрес" />
                        <InputField label="Телефон" value={data.phone} onChange={(v: string) => handleUpdate('footer', 'phone', v)} placeholder="Номер" />
                        <InputField label="Instagram URL" value={data.instagram} onChange={(v: string) => handleUpdate('footer', 'instagram', v)} />
                        <SectionLayout data={data} onUpdate={handleUpdate} section="footer" />
                    </>
                )}
            </div >
        );
    };

    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full sm:w-[500px] h-screen bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-[10000] border-l border-slate-100 flex flex-col"
        >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
                <div>
                    <h2 className="text-xl font-black text-[#0a1e2b]">Управление сайтом</h2>
                    <p className="text-[10px] text-[#007f94] font-black tracking-[0.2em] uppercase">Control Panel v2.2</p>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    type="button"
                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                    title="Закрыть панель"
                    aria-label="Закрыть панель управления"
                >
                    <X size={24} className="text-slate-400" />
                </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-20 border-r border-slate-50 flex flex-col items-center py-6 gap-4 bg-slate-50/50 overflow-y-auto">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            type="button"
                            onClick={() => setActiveSection(section.id)}
                            title={section.label}
                            aria-label={`Перейти к разделу ${section.label}`}
                            className={`p-3.5 rounded-2xl transition-all relative group ${activeSection === section.id ? 'bg-[#007f94] text-white shadow-lg shadow-[#007f94]/20' : 'text-slate-400 hover:text-slate-900 hover:bg-white'}`}
                        >
                            <section.icon size={22} />
                            <span className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                                {section.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Content Editor */}
                <div className="flex-1 overflow-y-auto p-8 bg-white">
                    {renderEditor()}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex gap-4">
                <button
                    onClick={() => {
                        if (confirm('Выйти из режима администратора?')) {
                            localStorage.removeItem('admin_session');
                            window.location.reload();
                        }
                    }}
                    type="button"
                    className="py-5 px-6 bg-red-50 text-red-500 font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-red-100 border border-red-100 transition-all"
                    title="Выйти из системы"
                >
                    <X size={20} /> Выйти
                </button>
                <button
                    onClick={() => {
                        if (confirm('Отменить все несохраненные изменения? Страница будет перезагружена.')) {
                            window.location.reload();
                        }
                    }}
                    type="button"
                    className="py-5 px-6 bg-white text-slate-500 font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 border border-slate-200 transition-all"
                    title="Отменить изменения"
                    aria-label="Сбросить все изменения"
                >
                    <X size={20} />
                </button>
                <button
                    onClick={handleSave}
                    disabled={isDeploying}
                    type="button"
                    className="flex-1 py-5 bg-[#0a1e2b] text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:opacity-95 active:scale-95 transition-all shadow-xl shadow-slate-900/10 disabled:opacity-50"
                    title="Сохранить и опубликовать на сайте"
                >
                    {isDeploying ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            Публикация...
                        </>
                    ) : (
                        <>
                            <Save size={20} /> Применить изменения
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
};

// Internal Helper Components
const SectionTitle = ({ title }: { title: string }) => (
    <h3 className="text-lg font-black text-slate-900 mb-6 border-b border-slate-100 pb-4">{title}</h3>
);

const InputField = ({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) => (
    <div className="space-y-2 mb-4">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{label}</label>
        <input
            className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-[#007f94] focus:ring-4 focus:ring-[#007f94]/5 outline-none transition-all text-sm font-bold"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            title={label}
        />
    </div>
);

const TextareaField = ({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) => (
    <div className="space-y-2 mb-4">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{label}</label>
        <textarea
            className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-[#007f94] focus:ring-4 focus:ring-[#007f94]/5 outline-none transition-all text-sm font-medium leading-relaxed min-h-[100px]"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            title={label}
        />
    </div>
);

const NumberField = ({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{label}</label>
        <input
            type="number"
            className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-[#007f94] outline-none transition-all text-sm font-bold"
            value={value || 0}
            onChange={(e) => onChange(Number(e.target.value))}
            title={label}
        />
    </div>
);

const ContentBlock = ({ label, value, onChange, size, onSizeChange, placeholder }: any) => {
    return (
        <div className="space-y-3 mb-6 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
                {onSizeChange && (
                    <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-slate-100">
                        <Type size={12} className="text-slate-400" />
                        <input
                            type="number"
                            value={size || 0}
                            onChange={(e) => onSizeChange(Number(e.target.value))}
                            className="w-8 text-[10px] font-bold text-slate-600 outline-none"
                            title="Font Size"
                            aria-label={`Размер шрифта для ${label}`}
                        />
                        <span className="text-[8px] font-bold text-slate-300">PX</span>
                    </div>
                )}
            </div>
            <textarea
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || 'Введите текст...'}
                title={label}
                className="w-full bg-transparent border-none outline-none text-sm font-bold text-slate-900 placeholder:text-slate-300 min-h-[60px] resize-none"
            />
        </div>
    );
};

const ImageField = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onChange(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                    className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
                    title="Загрузить изображение с диска"
                >
                    <Upload size={12} /> Загрузить файл
                </button>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                title="Hidden file input"
                aria-hidden="true"
            />

            <div className="flex gap-3">
                <div className="w-20 h-20 rounded-2xl bg-slate-100 shrink-0 border border-slate-200 overflow-hidden relative group">
                    {value ? (
                        <img src={value} alt={label} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <ImageIcon size={24} />
                        </div>
                    )}
                    {value && (
                        <button
                            onClick={() => onChange('')}
                            type="button"
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                            title="Удалить изображение"
                            aria-label="Удалить текущее изображение"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>
                <div className="flex-1 space-y-2">
                    <input
                        className="w-full p-3 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-[#007f94] focus:ring-4 focus:ring-[#007f94]/5 outline-none transition-all text-xs font-medium text-slate-600 truncate"
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Или вставьте ссылку на изображение..."
                        title={`${label} URL`}
                    />
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                        Рекомендуемый размер: 1200x800px. <br />
                        Поддерживаются JPG, PNG, WEBP.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
