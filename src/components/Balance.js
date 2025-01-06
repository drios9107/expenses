import { useDashboard, useDashboardContext } from '@/hooks';
import { Box, Typography } from '@mui/material'
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const Balance = () => {
    const { getBalanceData } = useDashboard()
    const { balance } = useDashboardContext();
    const pathname = usePathname();

    useEffect(() => {
        getBalanceData();
    }, [getBalanceData, pathname]);

    return <Box sx={styles.balance}>
        <Typography sx={{ fontWeight: 600 }}>Balance: </Typography>
        <Typography sx={styles.value}>{balance ?? '0'}$</Typography>
    </Box>
}

export default Balance


const styles = {
    balance: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' },
    value: { textShadow: '1px 2px 3px lightskyblue' }
}