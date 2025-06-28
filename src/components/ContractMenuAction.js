import { MenuLeftOutline, MenuRightOutline } from "mdi-material-ui";
import MenuAction from "./MenuAction";


const ContractMenuAction = ({ onClick, collapsed, title }) => {
    return <MenuAction
        onClick={onClick}
        collapsed={collapsed}
        title={title}
    >
        {collapsed ?
            <MenuRightOutline sx={styles.iconMenu} /> :
            <MenuLeftOutline sx={styles.iconMenu} />}
    </MenuAction>
};

export default ContractMenuAction


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