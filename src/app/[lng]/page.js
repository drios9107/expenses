'use client';
import { useTranslation } from "@/hooks/useTranslation";
import { Box } from "@mui/material";
import banner from '@/assets/banner3.jpg'
import feature1 from '@/assets/feature1.png'
import feature2 from '@/assets/feature2.jpg'
import feature3 from '@/assets/feature3.jpg'
import feature4 from '@/assets/feature4.jpg'
import LandingPageImageDescription from "@/components/LandingPageImageDescription";
import { riseAnimation } from "@/utils/helpers";
import LandingLayout from "@/components/LandingLayout";


export default function Home({ params }) {
  const { t } = useTranslation(params?.lng, 'landing')

  return <LandingLayout >
    <Box sx={styles.rowContainer}>
      <LandingPageImageDescription src={feature1} description={t('feature1')} />
      <LandingPageImageDescription src={feature2} useImageOnLeft={false} description={t('feature2')} />
      <LandingPageImageDescription src={feature3} description={t('feature3')} />
      <LandingPageImageDescription src={feature4} useImageOnLeft={false} description={t('feature4')} />
    </Box>
  </LandingLayout>
}

const styles = {
  rowContainer: { display: 'flex', flexDirection: 'column', gap: '25px', width: '100%', justifyContent: 'center', alignItems: 'center', animation: `${riseAnimation} 1s ease-out forwards`, },
}
