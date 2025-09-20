import { Error } from '@mui/icons-material';
import { Chip } from '@mui/material';

const InDevelopmentBadge = () => {
    return <Chip sx={styles.chip} label='In Development' color='error' variant='outlined' icon={<Error fontSize='small' />} />
}

export default InDevelopmentBadge


const styles = {
    chip: { position: 'absolute', top: '10px', right: '10px', fontWeight: 'bold' }
}