import { Box, Divider, Paper } from '@mui/material'
import React from 'react'
import MenuLink from '../MenuLink'
import { CalendarMonth, Category, CurrencyExchange, Payments } from '@mui/icons-material'
import { ToyBrick } from 'mdi-material-ui'
import { useLayoutStyles } from '@/hooks/useLayoutStyles'

const Body = ({ children }) => {
    const { conditionalMiddleSectionStyles, conditionalMenuStyles } = useLayoutStyles()

    return <Box sx={[styles.middleSection, conditionalMiddleSectionStyles]}>
        <Paper sx={[styles.menu, conditionalMenuStyles]}>
            <MenuLink href={'/category'} title='Category'>
                <Category sx={styles.iconMenu} />
            </MenuLink>
            <MenuLink href={'/subcategory'} title='Subcategory'>
                <ToyBrick sx={styles.iconMenu} />
            </MenuLink>
            <MenuLink href={'/transaction'} title='Transaction'>
                <Payments sx={styles.iconMenu} />
            </MenuLink>
            <MenuLink href={'/recurrent-transaction'} title='Recurrent Transaction'>
                <CurrencyExchange sx={styles.iconMenu} />
            </MenuLink>
            <Divider />
            <MenuLink href={'/current-month'} title='Current Month'>
                <CalendarMonth sx={styles.iconMenu} />
            </MenuLink>
        </Paper>
        <Box sx={styles.bodySection}>
            {children}
        </Box>
    </Box>
}

export default Body


const styles = {
    middleSection: { display: 'flex', flexDirection: 'row', width: '100%', flex: 1 },
    menu: { backgroundColor: '#fff', borderRadius: '16px', width: 'fit-content', minHeight: '250px', maxHeight: 'calc(100vh - 170px)', height: 'fit-content', display: 'flex', flexDirection: 'column' },
    iconMenu: { color: '#00000099', height: "20px", width: "20px" },
    bodySection: { flex: 7 },
}