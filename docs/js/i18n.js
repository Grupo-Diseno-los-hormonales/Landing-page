document.addEventListener('DOMContentLoaded', () => {
    const langSwitcherBtn = document.getElementById('langSwitcherBtn');
    let currentLang = localStorage.getItem('language') || 'en'; // Default to English

    async function loadTranslations(lang) {
        try {
            const response = await fetch(`i18n/${lang}.json`);
            if (!response.ok) {
                console.error(`Failed to load ${lang}.json: ${response.statusText}`);
                // Fallback to English if the selected language file fails to load
                if (lang !== 'en') {
                    return await loadTranslations('en');
                }
                return null; // If English also fails, return null
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching translation file for ${lang}:`, error);
            if (lang !== 'en') {
                return await loadTranslations('en');
            }
            return null;
        }
    }

    async function applyTranslations(lang) {
        const translations = await loadTranslations(lang);
        if (!translations) {
            console.error("No translations loaded, cannot apply.");
            return;
        }

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key]) {
                // Check if the translation value contains HTML tags
                if (/[<>]/.test(translations[key])) {
                    el.innerHTML = translations[key]; // Use innerHTML if HTML is present
                } else {
                    el.textContent = translations[key]; // Use textContent otherwise
                }
            } else {
                console.warn(`Translation key "${key}" not found for language "${lang}".`);
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[key]) {
                el.setAttribute('placeholder', translations[key]);
            } else {
                console.warn(`Placeholder key "${key}" not found for language "${lang}".`);
            }
        });

        document.documentElement.lang = lang;
        if (langSwitcherBtn) {
            langSwitcherBtn.textContent = lang.toUpperCase();
        }
    }

    if (langSwitcherBtn) {
        langSwitcherBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'es' : 'en';
            localStorage.setItem('language', currentLang);
            applyTranslations(currentLang);
        });
    }

    // Initial load
    applyTranslations(currentLang);
});
