import { IconButton, MenuItem, Tooltip, useMediaQuery } from '@mui/material'
import Link from 'next/link'

const MenuLink = ({ href, title = '', children }) => {
    const isMobile = useMediaQuery("@media (max-width:500px)");

    return <Link href={href} >
        {isMobile ?
            <Tooltip title={title}>
                <IconButton>{children}</IconButton>
            </Tooltip> :
            <MenuItem sx={{ alignSelf: 'center', display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                {children}{title}
            </MenuItem>}
    </Link>
}

export default MenuLink