import DetailsDataRow from '@/components/DetailsDataRow'
import DetailsDrawer from '@/components/DetailsDrawer'
import { useTranslation } from '@/hooks/useTranslation'
import { getPersonFullName } from '@/utils/helpers'
import moment from 'moment'
import { useParams } from 'next/navigation'

const Details = ({ item, onClose = () => { } }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'debt');

    return <DetailsDrawer onClose={onClose} extraclasses={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <DetailsDataRow value={getPersonFullName(item?.person)} title={t('person')} />
        <DetailsDataRow value={moment(item?.date).format('YYYY-MM-DD')} title={t('date')} />
        <DetailsDataRow value={`${item.amount ?? 0}$`} title={t('amount')} />
        <DetailsDataRow value={`${item.paid ?? 0}$`} title={t('paid')} />
        <DetailsDataRow value={item.type} title={t('type')} />
        <DetailsDataRow value={item.isMyDebt} title={t('isMyDebt')} />
        {item?.transferId && <DetailsDataRow value={item.transferId} title={t('transferId')} />}
    </DetailsDrawer>
}

export default Details
