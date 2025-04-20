// hooks/useTranslation.js
'use client'
import { useTranslation as useI18nTranslation } from 'react-i18next'

export function useTranslation(lng, ns) {
    return useI18nTranslation(ns, { lng })
}