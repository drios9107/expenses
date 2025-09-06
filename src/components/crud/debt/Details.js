import DetailsDataRow from '@/components/DetailsDataRow'
import DetailsDrawer from '@/components/DetailsDrawer'
import { useTranslation } from '@/hooks/useTranslation'
import { getPersonFullName } from '@/utils/helpers'
import { useParams } from 'next/navigation'
import { useCallback } from 'react'

const Details = ({ item, onClose = () => { } }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'debt');

    return <DetailsDrawer onClose={onClose} extraclasses={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <DetailsDataRow value={getPersonFullName(item)} title={t('person')} />
        <DetailsDataRow value={item.date} title={t('date')} />
        <DetailsDataRow value={item.amount} title={t('amount')} />
        <DetailsDataRow value={item.type} title={t('type')} />
        <DetailsDataRow value={item.isMyDebt} title={t('isMyDebt')} />
    </DetailsDrawer>
}

export default Details
