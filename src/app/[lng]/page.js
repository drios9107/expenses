'use client';
import { useTranslation } from "@/hooks/useTranslation";
import { Box } from "@mui/material";
import feature1 from '@/assets/feature1.png'
import feature2 from '@/assets/feature2.jpg'
import feature3 from '@/assets/feature3.jpg'
import feature4 from '@/assets/feature4.jpg'
import feature5 from '@/assets/feature5.jpg'
import feature6 from '@/assets/feature6.png'
import feature7 from '@/assets/feature7.png'
import feature8 from '@/assets/feature8.jpg'
import LandingPageImageDescription from "@/components/LandingPageImageDescription";
import { riseAnimation } from "@/utils/helpers";
import LandingLayout from "@/components/LandingLayout";
import RenderDividerOnlyForMobile from "@/components/RenderDividerOnlyForMobile";


export default function Home({ params }) {
  const { t } = useTranslation(params?.lng, 'landing')

  return <LandingLayout>
    <Box sx={styles.rowContainer}>
      <LandingPageImageDescription src={feature1} description={t('feature1')} />
      <RenderDividerOnlyForMobile width="80%" />
      <LandingPageImageDescription src={feature2} useImageOnLeft={false} description={t('feature2')} />
      <RenderDividerOnlyForMobile width="80%" />
      <LandingPageImageDescription src={feature3} description={t('feature3')} />
      <RenderDividerOnlyForMobile width="80%" />
      <LandingPageImageDescription src={feature4} useImageOnLeft={false} description={t('feature4')} />
      <RenderDividerOnlyForMobile width="80%" />
      <LandingPageImageDescription src={feature5} description={t('feature5')} />
      <RenderDividerOnlyForMobile width="80%" />
      <LandingPageImageDescription src={feature6} useImageOnLeft={false} description={t('feature6')} />
      <RenderDividerOnlyForMobile width="80%" />
      <LandingPageImageDescription src={feature7} description={t('feature7')} />
      <RenderDividerOnlyForMobile width="80%" />
      <LandingPageImageDescription src={feature8} useImageOnLeft={false} description={t('feature8')} />
    </Box>
  </LandingLayout>
}

const styles = {
  rowContainer: { display: 'flex', flexDirection: 'column', gap: '25px', width: '100%', justifyContent: 'center', alignItems: 'center', animation: `${riseAnimation} 1s ease-out forwards`, },
}
