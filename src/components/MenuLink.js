import { IconButton, MenuItem, useMediaQuery } from '@mui/material'
import Link from 'next/link'

const MenuLink = ({ href, title = '', children }) => {
    const isMobile = useMediaQuery("@media (max-width:500px)");

    return <Link href={href}>
        {isMobile ?
            <IconButton>{children}</IconButton> :
            <MenuItem sx={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                {children}{title}
            </MenuItem>}
    </Link>
}

export default MenuLink