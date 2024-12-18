import { Box, Typography } from '@mui/material'
import { GridToolbarQuickFilter } from '@mui/x-data-grid'
import React from 'react'

const DatalistToolbar = ({ title }) => {
    return <Box sx={styles.topSection}>
        <Typography sx={{ flex: 1 }}>{title}</Typography>
        <Box sx={{ display: 'flex', gap: '25px' }}>
            <GridToolbarQuickFilter variant="outlined" size="small" sx={styles.gridToolbarQuickFilter} />
        </Box>
    </Box>
}

export default DatalistToolbar

const styles = {
    topSection: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
}