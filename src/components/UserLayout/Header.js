import { Box, Paper } from '@mui/material'
import Link from 'next/link'
import React, { useCallback } from 'react'
import Balance from '../Balance'
import { Home, Logout, Policy } from '@mui/icons-material'
import { signOut } from 'next-auth/react'
import { useLayoutStyles } from '@/hooks/useLayoutStyles'
import { setAuthToken } from '@/utils/AxiosInterceptor'

const Header = () => {
    const { conditionalTopSectionStyles } = useLayoutStyles();

    const handleSignOut = useCallback(() => {
        signOut()
        setAuthToken(null);
    }, [])

    return <Paper sx={[styles.topSection, conditionalTopSectionStyles]}>
        <Box sx={[styles.opacity, { display: 'flex', flexDirection: 'row', gap: '10px' }]}>
            <Link href={'/'} style={styles.link}><Home sx={styles.iconMenu} />Home</Link>
            <Link href="/privacy" style={styles.link}><Policy sx={styles.iconMenu} />Privacy policy</Link>
        </Box>
        <Box sx={styles.rightSection}>
            <Balance />
            <Box sx={[styles.opacity, { cursor: 'pointer', display: 'flex', alignItems: 'center' }]}>
                <Logout sx={styles.iconMenu} onClick={handleSignOut} />
            </Box>
        </Box>

    </Paper>
}

export default Header

const styles = {
    topSection: { backgroundColor: '#fff', minHeight: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', },
    opacity: { '& :hover': { opacity: 0.7 } },
    iconMenu: { color: '#00000099', height: "20px", width: "20px" },
    link: { display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' },
    rightSection: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' },
}