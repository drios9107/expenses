import { Box } from '@mui/material';


const GuestLayout = ({ children }) => {
    return <Box sx={styles.container}>
        {children}
    </Box>
}

export default GuestLayout

const styles = {
    container: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: 'gainsboro', minHeight: '100vh' },
}