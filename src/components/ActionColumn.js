import { useTranslation } from "@/hooks/useTranslation";
import { Delete, ModeEditOutline } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Eye } from "mdi-material-ui";
import { useParams } from "next/navigation";

const ActionColumn = ({ iconColor = '#000000', onDetails, onUpdate, onDelete, actionsContainerExtraclasses = {}, children }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'common')

    return (
        <Box justifyContent={'center'} sx={[styles.actionsContainer, actionsContainerExtraclasses]}>
            {onDetails && <Tooltip title={t('details')}>
                <IconButton onClick={onDetails}>
                    <Eye color={iconColor} sx={{ height: "20px", width: "20px" }} />
                </IconButton>
            </Tooltip>}

            {onUpdate && <Tooltip title={t('edit')}>
                <IconButton onClick={onUpdate}>
                    <ModeEditOutline color={iconColor} sx={{ height: "20px", width: "20px" }} />
                </IconButton>
            </Tooltip>}

            {onDelete && <Tooltip title={t('delete')}>
                <IconButton onClick={onDelete}>
                    <Delete color={iconColor} sx={{ height: "20px", width: "20px" }} />
                </IconButton>
            </Tooltip>}
            {children}
        </Box>
    );
};

export default ActionColumn;

const styles = {
    actionsContainer: {
        display: "flex",
        gap: 0,
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
    },
    iconButton: { p: 0, height: "28px", width: "28px" },
};
