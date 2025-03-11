import React, { useCallback } from 'react'
import { Box } from '@mui/material'
import DateUtilities from './utils'
import { dateTimeFormat } from './dateUtils'
import Circle from './Circle'
import moment from 'moment'

const dateInNumberic = new dateTimeFormat('en-US', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric'
})

const dateToday = dateInNumberic.format(new Date())

const dayInNumeric = new dateTimeFormat('en-US', {
  day: 'numeric'
})

const Week = ({ onSelect = () => { }, selectedDates = [], week = [], readOnly, disabledDates = [], minDate, maxDate, displayDate, disableWeekends }) => {

  const getDisabledDates = useCallback((day) => {
    if (disableWeekends) {
      const d1 = moment(displayDate).weekday(5).toDate();
      const s1 = moment(displayDate).weekday(6).toDate();
      const d2 = moment(displayDate).weekday(5).add(1, 'week').toDate();
      const s2 = moment(displayDate).weekday(6).add(1, 'week').toDate();
      const d3 = moment(displayDate).weekday(5).add(2, 'week').toDate();
      const s3 = moment(displayDate).weekday(6).add(2, 'week').toDate();
      const d4 = moment(displayDate).weekday(5).add(3, 'week').toDate();
      const s4 = moment(displayDate).weekday(6).add(3, 'week').toDate();
      const d5 = moment(displayDate).weekday(5).add(4, 'week').toDate();
      const s5 = moment(displayDate).weekday(6).add(4, 'week').toDate();
      const d6 = moment(displayDate).weekday(5).add(5, 'week').toDate();
      const s6 = moment(displayDate).weekday(6).add(5, 'week').toDate();

      const weekendDays = [s1, d1, s2, d2, s3, d3, s4, d4, s5, d5, s6, d6];
      return weekendDays.some(i => moment(i).format('YYYY-MM-DD') === moment(day).format('YYYY-MM-DD'));
    }

    return false;
  }, [disableWeekends, displayDate])

  const isDisabled = useCallback(day => {
    if (readOnly) return true

    const disabledDate = disabledDates.find(d => DateUtilities.isSameDay(d, day))
    if (disabledDate != null) return true

    return (
      (minDate && DateUtilities.isBefore(day, minDate)) ||
      (maxDate && DateUtilities.isAfter(day, maxDate)) ||
      ((displayDate && disableWeekends) && getDisabledDates(day))
    )
  }, [disableWeekends, disabledDates, displayDate, getDisabledDates, maxDate, minDate, readOnly])

  const isSelected = useCallback(day => DateUtilities.dateIn(selectedDates, day), [selectedDates])

  return (
    <Box
      display='flex'
      flexDirection='row'
      justifyContent='space-between'
      height={34}
      marginBottom={2}
    >
      {week.map((day, i) => {
        if (day) {
          const isToday = day && dateToday === dateInNumberic.format(day)

          return <Circle
            key={`day-${day}`}
            label={dayInNumeric.format(day)}
            disabled={isDisabled(day)}
            checked={isSelected(day)}
            onCheck={() => !isDisabled(day) && onSelect(day)}
            isToday={isToday}
            sx={{ margin: '0 8px' }}
          />
        }
        return <Box
          key={`blank-${i}`}
          sx={{ margin: `0 8px` }}
          mx={1}
          width={36}
          height={36}
        />
      })}
    </Box>
  )
}

export default Week
