'use client';
import { useTranslation } from "@/hooks/useTranslation";
import { Box, Button, Typography } from "@mui/material";
import banner from '@/assets/banner3.jpg'
import feature1 from '@/assets/feature1.png'
import feature2 from '@/assets/feature2.jpg'
import feature3 from '@/assets/feature3.jpg'
import feature4 from '@/assets/feature4.jpg'
import LandingPageImageDescription from "@/components/LandingPageImageDescription";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { riseAnimation } from "@/utils/helpers";


export default function Home({ params }) {
  const { status } = useSession()
  const { t } = useTranslation(params?.lng, 'landing')
  const lng = useMemo(() => params?.lng ?? 'en', [params?.lng])
  const router = useRouter();

  return <Box sx={styles.container}>

    <Box sx={styles.banner}>
      <Box sx={styles.menu}>
        {status === 'authenticated' ?
          <Link href={`/${lng}/dashboard`} style={styles.link}>
            {t('dashboard')}
          </Link> :
          <Link href={`/${lng}/login`} style={styles.link}>
            {t('login')}
          </Link>}
      </Box>
      <Box sx={styles.titleContainer}>
        <Typography variant="h4" color="#fff">{t('title')}</Typography>
        <Typography variant="h5" color="#fff">{t('subtitle')}</Typography>
      </Box>

      <Button variant='contained' onClick={() => router.push(`/${params?.lng}/login`)} sx={styles.button}>{t('loginNow')}</Button>
    </Box>

    <Box sx={styles.rowContainer}>
      <LandingPageImageDescription src={feature1} description={t('feature1')} />
      <LandingPageImageDescription src={feature2} useImageOnLeft={false} description={t('feature2')} />
      <LandingPageImageDescription src={feature3} description={t('feature3')} />
      <LandingPageImageDescription src={feature4} useImageOnLeft={false} description={t('feature4')} />
    </Box>

    <Box sx={styles.footer}>

    </Box>
  </Box>
}

const styles = {
  container: { width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '100px', },
  menu: { px: '50px', width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' },
  banner: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '100px', backgroundImage: `url(${banner.src})`, backgroundSize: 'cover', width: '100%', py: '50px' },
  titleContainer: { userSelect: 'none', display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center', padding: '50px', '& > h4, & > h5': { textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)' } },
  rowContainer: { display: 'flex', flexDirection: 'column', gap: '25px', width: '100%', justifyContent: 'center', alignItems: 'center', animation: `${riseAnimation} 1s ease-out forwards`, },
  button: { width: 'fit-content', borderRadius: '16px' },
  footer: { backgroundColor: '#02aba8', height: '100px', width: '100%' },

  iconMenu: { color: '#00000099', height: "20px", width: "20px" },
  link: { display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center', color: '#fff', cursor: 'pointer', '& :hover': { opacity: 0.7 } },

}
