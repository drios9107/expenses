import { Divider, useMediaQuery } from '@mui/material';
import React from 'react'

const RenderDividerOnlyForMobile = ({ width = '100%' }) => {
    const isMobile = useMediaQuery("@media (max-width:500px)");

    if (isMobile)
        return <Divider sx={{ width }} />

    return null
}

export default RenderDividerOnlyForMobile