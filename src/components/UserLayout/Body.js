import { Box, Divider, Paper } from '@mui/material'
import React from 'react'
import MenuLink from '../MenuLink'
import Menu from './Menu';
import { CalendarMonth, Category, CurrencyExchange, Payments } from '@mui/icons-material'
import { ToyBrick } from 'mdi-material-ui'
import { useLayoutStyles } from '@/hooks/useLayoutStyles'

const Body = ({ children }) => {
    const { conditionalMiddleSectionStyles } = useLayoutStyles()

    return <Box sx={[styles.middleSection, conditionalMiddleSectionStyles]}>
        <Menu />
        <Box sx={styles.bodySection}>
            {children}
        </Box>
    </Box>
}

export default Body


const styles = {
    middleSection: { display: 'flex', flexDirection: 'row', width: '100%', flex: 1 },
    bodySection: { flex: 7 },
}