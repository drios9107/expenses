'use client';
import { CategoryProvider } from '@/contexts/CategoryContext';
import { SubCategoryProvider } from '@/contexts/SubCategoryContext';
import { TransactionProvider } from '@/contexts/TransactionContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { es } from 'date-fns/locale';
import { DashboardProvider } from '@/contexts/DashboardContext';
import { RecurrentTransactionProvider } from '@/contexts/RecurrentTransactionContext';
import NextTopLoader from 'nextjs-toploader';
import Layout from './Layout';
import { SessionProvider } from 'next-auth/react';

const App = ({ children }) => {
    return <SessionProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <DashboardProvider>
                <CategoryProvider>
                    <SubCategoryProvider>
                        <TransactionProvider>
                            <RecurrentTransactionProvider>
                                <NextTopLoader showSpinner={false} />
                                <Layout>
                                    {children}
                                </Layout>
                            </RecurrentTransactionProvider>
                        </TransactionProvider>
                    </SubCategoryProvider>
                </CategoryProvider>
            </DashboardProvider>
        </LocalizationProvider>
    </SessionProvider>
}

export default App
