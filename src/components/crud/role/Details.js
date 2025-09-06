import DetailsDataRow from '@/components/DetailsDataRow'
import DetailsDrawer from '@/components/DetailsDrawer'
import { useTranslation } from '@/hooks/useTranslation'
import moment from 'moment'
import { useParams } from 'next/navigation'

const Details = ({ item, onClose = () => { } }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'role');

    return <DetailsDrawer onClose={onClose} extraclasses={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <DetailsDataRow value={item?.name} title={t('name')} />
        <DetailsDataRow value={moment(item?.created_at).format('YYYY-MM-DD')} title={t('created_at')} />
    </DetailsDrawer>
}

export default Details
