import { Chip } from '@mui/material';

const InDevelopmentBadge = () => {
    return <Chip sx={styles.chip} label='In Development' color='error' variant='outlined' />
}

export default InDevelopmentBadge


const styles = {
    chip: { position: 'absolute', top: '10px', right: '10px', fontWeight: 'bold' }
}