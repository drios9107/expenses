import DetailsDataRow from '@/components/DetailsDataRow'
import DetailsDrawer from '@/components/DetailsDrawer'
import { useTranslation } from '@/hooks/useTranslation'
import { useParams } from 'next/navigation'

const Details = ({ item, onClose = () => { } }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'category');

    return <DetailsDrawer onClose={onClose} extraclasses={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <DetailsDataRow value={item?.name} title={t('name')} />
    </DetailsDrawer>
}

export default Details
