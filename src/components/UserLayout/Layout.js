import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import { combinedPublicRoutes } from '@/utils/helpers';
import { useLayoutStyles } from '@/hooks/useLayoutStyles';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import GuestLayout from './GuestLayout';
import Header2 from './Header2';
import Footer2 from './Footer2';


const Layout = ({ children }) => {
    const pathname = usePathname();
    const { conditionalContainerStyles } = useLayoutStyles()

    if (combinedPublicRoutes?.includes(pathname))
        return <GuestLayout>
            {children}
        </GuestLayout>

    return <Box sx={[styles.container, conditionalContainerStyles]}>
        <Header2 />
        <Body>
            {children}
        </Body>
        <Footer2 />
    </Box>
}

export default Layout

const styles = {
    container: { display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: 'gainsboro', minHeight: '100vh', minWidth: '300px' },
}