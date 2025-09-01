import React, { useEffect, useMemo, useState } from 'react'
import DayCard from './DayCard';
import { Paper, Typography } from '@mui/material';
import { useTranslation } from '@/hooks/useTranslation';
import { useParams } from 'next/navigation';

const RenderDayCards = ({ days = {} }) => {
    const params = useParams()
    const { t } = useTranslation(params?.lng ?? 'en', 'dashboard')
    const [allCards, setAllCards] = useState([])

    useEffect(() => {
        let sum = 0;
        const cards = Object.keys(days).map((item, index) => {
            days[item].forEach(i => sum += i?.amount);
            return <DayCard key={index} title={item} day={days[item]} />
        })

        setAllCards(cards);
    }, [days])

    return allCards
}

export default RenderDayCards


const styles = {
    cardContainer: {
        display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', flex: 1, minWidth: '200px',
        gap: '10px', p: '16px', borderRadius: '16px', cursor: 'pointer', '&:hover': { opacity: 0.7 }
    },
}