import DetailsDrawer from '@/components/DetailsDrawer'
import { Box, Typography } from '@mui/material'

const Details = ({ item, onClose = () => { } }) => {
    return <DetailsDrawer onClose={onClose}>
        <Box sx={styles.row}>
            <Typography variant="body1" sx={{ fontWeight: '600' }}>Name: </Typography>
            <Typography variant="body1">{item.name}</Typography>
        </Box>

        <Box sx={styles.row}>
            <Typography variant="body1" sx={{ fontWeight: '600' }}>Category: </Typography>
            <Typography variant="body1">{item.category?.name}</Typography>
        </Box>
    </DetailsDrawer>
}

export default Details

const styles = {
    row: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: '5px' },
}