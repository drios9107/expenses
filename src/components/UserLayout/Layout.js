import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { publicRoutes } from '@/utils/helpers';
import { useLayoutStyles } from '@/hooks/useLayoutStyles';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import GuestLayout from './GuestLayout';


const Layout = ({ children }) => {
    const { status } = useSession()
    const { replace } = useRouter()
    const pathname = usePathname();
    const { conditionalContainerStyles, conditionalMiddleSectionStyles, conditionalMenuStyles } = useLayoutStyles()

    useEffect(() => {
        if (status !== 'loading') {
            if (status === 'unauthenticated')
                replace('/login')
            else if (publicRoutes?.includes(pathname))
                replace('/')
        }
    }, [status, pathname, replace])

    if (status !== 'authenticated' && !publicRoutes?.includes(pathname))
        return null

    if (publicRoutes?.includes(pathname))
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