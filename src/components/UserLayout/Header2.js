import { Box, Paper, Tooltip, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import Balance from "../Balance";
import { Home, Logout, Policy } from "@mui/icons-material";
import { signOut } from "next-auth/react";
import { useLayoutStyles } from "@/hooks/useLayoutStyles";
import { useParams } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSelector from "../LanguageSelector";

const Header2 = () => {
  const { conditionalTopSectionStyles } = useLayoutStyles();
  const isMobile = useMediaQuery("@media (max-width:500px)");
  const { lng } = useParams();
  const { t } = useTranslation(lng ?? "en", "common");

  const handleSignOut = useCallback(() => {
    signOut();
  }, []);

  const getHomeLink = useMemo(() => {
    const icon = <Home sx={styles.iconMenu} />;
    const title = t("home");

    return (
      <Link href={`/${lng}/dashboard2`} className="landing-page-link" style={styles.link}>
        {isMobile ? <Tooltip title={title}>{icon}</Tooltip> : <>{icon} {title}</>}
      </Link>
    );
  }, [isMobile, lng, t]);

  const getPrivacyLink = useMemo(() => {
    const icon = <Policy sx={styles.iconMenu} />;
    const title = t("privacyPolicy");

    return (
      <Link href={`/${lng}/privacy`} className="landing-page-link" style={styles.link}>
        {isMobile ? <Tooltip title={title}>{icon}</Tooltip> : <>{icon} {title}</>}
      </Link>
    );
  }, [isMobile, lng, t]);

  return (
    <Paper sx={[styles.topSection, conditionalTopSectionStyles]}>
      <Box sx={styles.leftSection}>
        {getHomeLink}
        {getPrivacyLink}
      </Box>
      <Box sx={styles.rightSection}>
        <LanguageSelector />
        <Balance />
        <Box sx={styles.signOutWrap}>
          <Tooltip title={t("singOut")}>
            <Logout sx={styles.iconMenu} onClick={handleSignOut} />
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );
};

export default Header2;

const styles = {
  topSection: {
    minHeight: "60px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(180deg, #ffffff 0%, #f5f8ff 100%)",
    border: "1px solid #d6e2ff",
    boxShadow: "0 10px 22px rgba(20, 47, 79, 0.08)",
  },
  iconMenu: {
    color: "#3f5f9b",
    height: "20px",
    width: "20px",
    cursor: "pointer",
  },
  link: {
    display: "flex",
    flexDirection: "row",
    gap: "6px",
    alignItems: "center",
    color: "#2c4671",
    fontWeight: 500,
    padding: "6px 10px",
    borderRadius: "10px",
    transition: "all 0.2s ease",
  },
  leftSection: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    alignItems: "center",
  },
  rightSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  signOutWrap: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    "&:hover": { opacity: 0.75 },
  },
};
