'use client';
import { ListProvider } from '@/contexts/ListContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { es } from 'date-fns/locale';
import { DashboardProvider } from '@/contexts/DashboardContext';
import NextTopLoader from 'nextjs-toploader';
import Layout from './UserLayout/Layout';
import { SessionProvider } from 'next-auth/react';
import CookieConsentBanner from './CookieConsentBanner';

const App = ({ children }) => {
    return <SessionProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <DashboardProvider>
                <ListProvider>
                    <NextTopLoader showSpinner={false} />
                    <CookieConsentBanner />
                    <Layout>
                        {children}
                    </Layout>
                </ListProvider>
            </DashboardProvider>
        </LocalizationProvider>
    </SessionProvider>
}

export default App
