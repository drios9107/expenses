import { Delete, ModeEditOutline } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Eye } from "mdi-material-ui";

const ActionColumn = ({ iconColor = '#000000', onDetails, onUpdate, onDelete, actionsContainerExtraclasses = {}, children }) => {
    return (
        <Box justifyContent={'center'} sx={[styles.actionsContainer, actionsContainerExtraclasses]}>
            {onDetails && <Tooltip title={"Details"}>
                <IconButton onClick={onDetails}>
                    <Eye color={iconColor} sx={{ height: "20px", width: "20px" }} />
                </IconButton>
            </Tooltip>}

            {onUpdate && <Tooltip title={"Edit"}>
                <IconButton onClick={onUpdate}>
                    <ModeEditOutline color={iconColor} sx={{ height: "20px", width: "20px" }} />
                </IconButton>
            </Tooltip>}

            {onDelete && <Tooltip title={"Delete"}>
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
