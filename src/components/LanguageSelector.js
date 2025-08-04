import { useCallback, useEffect, useMemo, useState } from 'react';
import MuiSingleSelectFieldWithoutControl from './inputs/MuiSingleSelectFieldWithoutControl';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';

const LanguageSelector = ({ options = {} }) => {
    const { lng = 'en' } = useParams()
    const { t } = useTranslation(lng, 'common')
    const pathname = usePathname()
    const router = useRouter()
    const [language, setLanguage] = useState()
    console.log('***', { language, lng, pathname })
    useEffect(() => {
        if (lng)
            setLanguage(lng)
    }, [lng])

    const languageList = useMemo(() => {
        return [
            { _id: 'es', name: t('es') },
            { _id: 'en', name: t('en') }
        ]
    }, [t])

    const onChange = useCallback((v) => {
        const value = v?.target?.value;
        setLanguage(value);
        const splittedPath = pathname?.split('/')

        if (languageList.findIndex(i => i?._id === splittedPath?.[1]) > -1) {
            const path = splittedPath?.[2]
            router.push(`/${value}/${path}`)
        }
    }, [languageList, pathname, router])

    return <MuiSingleSelectFieldWithoutControl
        fieldName={'language'}
        state={language}
        setState={onChange}
        list={languageList}
        options={{ sx: { width: '70px' }, ...options }}
    />
}

export default LanguageSelector