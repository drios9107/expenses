import { IconButton, MenuItem, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const MenuLink = ({ href, title = '' }) => {
    const isMobile = useMediaQuery("@media (max-width:500px)");

    return <Link href={href}>
        {isMobile ?
            <IconButton>{title.substring(0, 1)}</IconButton> :
            <MenuItem>
                {title}
            </MenuItem>}
    </Link>
}

export default MenuLink