import { Typography } from "@mui/material";

const ColumnHeader = ({ title, isId = false, extraclasses = {} }) => {
    return <Typography variant="tableHeader" sx={[isId ? { color: '#5a5fe0' } : {}, extraclasses]}>
        {title}
    </Typography>
};

export default ColumnHeader;
