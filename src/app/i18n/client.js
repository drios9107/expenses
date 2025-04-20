'use client'
import i18next from './i18next'
import { I18nextProvider } from 'react-i18next'

export default function I18nClientProvider({ children, lng }) {
    if (lng && i18next.resolvedLanguage !== lng) {
        i18next.changeLanguage(lng)
    }
    return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
}