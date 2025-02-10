import { Box, Button, Divider, Typography } from '@mui/material';
import SimpleModal from './SimpleModal'

const DayCardModal = ({ title = '', day, maxWidth, onClose = () => { }, extraclasses = {} }) => {
    return <SimpleModal onClose={onClose} title={title} maxWidth={maxWidth} extraclasses={extraclasses}>
        <Box sx={styles.dataContainer}>
            {day?.map((item, index) => <Box key={index} >
                <Box sx={styles.row}>
                    <Typography sx={{}}>{item?.category} {item?.subCategory ? `(${item.subCategory})` : ''}</Typography>
                    <Typography sx={{ fontWeight: 600 }}>{item?.amount} $</Typography>
                </Box>

                {item?.description && <Box sx={styles.row}>
                    <Typography sx={{ fontStyle: 'italic' }} variant='caption'>{item?.description}</Typography>
                </Box>}

                <Divider sx={{ width: '100%' }} />
            </Box>
            )}
        </Box>
        <Box sx={styles.actionsContainer}>
            <Button variant='outlined' onClick={onClose}>Close</Button>
        </Box>
    </SimpleModal>
}

export default DayCardModal

const styles = {
    dataContainer: { display: 'flex', flexDirection: 'column', gap: '25px' },
    row: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    rightInfo: { display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' },
    actionsContainer: { display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'flex-end', mt: '25px', mb: '10px' },
}