import { Box, Typography } from '@mui/material'
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react'

const WeekDay = ({ code, text, isActive, handleDays = () => { } }) => {
    return <Typography sx={[styles.day, { backgroundColor: isActive ? '#ededed' : 'unset' }]} onClick={() => handleDays(code)}>{text}</Typography>
}

// eslint-disable-next-line react/display-name
const WeekDayList = forwardRef(({ daysWeek = [] }, ref) => {
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

    const handleDays = useCallback(day => {
        setRows(rows.includes(day) ?
            rows.filter(i => i !== day) :
            [...rows, day])
    }, [rows])

    return <Box sx={styles.container} ref={ref}>
        <WeekDay code={'M'} text={'M'} isActive={rows.includes('M')} daysWeek={rows} handleDays={handleDays} />
        <WeekDay code={'T'} text={'T'} isActive={rows.includes('T')} daysWeek={rows} handleDays={handleDays} />
        <WeekDay code={'W'} text={'W'} isActive={rows.includes('W')} daysWeek={rows} handleDays={handleDays} />
        <WeekDay code={'T2'} text={'T'} isActive={rows.includes('T2')} daysWeek={rows} handleDays={handleDays} />
        <WeekDay code={'F'} text={'F'} isActive={rows.includes('F')} daysWeek={rows} handleDays={handleDays} />
        <WeekDay code={'S'} text={'S'} isActive={rows.includes('S')} daysWeek={rows} handleDays={handleDays} />
        <WeekDay code={'S2'} text={'S'} isActive={rows.includes('S2')} daysWeek={rows} handleDays={handleDays} />
    </Box>
})

export default WeekDayList

const styles = {
    container: { display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', gap: '5px', flexWrap: 'no-wrap' },
    day: { cursor: 'pointer', borderRadius: '50%', width: '25px', textAlign: 'center', p: '2px' },
}