import { Delete, ModeEditOutline } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Eye } from "mdi-material-ui";

const ActionColumn = ({ onDetails = () => { }, onUpdate = () => { }, onDelete = () => { }, actionsContainerExtraclasses = {}, children }) => {
    return (
        <Box color={"GrayText"} justifyContent={'center'} sx={[styles.actionsContainer, actionsContainerExtraclasses]}>
            <Tooltip title={"Details"}>
                <IconButton onClick={onDetails}>
                    <Eye color="#7e7e7e" sx={{ height: "20px", width: "20px" }} />
                </IconButton>
            </Tooltip>

            <Tooltip title={"Edit"}>
                <IconButton onClick={onUpdate}>
                    <ModeEditOutline color="#7e7e7e" sx={{ height: "20px", width: "20px" }} />
                </IconButton>
            </Tooltip>

            <Tooltip title={"Delete"}>
                <IconButton onClick={onDelete}>
                    <Delete color="#7e7e7e" sx={{ height: "20px", width: "20px" }} />
                </IconButton>
            </Tooltip>
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
