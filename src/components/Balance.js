import { useDashboard, useDashboardContext } from '@/hooks';
import { useFormat } from '@/hooks/useFormat';
import { Box, Tooltip, Typography } from '@mui/material'
import { usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';

const Balance = () => {
    const { getBalanceData } = useDashboard()
    const { balance, balanceMLC, balanceUSD } = useDashboardContext();
    const pathname = usePathname();
    const { currencyFormat } = useFormat();

    useEffect(() => {
        getBalanceData();
    }, [getBalanceData, pathname]);

    const getTooltip = useMemo(() => {
        return `MLC: $${currencyFormat(balanceMLC)} USD: $${currencyFormat(balanceUSD)}`
    }, [balanceMLC, balanceUSD, currencyFormat])

    return <Tooltip title={getTooltip}>
        <Box sx={styles.balance}>
            <Typography sx={{ fontWeight: 600, userSelect: 'none' }}>Balance: </Typography>
            <Typography sx={styles.value}>{currencyFormat(balance) ?? '0'}$</Typography>
        </Box>
    </Tooltip>
}

export default Balance


const styles = {
    balance: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' },
    value: { textShadow: '1px 2px 3px lightskyblue' }
}