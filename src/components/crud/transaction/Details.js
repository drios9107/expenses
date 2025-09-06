import DetailsDataRow from '@/components/DetailsDataRow'
import DetailsDrawer from '@/components/DetailsDrawer'
import { useTranslation } from '@/hooks/useTranslation'
import { typeList } from '@/utils/helpers'
import { Check, DoNotDisturb } from '@mui/icons-material'
import { useParams } from 'next/navigation'
import { useCallback } from 'react'

const Details = ({ item, onClose = () => { } }) => {
    const params = useParams()
    const { t } = useTranslation(params?.lng ?? 'en', 'transactions')

    const getType = useCallback(row => {
        return typeList.find(i => i._id === row?.type)?.name
    }, [])

    return <DetailsDrawer onClose={onClose} extraclasses={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <DetailsDataRow value={item.category?.name} title={t('category')} />
        <DetailsDataRow value={item.subCategory?.name} title={t('subCategory')} />
        <DetailsDataRow value={getType(item)} title={t('type')} />
        {item?.amount > 0 && <DetailsDataRow value={item.amount} title={t('amount')} />}
        <DetailsDataRow value={item?.isExpense ? <Check sx={styles.icon} /> : <DoNotDisturb sx={styles.icon} />} title={t('isExpense')} />
        <DetailsDataRow value={item?.isRecurrent ? <Check sx={styles.icon} /> : <DoNotDisturb sx={styles.icon} />} title={t('isRecurrent')} />
        {(item?.description && item?.description !== '') && <DetailsDataRow value={item.description} title={t('description')} />}
    </DetailsDrawer>
}

export default Details

const styles = {
    icon: { height: "20px", width: "20px" }
}