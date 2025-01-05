import { Box, Paper } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import Balance from '../Balance'
import { Home, Logout } from '@mui/icons-material'
import { signOut } from 'next-auth/react'
import { useLayoutStyles } from '@/hooks/useLayoutStyles'

const Header = () => {
    const { conditionalTopSectionStyles } = useLayoutStyles();

    return <Paper sx={[styles.topSection, conditionalTopSectionStyles]}>
        <Link href={'/'} style={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }}><Home sx={styles.iconMenu} />Home</Link>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <Balance />
            <Logout sx={[styles.iconMenu, { cursor: 'pointer' }]} onClick={() => signOut()} />
        </Box>
    </Paper>
}

export default Header

const styles = {
    topSection: { backgroundColor: '#fff', minHeight: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', },
    iconMenu: { color: '#00000099', height: "20px", width: "20px" },
}