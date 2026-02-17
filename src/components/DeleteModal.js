// ** MUI Imports
import { Box, Button, Typography } from "@mui/material";
import SimpleModal from "./SimpleModal";
import { useParams } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";

const DeleteModal = ({ title, text, onClose = () => { }, onClick = () => { }, maxWidth = "sm", extraclasses }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'common')

    return <SimpleModal onClose={onClose} title={title ?? t('delete')} maxWidth={maxWidth} extraclasses={extraclasses}>
        <Typography component="span" sx={{ mb: 2 }}>{text ?? t('defaultDeleteText')}</Typography>
        <Box sx={styles.actionsContainer}>
            <Button variant='outlined' onClick={onClose}>{t('cancel')}</Button>
            <Button variant='contained' onClick={onClick} autoFocus>{t('confirm')}</Button>
        </Box>
    </SimpleModal>
};

export default DeleteModal;


const styles = {
    actionsContainer: { display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'flex-end' },
}