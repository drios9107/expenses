import { useLayoutStyles } from '@/hooks/useLayoutStyles'
import { Paper, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    const { conditionalFooterSectionStyles } = useLayoutStyles()

    return <Paper sx={[styles.footerSection, conditionalFooterSectionStyles]}>
        <Typography variant='body1'>Copyright © 2023 Expenses</Typography>
    </Paper>
}

export default Footer

const styles = {
    footerSection: { backgroundColor: '#fff', minHeight: '60px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' },
}