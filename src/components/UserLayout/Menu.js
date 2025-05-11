import { Box, Divider, Paper } from '@mui/material'
import React from 'react'
import MenuLink from '../MenuLink'
import { CalendarMonth, Category, CurrencyExchange, Payments } from '@mui/icons-material'
import { ToyBrick } from 'mdi-material-ui'
import { useLayoutStyles } from '@/hooks/useLayoutStyles'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'

const Menu = () => {
    const { lng } = useParams()
    const { conditionalMenuStyles } = useLayoutStyles()
    const { t } = useTranslation(lng ?? 'en', 'common')


    return <Paper sx={[styles.menu, conditionalMenuStyles]}>
        <MenuLink href={`/${lng}/category`} title={t('category')}>
            <Category sx={styles.iconMenu} />
        </MenuLink>
        <MenuLink href={`/${lng}/subcategory`} title={t('subCategory')}>
            <ToyBrick sx={styles.iconMenu} />
        </MenuLink>
        <MenuLink href={`/${lng}/transaction`} title={t('transaction')}>
            <Payments sx={styles.iconMenu} />
        </MenuLink>
        <MenuLink href={`/${lng}/recurrent-transaction`} title={t('recurrentTransaction')}>
            <CurrencyExchange sx={styles.iconMenu} />
        </MenuLink>
        <Divider />
        <MenuLink href={`/${lng}/current-month`} title={t('currentMonth')}>
            <CalendarMonth sx={styles.iconMenu} />
        </MenuLink>
    </Paper>
}

export default Menu


const styles = {
    menu: { backgroundColor: '#fff', borderRadius: '16px', minWidth: 'fit-content', minHeight: '250px', maxHeight: 'calc(100vh - 170px)', height: 'fit-content', display: 'flex', flexDirection: 'column' },
    iconMenu: { color: '#00000099', height: "20px", width: "20px" },
}