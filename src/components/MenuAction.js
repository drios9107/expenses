import { IconButton, Tooltip, Typography } from "@mui/material";


const MenuAction = ({ onClick, collapsed, title, children }) => {
    return (
        <Tooltip title={collapsed ? title : ''} placement="right" arrow>
            <IconButton
                onClick={onClick}
                sx={collapsed ? styles.collapsedItem : styles.item}
            >
                {collapsed ?
                    children :
                    <>
                        {children}
                        <Typography style={styles.menuText}>{!collapsed ? title : ''}</Typography>
                    </>}
            </IconButton>
        </Tooltip>
    );
};

export default MenuAction


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
        color: '#000000de'
    },
    iconMenu: {
        color: '#00000099',
        height: "20px",
        width: "20px",
        flexShrink: 0,
    },
}