import { Box } from '@mui/material'
import React from 'react'

const BoxRow = ({ children, extraclasses = {} }) => {
    return <Box sx={[styles.container, extraclasses]}>{children}</Box>
}

export default BoxRow

const styles = {
    container: { display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', gap: '25px' },
}