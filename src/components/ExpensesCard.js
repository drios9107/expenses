import { useDashboardContext } from '@/hooks';
import { useFormat } from '@/hooks/useFormat';
import { useTranslation } from '@/hooks/useTranslation';
import { Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import IncomeExpensesContainer from './IncomeExpensesContainer';

const ExpensesCard = () => {
    const { monthExpenses = 0, monthIncome = 0 } = useDashboardContext();
    const { currencyFormat } = useFormat();
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'dashboard')

    const leftSide = useMemo(() => {
        return <>
            <Typography variant='body2' sx={{ userSelect: 'none' }}>{t("expenses")}</Typography>
            <Typography variant='body2' sx={{ userSelect: 'none' }}>{t("income")}</Typography>
        </>
    }, [t])

    const rightSide = useMemo(() => {
        return <>
            <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'right', textShadow: '1px 2px 3px salmon' }} >{currencyFormat(monthExpenses)} $</Typography>
            <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'right', textShadow: '1px 2px 3px limegreen' }}>{currencyFormat(monthIncome)} $</Typography>
        </>
    }, [currencyFormat, monthExpenses, monthIncome])

    return <IncomeExpensesContainer
        leftSide={leftSide}
        rightSide={rightSide}
    />
}

export default ExpensesCard
