import { useState, useEffect } from 'react';
import initialContentRu from '../data/content.json';
import initialContentEn from '../data/content_en.json';
import initialContentKz from '../data/content_kz.json';

const DEFAULT_CONTENTS: { [key: string]: any } = {
    ru: initialContentRu,
    en: initialContentEn,
    kz: initialContentKz
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

    const loadLanguageContent = (lang: string) => {
        const currentDefault = DEFAULT_CONTENTS[lang];
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
                        directions: { ...currentDefault.directions, ...(parsed.directions || {}) },
                        contact: { ...currentDefault.contact, ...(parsed.contact || {}) },
                        footer: { ...currentDefault.footer, ...(parsed.footer || {}) },
                    };
                    if (!Array.isArray(merged.sectionsOrder)) {
                        merged.sectionsOrder = currentDefault.sectionsOrder;
                    }
                    return merged;
                }
            }
        } catch (e) {
            console.error(`Failed to load content for ${lang} from localStorage`, e);
        }
        return currentDefault;
    };

    const [content, setContent] = useState(() => loadLanguageContent(language));

    // Update content state when language changes
    useEffect(() => {
        localStorage.setItem('clinic_language', language);
        setContent(loadLanguageContent(language));
    }, [language]);

    const updateContent = (section: string, data: any) => {
        // 1. Update current language
        const newContent = {
            ...content,
            [section]: { ...content[section], ...data }
        };
        setContent(newContent);
        localStorage.setItem(`clinic_content_${language}`, JSON.stringify(newContent));

        // 2. Sync to other languages in localStorage
        const otherLanguages = Object.keys(DEFAULT_CONTENTS).filter(lang => lang !== language);

        otherLanguages.forEach(otherLang => {
            const otherContent = loadLanguageContent(otherLang);
            const syncedOtherContent = syncContentData(section, data, otherContent);
            localStorage.setItem(`clinic_content_${otherLang}`, JSON.stringify(syncedOtherContent));
        });
    };

    const reorderSections = (newOrder: string[]) => {
        const newContent = { ...content, sectionsOrder: newOrder };
        setContent(newContent);
        localStorage.setItem(`clinic_content_${language}`, JSON.stringify(newContent));

        // Sync order to other languages
        const otherLanguages = Object.keys(DEFAULT_CONTENTS).filter(lang => lang !== language);

        otherLanguages.forEach(otherLang => {
            const otherContent = loadLanguageContent(otherLang);
            otherContent.sectionsOrder = newOrder;
            localStorage.setItem(`clinic_content_${otherLang}`, JSON.stringify(otherContent));
        });
    };

    return { content, updateContent, reorderSections, language, setLanguage };
};

