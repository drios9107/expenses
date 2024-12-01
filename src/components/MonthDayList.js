import { Box, Typography } from '@mui/material'
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react'

// eslint-disable-next-line react/display-name
const MonthDayList = forwardRef(({ daysMonth = [], daysInMonth = 30 }, ref) => {
    const [rows, setRows] = useState([])

    useEffect(() => {
        setRows(daysMonth)
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
        {[...Array(daysInMonth).keys()].map((i, index) => <Typography
            key={index}
            sx={[styles.day, { backgroundColor: rows.includes(i + 1) ? '#ededed' : 'unset' }]}
            onClick={() => handleDays(i + 1)}>{i + 1}</Typography>)}
    </Box>
})

export default MonthDayList

const styles = {
    container: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: '5px' },
    day: { cursor: 'pointer', borderRadius: '50%', width: '25px', textAlign: 'center', p: '2px' },
}