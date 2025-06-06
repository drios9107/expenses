const { IconButton, Tooltip, MenuItem, Typography } = require("@mui/material");
const { default: Link } = require("next/link");

const MenuLink = ({ href, title = '', collapsed, children }) => {
    return (
        <Link href={href} passHref>
            {collapsed ? (
                <Tooltip title={title} placement="right" arrow>
                    <IconButton sx={styles.collapsedItem}>
                        {children}
                    </IconButton>
                </Tooltip>
            ) : (
                <MenuItem sx={styles.item}>
                    {children}
                    <Typography style={styles.menuText}>{title}</Typography>
                </MenuItem>
            )}
        </Link>
    );
};


export default MenuLink


const styles = {
    item: {
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '40px',
        borderRadius: '8px',
        mx: '8px',
        px: '8px',
        '&:hover': {
            backgroundColor: '#f5f5f5',
        },
        transition: 'all 0.2s ease',
    },
    collapsedItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        '&:hover': {
            backgroundColor: '#f5f5f5',
        },
    },
    menuText: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        transition: 'opacity 0.2s ease',
    },
}