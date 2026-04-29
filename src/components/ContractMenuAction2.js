import { MenuLeftOutline, MenuRightOutline } from "mdi-material-ui";
import MenuAction2 from "./MenuAction2";

const ContractMenuAction2 = ({ onClick, collapsed, title }) => {
  return (
    <MenuAction2 onClick={onClick} collapsed={collapsed} title={title}>
      {collapsed ? <MenuRightOutline sx={styles.iconMenu} /> : <MenuLeftOutline sx={styles.iconMenu} />}
    </MenuAction2>
  );
};

export default ContractMenuAction2;

const styles = {
  iconMenu: {
    color: "#3f5f9b",
    height: "20px",
    width: "20px",
    flexShrink: 0,
  },
};
