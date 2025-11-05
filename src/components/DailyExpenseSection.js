import { useEffect, useState } from 'react';
import DayCard from './DayCard';
import { Grid2 } from '@mui/material';
import { useTranslation } from '@/hooks/useTranslation';
import { useParams } from 'next/navigation';
import { fadeInStyles } from '@/utils/helpers';

const DailyExpenseSection = ({ days = {}, getDashboard = () => { } }) => {
    const params = useParams()
    const { t } = useTranslation(params?.lng ?? 'en', 'dashboard')
    const [allCards, setAllCards] = useState([])

    useEffect(() => {
        const cards = Object.keys(days).map((item, index) => <DayCard key={index} title={item} day={days[item]} getDashboard={getDashboard} />)

        setAllCards(cards);
    }, [days, getDashboard])

    return <Grid2 container spacing={2} sx={fadeInStyles()}>
        {allCards}
    </Grid2>
}

export default DailyExpenseSection
