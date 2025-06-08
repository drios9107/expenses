import { useDashboardContext } from '@/hooks';
import { useFormat } from '@/hooks/useFormat';
import { useTranslation } from '@/hooks/useTranslation';
import { Typography } from '@mui/material';
import moment from 'moment'
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import IncomeExpensesContainer from './IncomeExpensesContainer';


const IncomeCard = () => {
    const { biggestIncome = 0, biggestIncomeDate } = useDashboardContext();
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'dashboard')
    const { currencyFormat } = useFormat();

    const leftSide = useMemo(() => {
        return <>
            <Typography variant='body2' sx={{ userSelect: 'none' }}>{t('biggestIncome')}</Typography>
            <Typography variant='body2' sx={{ userSelect: 'none' }}>{t('date')}</Typography>
        </>
    }, [t])

    const rightSide = useMemo(() => {
        return <>
            <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'right' }}>{currencyFormat(biggestIncome)} $</Typography>
            <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'right' }}>{biggestIncomeDate ? moment(biggestIncomeDate).format('DD/MM/YYYY') : '-'}</Typography>
        </>
    }, [biggestIncome, biggestIncomeDate, currencyFormat])

    return <IncomeExpensesContainer
        leftSide={leftSide}
        rightSide={rightSide}
    />
}

export default IncomeCard
