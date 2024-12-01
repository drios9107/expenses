'use client';
import { CategoryProvider } from '@/contexts/CategoryContext';
import { SubCategoryProvider } from '@/contexts/SubCategoryContext';
import { TransactionProvider } from '@/contexts/TransactionContext';
import { Box, Divider, Paper, useMediaQuery } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import MenuLink from './MenuLink';
import { DashboardProvider } from '@/contexts/DashboardContext';
import { RecurrentTransactionProvider } from '@/contexts/RecurrentTransactionContext';
import Balance from './Balance';


const Layout = ({ children }) => {
    const isMobile = useMediaQuery("@media (max-width:500px)");

    return <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <DashboardProvider>
            <CategoryProvider>
                <SubCategoryProvider>
                    <TransactionProvider>
                        <RecurrentTransactionProvider>
                            <Box sx={styles.container}>
                                <Paper sx={styles.topSection}>
                                    <Link href={'/'}>Home</Link>
                                    <Balance />
                                </Paper>
                                <Box sx={styles.middleSection}>
                                    <Paper sx={[styles.menu, { width: isMobile ? '50px' : '200px' }]}>
                                        <MenuLink href={'/category'} title='Category' />
                                        <MenuLink href={'/subcategory'} title='Subcategory' />
                                        <MenuLink href={'/transaction'} title='Transaction' />
                                        <MenuLink href={'/recurrent-transaction'} title='Recurrent Transaction' />
                                        <Divider />
                                        <MenuLink href={'/current-month'} title='Current Month' />
                                    </Paper>
                                    <Box sx={styles.bodySection}>
                                        {children}
                                    </Box>
                                </Box>
                                <Paper sx={styles.footerSection}>

                                </Paper>
                            </Box>
                        </RecurrentTransactionProvider>
                    </TransactionProvider>
                </SubCategoryProvider>
            </CategoryProvider>
        </DashboardProvider>
    </LocalizationProvider>
}

export default Layout

const styles = {
    container: { display: 'flex', gap: '25px', flexDirection: 'column', width: '100%', backgroundColor: 'gainsboro', px: '25px', minHeight: '100vh' },
    topSection: { backgroundColor: '#fff', borderBottomRightRadius: '16px', borderBottomLeftRadius: '16px', minHeight: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: '16px' },
    middleSection: { gap: '25px', display: 'flex', flexDirection: 'row', width: '100%', flex: 1, justifyContent: 'space-between' },
    menu: { py: '25px', backgroundColor: '#fff', borderRadius: '16px', width: '200px', minHeight: '300px', height: 'calc(100vh - 170px)' },
    bodySection: { flex: 1 },
    footerSection: { backgroundColor: '#fff', borderTopRightRadius: '16px', borderTopLeftRadius: '16px', minHeight: '60px' },
}