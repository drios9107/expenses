import { useDashboard } from '@/hooks';
import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'

const Balance = ({ }) => {
    const { balance, getBalance } = useDashboard();

    useEffect(() => {
        getBalance();
    }, [getBalance]);

    return <Box sx={styles.balance}>
        <Typography sx={{ fontWeight: 600 }}>Balance: </Typography>
        <Typography>{balance ?? '0'}$</Typography>
    </Box>
}

export default Balance


const styles = {
    balance: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' },
}