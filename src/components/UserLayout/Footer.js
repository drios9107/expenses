import { useLayoutStyles } from '@/hooks/useLayoutStyles'
import { Paper, Typography } from '@mui/material'
import React from 'react'
import moment from 'moment'
import { useMemo } from 'react'

const Footer = () => {
    const { conditionalFooterSectionStyles } = useLayoutStyles()
    const year = useMemo(() => moment().year(), [])

    return <Paper sx={[styles.footerSection, conditionalFooterSectionStyles]}>
        <Typography variant='body1' sx={{ userSelect: 'none' }}>Copyright © {year} Expenses</Typography>
    </Paper>
}

export default Footer

const styles = {
    footerSection: { backgroundColor: '#fff', minHeight: '60px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', borderBottomRightRadius: 0, borderBottomLeftRadius: 0 },
}