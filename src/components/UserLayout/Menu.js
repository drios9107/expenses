import { Divider, Paper } from '@mui/material';
import { useState } from 'react';
import MenuLink from '../MenuLink'
import { CalendarMonth, Category, CurrencyExchange, Payments } from '@mui/icons-material';
import { MenuLeftOutline, MenuRightOutline, ToyBrick } from 'mdi-material-ui';
import { useParams } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import MenuAction from '../MenuAction'

const Menu = () => {
    const { lng } = useParams()
    const { t } = useTranslation(lng ?? 'en', 'common')
    const [forceMobileView, setForceMobileView] = useState(false)


    return <Paper sx={styles.menu}>
        <MenuLink href={`/${lng}/category`} title={t('category')} useMobileView={forceMobileView}>
            <Category sx={styles.iconMenu} />
        </MenuLink>
        <MenuLink href={`/${lng}/subcategory`} title={t('subCategory')} useMobileView={forceMobileView}>
            <ToyBrick sx={styles.iconMenu} />
        </MenuLink>
        <MenuLink href={`/${lng}/transaction`} title={t('transaction')} useMobileView={forceMobileView}>
            <Payments sx={styles.iconMenu} />
        </MenuLink>
        <MenuLink href={`/${lng}/recurrent-transaction`} title={t('recurrentTransaction')} useMobileView={forceMobileView}>
            <CurrencyExchange sx={styles.iconMenu} />
        </MenuLink>
        <Divider />
        <MenuLink href={`/${lng}/current-month`} title={t('currentMonth')} useMobileView={forceMobileView}>
            <CalendarMonth sx={styles.iconMenu} />
        </MenuLink>
        <MenuAction onClick={() => setForceMobileView(!forceMobileView)} useMobileView={forceMobileView}>
            {forceMobileView ? <MenuRightOutline sx={styles.iconMenu} /> : <MenuLeftOutline sx={styles.iconMenu} />}
        </MenuAction>
    </Paper>
}

export default Menu


const styles = {
    menu: { backgroundColor: '#fff', borderRadius: '16px', minWidth: 'fit-content', minHeight: '250px', maxHeight: 'calc(100vh - 170px)', height: 'fit-content', display: 'flex', flexDirection: 'column', py: '25px' },
    iconMenu: { color: '#00000099', height: "20px", width: "20px" },
}