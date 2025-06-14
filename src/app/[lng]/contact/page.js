'use client';
import { useTranslation } from "@/hooks/useTranslation";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import avatar from '@/assets/avatar.jpg'
import { profileInformation, riseAnimation } from "@/utils/helpers";
import LandingLayout from "@/components/LandingLayout";
import Image from "next/image";
import StarsRating from "@/components/StarsRating";
import ContactLink from "@/components/ContactLink";
import ContactForm from "@/components/ContactForm";
import { useMemo, useState } from "react";
import RenderDividerOnlyForMobile from "@/components/RenderDividerOnlyForMobile";


export default function Contact({ params }) {
    const { t } = useTranslation(params?.lng, 'contact')
    const [open, setOpen] = useState(false);
    const isMobile = useMediaQuery("@media (max-width:500px)");

    const getContainerStyles = useMemo(() => {
        return { flexDirection: isMobile ? 'column' : 'row' }
    }, [isMobile])

    const getLeftSideStyles = useMemo(() => {
        return { width: isMobile ? '100%' : 'unset' }
    }, [isMobile])

    const getLanguageSectionContainerStyles = useMemo(() => {
        return { alignItems: isMobile ? 'flex-start' : 'center' };
    }, [isMobile])

    return <LandingLayout >
        <Box sx={[styles.container, getContainerStyles]}>
            <Box sx={[styles.leftSide, getLeftSideStyles]}>
                <Box sx={styles.imageContainer}>
                    <Image src={avatar} alt={'avatar'} width={100} height={115} style={styles.rowImage} />
                </Box>

                <Box sx={styles.sectionContainer}>
                    <Typography variant="button" sx={styles.rowItem}>{t('info')}</Typography>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <Typography sx={styles.rowItem}>{profileInformation.name}</Typography>
                        <ContactLink href={profileInformation.whatsapp} title={profileInformation.phone} />
                        <ContactLink href={profileInformation.emailLink} title={profileInformation.email} />
                        <ContactLink href={profileInformation.linkedin} title={t('linkedinProfile')} />
                    </Box>
                </Box>

                <RenderDividerOnlyForMobile />

                <Box sx={[styles.sectionContainer, getLanguageSectionContainerStyles]}>
                    <Typography variant="button" sx={styles.rowItem}>{t('languages')}</Typography>
                    <Box>
                        <StarsRating title={t('spanish')} rating={5} />
                        <StarsRating title={t('english')} rating={4} />
                    </Box>
                </Box>
            </Box>

            <RenderDividerOnlyForMobile />

            <Box sx={[styles.coverContainer, { justifyContent: 'space-between' }]}>
                <Typography sx={styles.rowItem}>{t('cover1')}</Typography>
                <Typography sx={styles.rowItem}>{t('cover2')}</Typography>
                <Typography sx={styles.rowItem}>{t('cover3')}</Typography>
                <Typography sx={styles.rowItem}>{t('cover4')}</Typography>
                <Typography sx={styles.rowItem}>{t('cover5')}</Typography>
                <Typography sx={styles.rowItem}>{t('cover6')}</Typography>
            </Box>

        </Box>
        <Button variant='contained' onClick={() => setOpen(true)}>{t('contactMe')}</Button>
        {open && <ContactForm onClose={() => setOpen(false)} />}
    </LandingLayout>
}

const styles = {
    container: { display: 'flex', gap: '30px', width: 'min(80%, 700px)', justifyContent: 'center', alignItems: 'flex-start', animation: `${riseAnimation} 1s ease-out forwards`, },
    leftSide: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: '25px' },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coverContainer: { display: 'flex', flexDirection: 'column', gap: '15px' },
    sectionContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: '10px', width: '100%' },
    rowItem: { flex: 1, textAlign: 'justify' },
    rowImage: {
        boxShadow: '0.5px 0.5px 1.5px 1px #02aba8',
        borderRadius: '16px',
    },
}
