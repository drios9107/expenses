import { Box, Typography } from '@mui/material'
import { useParams } from 'next/navigation'
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react'

const WeekDay = ({ code, text, isActive, handleDays = () => { } }) => {
    return <Typography sx={[styles.day, { backgroundColor: isActive ? '#ededed' : 'unset' }]} onClick={() => handleDays(code)}>{text}</Typography>
}

// eslint-disable-next-line react/display-name
const WeekDayList = forwardRef(({ daysWeek = [] }, ref) => {
    const params = useParams();
    const [rows, setRows] = useState([])

    useEffect(() => {
        setRows(daysWeek)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useImperativeHandle(ref, () => {
        return {
            getSectionValues() {
                return rows;
            },
        };
    }, [rows]);

    const isEnglish = useMemo(() => params?.lng === 'en', [params?.lng])

    const handleDays = useCallback(day => {
        setRows(rows.includes(day) ?
            rows.filter(i => i !== day) :
            [...rows, day])
    }, [rows])

    return <Box sx={styles.container} ref={ref}>
        <WeekDay code={'M'} text={isEnglish ? 'M' : 'L'} isActive={rows.includes('M')} daysWeek={rows} handleDays={handleDays} />
        <WeekDay code={'T'} text={isEnglish ? 'T' : 'M'} isActive={rows.includes('T')} daysWeek={rows} handleDays={handleDays} />
        <WeekDay code={'W'} text={isEnglish ? 'W' : 'M'} isActive={rows.includes('W')} daysWeek={rows} handleDays={handleDays} />
        <WeekDay code={'T2'} text={isEnglish ? 'T' : 'J'} isActive={rows.includes('T2')} daysWeek={rows} handleDays={handleDays} />
        <WeekDay code={'F'} text={isEnglish ? 'F' : 'V'} isActive={rows.includes('F')} daysWeek={rows} handleDays={handleDays} />
        <WeekDay code={'S'} text={isEnglish ? 'S' : 'S'} isActive={rows.includes('S')} daysWeek={rows} handleDays={handleDays} />
        <WeekDay code={'S2'} text={isEnglish ? 'S' : 'D'} isActive={rows.includes('S2')} daysWeek={rows} handleDays={handleDays} />
    </Box>
})

export default WeekDayList

const styles = {
    container: { display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', gap: '5px', flexWrap: 'no-wrap' },
    day: { cursor: 'pointer', borderRadius: '50%', width: '25px', textAlign: 'center', p: '2px' },
}