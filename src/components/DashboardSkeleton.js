import { Box, Skeleton, useMediaQuery } from '@mui/material'
import React from 'react'

const DashboardSkeleton = () => {
    const isMobile = useMediaQuery("@media (max-width:500px)");

    return <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: isMobile ? '10px' : '25px' }}>
        <Skeleton variant='rounded' width={'100%'} height={'130px'} animation='wave' />
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: isMobile ? '10px' : '25px' }}>
            <Skeleton variant='rounded' width={'100%'} height={'300px'} animation='wave' />
            <Skeleton variant='rounded' width={'100%'} height={'300px'} animation='wave' />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%', height: '100%', justifyContent: 'space-between' }}>
            <Skeleton variant='rounded' width={'23%'} height={'40px'} animation='wave' />
            <Skeleton variant='rounded' width={'23%'} height={'40px'} animation='wave' />
            <Skeleton variant='rounded' width={'23%'} height={'40px'} animation='wave' />
            <Skeleton variant='rounded' width={'23%'} height={'40px'} animation='wave' />
        </Box>
    </Box>
}

export default DashboardSkeleton