import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
    .use(LanguageDetector)
    .use(resourcesToBackend((lng, ns) =>
        import(`./locales/${lng}/${ns}.json`).then((m) => m.default)
    ))
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'es'], // your languages
        detection: {
            order: ['path', 'cookie', 'htmlTag'],
            caches: ['cookie'],
        },
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        }
    })

export default i18n