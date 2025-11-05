import { Grid2, Paper, Typography } from '@mui/material'
import moment from 'moment'
import { useCallback, useMemo, useState } from 'react';
import DayCardModal from './DayCardModal'
import { useFormat } from '@/hooks/useFormat';

const DayCard = ({ title, day, getDashboard = () => { } }) => {
    const [isHover, setIsHover] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const { currencyFormat } = useFormat();

    const total = useMemo(() => {
        let sum = 0;
        day.forEach(i => sum += i?.amount)
        return sum
    }, [day])

    const isExpensive = useMemo(() => total >= 4000, [total])

    const getBackgroundColor = useMemo(() => isExpensive ? { backgroundColor: 'rgb(248 74 74)' } : {}, [isExpensive])

    const onClose = useCallback((shouldUpdate) => {
        if (shouldUpdate)
            getDashboard()

        setIsOpen(false)
    }, [getDashboard])

    return <>
        <Grid2 size={{ lg: 3, md: 6, xs: 12 }} >
            <Paper sx={[styles.container, getBackgroundColor]} elevation={isHover ? 3 : 1} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} onClick={() => setIsOpen(true)}>
                <Typography sx={{ width: '100%', textAlign: 'left', userSelect: 'none' }}>{moment(title).format('dddd DD')}</Typography>
                <Typography sx={{ width: '100%', textAlign: 'right', fontWeight: 600 }}>{currencyFormat(total)} $</Typography>
            </Paper>
        </Grid2>
        {isOpen && <DayCardModal onClose={onClose} title={title} day={day} />}
    </>
}

export default DayCard

const styles = {
    container: {
        display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', flex: 1, minWidth: '200px',
        gap: '10px', p: '16px', borderRadius: '16px', cursor: 'pointer', '&:hover': { opacity: 0.7 }
    },
}