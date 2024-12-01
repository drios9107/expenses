import React from 'react'
import { Box, IconButton } from '@mui/material'
import Close from 'mdi-material-ui/Close'

const CloseFormButton = ({ onClick, extraclasses, iconExtraclasses = {}, color = 'primary' }) => {
    return <Box sx={[{ position: 'absolute', right: 10, top: 10, zIndex: 1 }, extraclasses]}>
        <IconButton onClick={onClick} >
            <Close sx={{ height: "20px", width: "20px", ...iconExtraclasses }} color={color} />
        </IconButton>
    </Box>
}

export default CloseFormButton