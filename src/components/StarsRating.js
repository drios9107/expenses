import { useTranslation } from '@/hooks/useTranslation'
import { Star } from '@mui/icons-material'
import { Box, Tooltip, Typography } from '@mui/material'
import { useParams } from 'next/navigation'
import React, { useMemo } from 'react'

const StarsRating = ({ title, rating = 5 }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng, 'contact')

    const getStars = useMemo(() => {
        const stars = []
        for (let index = 0; index < 5; index++)
            stars.push(<Star color={index < rating ? "warning" : "disabled"} sx={styles.star} />)

        return stars;
    }, [rating])

    const getTooltip = useMemo(() => {
        return {
            1: t('nonSpeaker'),
            2: t('basic'),
            3: t('intermediate'),
            4: t('advanced'),
            5: t('native')
        }[rating]
    }, [rating, t])


    return <Box sx={styles.container}>
        <Typography sx={styles.rowItem}>{title}</Typography>
        <Tooltip title={getTooltip}>
            {getStars}
        </Tooltip>
    </Box>
}

export default StarsRating


const styles = {
    container: { display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '5px' },
    rowItem: { flex: 1, textAlign: 'justify' },
    star: { width: '20px', height: '20px' },
}