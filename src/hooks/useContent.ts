import { useState, useEffect } from 'react';

const CONTENT_LOADERS: Record<string, () => Promise<{ default: any }>> = {
    ru: () => import('../data/content.json'),
    en: () => import('../data/content_en.json'),
    kz: () => import('../data/content_kz.json')
};

const loadDefaultContent = async (lang: string) => {
    const module = await (CONTENT_LOADERS[lang] || CONTENT_LOADERS.ru)();
    return structuredClone(module.default);
};

const syncContentData = (section: string, data: any, otherContent: any) => {
    const updatedOtherContent = { ...otherContent };
    const sectionData = updatedOtherContent[section] || {};
    const syncedData = { ...sectionData };

    const isNonTranslatable = (key: string) => {
        return ['id', 'image', 'icon', 'num', 'image1', 'image2', 'link', 'color', 'padding', 'titleSize', 'descSize', 'subtitleSize', 'subTextSize', 'ctaTitleSize', 'ctaDescSize', 'methodTitleSize', 'methodDescSize', 'stepTitleSize', 'stepDescSize', 'cardTitleSize', 'cardDescSize', 'subTitleSize'].includes(key);
    };

    const syncItemFields = (sourceItem: any, targetItem: any) => {
        const syncedItem = { ...targetItem };
        for (const key in sourceItem) {
            if (isNonTranslatable(key)) {
                syncedItem[key] = sourceItem[key];
            }
        }
        return syncedItem;
    };

    for (const key in data) {
        const value = data[key];

        if (Array.isArray(value)) {
            // It's a list (e.g., doctorsList, steps, methods)
            const otherList = syncedData[key] || [];

            // Sync structure and order by ID
            syncedData[key] = value.map((sourceItem: any) => {
                const existingOtherItem = otherList.find((item: any) => item.id === sourceItem.id);
                if (existingOtherItem) {
                    return syncItemFields(sourceItem, existingOtherItem);
                } else {
                    // New item - copy entire item as a base
                    return { ...sourceItem };
                }
            });
        } else if (isNonTranslatable(key)) {
            syncedData[key] = value;
        }
    }

    updatedOtherContent[section] = syncedData;
    return updatedOtherContent;
};

export const useContent = () => {
    const [language, setLanguage] = useState(() => {
        const savedLang = localStorage.getItem('clinic_language');
        return (savedLang === 'en' || savedLang === 'ru' || savedLang === 'kz') ? savedLang : 'ru';
    });

    const loadLanguageContent = async (lang: string) => {
        const currentDefault = await loadDefaultContent(lang);
        try {
            const saved = localStorage.getItem(`clinic_content_${lang}`);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed && typeof parsed === 'object') {
                    const merged = {
                        ...currentDefault,
                        ...parsed,
                        hero: { ...currentDefault.hero, ...(parsed.hero || {}) },
                        values: { ...currentDefault.values, ...(parsed.values || {}) },
                        process: { ...currentDefault.process, ...(parsed.process || {}) },
                        trust: { ...currentDefault.trust, ...(parsed.trust || {}) },
                        doctors: { ...currentDefault.doctors, ...(parsed.doctors || {}) },
                        specialists: { ...currentDefault.specialists, ...(parsed.specialists || {}) },
                        reviews: { ...currentDefault.reviews, ...(parsed.reviews || {}) },
                        directions: { ...currentDefault.directions, ...(parsed.directions || {}) },
                        contact: { ...currentDefault.contact, ...(parsed.contact || {}) },
                        footer: { ...currentDefault.footer, ...(parsed.footer || {}) },
                    };

                    // Keep the bundled photo for Irada if an older localStorage
                    // snapshot contains the doctor without an image.
                    const defaultIrada = currentDefault.doctors?.doctorsList?.find(
                        (doctor: any) => doctor.id === '1771185819924'
                    );
                    if (defaultIrada && Array.isArray(merged.doctors?.doctorsList)) {
                        merged.doctors.doctorsList = merged.doctors.doctorsList.map((doctor: any) =>
                            doctor.id === '1771185819924' && !doctor.image
                                ? { ...doctor, image: defaultIrada.image }
                                : doctor
                        );
                    }

                    // Migrate legacy embedded data URLs to static specialists image.
                    if (typeof merged?.specialists?.image === 'string' && merged.specialists.image.startsWith('data:image/')) {
                        merged.specialists.image = '/team.jpg';
                    }
                    if (!Array.isArray(merged.sectionsOrder)) {
                        merged.sectionsOrder = currentDefault.sectionsOrder;
                    } else {
                        // Keep user-defined order, but append any newly introduced sections.
                        const missingSections = currentDefault.sectionsOrder.filter((id: string) => !merged.sectionsOrder.includes(id));
                        merged.sectionsOrder = [...merged.sectionsOrder, ...missingSections];

                        merged.sectionsOrder = merged.sectionsOrder.filter((id: string) => id !== 'news');
                    }
                    return merged;
                }
            }
        } catch (e) {
            console.error(`Failed to load content for ${lang} from localStorage`, e);
        }
        return currentDefault;
    };

    const [content, setContent] = useState<any>(null);

    // Update content state when language changes
    useEffect(() => {
        let cancelled = false;
        localStorage.setItem('clinic_language', language);
        loadLanguageContent(language).then((loadedContent) => {
            if (!cancelled) setContent(loadedContent);
        });

        return () => {
            cancelled = true;
        };
    }, [language]);

    const updateContent = (section: string, data: any) => {
        if (!content) return;

        // 1. Update current language
        const newContent = {
            ...content,
            [section]: { ...content[section], ...data }
        };
        setContent(newContent);
        localStorage.setItem(`clinic_content_${language}`, JSON.stringify(newContent));

        // 2. Sync to other languages in localStorage
        const otherLanguages = Object.keys(CONTENT_LOADERS).filter(lang => lang !== language);

        void Promise.all(otherLanguages.map(async (otherLang) => {
            const otherContent = await loadLanguageContent(otherLang);
            const syncedOtherContent = syncContentData(section, data, otherContent);
            localStorage.setItem(`clinic_content_${otherLang}`, JSON.stringify(syncedOtherContent));
        }));
    };

    const reorderSections = (newOrder: string[]) => {
        if (!content) return;

        const newContent = { ...content, sectionsOrder: newOrder };
        setContent(newContent);
        localStorage.setItem(`clinic_content_${language}`, JSON.stringify(newContent));

        // Sync order to other languages
        const otherLanguages = Object.keys(CONTENT_LOADERS).filter(lang => lang !== language);

        void Promise.all(otherLanguages.map(async (otherLang) => {
            const otherContent = await loadLanguageContent(otherLang);
            otherContent.sectionsOrder = newOrder;
            localStorage.setItem(`clinic_content_${otherLang}`, JSON.stringify(otherContent));
        }));
    };

    return { content, updateContent, reorderSections, language, setLanguage };
};
