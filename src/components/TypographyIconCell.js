import { Typography } from '@mui/material'
import React from 'react'

const TypographyIconCell = ({ color, children }) => {
    return <Typography sx={styles.typography} color={color}>
        {children}
    </Typography>
}

export default TypographyIconCell

const styles = {
    typography: {
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}