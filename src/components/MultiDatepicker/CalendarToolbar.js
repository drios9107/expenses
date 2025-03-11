import React, {useCallback} from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import LeftIcon from '@mui/icons-material/ArrowLeft'
import RightIcon from '@mui/icons-material/ArrowRight'
import moment from 'moment'
import { capitalizeFirstLetter } from './utils'
const  CalendarToolbar= ({nextMonth=true, prevMonth= true, displayDate, onMonthChange,}) =>  {

  const dateTimeFormatted = moment(displayDate).format('MMMM YYYY')

  const handleTouchTapPrevMonth = useCallback(e => {
    e.preventDefault();
    onMonthChange && onMonthChange(-1);
  },[onMonthChange]);

 const handleTouchTapNextMonth = useCallback(e => {
       e.preventDefault();
       onMonthChange && onMonthChange(1);
 }, [onMonthChange]);

    return (
      <Box
        display='flex'
        alignItems='center'
        alignContent='center'
        justifyContent='space-between'
        my={1}
      >
        <IconButton disabled={!prevMonth} onClick={handleTouchTapPrevMonth}>
          <LeftIcon />
        </IconButton>
        <Typography variant='subtitle1'>{capitalizeFirstLetter(dateTimeFormatted)}</Typography>
        <IconButton disabled={!nextMonth} onClick={handleTouchTapNextMonth}>
          <RightIcon />
        </IconButton>
      </Box>
    )

}

export default CalendarToolbar
