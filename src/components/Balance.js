import { useDashboard, useDashboardContext } from '@/hooks';
import { Box, Tooltip, Typography } from '@mui/material'
import { usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';

const Balance = () => {
    const { getBalanceData } = useDashboard()
    const { balance, balanceMLC, balanceUSD } = useDashboardContext();
    const pathname = usePathname();

    useEffect(() => {
        getBalanceData();
    }, [getBalanceData, pathname]);

    const getTooltip = useMemo(() => {
        return `MLC: $${balanceMLC} USD: $${balanceUSD}`
    }, [balanceMLC, balanceUSD])

    return <Tooltip title={getTooltip}>
        <Box sx={styles.balance}>
            <Typography sx={{ fontWeight: 600, userSelect: 'none' }}>Balance: </Typography>
            <Typography sx={styles.value}>{balance ?? '0'}$</Typography>
        </Box>
    </Tooltip>
}

export default Balance


const styles = {
    balance: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' },
    value: { textShadow: '1px 2px 3px lightskyblue' }
}