import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import { combinedPublicRoutes } from '@/utils/helpers';
import { useLayoutStyles } from '@/hooks/useLayoutStyles';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import GuestLayout from './GuestLayout';


const Layout = ({ children }) => {
    const pathname = usePathname();
    const { conditionalContainerStyles } = useLayoutStyles()

    if (combinedPublicRoutes?.includes(pathname))
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