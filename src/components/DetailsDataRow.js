import { useTranslation } from '@/hooks/useTranslation'
import { Box, Typography } from '@mui/material';
import { useParams } from 'next/navigation'

const DetailsDataRow = ({ value, title }) => {
    const params = useParams()
    const { t } = useTranslation(params?.lng ?? 'en', 'transactions')

    return <Box sx={styles.row}>
        <Typography variant="body1" sx={{ fontWeight: '600' }}>{title}:</Typography>
        <Typography variant="body1">{value}</Typography>
    </Box>
}

export default DetailsDataRow


const styles = {
    row: { display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', gap: '5px' },
}