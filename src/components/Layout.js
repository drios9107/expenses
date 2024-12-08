import { Box, Divider, Paper, Typography, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import MenuLink from './MenuLink';
import Balance from './Balance';
import { CalendarMonth, Category, CurrencyExchange, Payments } from '@mui/icons-material';
import { ToyBrick } from 'mdi-material-ui';
import { useMemo } from 'react';


const Layout = ({ children }) => {
    const isMobile = useMediaQuery("@media (max-width:500px)");

    const conditionalContainerStyles = useMemo(() => {
        return isMobile ? { gap: '10px', px: '10px' } : { gap: '25px', px: '25px' }
    }, [isMobile])

    const conditionalTopSectionStyles = useMemo(() => {
        return isMobile ?
            { borderBottomRightRadius: '8px', borderBottomLeftRadius: '8px', px: '8px' } :
            { borderBottomRightRadius: '16px', borderBottomLeftRadius: '16px', px: '16px' }
    }, [isMobile])

    const conditionalMiddleSectionStyles = useMemo(() => {
        return isMobile ? { gap: '10px' } : { gap: '25px' }
    }, [isMobile])

    const conditionalMenuStyles = useMemo(() => {
        return isMobile ? { width: 'fit-content', py: '10px' } : { width: '220px', py: '25px' }
    }, [isMobile])

    const conditionalFooterSectionStyles = useMemo(() => {
        return isMobile ? { borderTopRightRadius: '8px', borderTopLeftRadius: '8px', px: '10px' } : { borderTopRightRadius: '16px', borderTopLeftRadius: '16px', px: '25px' }
    }, [isMobile])

    return <Box sx={[styles.container, conditionalContainerStyles]}>
        <Paper sx={[styles.topSection, conditionalTopSectionStyles]}>
            <Link href={'/'}>Home</Link>
            <Balance />
        </Paper>
        <Box sx={[styles.middleSection, conditionalMiddleSectionStyles]}>
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
        <Paper sx={[styles.footerSection, conditionalFooterSectionStyles]}>
            <Typography variant='body1'>Copyright © 2023 Expenses</Typography>
        </Paper>
    </Box>
}

export default Layout

const styles = {
    container: { display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: 'gainsboro', minHeight: '100vh' },
    topSection: { backgroundColor: '#fff', minHeight: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', },
    middleSection: { gap: '25px', display: 'flex', flexDirection: 'row', width: '100%', flex: 1, justifyContent: 'space-between' },
    menu: { backgroundColor: '#fff', borderRadius: '16px', width: '200px', minHeight: '250px', maxHeight: 'calc(100vh - 170px)', height: 'fit-content', display: 'flex', flexDirection: 'column' },
    iconMenu: { color: '#00000099', height: "20px", width: "20px" },
    bodySection: { flex: 1 },
    footerSection: { backgroundColor: '#fff', minHeight: '60px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' },
}