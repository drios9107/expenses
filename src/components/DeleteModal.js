// ** MUI Imports
import { Box, Button, Typography } from "@mui/material";
import SimpleModal from "./SimpleModal";

const DeleteModal = ({ title = 'Delete', text = 'Are you sure you want to delete this?', onClose = () => { }, onClick = () => { }, maxWidth = "sm", extraclasses }) => {
    return <SimpleModal onClose={onClose} title={title} maxWidth={maxWidth} extraclasses={extraclasses}>
        <Typography component="span" sx={{ mb: 2 }}>{text}</Typography>
        <Box sx={styles.actionsContainer}>
            <Button variant='outlined' onClick={onClose}>Cancel</Button>
            <Button variant='contained' onClick={onClick}>Confirm</Button>
        </Box>
    </SimpleModal>
};

export default DeleteModal;


const styles = {
    actionsContainer: { display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'flex-end' },
}