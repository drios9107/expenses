import { Box } from '@mui/material'
import React from 'react'
import Loader from './Loader'


const FallbackLoader = () => {
    return <Box sx={styles.container}>
        <Loader isLoading />
    </Box>
}

export default FallbackLoader

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' },
}