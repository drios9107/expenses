import { Divider, Paper } from '@mui/material';
import { useState } from 'react';
import MenuLink from '../MenuLink'
import { CalendarMonth, Category, CurrencyExchange, Payments } from '@mui/icons-material';
import { ToyBrick } from 'mdi-material-ui';
import { useParams } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import MenuAction from '../MenuAction'


const Menu = () => {
    const { lng } = useParams();
    const { t } = useTranslation(lng ?? 'en', 'common');
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Paper sx={collapsed ? { ...styles.menu, ...styles.collapsedMenu } : styles.menu}>
            <MenuLink
                href={`/${lng}/category`}
                title={t('category')}
                collapsed={collapsed}
            >
                <Category sx={styles.iconMenu} />
            </MenuLink>

            <MenuLink
                href={`/${lng}/subcategory`}
                title={t('subCategory')}
                collapsed={collapsed}
            >
                <ToyBrick sx={styles.iconMenu} />
            </MenuLink>

            <MenuLink
                href={`/${lng}/transaction`}
                title={t('transaction')}
                collapsed={collapsed}
            >
                <Payments sx={styles.iconMenu} />
            </MenuLink>

            <MenuLink
                href={`/${lng}/recurrent-transaction`}
                title={t('recurrentTransaction')}
                collapsed={collapsed}
            >
                <CurrencyExchange sx={styles.iconMenu} />
            </MenuLink>

            <Divider sx={[styles.divider, collapsed ? { width: '100%' } : {}]} />

            <MenuLink
                href={`/${lng}/current-month`}
                title={t('currentMonth')}
                collapsed={collapsed}
            >
                <CalendarMonth sx={styles.iconMenu} />
            </MenuLink>

            <MenuAction
                onClick={() => setCollapsed(!collapsed)}
                collapsed={collapsed}
            />
        </Paper>
    );
};

export default Menu

const styles = {
    menu: {
        backgroundColor: '#fff',
        borderRadius: '16px',
        width: '200px',
        minHeight: '250px',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        py: '25px',
        gap: '8px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    },
    collapsedMenu: {
        width: '72px',
        alignItems: 'center',
    },
    iconMenu: {
        color: '#00000099',
        height: "20px",
        width: "20px",
        flexShrink: 0,
    },
    divider: {
        my: '8px',
        mx: '8px',
    }
};