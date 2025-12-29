import { Divider, Paper, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import MenuLink from '../MenuLink'
import {
    ArrowCircleRightOutlined,
    CategoryOutlined,
    CurrencyExchange,
    PaymentsOutlined,
    SecurityOutlined,
} from '@mui/icons-material';
import { AccountOutline, BankOff, CurrencyUsd, Human, ToyBrickOutline } from 'mdi-material-ui';
import { useParams } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import { useSession } from 'next-auth/react';
import ContractMenuAction from '../ContractMenuAction';
import MenuAction from '../MenuAction';
import ConversionCurrency from '../ConversionCurrency';


const Menu = () => {
    const { lng } = useParams();
    const { t } = useTranslation(lng ?? 'en', 'common');
    const isMobile = useMediaQuery("@media (max-width:640px)");
    const [collapsed, setCollapsed] = useState(false);
    const [openConvertCurrencyForm, setOpenConvertCurrencyForm] = useState(false);
    const { data: session } = useSession()

    useEffect(() => {
        if (isMobile)
            setCollapsed(true)
    }, [isMobile])

    return (
        <Paper sx={collapsed ? { ...styles.menu, ...styles.collapsedMenu } : styles.menu}>
            <MenuLink
                href={`/${lng}/category`}
                title={t('category')}
                collapsed={collapsed}
            >
                <CategoryOutlined sx={styles.iconMenu} />
            </MenuLink>

            <MenuLink
                href={`/${lng}/subcategory`}
                title={t('subCategory')}
                collapsed={collapsed}
            >
                <ToyBrickOutline sx={styles.iconMenu} />
            </MenuLink>

            <MenuLink
                href={`/${lng}/transaction`}
                title={t('transaction')}
                collapsed={collapsed}
            >
                <PaymentsOutlined sx={styles.iconMenu} />
            </MenuLink>

            <MenuLink
                href={`/${lng}/recurrent-transaction`}
                title={t('recurrentTransaction')}
                collapsed={collapsed}
            >
                <CurrencyExchange sx={styles.iconMenu} />
            </MenuLink>

            <MenuLink
                href={`/${lng}/debt`}
                title={t('debts')}
                collapsed={collapsed}
            >
                <BankOff sx={styles.iconMenu} />
            </MenuLink>

            <MenuAction
                onClick={() => setOpenConvertCurrencyForm(!openConvertCurrencyForm)}
                collapsed={collapsed}
                title={t('convertCurrency')}
            >
                <CurrencyUsd sx={styles.iconMenu} />
            </MenuAction>

            <Divider sx={[styles.divider, collapsed ? { width: '100%' } : {}]} />

            <MenuLink
                href={`/${lng}/person`}
                title={t('persons')}

                collapsed={collapsed}
            >
                <Human sx={styles.iconMenu} />
            </MenuLink>

            {session?.user?.role === 'Admin' && <>
                <MenuLink
                    href={`/${lng}/user`}
                    title={t('users')}
                    collapsed={collapsed}
                >
                    <AccountOutline sx={styles.iconMenu} />
                </MenuLink>

                <MenuLink
                    href={`/${lng}/role`}
                    title={t('roles')}
                    collapsed={collapsed}
                >
                    <SecurityOutlined sx={styles.iconMenu} />
                </MenuLink>
            </>}

            <MenuLink
                href={`/${lng}/default-transaction-value`}
                title={t('defaultTransactionValue')}
                collapsed={collapsed}
            >
                <ArrowCircleRightOutlined sx={styles.iconMenu} />
            </MenuLink>

            {/* <MenuLink
                href={`/${lng}/current-month`}
                title={t('currentMonth')}
                collapsed={collapsed}
            >
                <CalendarMonth sx={styles.iconMenu} />
            </MenuLink> */}

            {!isMobile && <ContractMenuAction
                onClick={() => setCollapsed(!collapsed)}
                collapsed={collapsed}
                title={t(collapsed ? 'expandMenu' : 'smallMenu2')}
            />}

            {openConvertCurrencyForm &&
                <ConversionCurrency onClose={() => setOpenConvertCurrencyForm(false)} />}
        </Paper>
    );
};

export default Menu

const styles = {
    menu: {
        backgroundColor: '#fff',
        borderRadius: '16px',
        minWidth: '250px',
        width: '250px',
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
        minWidth: '72px',
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