import { Box, Divider, Drawer, Typography } from '@mui/material'
import React from 'react'

const DetailsDrawer = ({ children, onClose = () => { }, extraclasses = {} }) => {
    return <Drawer open onClose={onClose}>
        <Box sx={styles.container}>
            <Typography sx={{ alignSelf: 'center' }}>Details</Typography>
            <Divider />
            <Box sx={extraclasses}>
                {children}
            </Box>
        </Box>
    </Drawer>
}

export default DetailsDrawer

const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '25px', p: '25px', width: '300px' },
}