import { useTranslation } from '@/hooks/useTranslation'
import { Download } from '@mui/icons-material'
import { Typography } from '@mui/material'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const DownloadButton = () => {
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'contact');

    return <Link href="/documents/cv.pdf" download={'cv.pdf'} className='download-icon' target='_blank'>
        <Download /> <Typography>{t('downloadCV')}</Typography>
    </Link>
}

export default DownloadButton