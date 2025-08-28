import DetailsDataRow from '@/components/DetailsDataRow'
import DetailsDrawer from '@/components/DetailsDrawer'
import { useTranslation } from '@/hooks/useTranslation'
import { useParams } from 'next/navigation'

const Details = ({ item, onClose = () => { } }) => {
    const params = useParams()
    const { t } = useTranslation(params?.lng ?? 'en', 'transactions')

    return <DetailsDrawer onClose={onClose} extraclasses={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <DetailsDataRow value={item.category?.name} title={t('category')} />
        <DetailsDataRow value={item.subCategory?.name} title={t('subCategory')} />
        {item?.amount > 0 && <DetailsDataRow value={item.amount} title={t('amount')} />}
        {(item?.description && item?.description !== '') && <DetailsDataRow value={item.description} title={t('description')} />}
    </DetailsDrawer>
}

export default Details
