import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { policyRoutes, publicRoutes } from '@/utils/helpers';
import { useLayoutStyles } from '@/hooks/useLayoutStyles';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import GuestLayout from './GuestLayout';


const Layout = ({ children }) => {
    const { status } = useSession()
    const { replace } = useRouter()
    const pathname = usePathname();
    const { conditionalContainerStyles } = useLayoutStyles()

    useEffect(() => {
        if (status !== 'loading') {
            if (status === 'unauthenticated' && !policyRoutes.includes(pathname))
                replace('/login')
            else if (publicRoutes?.includes(pathname))
                replace('/')
        }
    }, [status, pathname, replace])

    if (status !== 'authenticated' && !publicRoutes?.includes(pathname))
        return null

    if (publicRoutes?.includes(pathname) || policyRoutes.includes(pathname))
        return <GuestLayout>
            {children}
        </GuestLayout>

    return <Box sx={[styles.container, conditionalContainerStyles]}>
        <Header />
        <Body>
            {children}
        </Body>
        <Footer />
    </Box>
}

export default Layout

const styles = {
    container: { display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: 'gainsboro', minHeight: '100vh' },
}