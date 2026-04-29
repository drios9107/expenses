import { Box } from '@mui/material';
import Menu from './Menu';
import { useLayoutStyles } from '@/hooks/useLayoutStyles'
import Menu2 from './Menu2';

const Body = ({ children }) => {
    const { conditionalMiddleSectionStyles } = useLayoutStyles()

    return <Box sx={[styles.middleSection, conditionalMiddleSectionStyles]}>
        <Menu2 />
        <Box sx={styles.bodySection}>
            {children}
        </Box>
    </Box>
}

export default Body


const styles = {
    middleSection: { display: 'flex', flexDirection: 'row', width: '100%', minWidth: 0, flex: 1 },
    bodySection: { flex: 7, minWidth: 0 },
}