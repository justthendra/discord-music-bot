const config = require('../config');
const tr = require('./tr');
const en = require('./en');

const languages = { tr, en };

class I18n {
    constructor() {
        this.defaultLang = config.defaultLanguage || 'tr';
        this.guildLanguages = new Map();
    }

    /**
     * Get the language for a guild
     */
    getLanguage(guildId) {
        return this.guildLanguages.get(guildId) || this.defaultLang;
    }

    /**
     * Set the language for a guild
     */
    setLanguage(guildId, lang) {
        if (languages[lang]) {
            this.guildLanguages.set(guildId, lang);
            return true;
        }
        return false;
    }

    /**
     * Get a translation
     * @param {string} key - Dot notation key (e.g., 'play.addedToQueue')
     * @param {string} guildId - Guild ID for language selection
     * @param {object} params - Parameters to replace in the string
     */
    t(key, guildId = null, params = {}) {
        const lang = guildId ? this.getLanguage(guildId) : this.defaultLang;
        const translations = languages[lang] || languages[this.defaultLang];

        // Navigate to the key
        const keys = key.split('.');
        let value = translations;

        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                // Fallback to default language
                value = languages[this.defaultLang];
                for (const fallbackKey of keys) {
                    if (value && value[fallbackKey] !== undefined) {
                        value = value[fallbackKey];
                    } else {
                        return key; // Return key if not found
                    }
                }
                break;
            }
        }

        // Replace parameters
        if (typeof value === 'string') {
            return value.replace(/\{(\w+)\}/g, (_, param) => {
                return params[param] !== undefined ? params[param] : `{${param}}`;
            });
        }

        return value;
    }

    /**
     * Get available languages
     */
    getAvailableLanguages() {
        return Object.keys(languages);
    }
}

module.exports = new I18n();
